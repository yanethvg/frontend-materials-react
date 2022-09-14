import React,{useEffect} from 'react';
//boostrap-react
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
//redux
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../../actions/getCategoriesAction";

function Categories() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.access);

    useEffect(() => {
        const loadCategories = () => dispatch(getCategoriesAction(auth.access_token));
        loadCategories();
      }, [dispatch, auth.access_token]);

    const categories = useSelector((state) => state.categories.categories);
    console.log(categories);
    return (
        <>
        <h1>Categories</h1>
        <Table striped bordered hover variant="dark">
        <thead>
            <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Created</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {categories.map(category => (  
                <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>{category.created_at}</td>
                    <td> 
                        <Button variant="primary">Edit</Button> {'  '}{'  '}
                        <Button variant="danger">Delete</Button>
                    </td>
                    </tr>
                ))}
        </tbody>
        </Table>
        </>
    );
}

export { Categories };