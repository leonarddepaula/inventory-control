package com.inventory.controller;

import com.inventory.dto.RawMaterialDTO;
import com.inventory.service.RawMaterialService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/raw-materials")
@CrossOrigin(origins = "*")
public class RawMaterialController {

    @Autowired
    private RawMaterialService rawMaterialService;

    @GetMapping
    public ResponseEntity<List<RawMaterialDTO>> getAllRawMaterials() {
        List<RawMaterialDTO> rawMaterials = rawMaterialService.getAllRawMaterials();
        return ResponseEntity.ok(rawMaterials);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RawMaterialDTO> getRawMaterialById(@PathVariable Long id) {
        Optional<RawMaterialDTO> rawMaterial = rawMaterialService.getRawMaterialById(id);
        return rawMaterial.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<RawMaterialDTO>> searchRawMaterials(@RequestParam String name) {
        List<RawMaterialDTO> rawMaterials = rawMaterialService.searchRawMaterialsByName(name);
        return ResponseEntity.ok(rawMaterials);
    }

    @GetMapping("/with-stock")
    public ResponseEntity<List<RawMaterialDTO>> getRawMaterialsWithStock() {
        List<RawMaterialDTO> rawMaterials = rawMaterialService.getRawMaterialsWithStock();
        return ResponseEntity.ok(rawMaterials);
    }

    @GetMapping("/out-of-stock")
    public ResponseEntity<List<RawMaterialDTO>> getRawMaterialsOutOfStock() {
        List<RawMaterialDTO> rawMaterials = rawMaterialService.getRawMaterialsOutOfStock();
        return ResponseEntity.ok(rawMaterials);
    }

    @PostMapping
    public ResponseEntity<RawMaterialDTO> createRawMaterial(@Valid @RequestBody RawMaterialDTO rawMaterialDTO) {
        try {
            RawMaterialDTO createdRawMaterial = rawMaterialService.createRawMaterial(rawMaterialDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdRawMaterial);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<RawMaterialDTO> updateRawMaterial(@PathVariable Long id, 
                                                           @Valid @RequestBody RawMaterialDTO rawMaterialDTO) {
        try {
            Optional<RawMaterialDTO> updatedRawMaterial = rawMaterialService.updateRawMaterial(id, rawMaterialDTO);
            return updatedRawMaterial.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PatchMapping("/{id}/stock")
    public ResponseEntity<RawMaterialDTO> updateStockQuantity(@PathVariable Long id, 
                                                             @RequestParam Integer stockQuantity) {
        try {
            Optional<RawMaterialDTO> updatedRawMaterial = rawMaterialService.updateStockQuantity(id, stockQuantity);
            return updatedRawMaterial.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRawMaterial(@PathVariable Long id) {
        boolean deleted = rawMaterialService.deleteRawMaterial(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
