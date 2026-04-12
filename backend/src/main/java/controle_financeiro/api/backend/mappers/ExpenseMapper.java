package controle_financeiro.api.backend.mappers;

import controle_financeiro.api.backend.dtos.expenses.CreateExpenseRequestDto;
import controle_financeiro.api.backend.dtos.expenses.ExpenseResponseDto;
import controle_financeiro.api.backend.entities.expenses.Expense;

public final class ExpenseMapper {

    private ExpenseMapper() {
    }

    public static ExpenseResponseDto toDto(Expense e) {
        if (e == null)
            return null;

        return ExpenseResponseDto.builder()
                .id(e.getId())
                .name(e.getName())
                .value(e.getValue())
                .dueDate(e.getDueDate())
                .type(e.getType())
                .category(e.getCategory())
                .paid(Boolean.TRUE.equals(e.getPaid()))
                .createdAt(e.getCreatedAt())
                .updatedAt(e.getUpdatedAt())
                .build();
    }

    public static Expense toEntity(CreateExpenseRequestDto dto) {
        if (dto == null)
            return null;

        return Expense.builder()
                .name(dto.getName())
                .value(dto.getValue())
                .dueDate(dto.getDueDate())
                .category(dto.getCategory())
                .type(dto.getType())
                .paid(dto.getPaid())
                .build();
    }

    public static void updateEntityFromDto(CreateExpenseRequestDto dto, Expense entity) {
        if (dto == null || entity == null)
            return;

        entity.setName(dto.getName());
        entity.setValue(dto.getValue());
        entity.setDueDate(dto.getDueDate());
        entity.setCategory(dto.getCategory());
        entity.setType(dto.getType());
        entity.setPaid(dto.getPaid());
    }

}
