import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Form, Button, Alert, Spinner, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  createRawMaterial,
  updateRawMaterial,
  fetchRawMaterialById,
  clearCurrentRawMaterial,
} from "../../features/rawMaterials/rawMaterialsSlice";

const RawMaterialForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const { currentRawMaterial, loading, error } = useSelector(
    (state) => state.rawMaterials,
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
      name: "",
      stockQuantity: "",
    },
  });

  useEffect(() => {
    if (isEditing) {
      dispatch(fetchRawMaterialById(id));
    }

    return () => {
      dispatch(clearCurrentRawMaterial());
    };
  }, [dispatch, id, isEditing]);

  useEffect(() => {
    if (isEditing && currentRawMaterial) {
      setValue("code", currentRawMaterial.code);
      setValue("name", currentRawMaterial.name);
      setValue("stockQuantity", currentRawMaterial.stockQuantity);
    }
  }, [currentRawMaterial, isEditing, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        stockQuantity: Number.parseInt(data.stockQuantity, 10),
      };

      if (isEditing) {
        await dispatch(
          updateRawMaterial({ id, rawMaterialData: formData }),
        ).unwrap();
        toast.success("Raw material updated successfully");
      } else {
        await dispatch(createRawMaterial(formData)).unwrap();
        toast.success("Raw material created successfully");
      }
      navigate("/raw-materials");
    } catch (error) {
      toast.error(
        isEditing
          ? "Failed to update raw material"
          : "Failed to create raw material",
      );
      console.error(error);
    }
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
        <h1 className="mb-2 mb-sm-0">{isEditing ? "Edit Raw Material" : "New Raw Material"}</h1>
        <Button
          variant="outline-secondary"
          onClick={() => navigate("/raw-materials")}
          size="sm"
        >
          <i className="fas fa-arrow-left me-1"></i>
          Back to Materials
        </Button>
      </div>

      {error && (
        <Alert variant="danger" dismissible>
          <Alert.Heading>Error!</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-cubes me-2"></i>
                {isEditing ? "Edit Raw Material" : "Create New Raw Material"}
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <i className="fas fa-barcode me-1"></i>
                    Raw Material Code
                  </Form.Label>
                  <Form.Control
                    type="text"
                    maxLength={20}
                    {...register("code", {
                      required: "Raw material code is required",
                      maxLength: {
                        value: 20,
                        message: "Code must be at most 20 characters",
                      },
                    })}
                    isInvalid={errors.code}
                    placeholder="Enter raw material code (e.g., MAT-001)"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.code?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <i className="fas fa-tag me-1"></i>
                    Raw Material Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    maxLength={70}
                    {...register("name", {
                      required: "Raw material name is required",
                      minLength: {
                        value: 1,
                        message: "Name must be at least 1 character",
                      },
                      maxLength: {
                        value: 70,
                        message: "Name must be at most 70 characters",
                      },
                    })}
                    isInvalid={errors.name}
                    placeholder="Enter raw material name"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>
                    <i className="fas fa-warehouse me-1"></i>
                    Stock Quantity
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    max="999999999"
                    {...register("stockQuantity", {
                      required: "Stock quantity is required",
                      min: {
                        value: 0,
                        message: "Stock quantity must be non-negative",
                      },
                      max: {
                        value: 999999999,
                        message: "Stock quantity must be less than 1 billion",
                      },
                      pattern: {
                        value: /^\d+$/,
                        message: "Stock quantity must be a whole number",
                      },
                    })}
                    isInvalid={errors.stockQuantity}
                    placeholder="Enter stock quantity"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.stockQuantity?.message}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Enter the current quantity of this raw material in stock.
                  </Form.Text>
                </Form.Group>

                <div className="d-flex justify-content-end gap-2">
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate("/raw-materials")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="success" disabled={loading}>
                    {loading && (
                      <Spinner animation="border" size="sm" className="me-2" />
                    )}
                    <i
                      className={`fas ${isEditing ? "fa-save" : "fa-plus"} me-1`}
                    ></i>
                    {isEditing ? "Update Raw Material" : "Create Raw Material"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Help Section */}
      <Row className="justify-content-center mt-4">
        <Col md={8} lg={6}>
          <Card className="border-info">
            <Card.Header className="bg-info text-white">
              <h6 className="mb-0">
                <i className="fas fa-info-circle me-1"></i>
                Tips
              </h6>
            </Card.Header>
            <Card.Body className="bg-light">
              <ul className="mb-0">
                <li>Raw material names should be descriptive and unique</li>
                <li>Stock quantity represents the current amount available</li>
                <li>
                  You can update stock quantities later from the raw materials
                  list
                </li>
                <li>
                  Materials with 0 quantity will be marked as "Out of Stock"
                </li>
                <li>
                  Materials with 10 or fewer units will be marked as "Low Stock"
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RawMaterialForm;
