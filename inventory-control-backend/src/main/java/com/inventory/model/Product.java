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
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "products")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Product code is required")
    @Column(nullable = false, unique = true)
    private String code;

    @NotBlank(message = "Product name is required")
    @Column(nullable = false)
    private String name;
    
    @NotNull(message = "Product value is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Product value must be greater than zero")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal value;
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<ProductRawMaterial> productRawMaterials = new HashSet<>();
    
    public Product() {}
    
    public Product(String code, String name, BigDecimal value) {
        this.code = code;
        this.name = name;
        this.value = value;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public BigDecimal getValue() {
        return value;
    }
    
    public void setValue(BigDecimal value) {
        this.value = value;
    }
    
    public Set<ProductRawMaterial> getProductRawMaterials() {
        return productRawMaterials;
    }
    
    public void setProductRawMaterials(Set<ProductRawMaterial> productRawMaterials) {
        this.productRawMaterials = productRawMaterials;
    }
    
    public void addRawMaterial(RawMaterial rawMaterial, Integer quantity) {
        ProductRawMaterial productRawMaterial = new ProductRawMaterial(this, rawMaterial, quantity);
        if (productRawMaterials.add(productRawMaterial)) {
            rawMaterial.getProductRawMaterials().add(productRawMaterial);
        }
    }
    
    public void removeRawMaterial(RawMaterial rawMaterial) {
        productRawMaterials.removeIf(prm -> prm.getRawMaterial().equals(rawMaterial));
        rawMaterial.getProductRawMaterials().removeIf(prm -> prm.getProduct().equals(this));
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return id != null && id.equals(product.id);
    }

    @Override
    public int hashCode() {
        return 31;
    }
    
    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", value=" + value +
                '}';
    }
}
