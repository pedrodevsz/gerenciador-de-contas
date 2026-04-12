package controle_financeiro.api.backend.mappers;

import controle_financeiro.api.backend.dtos.revenues.CreateRevenueRequestDto;
import controle_financeiro.api.backend.dtos.revenues.RevenueResponseDto;
import controle_financeiro.api.backend.entities.revenues.Revenue;

public final class RevenueMapper {

    private RevenueMapper() {
    }

    public static RevenueResponseDto toDto(Revenue r) {
        if (r == null)
            return null;
        return RevenueResponseDto.builder()
                .id(r.getId())
                .name(r.getName())
                .value(r.getValue())
                .dueDate(r.getDueDate())
                .type(r.getType())
                .createdAt(r.getCreatedAt())
                .updatedAt(r.getUpdatedAt())
                .build();
    }

    public static Revenue toEntity(CreateRevenueRequestDto dto) {
        if (dto == null)
            return null;
        return Revenue.builder()
                .name(dto.getName())
                .value(dto.getValue())
                .dueDate(dto.getDueDate())
                .type(dto.getType())
                .build();
    }

    public static void updateEntityFromDto(CreateRevenueRequestDto dto, Revenue entity) {
        if (dto == null || entity == null)
            return;
        entity.setName(dto.getName());
        entity.setValue(dto.getValue());
        entity.setDueDate(dto.getDueDate());
        entity.setType(dto.getType());
    }
}
