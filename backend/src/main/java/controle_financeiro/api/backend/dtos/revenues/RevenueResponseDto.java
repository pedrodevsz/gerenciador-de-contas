package controle_financeiro.api.backend.dtos.revenues;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import controle_financeiro.api.backend.entities.revenues.RevenueType;
import lombok.*;

@Getter
@AllArgsConstructor
@Builder
public class RevenueResponseDto {
    private Long id;
    private String name;
    private BigDecimal value;
    private LocalDate dueDate;
    private RevenueType type;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
