import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Alert, Spinner, Row, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchProductionSuggestions } from "../../features/products/productsSlice";

const ProductionSuggestions = () => {
  const dispatch = useDispatch();
  const { productionSuggestions, loading, error } = useSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(fetchProductionSuggestions());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchProductionSuggestions());
    toast.info("Production suggestions refreshed");
  };

  const getTotalProductionValue = () => {
    return productionSuggestions
      .reduce((total, suggestion) => {
        return total + Number(suggestion.totalValue || 0);
      }, 0)
      .toFixed(2);
  };

  const getTotalUnits = () => {
    return productionSuggestions.reduce((total, suggestion) => {
      return total + (suggestion.maxQuantityThatCanBeProduced || 0);
    }, 0);
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
        <div>
          <h1>
            <i className="fas fa-lightbulb me-2 text-warning"></i>
            Production Suggestions
          </h1>
          <p className="text-muted mb-0">
            Optimized production recommendations based on current inventory
          </p>
        </div>
        <div>
          <Button
            variant="outline-primary"
            onClick={handleRefresh}
            className="me-2"
          >
            <i className="fas fa-sync-alt me-1"></i>
            Refresh
          </Button>
          <Button as={Link} to="/products/new" variant="primary">
            <i className="fas fa-plus me-1"></i>
            New Product
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="danger" dismissible>
          <Alert.Heading>Error!</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      {/* Summary Cards */}
      {productionSuggestions.length > 0 && (
        <Row className="mb-4">
          <Col md={4}>
            <Card className="text-center border-success">
              <Card.Body>
                <Card.Title className="text-success">
                  <i className="fas fa-chart-line fa-2x mb-2"></i>
                  <br />
                  Total Production Value
                </Card.Title>
                <Card.Text>
                  <h3 className="value-highlight">
                    ${getTotalProductionValue()}
                  </h3>
                  Maximum revenue potential
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="text-center border-info">
              <Card.Body>
                <Card.Title className="text-info">
                  <i className="fas fa-cubes fa-2x mb-2"></i>
                  <br />
                  Total Units
                </Card.Title>
                <Card.Text>
                  <h3 className="text-info">{getTotalUnits()}</h3>
                  Products can be produced
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="text-center border-warning">
              <Card.Body>
                <Card.Title className="text-warning">
                  <i className="fas fa-box fa-2x mb-2"></i>
                  <br />
                  Available Products
                </Card.Title>
                <Card.Text>
                  <h3 className="text-warning">
                    {productionSuggestions.length}
                  </h3>
                  Product types ready
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Production Suggestions */}
      {productionSuggestions.length === 0 ? (
        <Card>
          <Card.Body>
            <div className="empty-state">
              <i className="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
              <h4>No Production Suggestions Available</h4>
              <p className="text-muted mb-4">
                There are currently no products that can be produced with the
                available raw materials. This could be because:
              </p>
              <ul className="list-unstyled text-start">
                <li className="mb-2">
                  <i className="fas fa-circle text-muted me-2"></i>
                  No products have been created yet
                </li>
                <li className="mb-2">
                  <i className="fas fa-circle text-muted me-2"></i>
                  Raw materials are out of stock
                </li>
                <li className="mb-2">
                  <i className="fas fa-circle text-muted me-2"></i>
                  Products don't have assigned raw materials
                </li>
              </ul>
              <div className="mt-4">
                <Button
                  as={Link}
                  to="/products"
                  variant="primary"
                  className="me-2"
                >
                  <i className="fas fa-box me-1"></i>
                  Manage Products
                </Button>
                <Button as={Link} to="/raw-materials" variant="success">
                  <i className="fas fa-cubes me-1"></i>
                  Manage Raw Materials
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {productionSuggestions.map((suggestion, index) => (
            <Col lg={6} xl={4} key={suggestion.productId} className="mb-4">
              <Card className="h-100 production-suggestion">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <small className="opacity-75 d-block">
                        {suggestion.productCode}
                      </small>
                      <h5 className="card-title text-white mb-1">
                        {suggestion.productName}
                      </h5>
                    </div>
                    <Badge bg="light" text="dark" className="quantity-badge">
                      #{index + 1}
                    </Badge>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="opacity-75">Unit Value:</span>
                      <span className="fw-bold">
                        ${suggestion.productValue}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="opacity-75">Max Quantity:</span>
                      <Badge bg="success" className="quantity-badge">
                        {suggestion.maxQuantityThatCanBeProduced} units
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <hr className="my-3 opacity-25" />
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="fw-bold">Total Value:</span>
                      <span className="h4 mb-0 fw-bold">
                        ${suggestion.totalValue}
                      </span>
                    </div>

                    <div className="d-grid gap-2">
                      <Button
                        as={Link}
                        to={`/products/edit/${suggestion.productId}`}
                        variant="light"
                        size="sm"
                      >
                        <i className="fas fa-edit me-1"></i>
                        View Product Details
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Help Information */}
      <Row className="mt-4">
        <Col>
          <Card className="border-info">
            <Card.Header className="bg-info text-white">
              <h6 className="mb-0">
                <i className="fas fa-info-circle me-1"></i>
                How Production Suggestions Work
              </h6>
            </Card.Header>
            <Card.Body className="bg-light">
              <Row>
                <Col md={6}>
                  <h6 className="text-info">Prioritization:</h6>
                  <ul>
                    <li>Products are sorted by highest unit value first</li>
                    <li>This maximizes your potential revenue</li>
                    <li>Only producible items are shown</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h6 className="text-info">Calculations:</h6>
                  <ul>
                    <li>
                      Max quantity = minimum of (stock ÷ required) for each raw
                      material
                    </li>
                    <li>Total value = unit value × max quantity</li>
                    <li>Updated in real-time based on current stock</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductionSuggestions;
