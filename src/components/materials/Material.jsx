import React, { useState, useEffect } from "react";
// boostrap react
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
//redux
import { useDispatch, useSelector } from "react-redux";
import { updateMaterialAction } from "../../actions/material/updateMaterialAction";
import { createMaterialAction } from "../../actions/material/createMaterialAction";

const Material = ({ show, handleCleanData, material_list, categories, measures }) => {
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
      });
    } else {
      setMaterial({});
    }
  }, [material_list, setMaterial, error]);

  const clickSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    let data = {
      ...material,
    };
    material_list ? update(material_list.id, data, token) : create(data, token);
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              autoFocus
              value={material.name || ""}
              onChange={(e) =>
                setMaterial({ ...material, name: e.target.value })
              }
            />
            {error && error.name ? (
              <div className="alert alert-danger mt-1" role="alert">
                {error.name}
              </div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="description"
              placeholder="Enter description"
              as="textarea"
              rows={3}
              value={material.description || ""}
              onChange={(e) =>
                setMaterial({ ...material, description: e.target.value })
              }
            />
            {error && error.description ? (
              <div className="alert alert-danger mt-1" role="alert">
                {error.description}
              </div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              onChange={(e) =>
                setMaterial({ ...material, category: e.target.value })
              }
              value={material.category?.id || ""}
            >
              <option>Choose a Category</option>
              {
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Unit Measure</Form.Label>
            <Form.Select
              onChange={(e) =>
                setMaterial({ ...material, measure: e.target.value })
              }
              value={material.measure?.id || ""}
            >
              <option>Choose an Unit Measure</option>
              {
              measures.map((measure) => (
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
