import React,{ useState, useEffect } from 'react';
// boostrap react
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
//redux
import { useDispatch, useSelector } from "react-redux";
import { updateCategoryAction } from "../../actions/category/updateCategoryAction";
import { createCategoryAction } from "../../actions/category/createCategoryAction";

const Category = ({ show, handleCleanData, category}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const token = useSelector(state => state.auth.access.access_token);
    const error = useSelector(state => state.categories.error);
    
    const dispatch = useDispatch();

    const createCategory = (category, token) =>
      dispatch(createCategoryAction(category, token));

      
    const updateCategory = (id, category, token) =>
        dispatch(updateCategoryAction(id, category, token))

    useEffect(() => {
        if(category) {
            setName(category.name);
            setDescription(category.description);
        }else{
            setName('')
            setDescription('')
        }
    }, [category, setName, setDescription, error])
        
    const clickSubmit = e => {
        e.preventDefault()
        let categorySend = {}
        categorySend = {
            name,
            description
        }
        category
            ? updateCategory(category.id, categorySend, token)
            : createCategory(categorySend, token)
    }
    return (
         <Modal
            show={show} onHide={handleCleanData}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {category ? 'Edit Category' : 'Create Category'}
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
                            value={name || ''}
                            onChange={(e) => setName(e.target.value)}
                        />
                         {
                            error && error.name ? (
                                <div className="alert alert-danger mt-1" role="alert">
                                {error.name}
                                </div>
                            ) : null
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="description"
                            placeholder="Enter description"
                            as="textarea" rows={3}
                            value={description || ''}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                         {
                            error && error.description ? (
                                <div className="alert alert-danger mt-1" role="alert">
                                {error.description}
                                </div>
                            ) : null
                        }
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success"  onClick={clickSubmit}>Save</Button>
                <Button onClick={() => handleCleanData()}>Close</Button>
            </Modal.Footer>
        </Modal>
    )

}

export {Category}