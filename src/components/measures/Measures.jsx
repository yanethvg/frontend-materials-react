import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Measures = ({ unit_measures, handleEdit, handleDelete }) => {
  return (
    <Table striped bordered hover variant="dark" className="mt-3">
      <thead>
        <tr>
          {/* <th>Id</th> */}
          <th>Name</th>
          <th>Abbreviate</th>
          <th>Description</th>
          <th>Materials Quantity</th>
          <th>Created</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {unit_measures.map((measure) => (
          <tr key={measure.id}>
            {/* <td>{measure.id}</td> */}
            <td>{measure.name}</td>
            <td>{measure.abbreviate}</td>
            <td>{measure.description}</td>
            <td>{measure.materials || 0}</td>
            <td>{measure.created_at}</td>
            <td>
              <Button variant="info" >
                Edit
              </Button>{" "}
              {"  "}
              {"  "}
              <Button
                variant="danger"
                
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export { Measures };