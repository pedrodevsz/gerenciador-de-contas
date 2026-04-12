package controle_financeiro.api.backend.dtos.revenues;

import java.math.BigDecimal;
import java.time.LocalDate;

import controle_financeiro.api.backend.entities.revenues.RevenueType;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@AllArgsConstructor
@Builder
public class CreateRevenueRequestDto {

    @NotBlank
    private String name;

    @NotNull
    @Positive
    private BigDecimal value;

    @NotNull
    private LocalDate dueDate;

    @NotNull
    private RevenueType type;
}
