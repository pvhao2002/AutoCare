package app.auto.be.autocare.controller;

import app.auto.be.autocare.dto.ApiResponse;
import app.auto.be.autocare.dto.branches.UpsertBranches;
import app.auto.be.autocare.entity.Branch;
import app.auto.be.autocare.repo.BranchRepository;
import app.auto.be.autocare.util.CommonUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("branches")
@RequiredArgsConstructor
public class BranchController {
    private final BranchRepository branchRepository;

    @GetMapping
    public Object getBranches() {
        return ApiResponse.success(branchRepository.findAllByActiveTrue());
    }

    @PostMapping
    @Transactional
    public Object upsertBranches(@RequestBody UpsertBranches branch) {
        Optional.ofNullable(branch.getId()).ifPresentOrElse(id -> {
            var existingBranch = branchRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Branch not found with id: " + id));
            existingBranch.setBranchName(branch.getName());
            existingBranch.setAddress(branch.getAddress());
            existingBranch.setBranchCode(CommonUtils.defaultIfBlank(existingBranch.getBranchCode(), CommonUtils.generateBranchCode(branch.getName())));
            branchRepository.save(existingBranch);
        }, () -> {
            var returnBranch = branchRepository.save(Branch.builder().branchName(branch.getName()).address(branch.getAddress()).build());
            returnBranch.setBranchCode(CommonUtils.generateBranchCode(branch.getName()));
            branchRepository.save(returnBranch);
        });
        return ApiResponse.success("Branch upserted successfully");
    }

    @DeleteMapping("{id}")
    @Transactional
    public Object deleteBranch(@PathVariable Long id) {
        branchRepository.findById(id).ifPresentOrElse(
                (branch) -> {
                    branch.setActive(false);
                    branchRepository.save(branch);
                },
                () -> {
                    throw new IllegalArgumentException("Branch not found with id: " + id);
                }
        );
        return ApiResponse.success("Branch deleted successfully");
    }
}
