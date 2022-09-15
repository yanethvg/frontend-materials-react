import React, {
  useCallback,
  useEffect,
  useState,
  useTransition,
  Suspense,
} from "react";
//boostrap-react
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getUnitMeasuresAction } from "../actions/measure/getUnitMeasuresAction";
// componentes utils
import CustomPagination from "../components/basic/CustomPagination";
import Loading from "../components/utils/Loading";
import { Measures } from "../components/measures/Measures";

function MeasuresPage() {
  const dispatch = useDispatch();
  // getting token
  const auth = useSelector((state) => state.auth.access);
  // manage pagination and search
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // saving and getting category
  const [unit_measure, setUnitMeasure] = useState(undefined);

  const unit_measures = useSelector((state) => state.unit_measures.unit_measures);
  const loading = useSelector((state) => state.unit_measures.loading);
  const total = useSelector((state) => state.unit_measures.pages);

  const [inTransition, startTransition] = useTransition();

  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);

  useEffect(() => {
    const loadUnitMeasures = () =>
      dispatch(getUnitMeasuresAction(auth.access_token, page, search));
    startTransition(() => {
      loadUnitMeasures();
    });
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
  const handleEdit = (unit_measure) => {
    setUnitMeasure(unit_measure);
    handleShow();
  };

  const handleCleanData = () => {
    setUnitMeasure(undefined);
    handleClose();
  };
  return (
    <>
      <h1 className="d-flex justify-content-center">Unit Measure</h1>
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
        <Measures
          unit_measures={unit_measures}
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
      {/* <Category
        show={show}
        handleCleanData={handleCleanData}
        category={category}
      /> */}
    </>
  );
}

export { MeasuresPage };
