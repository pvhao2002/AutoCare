package app.auto.be.autocare.repo;

import app.auto.be.autocare.device.TypeDevice;
import app.auto.be.autocare.entity.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserSessionRepository extends JpaRepository<UserSession, String> {
    List<UserSession> findByUserId(Long userId);

    void deleteByUserId(Long userId);

    List<UserSession> findByActiveTrue();

    Optional<UserSession> findByUserIdAndDeviceTypeAndActiveTrue(Long userId, TypeDevice deviceType);

    List<UserSession> findAllByUserIdAndDeviceTypeIn(Long userId, List<TypeDevice> deviceTypes);

    List<UserSession> findByUserIdAndActiveTrue(Long userId);
}

