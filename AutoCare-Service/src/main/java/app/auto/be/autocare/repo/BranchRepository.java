package app.auto.be.autocare.repo;

import app.auto.be.autocare.entity.Branch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BranchRepository extends JpaRepository<Branch, Long> {
    List<Branch> findAllByActiveTrue();
}
