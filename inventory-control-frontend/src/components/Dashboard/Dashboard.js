import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../features/products/productsSlice";
import { fetchRawMaterials } from "../../features/rawMaterials/rawMaterialsSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { rawMaterials } = useSelector((state) => state.rawMaterials);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchRawMaterials());
  }, [dispatch]);

  const lowStockMaterials = rawMaterials.filter((rm) => rm.stockQuantity <= 10);
  const outOfStockMaterials = rawMaterials.filter(
    (rm) => rm.stockQuantity === 0,
  );

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { text: "Out of Stock", className: "stock-low" };
    if (quantity <= 10) return { text: "Low Stock", className: "stock-medium" };
    return { text: "In Stock", className: "stock-high" };
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Dashboard</h1>
        <div>
          <Button
            as={Link}
            to="/products/new"
            variant="primary"
            className="me-2"
          >
            <i className="fas fa-plus me-1"></i>
            New Product
          </Button>
          <Button as={Link} to="/raw-materials/new" variant="success">
            <i className="fas fa-plus me-1"></i>
            New Raw Material
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title className="text-primary">
                <i className="fas fa-box fa-2x mb-2"></i>
                <br />
                Products
              </Card.Title>
              <Card.Text>
                <h3>{products.length}</h3>
                Total Products
              </Card.Text>
              <Button
                as={Link}
                to="/products"
                variant="outline-primary"
                size="sm"
              >
                View All
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title className="text-success">
                <i className="fas fa-cubes fa-2x mb-2"></i>
                <br />
                Raw Materials
              </Card.Title>
              <Card.Text>
                <h3>{rawMaterials.length}</h3>
                Total Materials
              </Card.Text>
              <Button
                as={Link}
                to="/raw-materials"
                variant="outline-success"
                size="sm"
              >
                View All
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title className="text-warning">
                <i className="fas fa-exclamation-triangle fa-2x mb-2"></i>
                <br />
                Low Stock
              </Card.Title>
              <Card.Text>
                <h3>{lowStockMaterials.length}</h3>
                Materials
              </Card.Text>
              <Button
                as={Link}
                to="/raw-materials"
                variant="outline-warning"
                size="sm"
              >
                Check Stock
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title className="text-danger">
                <i className="fas fa-times-circle fa-2x mb-2"></i>
                <br />
                Out of Stock
              </Card.Title>
              <Card.Text>
                <h3>{outOfStockMaterials.length}</h3>
                Materials
              </Card.Text>
              <Button
                as={Link}
                to="/raw-materials"
                variant="outline-danger"
                size="sm"
              >
                Restock
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Recent Products */}
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Products</h5>
            </Card.Header>
            <Card.Body>
              {products.slice(0, 5).length > 0 ? (
                <div>
                  {products.slice(0, 5).map((product) => (
                    <div
                      key={product.id}
                      className="d-flex justify-content-between align-items-center py-2 border-bottom"
                    >
                      <div>
                        <strong>{product.name}</strong>
                        <br />
                        <small className="text-muted">ID: {product.id}</small>
                      </div>
                      <div className="text-end">
                        <div className="value-highlight">${product.value}</div>
                      </div>
                    </div>
                  ))}
                  <div className="text-center mt-3">
                    <Button
                      as={Link}
                      to="/products"
                      variant="outline-primary"
                      size="sm"
                    >
                      View All Products
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <i className="fas fa-box"></i>
                  <p>No products found</p>
                  <Button as={Link} to="/products/new" variant="primary">
                    Create First Product
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Stock Status */}
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Stock Status</h5>
            </Card.Header>
            <Card.Body>
              {rawMaterials.length > 0 ? (
                <div>
                  {rawMaterials.slice(0, 8).map((material) => {
                    const status = getStockStatus(material.stockQuantity);
                    return (
                      <div
                        key={material.id}
                        className="d-flex justify-content-between align-items-center py-2 border-bottom"
                      >
                        <div>
                          <strong>{material.name}</strong>
                          <br />
                          <small className="text-muted">
                            ID: {material.id}
                          </small>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold">
                            {material.stockQuantity} units
                          </div>
                          <small className={status.className}>
                            {status.text}
                          </small>
                        </div>
                      </div>
                    );
                  })}
                  <div className="text-center mt-3">
                    <Button
                      as={Link}
                      to="/raw-materials"
                      variant="outline-success"
                      size="sm"
                    >
                      Manage Stock
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <i className="fas fa-cubes"></i>
                  <p>No raw materials found</p>
                  <Button as={Link} to="/raw-materials/new" variant="success">
                    Add First Material
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={3} className="text-center mb-3">
                  <Button
                    as={Link}
                    to="/products/new"
                    variant="primary"
                    className="w-100"
                  >
                    <i className="fas fa-plus-circle fa-2x mb-2 d-block"></i>
                    Add Product
                  </Button>
                </Col>
                <Col md={3} className="text-center mb-3">
                  <Button
                    as={Link}
                    to="/raw-materials/new"
                    variant="success"
                    className="w-100"
                  >
                    <i className="fas fa-plus-circle fa-2x mb-2 d-block"></i>
                    Add Raw Material
                  </Button>
                </Col>
                <Col md={3} className="text-center mb-3">
                  <Button
                    as={Link}
                    to="/production-suggestions"
                    variant="info"
                    className="w-100"
                  >
                    <i className="fas fa-lightbulb fa-2x mb-2 d-block"></i>
                    View Suggestions
                  </Button>
                </Col>
                <Col md={3} className="text-center mb-3">
                  <Button
                    as={Link}
                    to="/raw-materials"
                    variant="warning"
                    className="w-100"
                  >
                    <i className="fas fa-chart-bar fa-2x mb-2 d-block"></i>
                    Stock Report
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
