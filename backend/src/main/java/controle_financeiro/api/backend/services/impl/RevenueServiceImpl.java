package controle_financeiro.api.backend.services.impl;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import controle_financeiro.api.backend.dtos.revenues.CreateRevenueRequestDto;
import controle_financeiro.api.backend.dtos.revenues.RevenueResponseDto;
import controle_financeiro.api.backend.entities.revenues.Revenue;
import controle_financeiro.api.backend.mappers.RevenueMapper;
import controle_financeiro.api.backend.repository.revenues.RevenueRepository;
import controle_financeiro.api.backend.services.revenues.RevenueService;

@Service
public class RevenueServiceImpl implements RevenueService {

    private final RevenueRepository repository;

    public RevenueServiceImpl(RevenueRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<RevenueResponseDto> findAll(Pageable pageable) {
        return repository.findAll(pageable).map(RevenueMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public RevenueResponseDto findById(Long id) {
        return repository.findById(id).map(RevenueMapper::toDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Revenue not found"));
    }

    @Override
    @Transactional
    public RevenueResponseDto create(CreateRevenueRequestDto dto) {
        Revenue entity = RevenueMapper.toEntity(dto);
        Revenue saved = repository.save(entity);
        return RevenueMapper.toDto(saved);
    }

    @Override
    @Transactional
    public RevenueResponseDto update(Long id, CreateRevenueRequestDto dto) {
        Optional<Revenue> opt = repository.findById(id);
        Revenue existing = opt
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Revenue not found"));
        RevenueMapper.updateEntityFromDto(dto, existing);
        Revenue updated = repository.save(existing);
        return RevenueMapper.toDto(updated);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Revenue not found");
        }
        repository.deleteById(id);
    }
}
