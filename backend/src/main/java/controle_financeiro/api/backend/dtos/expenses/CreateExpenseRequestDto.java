package controle_financeiro.api.backend.dtos.expenses;

import java.math.BigDecimal;
import java.time.LocalDate;

import controle_financeiro.api.backend.entities.revenues.RevenueType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class CreateExpenseRequestDto {
    @NotBlank
    private String name;

    @NotNull
    @Positive
    private BigDecimal value;

    @NotNull
    private LocalDate dueDate;

    @NotNull
    private RevenueType type;

    @NotNull
    private String category;

    @NotNull
    private Boolean paid;

}
