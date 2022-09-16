import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Materials = ({ materials, handleEdit, handleDelete }) => {
  const renderMaterials = materials.length;
  let start = 0;
  let final = 3;
  const columns = 3;
  const rows = Math.ceil(renderMaterials / columns);
  let materialSlice = [];
  for (let i = 0; i < rows; i++) {
    materialSlice[i] = materials.slice(start, final);
    start = start + 3;
    final = final + 3;
  }
  return (
    <>
      {materialSlice.map((materials) => (
        <Row
          key={uuidv4()}
          xs={1}
          md={3}
          className="g-2"
          style={{ marginBottom: "1em", marginTop: "1em" }}
        >
          {materials.map((material) => (
            <Col key={material.id}>
              <Card
                style={{
                  marginLeft: "1rem",
                  marginRight: "1em",
                  boxShadow: "10px 10px 5px grey",
                }}
                bg="light"
              >
                <Card.Img
                  variant="top"
                  src="https://via.placeholder.com/50px30"
                />
                <Card.Header>
                  <Card.Title>{material.name}</Card.Title>
                </Card.Header>

                <Card.Body>
                  <Card.Text>{material.description}</Card.Text>
                  <Card.Text>
                    Category:{" "}
                    {material.category
                      ? material.category.name
                      : "Without Category"}
                  </Card.Text>
                  <Card.Text>
                    {" "}
                    Unit Measure:{" "}
                    {material.measure
                      ? material.measure.name
                      : "Without Unit Measure"}
                  </Card.Text>
                  <Button variant="info" onClick={() => handleEdit(material)}>
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(material.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Created: {material.created_at}
                  </small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      ))}
    </>
  );
};

export { Materials };
