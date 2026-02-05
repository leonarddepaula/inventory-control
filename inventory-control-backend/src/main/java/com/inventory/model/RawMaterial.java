package com.inventory.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "raw_materials")
public class RawMaterial {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Raw material name is required")
    @Column(nullable = false)
    private String name;
    
    @NotNull(message = "Stock quantity is required")
    @Min(value = 0, message = "Stock quantity must be non-negative")
    @Column(nullable = false)
    private Integer stockQuantity;
    
    @OneToMany(mappedBy = "rawMaterial", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<ProductRawMaterial> productRawMaterials = new HashSet<>();
    
    public RawMaterial() {}
    
    public RawMaterial(String name, Integer stockQuantity) {
        this.name = name;
        this.stockQuantity = stockQuantity;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public Integer getStockQuantity() {
        return stockQuantity;
    }
    
    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }
    
    public Set<ProductRawMaterial> getProductRawMaterials() {
        return productRawMaterials;
    }
    
    public void setProductRawMaterials(Set<ProductRawMaterial> productRawMaterials) {
        this.productRawMaterials = productRawMaterials;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RawMaterial)) return false;
        RawMaterial rawMaterial = (RawMaterial) o;
        return getId() != null && getId().equals(rawMaterial.getId());
    }
    
    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
    
    @Override
    public String toString() {
        return "RawMaterial{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", stockQuantity=" + stockQuantity +
                '}';
    }
}
