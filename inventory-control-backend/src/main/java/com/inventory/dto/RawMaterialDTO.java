package com.inventory.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class RawMaterialDTO {
    
    private Long id;
    
    @NotBlank(message = "Raw material name is required")
    private String name;
    
    @NotNull(message = "Stock quantity is required")
    @Min(value = 0, message = "Stock quantity must be non-negative")
    private Integer stockQuantity;
    
    public RawMaterialDTO() {}
    
    public RawMaterialDTO(String name, Integer stockQuantity) {
        this.name = name;
        this.stockQuantity = stockQuantity;
    }
    
    public RawMaterialDTO(Long id, String name, Integer stockQuantity) {
        this.id = id;
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
    
    @Override
    public String toString() {
        return "RawMaterialDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", stockQuantity=" + stockQuantity +
                '}';
    }
}
