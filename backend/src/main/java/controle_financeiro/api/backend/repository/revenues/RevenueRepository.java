package controle_financeiro.api.backend.repository.revenues;

import org.springframework.data.jpa.repository.JpaRepository;

import controle_financeiro.api.backend.entities.revenues.Revenue;

public interface RevenueRepository extends JpaRepository<Revenue, Long> {

}
