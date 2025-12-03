package app.auto.be.autocare.repo;

import app.auto.be.autocare.entity.StockOutDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockOutDetailRepository extends JpaRepository<StockOutDetail, Long> {

    List<StockOutDetail> findByStockOutId(Long stockOutId);

    List<StockOutDetail> findByMaterialId(Long materialId);
}

