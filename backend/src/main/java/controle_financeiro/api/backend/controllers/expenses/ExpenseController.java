package controle_financeiro.api.backend.controllers.expenses;

import java.net.URI;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import controle_financeiro.api.backend.dtos.expenses.CreateExpenseRequestDto;
import controle_financeiro.api.backend.dtos.expenses.ExpenseResponseDto;
import controle_financeiro.api.backend.services.expenses.ExpenseService;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService service;

    public ExpenseController(ExpenseService service) {
        this.service = service;
    }

    @GetMapping
    public Page<ExpenseResponseDto> list(Pageable pageable) {
        return service.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ExpenseResponseDto get(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<ExpenseResponseDto> create(
            @Valid @RequestBody CreateExpenseRequestDto dto) {

        ExpenseResponseDto created = service.create(dto);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.getId())
                .toUri();

        return ResponseEntity.created(uri).body(created);
    }

    @PutMapping("/{id}")
    public ExpenseResponseDto update(
            @PathVariable Long id,
            @Valid @RequestBody CreateExpenseRequestDto dto) {

        return service.update(id, dto);
    }

    @PatchMapping("/{id}/toggle-paid")
    public ExpenseResponseDto togglePaid(@PathVariable Long id) {
        return service.togglePaid(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

}
