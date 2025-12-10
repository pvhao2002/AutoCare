package app.auto.be.autocare.entity.model;

import app.auto.be.autocare.entity.Branch;
import app.auto.be.autocare.entity.Employee;
import app.auto.be.autocare.entity.RoleName;
import app.auto.be.autocare.entity.User;
import app.auto.be.autocare.entity.projection.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * DTO for {@link app.auto.be.autocare.entity.Employee}
 */
@AllArgsConstructor
@Getter
public class RawEmployee implements Serializable {
    private Long id;
    private RawEmployeeBranch branch;
    private BigDecimal salary;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String updatedBy;
    @Setter
    private RawEmployeeUser user;
    private String gender;
    private Integer age;
    private String phone;
    private String address;

    public RawEmployee(Employee employee, UserInfo userInfo) {
        if (employee != null) {
            this.id = employee.getId();
            this.gender = employee.getGender();
            this.age = employee.getAge();
            this.phone = employee.getPhone();
            this.address = employee.getAddress();

            this.salary = employee.getSalary();
            this.createdAt = employee.getCreatedAt();
            this.updatedAt = employee.getUpdatedAt();
            this.updatedBy = employee.getUpdatedBy();
        }
        this.branch = new RawEmployeeBranch(
                userInfo.getBranch().getId(),
                userInfo.getBranch().getBranchName(),
                userInfo.getBranch().getBranchCode()
        );
        this.user = new RawEmployeeUser(
                userInfo.getId(),
                userInfo.getUsername(),
                userInfo.getFullName(),
                userInfo.getEmail(),
                userInfo.getRole()
        );
    }

    /**
     * DTO for {@link Branch}
     */
    public record RawEmployeeBranch(Long id, String branchName, String branchCode) implements Serializable {
    }

    /**
     * DTO for {@link User}
     */
    public record RawEmployeeUser(Long id, String username, String fullName, String email,
                                  RoleName role) implements Serializable {
    }
}
