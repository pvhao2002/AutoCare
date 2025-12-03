package app.auto.be.autocare.repo;

import app.auto.be.autocare.entity.StockOut;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockOutRepository extends JpaRepository<StockOut, Long> {

    List<StockOut> findByCreatedById(Long userId);

    List<StockOut> findByStatus(String status);
}

