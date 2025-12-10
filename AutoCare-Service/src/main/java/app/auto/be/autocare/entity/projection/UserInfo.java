package app.auto.be.autocare.entity.projection;

import app.auto.be.autocare.entity.RoleName;

/**
 * Projection for {@link app.auto.be.autocare.entity.User}
 */
public interface UserInfo {
    Long getId();

    String getUsername();

    String getFullName();

    String getEmail();

    RoleName getRole();

    UserBranchInfo getBranch();

    /**
     * Projection for {@link app.auto.be.autocare.entity.Branch}
     */
    interface UserBranchInfo {
        Long getId();

        String getBranchName();

        String getBranchCode();
    }
}
