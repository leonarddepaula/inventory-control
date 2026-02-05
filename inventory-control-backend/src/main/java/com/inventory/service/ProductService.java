package com.inventory.service;

import com.inventory.dto.ProductDTO;
import com.inventory.dto.ProductRawMaterialDTO;
import com.inventory.dto.ProductionSuggestionDTO;
import com.inventory.model.Product;
import com.inventory.model.ProductRawMaterial;
import com.inventory.model.ProductRawMaterialId;
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
        Product product = new Product(productDTO.getCode(), productDTO.getName(), productDTO.getValue());
        Product savedProduct = productRepository.save(product);
        
        // Save raw materials associations after product is saved (has ID)
        if (productDTO.getRawMaterials() != null && !productDTO.getRawMaterials().isEmpty()) {
            for (ProductRawMaterialDTO dto : productDTO.getRawMaterials()) {
                if (dto.getRawMaterialId() != null) {
                    Optional<RawMaterial> rawMaterialOpt = rawMaterialRepository.findById(dto.getRawMaterialId());
                    if (rawMaterialOpt.isPresent()) {
                        ProductRawMaterial prm = new ProductRawMaterial();
                        prm.setProduct(savedProduct);
                        prm.setRawMaterial(rawMaterialOpt.get());
                        prm.setQuantity(dto.getQuantity());
                        prm.setId(new ProductRawMaterialId(savedProduct.getId(), rawMaterialOpt.get().getId()));
                        savedProduct.getProductRawMaterials().add(prm);
                    }
                }
            }
            savedProduct = productRepository.save(savedProduct);
        }
        
        return convertToDTO(savedProduct);
    }

    public Optional<ProductDTO> updateProduct(Long id, ProductDTO productDTO) {
        return productRepository.findById(id)
                .map(existingProduct -> {
                    existingProduct.setCode(productDTO.getCode());
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

        // Create a virtual stock map to track available quantities
        Map<Long, Integer> virtualStock = new HashMap<>();
        for (Product product : producibleProducts) {
            for (ProductRawMaterial prm : product.getProductRawMaterials()) {
                RawMaterial rm = prm.getRawMaterial();
                virtualStock.putIfAbsent(rm.getId(), rm.getStockQuantity());
            }
        }

        // Sort products by value (descending) to prioritize higher value products
        List<Product> sortedProducts = new ArrayList<>(producibleProducts);
        sortedProducts.sort((a, b) -> b.getValue().compareTo(a.getValue()));

        // Calculate max quantity for each product considering shared raw materials
        for (Product product : sortedProducts) {
            Integer maxQuantity = calculateMaxQuantityWithVirtualStock(product, virtualStock);
            if (maxQuantity > 0) {
                // Deduct from virtual stock
                for (ProductRawMaterial prm : product.getProductRawMaterials()) {
                    Long rmId = prm.getRawMaterial().getId();
                    int currentStock = virtualStock.get(rmId);
                    int consumed = prm.getQuantity() * maxQuantity;
                    virtualStock.put(rmId, currentStock - consumed);
                }

                BigDecimal totalValue = product.getValue().multiply(BigDecimal.valueOf(maxQuantity));
                suggestions.add(new ProductionSuggestionDTO(
                        product.getId(),
                        product.getCode(),
                        product.getName(),
                        product.getValue(),
                        maxQuantity,
                        totalValue
                ));
            }
        }

        // Sort final suggestions by total value (descending) for display
        suggestions.sort((a, b) -> b.getTotalValue().compareTo(a.getTotalValue()));

        return suggestions;
    }

    private Integer calculateMaxQuantityWithVirtualStock(Product product, Map<Long, Integer> virtualStock) {
        Integer minQuantity = Integer.MAX_VALUE;
        
        for (ProductRawMaterial prm : product.getProductRawMaterials()) {
            Long rmId = prm.getRawMaterial().getId();
            Integer availableQuantity = virtualStock.getOrDefault(rmId, 0);
            Integer requiredQuantity = prm.getQuantity();
            
            if (requiredQuantity <= 0) continue;

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
        // Filter out null rawMaterialIds
        List<ProductRawMaterialDTO> validDTOs = rawMaterialDTOs.stream()
                .filter(dto -> dto.getRawMaterialId() != null)
                .collect(Collectors.toList());

        // Create a map of new raw materials for easy lookup
        Map<Long, ProductRawMaterialDTO> dtoMap = validDTOs.stream()
                .collect(Collectors.toMap(ProductRawMaterialDTO::getRawMaterialId, dto -> dto, (a, b) -> a));

        // Use an iterator to safely remove items while iterating
        Iterator<ProductRawMaterial> iterator = product.getProductRawMaterials().iterator();
        while (iterator.hasNext()) {
            ProductRawMaterial existingPrm = iterator.next();
            Long rawMaterialId = existingPrm.getRawMaterial().getId();
            if (!dtoMap.containsKey(rawMaterialId)) {
                // Remove associations that are not in the new list
                iterator.remove();
            } else {
                // Update existing associations
                existingPrm.setQuantity(dtoMap.get(rawMaterialId).getQuantity());
                dtoMap.remove(rawMaterialId); // Remove from map to track processed items
            }
        }

        // Add new associations for items remaining in the map
        for (ProductRawMaterialDTO dto : dtoMap.values()) {
            rawMaterialRepository.findById(dto.getRawMaterialId()).ifPresent(rawMaterial -> {
                ProductRawMaterial prm = new ProductRawMaterial();
                prm.setProduct(product);
                prm.setRawMaterial(rawMaterial);
                prm.setQuantity(dto.getQuantity());
                prm.setId(new ProductRawMaterialId(product.getId(), rawMaterial.getId()));
                product.getProductRawMaterials().add(prm);
            });
        }
    }

    public void produceProduct(Long productId, Integer quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be positive");
        }

        for (ProductRawMaterial prm : product.getProductRawMaterials()) {
            RawMaterial rawMaterial = prm.getRawMaterial();
            int requiredQuantity = prm.getQuantity() * quantity;

            if (rawMaterial.getStockQuantity() < requiredQuantity) {
                throw new RuntimeException("Not enough stock for " + rawMaterial.getName());
            }

            rawMaterial.setStockQuantity(rawMaterial.getStockQuantity() - requiredQuantity);
            rawMaterialRepository.save(rawMaterial);
        }
    }

    private ProductDTO convertToDTO(Product product) {
        ProductDTO dto = new ProductDTO(product.getId(), product.getCode(), product.getName(), product.getValue());

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
        Product product = new Product(dto.getCode(), dto.getName(), dto.getValue());
        if (dto.getId() != null) {
            product.setId(dto.getId());
        }
        return product;
    }
}
