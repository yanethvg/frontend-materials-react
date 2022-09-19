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
import { getMaterialsAction } from "../actions/material/getMaterialsAction";
import { deleteMaterialAction } from "../actions/material/deleteMaterialAction";
import { getCategoriesListAction } from "../actions/category/getCategoriesListAction";
import { getUnitMeasuresListAction } from "../actions/measure/getUnitMeasureListAction"
// componentes utils
import CustomPagination from "../components/basic/CustomPagination";
import { Materials } from "../components/materials/Materials";
import { Material } from "../components/materials/Material";
import Loading from "../components/utils/Loading";

function MaterialsPage() {
  const dispatch = useDispatch();
  // getting token
  const auth = useSelector((state) => state.auth.access);
  // manage pagination and search
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [measure, setMeasure] = useState("");

  // saving and getting unit measure
  const [material, setMaterial] = useState(undefined);

  const materials = useSelector((state) => state.materials.materials);
  const loading = useSelector((state) => state.materials.loading);
  const total = useSelector((state) => state.materials.pages);
  const categories = useSelector((state) => state.categories.categories);
  const measures = useSelector ((state) => state.unit_measures.unit_measures);
  

  const [inTransition, startTransition] = useTransition();

  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);

  //loading all categories
  const loadCategories = () =>
    dispatch(getCategoriesListAction(auth.access_token));
  //loading all unit measures
  const loadUnitMeasures = () =>
    dispatch(getUnitMeasuresListAction(auth.access_token));

  // delete material
  const deleteMaterial = (id, token) =>
    dispatch(deleteMaterialAction(id, token));
  const handleDelete = (id) => {
    deleteMaterial(id, auth.access_token);
  };

  useEffect(() => {
    const loadMaterials = () =>
      dispatch(
        getMaterialsAction(auth.access_token, page, search, category, measure)
      );
    startTransition(() => {
      loadMaterials();
    });
    loadCategories();
    loadUnitMeasures();
    
  }, [dispatch, auth.access_token, page, search, category, measure]);

  // modal configuration
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // manage data with modal and state
  const handleEdit = (data) => {
    setMaterial(data);
    handleShow();
  };

  const handleCleanData = () => {
    setMaterial(undefined);
    handleClose();
  };

  return (
    <>
      <h1 className="d-flex justify-content-center">Materials</h1>
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
        <Materials
          materials={materials}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Suspense>
      {total > 1 && loading == false ? (
        <div className="d-flex justify-content-center">
          <CustomPagination
            className="justify-content-center"
            total={total}
            current={page}
            onChangePage={handleChangePage}
          />
        </div>
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <h2>No results found</h2>
        </div>
      )}
      <Material
        show={show}
        handleCleanData={handleCleanData}
        material_list={material}
        categories= {categories}
        measures= {measures}
      />
    </>
  );
}

export { MaterialsPage };
