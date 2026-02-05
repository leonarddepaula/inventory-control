package com.inventory.service;

import com.inventory.dto.RawMaterialDTO;
import com.inventory.model.RawMaterial;
import com.inventory.repository.RawMaterialRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class RawMaterialService {

    @Autowired
    private RawMaterialRepository rawMaterialRepository;

    public List<RawMaterialDTO> getAllRawMaterials() {
        return rawMaterialRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<RawMaterialDTO> getRawMaterialById(Long id) {
        return rawMaterialRepository.findById(id)
                .map(this::convertToDTO);
    }

    public List<RawMaterialDTO> searchRawMaterialsByName(String name) {
        return rawMaterialRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<RawMaterialDTO> getRawMaterialsWithStock() {
        return rawMaterialRepository.findByStockQuantityGreaterThan(0)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<RawMaterialDTO> getRawMaterialsOutOfStock() {
        return rawMaterialRepository.findByStockQuantityEquals(0)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public RawMaterialDTO createRawMaterial(RawMaterialDTO rawMaterialDTO) {
        RawMaterial rawMaterial = convertToEntity(rawMaterialDTO);
        RawMaterial savedRawMaterial = rawMaterialRepository.save(rawMaterial);
        return convertToDTO(savedRawMaterial);
    }

    public Optional<RawMaterialDTO> updateRawMaterial(Long id, RawMaterialDTO rawMaterialDTO) {
        return rawMaterialRepository.findById(id)
                .map(existingRawMaterial -> {
                    existingRawMaterial.setCode(rawMaterialDTO.getCode());
                    existingRawMaterial.setName(rawMaterialDTO.getName());
                    existingRawMaterial.setStockQuantity(rawMaterialDTO.getStockQuantity());
                    RawMaterial savedRawMaterial = rawMaterialRepository.save(existingRawMaterial);
                    return convertToDTO(savedRawMaterial);
                });
    }

    public Optional<RawMaterialDTO> updateStockQuantity(Long id, Integer newStockQuantity) {
        return rawMaterialRepository.findById(id)
                .map(rawMaterial -> {
                    rawMaterial.setStockQuantity(newStockQuantity);
                    RawMaterial savedRawMaterial = rawMaterialRepository.save(rawMaterial);
                    return convertToDTO(savedRawMaterial);
                });
    }

    public boolean deleteRawMaterial(Long id) {
        if (rawMaterialRepository.existsById(id)) {
            rawMaterialRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private RawMaterialDTO convertToDTO(RawMaterial rawMaterial) {
        return new RawMaterialDTO(
                rawMaterial.getId(),
                rawMaterial.getCode(),
                rawMaterial.getName(),
                rawMaterial.getStockQuantity()
        );
    }

    private RawMaterial convertToEntity(RawMaterialDTO dto) {
        RawMaterial rawMaterial = new RawMaterial(dto.getCode(), dto.getName(), dto.getStockQuantity());
        if (dto.getId() != null) {
            rawMaterial.setId(dto.getId());
        }
        return rawMaterial;
    }
}
