package app.auto.be.autocare.repo;

import app.auto.be.autocare.entity.DigitalSignature;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DigitalSignatureRepository extends JpaRepository<DigitalSignature, Long> {

    List<DigitalSignature> findByUserId(Long userId);
}
