package controle_financeiro.api.backend.services.expenses;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import controle_financeiro.api.backend.dtos.expenses.CreateExpenseRequestDto;
import controle_financeiro.api.backend.dtos.expenses.ExpenseResponseDto;

public interface ExpenseService {

    Page<ExpenseResponseDto> findAll(Pageable pageable);

    ExpenseResponseDto findById(Long id);

    ExpenseResponseDto create(CreateExpenseRequestDto dto);

    ExpenseResponseDto update(Long id, CreateExpenseRequestDto dto);

    ExpenseResponseDto togglePaid(Long id);

    void delete(Long id);

}
