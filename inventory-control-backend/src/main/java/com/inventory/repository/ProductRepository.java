package com.inventory.repository;

import com.inventory.model.Product;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    List<Product> findByNameContainingIgnoreCase(String name);
    
    @Query("SELECT p FROM Product p JOIN p.productRawMaterials prm WHERE prm.rawMaterial.id = :rawMaterialId")
    List<Product> findByRawMaterialId(Long rawMaterialId);
    
    @Query(value = "SELECT DISTINCT p.* FROM products p " +
            "JOIN product_raw_materials prm ON p.id = prm.product_id " +
            "JOIN raw_materials rm ON prm.raw_material_id = rm.id " +
            "GROUP BY p.id " +
            "HAVING COUNT(CASE WHEN rm.stock_quantity >= prm.quantity THEN 1 END) = COUNT(prm.raw_material_id)",
            nativeQuery = true)
    List<Product> findProductsThatCanBeProduced();
}
