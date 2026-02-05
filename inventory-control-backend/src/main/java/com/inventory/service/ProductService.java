package com.inventory.service;

import com.inventory.dto.ProductDTO;
import com.inventory.dto.ProductRawMaterialDTO;
import com.inventory.dto.ProductionSuggestionDTO;
import com.inventory.model.Product;
import com.inventory.model.ProductRawMaterial;
import com.inventory.model.RawMaterial;
import com.inventory.repository.ProductRawMaterialRepository;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.RawMaterialRepository;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductRawMaterialRepository productRawMaterialRepository;

    @Autowired
    private RawMaterialRepository rawMaterialRepository;

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<ProductDTO> getProductById(Long id) {
        return productRepository.findById(id)
                .map(this::convertToDTO);
    }

    public List<ProductDTO> searchProductsByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = convertToEntity(productDTO);
        Product savedProduct = productRepository.save(product);
        
        // Save raw materials associations
        if (productDTO.getRawMaterials() != null && !productDTO.getRawMaterials().isEmpty()) {
            saveProductRawMaterials(savedProduct, productDTO.getRawMaterials());
        }
        
        return convertToDTO(savedProduct);
    }

    public Optional<ProductDTO> updateProduct(Long id, ProductDTO productDTO) {
        return productRepository.findById(id)
                .map(existingProduct -> {
                    existingProduct.setName(productDTO.getName());
                    existingProduct.setValue(productDTO.getValue());
                    
                    // Update raw materials associations
                    if (productDTO.getRawMaterials() != null) {
                        updateProductRawMaterials(existingProduct, productDTO.getRawMaterials());
                    }
                    
                    Product savedProduct = productRepository.save(existingProduct);
                    return convertToDTO(savedProduct);
                });
    }

    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<ProductionSuggestionDTO> getProductionSuggestions() {
        List<Product> producibleProducts = productRepository.findProductsThatCanBeProduced();
        List<ProductionSuggestionDTO> suggestions = new ArrayList<>();

        for (Product product : producibleProducts) {
            Integer maxQuantity = calculateMaxQuantityThatCanBeProduced(product);
            if (maxQuantity > 0) {
                BigDecimal totalValue = product.getValue().multiply(BigDecimal.valueOf(maxQuantity));
                suggestions.add(new ProductionSuggestionDTO(
                        product.getId(),
                        product.getName(),
                        product.getValue(),
                        maxQuantity,
                        totalValue
                ));
            }
        }

        // Sort by product value (descending) - priorização por maior valor
        suggestions.sort((a, b) -> b.getProductValue().compareTo(a.getProductValue()));

        return suggestions;
    }

    private Integer calculateMaxQuantityThatCanBeProduced(Product product) {
        Integer minQuantity = Integer.MAX_VALUE;
        
        for (ProductRawMaterial prm : product.getProductRawMaterials()) {
            RawMaterial rawMaterial = prm.getRawMaterial();
            Integer availableQuantity = rawMaterial.getStockQuantity();
            Integer requiredQuantity = prm.getQuantity();
            
            Integer possibleQuantity = availableQuantity / requiredQuantity;
            minQuantity = Math.min(minQuantity, possibleQuantity);
        }
        
        return minQuantity == Integer.MAX_VALUE ? 0 : minQuantity;
    }

    private void saveProductRawMaterials(Product product, List<ProductRawMaterialDTO> rawMaterialDTOs) {
        for (ProductRawMaterialDTO dto : rawMaterialDTOs) {
            Optional<RawMaterial> rawMaterialOpt = rawMaterialRepository.findById(dto.getRawMaterialId());
            if (rawMaterialOpt.isPresent()) {
                product.addRawMaterial(rawMaterialOpt.get(), dto.getQuantity());
            }
        }
        productRepository.save(product);
    }

    private void updateProductRawMaterials(Product product, List<ProductRawMaterialDTO> rawMaterialDTOs) {
        // Clear existing associations
        product.getProductRawMaterials().clear();
        productRepository.save(product);
        
        // Add new associations
        saveProductRawMaterials(product, rawMaterialDTOs);
    }

    private ProductDTO convertToDTO(Product product) {
        ProductDTO dto = new ProductDTO(product.getId(), product.getName(), product.getValue());
        
        List<ProductRawMaterialDTO> rawMaterialDTOs = product.getProductRawMaterials()
                .stream()
                .map(prm -> new ProductRawMaterialDTO(
                        prm.getProduct().getId(),
                        prm.getProduct().getName(),
                        prm.getRawMaterial().getId(),
                        prm.getRawMaterial().getName(),
                        prm.getQuantity()
                ))
                .collect(Collectors.toList());
        
        dto.setRawMaterials(rawMaterialDTOs);
        return dto;
    }

    private Product convertToEntity(ProductDTO dto) {
        Product product = new Product(dto.getName(), dto.getValue());
        if (dto.getId() != null) {
            product.setId(dto.getId());
        }
        return product;
    }
}
