package com.inventory.repository;

import com.inventory.model.ProductRawMaterial;
import com.inventory.model.ProductRawMaterialId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductRawMaterialRepository extends JpaRepository<ProductRawMaterial, ProductRawMaterialId> {
    
    List<ProductRawMaterial> findByProductId(Long productId);
    
    List<ProductRawMaterial> findByRawMaterialId(Long rawMaterialId);
    
    @Query("SELECT prm FROM ProductRawMaterial prm WHERE prm.product.id = :productId AND prm.rawMaterial.id = :rawMaterialId")
    ProductRawMaterial findByProductIdAndRawMaterialId(Long productId, Long rawMaterialId);
    
    void deleteByProductId(Long productId);
}
