package app.auto.be.autocare.repo;

import app.auto.be.autocare.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    Optional<Vehicle> findByLicensePlate(String licensePlate);

    List<Vehicle> findByOwnerId(Long customerId);

    Optional<Vehicle> findByVin(String vin);
}
