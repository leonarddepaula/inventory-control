package com.inventory.dto;

import java.math.BigDecimal;

public class ProductionSuggestionDTO {
    
    private Long productId;
    private String productName;
    private BigDecimal productValue;
    private Integer maxQuantityThatCanBeProduced;
    private BigDecimal totalValue;
    
    public ProductionSuggestionDTO() {}
    
    public ProductionSuggestionDTO(Long productId, String productName, BigDecimal productValue, 
                                   Integer maxQuantityThatCanBeProduced, BigDecimal totalValue) {
        this.productId = productId;
        this.productName = productName;
        this.productValue = productValue;
        this.maxQuantityThatCanBeProduced = maxQuantityThatCanBeProduced;
        this.totalValue = totalValue;
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
    
    public BigDecimal getProductValue() {
        return productValue;
    }
    
    public void setProductValue(BigDecimal productValue) {
        this.productValue = productValue;
    }
    
    public Integer getMaxQuantityThatCanBeProduced() {
        return maxQuantityThatCanBeProduced;
    }
    
    public void setMaxQuantityThatCanBeProduced(Integer maxQuantityThatCanBeProduced) {
        this.maxQuantityThatCanBeProduced = maxQuantityThatCanBeProduced;
    }
    
    public BigDecimal getTotalValue() {
        return totalValue;
    }
    
    public void setTotalValue(BigDecimal totalValue) {
        this.totalValue = totalValue;
    }
    
    @Override
    public String toString() {
        return "ProductionSuggestionDTO{" +
                "productId=" + productId +
                ", productName='" + productName + '\'' +
                ", productValue=" + productValue +
                ", maxQuantityThatCanBeProduced=" + maxQuantityThatCanBeProduced +
                ", totalValue=" + totalValue +
                '}';
    }
}
