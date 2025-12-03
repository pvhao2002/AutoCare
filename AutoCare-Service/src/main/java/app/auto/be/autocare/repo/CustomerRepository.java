package app.auto.be.autocare.repo;

import app.auto.be.autocare.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
