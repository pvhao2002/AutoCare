package app.auto.be.autocare.controller;

import app.auto.be.autocare.dto.ApiResponse;
import app.auto.be.autocare.dto.StandardApiResponse;
import app.auto.be.autocare.dto.branches.UpsertBranches;
import app.auto.be.autocare.entity.Branch;
import app.auto.be.autocare.exception.ResourceNotFoundException;
import app.auto.be.autocare.repo.BranchRepository;
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
        return ApiResponse.success(branchRepository.findAll());
    }

    @PostMapping
    @Transactional
    public Object upsertBranches(@RequestBody UpsertBranches branch) {
        Optional.ofNullable(branch.getId()).ifPresentOrElse(id -> {
            var existingBranch = branchRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Branch not found with id: " + id));
            existingBranch.setBranchName(branch.getName());
            existingBranch.setAddress(branch.getAddress());
            branchRepository.save(existingBranch);
        }, () -> {
            branchRepository.save(Branch.builder().branchName(branch.getName()).address(branch.getAddress()).build());
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
                    throw new ResourceNotFoundException("Branch not found with id: " + id);
                }
        );
        return ApiResponse.success("Branch deleted successfully");
    }
}
