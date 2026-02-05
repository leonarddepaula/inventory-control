import React, { useEffect, useState, useCallback } from "react";
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
  Modal,
} from "react-bootstrap";
import { toast } from "react-toastify";
import {
  fetchRawMaterials,
  deleteRawMaterial,
  updateStockQuantity,
  fetchRawMaterialsWithStock,
  fetchRawMaterialsOutOfStock,
} from "../../features/rawMaterials/rawMaterialsSlice";

const RawMaterialList = () => {
  const dispatch = useDispatch();
  const { rawMaterials, loading, error } = useSelector(
    (state) => state.rawMaterials,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [showStockModal, setShowStockModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [newStockQuantity, setNewStockQuantity] = useState("");

  const handleFilterChange = useCallback((filterType) => {
    setFilter(filterType);
    switch (filterType) {
      case "with-stock":
        dispatch(fetchRawMaterialsWithStock());
        break;
      case "out-of-stock":
        dispatch(fetchRawMaterialsOutOfStock());
        break;
      default:
        dispatch(fetchRawMaterials());
    }
  }, [dispatch]);

  useEffect(() => {
    handleFilterChange("all");
  }, [handleFilterChange]);

  // Filtro local instantâneo por código ou nome
  const filteredMaterials = rawMaterials.filter((material) => {
    if (!searchTerm.trim()) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      material.name?.toLowerCase().includes(searchLower) ||
      material.code?.toLowerCase().includes(searchLower)
    );
  });

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await dispatch(deleteRawMaterial(id)).unwrap();
        toast.success("Raw material deleted successfully");
      } catch (error) {
        toast.error("Failed to delete raw material");
        console.error(error);
      }
    }
  };
  const openStockModal = (material) => {
    setSelectedMaterial(material);
    setNewStockQuantity(material.stockQuantity.toString());
    setShowStockModal(true);
  };

  const handleUpdateStock = async () => {
    if (selectedMaterial && newStockQuantity !== "") {
      try {
        await dispatch(
          updateStockQuantity({
            id: selectedMaterial.id,
            stockQuantity: parseInt(newStockQuantity),
          }),
        ).unwrap();
        toast.success("Stock updated successfully");
        setShowStockModal(false);
      } catch (error) {
        toast.error("Failed to update stock");
        console.error(error);
      }
    }
  };

  const getStockBadge = (quantity) => {
    if (quantity === 0) return <Badge bg="danger">Out of Stock</Badge>;
    if (quantity <= 10) return <Badge bg="warning">Low Stock</Badge>;
    return <Badge bg="success">In Stock</Badge>;
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
        <h1>Raw Materials</h1>
        <Button as={Link} to="/raw-materials/new" variant="success">
          <i className="fas fa-plus me-1"></i>
          Add New Raw Material
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
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <h5 className="mb-0">Raw Materials List</h5>
            <div className="d-flex gap-2 align-items-center">
              {/* Filter Buttons */}
              <div className="btn-group">
                <Button
                  variant={filter === "all" ? "primary" : "outline-primary"}
                  size="sm"
                  onClick={() => handleFilterChange("all")}
                >
                  All
                </Button>
                <Button
                  variant={
                    filter === "with-stock" ? "success" : "outline-success"
                  }
                  size="sm"
                  onClick={() => handleFilterChange("with-stock")}
                >
                  With Stock
                </Button>
                <Button
                  variant={
                    filter === "out-of-stock" ? "danger" : "outline-danger"
                  }
                  size="sm"
                  onClick={() => handleFilterChange("out-of-stock")}
                >
                  Out of Stock
                </Button>
              </div>

              {/* Search Form */}
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search by code or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="sm"
                />
                {searchTerm && (
                  <Button
                    onClick={clearSearch}
                    variant="outline-secondary"
                    size="sm"
                  >
                    <i className="fas fa-times"></i>
                  </Button>
                )}
              </InputGroup>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          {filteredMaterials.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-cubes"></i>
              <p>{searchTerm ? "No materials match your search" : "No raw materials found"}</p>
              {!searchTerm && (
                <Button as={Link} to="/raw-materials/new" variant="success">
                  Create First Raw Material
                </Button>
              )}
            </div>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Stock Quantity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMaterials.map((material) => (
                  <tr key={material.id}>
                    <td>
                      <strong>{material.code}</strong>
                    </td>
                    <td>{material.name}</td>
                    <td>
                      <span className="fw-bold">{material.stockQuantity}</span>{" "}
                      units
                    </td>
                    <td>{getStockBadge(material.stockQuantity)}</td>
                    <td>
                      <div className="btn-group">
                        <Button
                          onClick={() => openStockModal(material)}
                          variant="outline-info"
                          size="sm"
                          title="Update Stock"
                        >
                          <i className="fas fa-warehouse"></i>
                        </Button>
                        <Button
                          as={Link}
                          to={`/raw-materials/edit/${material.id}`}
                          variant="outline-primary"
                          size="sm"
                          title="Edit Raw Material"
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                        <Button
                          onClick={() =>
                            handleDelete(material.id, material.name)
                          }
                          variant="outline-danger"
                          size="sm"
                          title="Delete Raw Material"
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

      {/* Stock Update Modal */}
      <Modal show={showStockModal} onHide={() => setShowStockModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMaterial && (
            <div>
              <p>
                <strong>Material:</strong> {selectedMaterial.name}
              </p>
              <p>
                <strong>Current Stock:</strong> {selectedMaterial.stockQuantity}{" "}
                units
              </p>
              <Form.Group>
                <Form.Label>New Stock Quantity</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={newStockQuantity}
                  onChange={(e) => setNewStockQuantity(e.target.value)}
                  placeholder="Enter new stock quantity"
                />
              </Form.Group>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStockModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateStock}>
            Update Stock
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RawMaterialList;
