package app.auto.be.autocare.dto.branches;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpsertBranches {
    private Long id;
    private String name;
    private String address;
}
