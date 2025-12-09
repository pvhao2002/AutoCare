package app.auto.be.autocare.repo;

import app.auto.be.autocare.entity.RoleName;
import app.auto.be.autocare.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsernameOrEmail(String username, String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    List<User> findByRole(RoleName role);

    List<User> findByBranchId(Long branchId);
}

