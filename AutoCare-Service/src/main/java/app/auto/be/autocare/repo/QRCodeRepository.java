package app.auto.be.autocare.repo;

import app.auto.be.autocare.entity.QRCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QRCodeRepository extends JpaRepository<QRCode, Long> {

    List<QRCode> findByObjectType(String objectType);

    QRCode findByObjectTypeAndObjectId(String objectType, Long objectId);
}
