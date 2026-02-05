import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./components/Dashboard/Dashboard";
import ProductList from "./components/Products/ProductList";
import ProductForm from "./components/Products/ProductForm";
import RawMaterialList from "./components/RawMaterials/RawMaterialList";
import RawMaterialForm from "./components/RawMaterials/RawMaterialForm";
import ProductionSuggestions from "./components/ProductionSuggestions/ProductionSuggestions";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Container fluid className="py-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/edit/:id" element={<ProductForm />} />
          <Route path="/raw-materials" element={<RawMaterialList />} />
          <Route path="/raw-materials/new" element={<RawMaterialForm />} />
          <Route path="/raw-materials/edit/:id" element={<RawMaterialForm />} />
          <Route
            path="/production-suggestions"
            element={<ProductionSuggestions />}
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
