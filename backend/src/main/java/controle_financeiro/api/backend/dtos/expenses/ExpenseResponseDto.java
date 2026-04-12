package controle_financeiro.api.backend.dtos.expenses;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import controle_financeiro.api.backend.entities.revenues.RevenueType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class ExpenseResponseDto {
    private Long id;
    private String name;
    private BigDecimal value;
    private LocalDate dueDate;
    private RevenueType type;
    private String category;
    private Boolean paid;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
