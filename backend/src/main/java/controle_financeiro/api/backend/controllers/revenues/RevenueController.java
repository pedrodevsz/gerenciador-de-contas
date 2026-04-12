package controle_financeiro.api.backend.controllers.revenues;

import java.net.URI;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import controle_financeiro.api.backend.dtos.revenues.CreateRevenueRequestDto;
import controle_financeiro.api.backend.dtos.revenues.RevenueResponseDto;
import controle_financeiro.api.backend.services.revenues.RevenueService;

@RestController
@RequestMapping("/api/revenues")
public class RevenueController {

    private final RevenueService service;

    public RevenueController(RevenueService service) {
        this.service = service;
    }

    @GetMapping
    public Page<RevenueResponseDto> list(Pageable pageable) {
        return service.findAll(pageable);
    }

    @GetMapping("/{id}")
    public RevenueResponseDto get(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<RevenueResponseDto> create(@Valid @RequestBody CreateRevenueRequestDto dto) {
        RevenueResponseDto created = service.create(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(created.getId()).toUri();
        return ResponseEntity.created(uri).body(created);
    }

    @PutMapping("/{id}")
    public RevenueResponseDto update(@PathVariable Long id, @Valid @RequestBody CreateRevenueRequestDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
