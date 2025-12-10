package app.auto.be.autocare.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("materials")
@RequiredArgsConstructor
public class MaterialController {
    @GetMapping
    public Object getAllMaterials() {
        return "List of materials";
    }

    @PostMapping
    public Object addMaterial(@RequestBody Object material) {
        return "Material added";
    }

    @PatchMapping("{id}")
    public Object updateMaterial(@PathVariable Long id, @RequestBody Object material) {
        return "Material " + id + " updated";
    }

    @DeleteMapping("{id}")
    public Object deleteMaterial(@PathVariable Long id) {
        return "Material " + id + " deleted";
    }
}
