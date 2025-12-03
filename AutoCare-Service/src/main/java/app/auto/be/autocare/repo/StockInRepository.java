package app.auto.be.autocare.repo;

import app.auto.be.autocare.entity.StockIn;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockInRepository extends JpaRepository<StockIn, Long> {

    List<StockIn> findByCreatedById(Long userId);

    List<StockIn> findByStatus(String status);
}
