import { Outlet, Route, Routes } from "react-router-dom";
import { Error500 } from "./components/Error500";
import { Error404 } from "./components/Error404";
const ErrorsLayout = () => {
  return (
    <div className="d-flex flex-column flex-root">
      {/*begin::Authentication - 404 Page*/}
      <div className="d-flex flex-column flex-center flex-column-fluid p-10">
        <Outlet />
      </div>
      {/*end::Authentication - 404 Page*/}
    </div>
  );
};
const ErrorsPage = () => (
  <Routes>
    <Route element={<ErrorsLayout />}>
      <Route path="404" element={<Error404 />} />
      <Route path="500" element={<Error500 />} />
      <Route index element={<Error404 />} />
    </Route>
  </Routes>
);
export { ErrorsPage };
