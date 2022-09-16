import React, { useState, useEffect } from "react";
// boostrap react
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
//redux
import { useDispatch, useSelector } from "react-redux";
import { updateUnitMeasureAction } from "../../actions/measure/updateUnitMeasureAction";
import { createUnitMeasureAction } from "../../actions/measure/createUnitMeasureAction";

const Measure = ({ show, handleCleanData, unit_measure }) => {
  const [name, setName] = useState("");
  const [abbreviate, setAbbreviate] = useState("");
  const [description, setDescription] = useState("");

  const token = useSelector((state) => state.auth.access.access_token);
  const error = useSelector((state) => state.unit_measures.error);

  const dispatch = useDispatch();

  const createUnitMeasure = (unit_measure, token) =>
    dispatch(createUnitMeasureAction(unit_measure, token));

  const updateUnitMeasure = (id, unit_measure, token) =>
    dispatch(updateUnitMeasureAction(id, unit_measure, token));

  useEffect(() => {
    if (unit_measure) {
      setName(unit_measure.name);
      setAbbreviate(unit_measure.abbreviate);
      setDescription(unit_measure.description);
    } else {
      setName("");
      setAbbreviate("");
      setDescription("");
    }
  }, [unit_measure, setName, setDescription, setAbbreviate, error]);

  const clickSubmit = (e) => {
    e.preventDefault();
    let data = {
      name,
      description,
      abbreviate,
    };
    console.log("saber", error);
    unit_measure
      ? updateUnitMeasure(unit_measure.id, data, token)
      : createUnitMeasure(data, token);
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
          {unit_measure ? "Edit Unit Measure" : "Create Unit Measure"}
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
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            />
            {error && error.name ? (
              <div className="alert alert-danger mt-1" role="alert">
                {error.name}
              </div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Abbreviate</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter abbreviate"
              autoFocus
              value={abbreviate || ""}
              onChange={(e) => setAbbreviate(e.target.value)}
            />
            {error && error.abbreviate ? (
              <div className="alert alert-danger mt-1" role="alert">
                {error.abbreviate}
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
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
            />
            {error && error.description ? (
              <div className="alert alert-danger mt-1" role="alert">
                {error.description}
              </div>
            ) : null}
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

export { Measure };
