import { Link } from "react-router-dom";
const Error500 = () => {
  return (
    <>
      {/*begin::Illustration*/}
      <img
        src="/media/illustrations/sketchy/18.png"
        alt="bg-img"
        className="mw-100 mb-10 h-lg-450px"
      />
      {/*end::Illustration*/}
      {/*begin::Message*/}
      <h1 className="fw-bold mb-10" style={{ color: "#A3A3C7" }}>
        Seems there is nothing here
      </h1>
      {/*end::Message*/}
      <div className="mb-0">
        <Link to="/" className="btn btn-sm btn-primary">
          Return Home
        </Link>
      </div>
      {/* begin::Link */}
    </>
  );
};
export { Error500 };
