package com.inventory.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class ProductRawMaterialDTO {
    
    private Long productId;
    private String productName;
    
    private Long rawMaterialId;
    private String rawMaterialName;
    
    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;
    
    public ProductRawMaterialDTO() {}
    
    public ProductRawMaterialDTO(Long productId, String productName, Long rawMaterialId, String rawMaterialName, Integer quantity) {
        this.productId = productId;
        this.productName = productName;
        this.rawMaterialId = rawMaterialId;
        this.rawMaterialName = rawMaterialName;
        this.quantity = quantity;
    }
    
    // Getters and Setters
    public Long getProductId() {
        return productId;
    }
    
    public void setProductId(Long productId) {
        this.productId = productId;
    }
    
    public String getProductName() {
        return productName;
    }
    
    public void setProductName(String productName) {
        this.productName = productName;
    }
    
    public Long getRawMaterialId() {
        return rawMaterialId;
    }
    
    public void setRawMaterialId(Long rawMaterialId) {
        this.rawMaterialId = rawMaterialId;
    }
    
    public String getRawMaterialName() {
        return rawMaterialName;
    }
    
    public void setRawMaterialName(String rawMaterialName) {
        this.rawMaterialName = rawMaterialName;
    }
    
    public Integer getQuantity() {
        return quantity;
    }
    
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    
    @Override
    public String toString() {
        return "ProductRawMaterialDTO{" +
                "productId=" + productId +
                ", productName='" + productName + '\'' +
                ", rawMaterialId=" + rawMaterialId +
                ", rawMaterialName='" + rawMaterialName + '\'' +
                ", quantity=" + quantity +
                '}';
    }
}
