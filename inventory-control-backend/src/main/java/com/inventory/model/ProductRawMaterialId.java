package com.inventory.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ProductRawMaterialId implements Serializable {
    
    @Column(name = "product_id")
    private Long productId;
    
    @Column(name = "raw_material_id")
    private Long rawMaterialId;
    
    public ProductRawMaterialId() {}
    
    public ProductRawMaterialId(Long productId, Long rawMaterialId) {
        this.productId = productId;
        this.rawMaterialId = rawMaterialId;
    }
    
    // Getters and Setters
    public Long getProductId() {
        return productId;
    }
    
    public void setProductId(Long productId) {
        this.productId = productId;
    }
    
    public Long getRawMaterialId() {
        return rawMaterialId;
    }
    
    public void setRawMaterialId(Long rawMaterialId) {
        this.rawMaterialId = rawMaterialId;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProductRawMaterialId)) return false;
        ProductRawMaterialId that = (ProductRawMaterialId) o;
        return Objects.equals(getProductId(), that.getProductId()) &&
                Objects.equals(getRawMaterialId(), that.getRawMaterialId());
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(getProductId(), getRawMaterialId());
    }
    
    @Override
    public String toString() {
        return "ProductRawMaterialId{" +
                "productId=" + productId +
                ", rawMaterialId=" + rawMaterialId +
                '}';
    }
}
