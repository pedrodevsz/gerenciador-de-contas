package controle_financeiro.api.backend.services.impl;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import controle_financeiro.api.backend.dtos.expenses.CreateExpenseRequestDto;
import controle_financeiro.api.backend.dtos.expenses.ExpenseResponseDto;
import controle_financeiro.api.backend.entities.expenses.Expense;
import controle_financeiro.api.backend.mappers.ExpenseMapper;
import controle_financeiro.api.backend.repository.expenses.ExpenseRepository;
import controle_financeiro.api.backend.services.expenses.ExpenseService;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository repository;

    public ExpenseServiceImpl(ExpenseRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ExpenseResponseDto> findAll(Pageable pageable) {
        return repository.findAll(pageable).map(ExpenseMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public ExpenseResponseDto findById(Long id) {
        return repository.findById(id)
                .map(ExpenseMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Expense not found"));
    }

    @Override
    @Transactional
    public ExpenseResponseDto create(CreateExpenseRequestDto dto) {
        Expense entity = ExpenseMapper.toEntity(dto);
        Expense saved = repository.save(entity);
        return ExpenseMapper.toDto(saved);
    }

    @Override
    @Transactional
    public ExpenseResponseDto update(Long id, CreateExpenseRequestDto dto) {
        Optional<Expense> opt = repository.findById(id);

        Expense existing = opt
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Expense not found"));

        ExpenseMapper.updateEntityFromDto(dto, existing);

        Expense updated = repository.save(existing);

        return ExpenseMapper.toDto(updated);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Expense not found");
        }
        repository.deleteById(id);
    }

    @Transactional
    public ExpenseResponseDto togglePaid(Long id) {
        Expense expense = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Expense not found"));

        expense.setPaid(!expense.getPaid());

        Expense updated = repository.save(expense);

        return ExpenseMapper.toDto(updated);
    }

}
