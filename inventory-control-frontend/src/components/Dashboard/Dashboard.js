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
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-2">
        <h1 className="mb-2 mb-sm-0">Dashboard</h1>
        <div className="d-flex flex-wrap gap-2">
          <Button
            as={Link}
            to="/products/new"
            variant="primary"
            size="sm"
          >
            <i className="fas fa-plus me-1"></i>
            New Product
          </Button>
          <Button as={Link} to="/raw-materials/new" variant="success" size="sm">
            <i className="fas fa-plus me-1"></i>
            New Material
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <Row className="mb-4 g-2 g-md-3">
        <Col xs={6} md={3}>
          <Card className="text-center h-100">
            <Card.Body className="p-2 p-md-3">
              <Card.Title className="text-primary mb-2">
                <i className="fas fa-box fa-lg mb-1"></i>
                <br />
                <span className="fs-6">Products</span>
              </Card.Title>
              <h3 className="mb-1">{products.length}</h3>
              <small className="text-muted d-none d-sm-block">Total Products</small>
              <Button
                as={Link}
                to="/products"
                variant="outline-primary"
                size="sm"
                className="mt-2 w-100"
              >
                View All
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={6} md={3}>
          <Card className="text-center h-100">
            <Card.Body className="p-2 p-md-3">
              <Card.Title className="text-success mb-2">
                <i className="fas fa-cubes fa-lg mb-1"></i>
                <br />
                <span className="fs-6">Materials</span>
              </Card.Title>
              <h3 className="mb-1">{rawMaterials.length}</h3>
              <small className="text-muted d-none d-sm-block">Total Materials</small>
              <Button
                as={Link}
                to="/raw-materials"
                variant="outline-success"
                size="sm"
                className="mt-2 w-100"
              >
                View All
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={6} md={3}>
          <Card className="text-center h-100">
            <Card.Body className="p-2 p-md-3">
              <Card.Title className="text-warning mb-2">
                <i className="fas fa-exclamation-triangle fa-lg mb-1"></i>
                <br />
                <span className="fs-6">Low Stock</span>
              </Card.Title>
              <h3 className="mb-1">{lowStockMaterials.length}</h3>
              <small className="text-muted d-none d-sm-block">Materials</small>
              <Button
                as={Link}
                to="/raw-materials"
                variant="outline-warning"
                size="sm"
                className="mt-2 w-100"
              >
                Check Stock
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={6} md={3}>
          <Card className="text-center h-100">
            <Card.Body className="p-2 p-md-3">
              <Card.Title className="text-danger mb-2">
                <i className="fas fa-times-circle fa-lg mb-1"></i>
                <br />
                <span className="fs-6">Out of Stock</span>
              </Card.Title>
              <h3 className="mb-1">{outOfStockMaterials.length}</h3>
              <small className="text-muted d-none d-sm-block">Materials</small>
              <Button
                as={Link}
                to="/raw-materials"
                variant="outline-danger"
                size="sm"
                className="mt-2 w-100"
              >
                Restock
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3">
        {/* Recent Products */}
        <Col xs={12} lg={6}>
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0 fs-6">Recent Products</h5>
            </Card.Header>
            <Card.Body className="p-2 p-md-3">
              {products.slice(0, 5).length > 0 ? (
                <div>
                  {products.slice(0, 5).map((product) => (
                    <div
                      key={product.id}
                      className="d-flex justify-content-between align-items-center py-2 border-bottom"
                    >
                      <div className="text-truncate me-2">
                        <strong className="d-block text-truncate">{product.name}</strong>
                        <small className="text-muted">Code: {product.code}</small>
                      </div>
                      <div className="text-end flex-shrink-0">
                        <div className="value-highlight fs-6">${product.value}</div>
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
                <div className="empty-state py-3">
                  <i className="fas fa-box"></i>
                  <p>No products found</p>
                  <Button as={Link} to="/products/new" variant="primary" size="sm">
                    Create First Product
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Stock Status */}
        <Col xs={12} lg={6}>
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0 fs-6">Stock Status</h5>
            </Card.Header>
            <Card.Body className="p-2 p-md-3">
              {rawMaterials.length > 0 ? (
                <div>
                  {rawMaterials.slice(0, 8).map((material) => {
                    const status = getStockStatus(material.stockQuantity);
                    return (
                      <div
                        key={material.id}
                        className="d-flex justify-content-between align-items-center py-2 border-bottom"
                      >
                        <div className="text-truncate me-2">
                          <strong className="d-block text-truncate">{material.name}</strong>
                          <small className="text-muted">
                            Code: {material.code}
                          </small>
                        </div>
                        <div className="text-end flex-shrink-0">
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
                <div className="empty-state py-3">
                  <i className="fas fa-cubes"></i>
                  <p>No raw materials found</p>
                  <Button as={Link} to="/raw-materials/new" variant="success" size="sm">
                    Add First Material
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row className="mt-4 g-3">
        <Col xs={12}>
          <Card>
            <Card.Header>
              <h5 className="mb-0 fs-6">Quick Actions</h5>
            </Card.Header>
            <Card.Body className="p-2 p-md-3">
              <Row className="g-2">
                <Col xs={6} md={3} className="text-center">
                  <Button
                    as={Link}
                    to="/products/new"
                    variant="primary"
                    className="w-100 py-3"
                  >
                    <i className="fas fa-plus-circle fa-lg d-block mb-2"></i>
                    <small>Add Product</small>
                  </Button>
                </Col>
                <Col xs={6} md={3} className="text-center">
                  <Button
                    as={Link}
                    to="/raw-materials/new"
                    variant="success"
                    className="w-100 py-3"
                  >
                    <i className="fas fa-plus-circle fa-lg d-block mb-2"></i>
                    <small>Add Material</small>
                  </Button>
                </Col>
                <Col xs={6} md={3} className="text-center">
                  <Button
                    as={Link}
                    to="/production-suggestions"
                    variant="info"
                    className="w-100 py-3"
                  >
                    <i className="fas fa-lightbulb fa-lg d-block mb-2"></i>
                    <small>Suggestions</small>
                  </Button>
                </Col>
                <Col xs={6} md={3} className="text-center">
                  <Button
                    as={Link}
                    to="/raw-materials"
                    variant="warning"
                    className="w-100 py-3"
                  >
                    <i className="fas fa-chart-bar fa-lg d-block mb-2"></i>
                    <small>Stock Report</small>
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
