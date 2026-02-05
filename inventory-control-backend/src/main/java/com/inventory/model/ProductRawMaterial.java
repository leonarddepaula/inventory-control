package com.inventory.model;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "product_raw_materials")
public class ProductRawMaterial {
    
    @EmbeddedId
    private ProductRawMaterialId id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("rawMaterialId")
    @JoinColumn(name = "raw_material_id")
    private RawMaterial rawMaterial;
    
    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    @Column(nullable = false)
    private Integer quantity;
    
    public ProductRawMaterial() {}
    
    public ProductRawMaterial(Product product, RawMaterial rawMaterial, Integer quantity) {
        this.product = product;
        this.rawMaterial = rawMaterial;
        this.quantity = quantity;
        this.id = new ProductRawMaterialId(product.getId(), rawMaterial.getId());
    }
    
    // Getters and Setters
    public ProductRawMaterialId getId() {
        return id;
    }
    
    public void setId(ProductRawMaterialId id) {
        this.id = id;
    }
    
    public Product getProduct() {
        return product;
    }
    
    public void setProduct(Product product) {
        this.product = product;
    }
    
    public RawMaterial getRawMaterial() {
        return rawMaterial;
    }
    
    public void setRawMaterial(RawMaterial rawMaterial) {
        this.rawMaterial = rawMaterial;
    }
    
    public Integer getQuantity() {
        return quantity;
    }
    
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProductRawMaterial)) return false;
        ProductRawMaterial that = (ProductRawMaterial) o;
        return getId() != null && getId().equals(that.getId());
    }
    
    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
    
    @Override
    public String toString() {
        return "ProductRawMaterial{" +
                "product=" + (product != null ? product.getName() : "null") +
                ", rawMaterial=" + (rawMaterial != null ? rawMaterial.getName() : "null") +
                ", quantity=" + quantity +
                '}';
    }
}
