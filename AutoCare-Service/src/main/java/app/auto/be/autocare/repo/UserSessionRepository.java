package app.auto.be.autocare.repo;

import app.auto.be.autocare.entity.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserSessionRepository extends JpaRepository<UserSession, String> {
    List<UserSession> findByUserId(Long userId);

    void deleteByUserId(Long userId);

    List<UserSession> findByActiveTrue();
}

