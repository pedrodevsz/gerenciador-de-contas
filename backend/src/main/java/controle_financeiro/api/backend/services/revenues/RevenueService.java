package controle_financeiro.api.backend.services.revenues;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import controle_financeiro.api.backend.dtos.revenues.CreateRevenueRequestDto;
import controle_financeiro.api.backend.dtos.revenues.RevenueResponseDto;

public interface RevenueService {

    Page<RevenueResponseDto> findAll(Pageable pageable);

    RevenueResponseDto findById(Long id);

    RevenueResponseDto create(CreateRevenueRequestDto dto);

    RevenueResponseDto update(Long id, CreateRevenueRequestDto dto);

    void delete(Long id);
}
