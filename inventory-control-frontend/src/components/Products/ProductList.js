import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Table,
  Form,
  InputGroup,
  Alert,
  Spinner,
  Badge,
} from "react-bootstrap";
import { toast } from "react-toastify";
import {
  fetchProducts,
  deleteProduct,
} from "../../features/products/productsSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filtro local instantâneo por código ou nome
  const filteredProducts = products.filter((product) => {
    if (!searchTerm.trim()) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      product.name?.toLowerCase().includes(searchLower) ||
      product.code?.toLowerCase().includes(searchLower)
    );
  });

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await dispatch(deleteProduct(id)).unwrap();
        toast.success("Product deleted successfully");
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-2">
        <h1 className="mb-2 mb-sm-0">Products</h1>
        <Button as={Link} to="/products/new" variant="primary" size="sm">
          <i className="fas fa-plus me-1"></i>
          New Product
        </Button>
      </div>

      {error && (
        <Alert variant="danger" dismissible>
          <Alert.Heading>Error!</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Product List</h5>
            <InputGroup style={{ maxWidth: '300px' }}>
              <Form.Control
                type="text"
                placeholder="Search by code or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button onClick={clearSearch} variant="outline-secondary">
                  <i className="fas fa-times"></i>
                </Button>
              )}
            </InputGroup>
          </div>
        </Card.Header>
        <Card.Body>
          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-box"></i>
              <p>{searchTerm ? "No products match your search" : "No products found"}</p>
              {!searchTerm && (
                <Button as={Link} to="/products/new" variant="primary">
                  Create First Product
                </Button>
              )}
            </div>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Value</th>
                  <th>Raw Materials</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <strong>{product.code}</strong>
                    </td>
                    <td>{product.name}</td>
                    <td>
                      <span className="value-highlight">${product.value}</span>
                    </td>
                    <td>
                      {product.rawMaterials &&
                      product.rawMaterials.length > 0 ? (
                        <div>
                          {product.rawMaterials.map((rm, index) => (
                            <Badge
                              key={index}
                              bg="secondary"
                              className="me-1 mb-1"
                              title={`${rm.rawMaterialName}: ${rm.quantity} units`}
                            >
                              {rm.rawMaterialName} ({rm.quantity})
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <Badge bg="warning">No materials assigned</Badge>
                      )}
                    </td>
                    <td>
                      <div className="btn-group">
                        <Button
                          as={Link}
                          to={`/products/edit/${product.id}`}
                          variant="outline-primary"
                          title="Edit Product"
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                        <Button
                          onClick={() => handleDelete(product.id, product.name)}
                          variant="outline-danger"
                          title="Delete Product"
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductList;
