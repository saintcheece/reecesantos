import { Link } from "react-router-dom";
// import notFoundImage from "/notfound.svg";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-4">
      <div className="max-w-md w-full">
        <div className="text-center">
          <img
            src={notFoundImage}
            alt="Page not found"
            className="mx-auto mb-6 w-96 h-auto"
          />

          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Page Not Found
          </h1>

          <p className="text-slate-600 mb-8">
            Sorry, the page you’re looking for doesn’t exist or may have been
            moved.
          </p>

          <Link
            to="/"
            className="inline-block px-6 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Error404 };
