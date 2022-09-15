import React, { useCallback, useEffect, useState, useTransition , Suspense } from "react";
//boostrap-react
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../actions/category/getCategoriesAction";
import { deleteCategoryAction } from "../actions/category/deleteCategoryAction";
// componentes utils
import CustomPagination from "../components/basic/CustomPagination";
import Loading from "../components/utils/Loading";
// custom componentes
import { Category } from "../components/categories/Category";
import { Categories } from "../components/categories/Categories";

function CategoriesPage() {
  const dispatch = useDispatch();
  // getting token
  const auth = useSelector((state) => state.auth.access);
  // manage pagination and search
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // saving and getting category
  const [category, setCategory] = useState(undefined);

  const categories = useSelector((state) => state.categories.categories);
  const loading = useSelector((state) => state.categories.loading);
  const total = useSelector((state) => state.categories.pages);

  const [inTransition, startTransition] = useTransition();

  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);

  useEffect(() => {
    const loadCategories = () =>
      dispatch(getCategoriesAction(auth.access_token, page, search));
      startTransition(() => {
         loadCategories();
      });
    // loadCategories();
  }, [dispatch, auth.access_token, page, search]);

  // delete category
  const deleteCategory = (id, token) =>
    dispatch(deleteCategoryAction(id, token));

  const handleDelete = (id) => {
    deleteCategory(id, auth.access_token);
  };

  // modal configuration
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // manage data with modal and state
  const handleEdit = (category) => {
    setCategory(category);
    handleShow();
  };

  const handleCleanData = () => {
    setCategory(undefined);
    handleClose();
  };

  return (
    <>
      <h1 className="d-flex justify-content-center">Categories</h1>
      <div style={{ marginTop: "2rem" }}>
        <Form.Group controlId="formBasicSearch" className="d-flex flex-row">
          <Form.Control
            type="search"
            placeholder="Enter name or description"
            style={{ marginRight: "1rem" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="success" onClick={() => handleShow()}>
            Create{" "}
          </Button>
        </Form.Group>
      </div>
      {inTransition && !loading ? (
        <div className="d-flex justify-content-center">
          <Loading type={"spin"} color={"#0000ff"} />
        </div>
      ) : null}
      <Suspense>
        <Categories
          categories={categories}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Suspense>

      {total > 1 && loading == false && (
        <div className="d-flex justify-content-center">
          <CustomPagination
            className="justify-content-center"
            total={total}
            current={page}
            onChangePage={handleChangePage}
          />
        </div>
      )}
      <Category
        show={show}
        handleCleanData={handleCleanData}
        category={category}
      />
    </>
  );
}

export { CategoriesPage };
