import React, { useState, useEffect } from "react";
// boostrap react
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
//redux
import { useDispatch, useSelector } from "react-redux";
import { updateMaterialAction } from "../../actions/material/updateMaterialAction";
import { createMaterialAction } from "../../actions/material/createMaterialAction";

const Material = ({
  show,
  handleCleanData,
  material_list,
  categories,
  measures,
}) => {
  const [material, setMaterial] = useState({});

  const token = useSelector((state) => state.auth.access.access_token);
  const error = useSelector((state) => state.materials.error);

  const dispatch = useDispatch();

  const create = (material, token) =>
    dispatch(createMaterialAction(material, token));

  const update = (id, material, token) =>
    dispatch(updateMaterialAction(id, material, token));

  useEffect(() => {
    if (material_list) {
      setMaterial({
        ...material_list,
        is_active: material_list.is_active ? "true" : "false",
      });
    } else {
      setMaterial({
        name: "",
        category: "",
        measure: "",
        description: "",
        stock_minim: "",
        is_active: "true",
      });
    }
  }, [material_list, setMaterial, error]);

  const clickSubmit = (e) => {
    e.preventDefault();
    let data = {
      ...material,
      is_active: Boolean(material.is_active),
      stock_minim: parseInt(material.stock_minim),
      category_id: parseInt(material.category),
      unit_measure_id: parseInt(material.measure),
    };
    material_list ? update(material_list.id, data, token) : create(data, token);
  };
  const handleChange = (event) => {
    const { id, value } = event.target;
    setMaterial({
      ...material,
      [id]: value,
    });
  };

  const handleOptionChange = (event) => {
    setMaterial({
      ...material,
      is_active: event.target.value,
    });
  };
  return (
    <Modal
      show={show}
      onHide={handleCleanData}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {material_list ? "Edit Material" : "Create Material"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Enter name"
              autoFocus
              value={material.name}
              onChange={(e) => handleChange(e)}
            />
            {error && error.name ? (
              <div className="alert alert-danger mt-1" role="alert">
                {error.name}
              </div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="stock_minim">
            <Form.Label>Stock Minim</Form.Label>
            <Form.Control
              placeholder="Enter Stock Minim"
              value={material.stock_minim}
              onChange={(e) => handleChange(e)}
            />
            {error && error.stock_minim ? (
              <div className="alert alert-danger mt-1" role="alert">
                {error.stock_minim}
              </div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="is_active">
            <Form.Label>Is Active?</Form.Label>
            <Form.Check
              type="radio"
              label="Yes"
              value="true"
              checked={material.is_active === "true"}
              onChange={(e) => handleOptionChange(e)}
            />
            <Form.Check
              type="radio"
              label="No"
              value="false"
              checked={material.is_active === "false"}
              onChange={(e) => handleOptionChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              placeholder="Enter description"
              as="textarea"
              rows={3}
              value={material.description}
              onChange={(e) => handleChange(e)}
            />
            {error && error.description ? (
              <div className="alert alert-danger mt-1" role="alert">
                {error.description}
              </div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select
              onChange={(e) => handleChange(e)}
              value={material.category?.id}
            >
              <option>Choose a Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="measure">
            <Form.Label>Unit Measure</Form.Label>
            <Form.Select
              onChange={(e) => handleChange(e)}
              value={material.measure?.id}
            >
              <option>Choose an Unit Measure</option>
              {measures.map((measure) => (
                <option key={measure.id} value={measure.id}>
                  {measure.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={clickSubmit}>
          Save
        </Button>
        <Button onClick={() => handleCleanData()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export { Material };
