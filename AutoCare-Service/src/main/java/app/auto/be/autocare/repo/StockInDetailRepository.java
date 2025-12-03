package app.auto.be.autocare.repo;

import app.auto.be.autocare.entity.StockInDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockInDetailRepository extends JpaRepository<StockInDetail, Long> {

    List<StockInDetail> findByStockInId(Long stockInId);

    List<StockInDetail> findByMaterialId(Long materialId);
}
