package com.inventory.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.List;

public class ProductDTO {
    
    private Long id;
    
    @NotBlank(message = "Product code is required")
    @Size(min = 1, max = 20, message = "Code must be between 1 and 20 characters")
    private String code;

    @NotBlank(message = "Product name is required")
    @Size(min = 1, max = 70, message = "Name must be between 1 and 70 characters")
    private String name;
    
    @NotNull(message = "Product value is required")
    @DecimalMin(value = "0.01", message = "Product value must be greater than zero")
    @DecimalMax(value = "99999999.99", message = "Product value must be less than 100 million")
    private BigDecimal value;
    
    private List<ProductRawMaterialDTO> rawMaterials;
    
    public ProductDTO() {}
    
    public ProductDTO(String code, String name, BigDecimal value) {
        this.code = code;
        this.name = name;
        this.value = value;
    }
    
    public ProductDTO(Long id, String code, String name, BigDecimal value) {
        this.id = id;
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
    
    public List<ProductRawMaterialDTO> getRawMaterials() {
        return rawMaterials;
    }
    
    public void setRawMaterials(List<ProductRawMaterialDTO> rawMaterials) {
        this.rawMaterials = rawMaterials;
    }
    
    @Override
    public String toString() {
        return "ProductDTO{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", name='" + name + '\'' +
                ", value=" + value +
                ", rawMaterials=" + rawMaterials +
                '}';
    }
}
