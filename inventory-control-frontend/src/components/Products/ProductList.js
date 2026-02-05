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
  searchProducts,
} from "../../features/products/productsSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchProducts(searchTerm));
    } else {
      dispatch(fetchProducts());
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    dispatch(fetchProducts());
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Products</h1>
        <Button as={Link} to="/products/new" variant="primary">
          <i className="fas fa-plus me-1"></i>
          Add New Product
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
            <Form onSubmit={handleSearch} className="d-flex">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit" variant="outline-primary">
                  <i className="fas fa-search"></i>
                </Button>
                {searchTerm && (
                  <Button onClick={clearSearch} variant="outline-secondary">
                    <i className="fas fa-times"></i>
                  </Button>
                )}
              </InputGroup>
            </Form>
          </div>
        </Card.Header>
        <Card.Body>
          {products.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-box"></i>
              <p>No products found</p>
              <Button as={Link} to="/products/new" variant="primary">
                Create First Product
              </Button>
            </div>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Value</th>
                  <th>Raw Materials</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <strong>{product.name}</strong>
                    </td>
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
                          size="sm"
                          title="Edit Product"
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                        <Button
                          onClick={() => handleDelete(product.id, product.name)}
                          variant="outline-danger"
                          size="sm"
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
