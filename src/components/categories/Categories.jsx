import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Categories = ({ categories, handleEdit, handleDelete }) => {
  return (
    <Table striped bordered hover variant="dark" className="mt-3">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Description</th>
          <th>Materials Quantity</th>
          <th>Created</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>{category.description}</td>
            <td>{category.materials || 0}</td>
            <td>{category.created_at}</td>
            <td>
              <Button variant="info" onClick={() => handleEdit(category)}>
                Edit
              </Button>{" "}
              {"  "}
              {"  "}
              <Button
                variant="danger"
                onClick={() => handleDelete(category.id)}
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

export { Categories };
