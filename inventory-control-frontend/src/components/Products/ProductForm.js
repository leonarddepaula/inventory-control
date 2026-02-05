import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import {
  createProduct,
  updateProduct,
  fetchProductById,
  clearCurrentProduct,
} from "../../features/products/productsSlice";
import { fetchRawMaterials } from "../../features/rawMaterials/rawMaterialsSlice";

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const { currentProduct, loading, error } = useSelector(
    (state) => state.products,
  );
  const { rawMaterials } = useSelector((state) => state.rawMaterials);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      value: "",
      rawMaterials: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rawMaterials",
  });

  useEffect(() => {
    dispatch(fetchRawMaterials());

    if (isEditing) {
      dispatch(fetchProductById(id));
    }

    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, id, isEditing]);

  useEffect(() => {
    if (isEditing && currentProduct) {
      setValue("name", currentProduct.name);
      setValue("value", currentProduct.value);
      setValue("rawMaterials", currentProduct.rawMaterials || []);
    }
  }, [currentProduct, isEditing, setValue]);

  const onSubmit = async (data) => {
    try {
      // Transform data to ensure correct types
      const transformedData = {
        ...data,
        value: parseFloat(data.value),
        rawMaterials: data.rawMaterials?.map(rm => ({
          rawMaterialId: parseInt(rm.rawMaterialId, 10),
          rawMaterialName: rm.rawMaterialName,
          quantity: parseInt(rm.quantity, 10)
        })).filter(rm => !isNaN(rm.rawMaterialId)) || []
      };

      if (isEditing) {
        await dispatch(updateProduct({ id, productData: transformedData })).unwrap();
        toast.success("Product updated successfully");
      } else {
        await dispatch(createProduct(transformedData)).unwrap();
        toast.success("Product created successfully");
      }
      navigate("/products");
    } catch (error) {
      toast.error(
        isEditing ? "Failed to update product" : "Failed to create product",
      );
    }
  };

  const addRawMaterial = () => {
    append({
      rawMaterialId: "",
      rawMaterialName: "",
      quantity: 1,
    });
  };

  const handleRawMaterialChange = (index, materialId) => {
    const selectedMaterial = rawMaterials.find(
      (rm) => rm.id.toString() === materialId,
    );
    if (selectedMaterial) {
      setValue(`rawMaterials.${index}.rawMaterialId`, selectedMaterial.id);
      setValue(`rawMaterials.${index}.rawMaterialName`, selectedMaterial.name);
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{isEditing ? "Edit Product" : "New Product"}</h1>
        <Button
          variant="outline-secondary"
          onClick={() => navigate("/products")}
        >
          <i className="fas fa-arrow-left me-1"></i>
          Back to Products
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
          <h5 className="mb-0">
            {isEditing ? "Edit Product" : "Create New Product"}
          </h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("name", {
                      required: "Product name is required",
                    })}
                    isInvalid={errors.name}
                    placeholder="Enter product name"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Value ($)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    {...register("value", {
                      required: "Product value is required",
                      min: {
                        value: 0.01,
                        message: "Value must be greater than 0",
                      },
                    })}
                    isInvalid={errors.value}
                    placeholder="Enter product value"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.value?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Form.Label>Raw Materials</Form.Label>
                <Button
                  type="button"
                  variant="outline-success"
                  size="sm"
                  onClick={addRawMaterial}
                >
                  <i className="fas fa-plus me-1"></i>
                  Add Raw Material
                </Button>
              </div>

              {fields.length > 0 && (
                <Table size="sm" responsive>
                  <thead>
                    <tr>
                      <th>Material</th>
                      <th>Quantity</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((field, index) => (
                      <tr key={field.id}>
                        <td>
                          <Form.Select
                            {...register(
                              `rawMaterials.${index}.rawMaterialId`,
                              {
                                required: "Please select a raw material",
                              },
                            )}
                            onChange={(e) =>
                              handleRawMaterialChange(index, e.target.value)
                            }
                            isInvalid={
                              errors.rawMaterials?.[index]?.rawMaterialId
                            }
                          >
                            <option value="">Select a raw material</option>
                            {rawMaterials.map((material) => (
                              <option key={material.id} value={material.id}>
                                {material.name} (Stock: {material.stockQuantity}
                                )
                              </option>
                            ))}
                          </Form.Select>
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            min="1"
                            {...register(`rawMaterials.${index}.quantity`, {
                              required: "Quantity is required",
                              min: {
                                value: 1,
                                message: "Quantity must be at least 1",
                              },
                            })}
                            isInvalid={errors.rawMaterials?.[index]?.quantity}
                            placeholder="Qty"
                          />
                        </td>
                        <td>
                          <Button
                            type="button"
                            variant="outline-danger"
                            size="sm"
                            onClick={() => remove(index)}
                            title="Remove raw material"
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}

              {fields.length === 0 && (
                <div className="text-center py-4 bg-light rounded">
                  <i className="fas fa-cubes fa-2x text-muted mb-2"></i>
                  <p className="text-muted mb-0">No raw materials assigned</p>
                  <small className="text-muted">
                    Click "Add Raw Material" to assign materials to this product
                  </small>
                </div>
              )}
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="outline-secondary"
                onClick={() => navigate("/products")}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading && (
                  <Spinner animation="border" size="sm" className="me-2" />
                )}
                {isEditing ? "Update Product" : "Create Product"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductForm;
