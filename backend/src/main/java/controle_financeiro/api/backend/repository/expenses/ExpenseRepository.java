package controle_financeiro.api.backend.repository.expenses;

import org.springframework.data.jpa.repository.JpaRepository;

import controle_financeiro.api.backend.entities.expenses.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

}
