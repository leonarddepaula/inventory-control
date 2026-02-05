package com.inventory.repository;

import com.inventory.model.RawMaterial;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RawMaterialRepository extends JpaRepository<RawMaterial, Long> {
    
    List<RawMaterial> findByNameContainingIgnoreCase(String name);
    
    List<RawMaterial> findByStockQuantityGreaterThan(Integer quantity);
    
    List<RawMaterial> findByStockQuantityEquals(Integer quantity);
}
