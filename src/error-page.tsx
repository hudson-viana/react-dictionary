import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="fontFamily bg-[#232529] text-gray-300 relative p-4 flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl">Page not found</h1>
      <Link to="/" className="bg-gray-500 hover:bg-gray-700 rounded-lg p-2 mt-4 text-white transition ">Go to Home Page</Link>
    </div>
  );
}