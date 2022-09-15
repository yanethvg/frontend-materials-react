import React,{useCallback, useEffect , useState } from 'react';
//boostrap-react
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//redux
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../../actions/getCategoriesAction";
import CustomPagination from '../basic/CustomPagination';
import Loading from '../utils/Loading';

function Categories() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.access);
    const [page, setPage] = useState(1);
    const [ search, setSearch ] = useState('');

    const categories = useSelector((state) => state.categories.categories);
    const loading = useSelector((state) => state.categories.loading);
    const total = useSelector((state) => state.categories.pages);

    const handleChangePage = useCallback((page) => {
        setPage(page);
    }, []);

    useEffect(() => {
        const loadCategories = () => dispatch(getCategoriesAction(auth.access_token, page, search));
        loadCategories();
      }, [ dispatch, auth.access_token, page, search]);

    return (
        <>
        <h1 className='d-flex justify-content-center'>Categories</h1>
        <div style={{ marginTop: "2rem"}}>
        <Form.Group controlId="formBasicSearch" className='d-flex flex-row'>
            <Form.Control 
                type="search" 
                placeholder="Enter name or description" 
                style={{ marginRight: "1rem"}} 
                onChange={(e) => setSearch(e.target.value)} />
        </Form.Group>
        </div>
        {
            loading ? 
            <div className='d-flex justify-content-center'>
                <Loading type={'spin'} color={'#0000ff'} />
            </div>
            : 
            <Table striped bordered hover variant="dark" className='mt-3'>
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
                {categories.map(category => (  
                    <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>{category.description}</td>
                        <td>{category.materials}</td>
                        <td>{category.created_at}</td>
                        <td> 
                            <Button variant="info">Edit</Button> {'  '}{'  '}
                            <Button variant="danger">Delete</Button>
                        </td>
                        </tr>
                    ))}
            </tbody>
            </Table>
        }
       <div className='d-flex justify-content-center'>
            {total > 1 && loading == false && (
                <CustomPagination 
                className="justify-content-center"
                total={ total }
                current={page}
                onChangePage={handleChangePage}
                />
            )}
       </div>
        </>
    );
}

export { Categories };