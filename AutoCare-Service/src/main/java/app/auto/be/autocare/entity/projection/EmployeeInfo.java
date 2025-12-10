package app.auto.be.autocare.entity.projection;

import app.auto.be.autocare.entity.RoleName;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Projection for {@link app.auto.be.autocare.entity.Employee}
 */
public interface EmployeeInfo {
    Long getId();

    LocalDateTime getCreatedAt();

    LocalDateTime getUpdatedAt();

    String getUpdatedBy();


    EmployeeUserInfo getUser();

    String getGender();

    Integer getAge();

    String getPhone();

    String getAddress();

    BigDecimal getSalary();

    /**
     * Projection for {@link app.auto.be.autocare.entity.User}
     */
    interface EmployeeUserInfo {
        Long getId();

        String getUsername();

        String getFullName();

        String getEmail();

        RoleName getRole();
    }
}
