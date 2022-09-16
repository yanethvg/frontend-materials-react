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
// import { deleteMaterialAction } from "../actions/measure/deleteMaterialAction";
// componentes utils
import CustomPagination from "../components/basic/CustomPagination";
import { Materials } from "../components/materials/Materials";
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

  const [inTransition, startTransition] = useTransition();

  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);

  useEffect(() => {
    const loadMaterials = () =>
      dispatch(
        getMaterialsAction(auth.access_token, page, search, category, measure)
      );
    startTransition(() => {
      loadMaterials();
    });
  }, [dispatch, auth.access_token, page, search, category, measure]);

  // delete material
  // const deleteMaterial = (id, token) =>
  //   dispatch(deleteMaterialAction(id, token));

  // const handleDelete = (id) => {
  //   deleteMaterial(id, auth.access_token);
  // };

  // modal configuration
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // manage data with modal and state
  const handleEdit = (material) => {
    setMaterial(material);
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
          // handleDelete={handleDelete}
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
    </>
  );
}

export { MaterialsPage };
