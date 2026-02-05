-- Database initialization script for Inventory Control System

-- Create tables (handled by Hibernate DDL, but included here for reference)

-- Insert sample raw materials
INSERT INTO raw_materials (code, name, stock_quantity) VALUES
('MAT-001', 'Steel', 1000),
('MAT-002', 'Plastic', 500),
('MAT-003', 'Rubber', 300),
('MAT-004', 'Glass', 200),
('MAT-005', 'Aluminum', 150),
('MAT-006', 'Cotton', 800),
('MAT-007', 'Wood', 600),
('MAT-008', 'Copper', 100);

-- Insert sample products
INSERT INTO products (code, name, value) VALUES
('PROD-001', 'Car Wheel', 250.00),
('PROD-002', 'Smartphone Case', 15.50),
('PROD-003', 'Office Chair', 180.00),
('PROD-004', 'Water Bottle', 12.00),
('PROD-005', 'Laptop Stand', 45.00);

-- Insert product-raw material associations
-- Car Wheel: Steel (5kg), Rubber (2kg), Aluminum (1kg)
INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) VALUES
(1, 1, 5), -- Steel
(1, 3, 2), -- Rubber  
(1, 5, 1); -- Aluminum

-- Smartphone Case: Plastic (100g), Rubber (50g)
INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) VALUES
(2, 2, 100), -- Plastic
(2, 3, 50);  -- Rubber

-- Office Chair: Steel (10kg), Cotton (2m), Plastic (1kg)
INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) VALUES
(3, 1, 10), -- Steel
(3, 6, 2),  -- Cotton
(3, 2, 1);  -- Plastic

-- Water Bottle: Plastic (200g), Aluminum (50g)
INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) VALUES
(4, 2, 200), -- Plastic
(4, 5, 50);  -- Aluminum

-- Laptop Stand: Aluminum (3kg), Rubber (100g)
INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) VALUES
(5, 5, 3),   -- Aluminum
(5, 3, 100); -- Rubber
