import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Something went wrong</h1>
      <p className="text-gray-600">{error?.statusText || error?.message || "Page not found"}</p>
      <Link to="/" className="text-blue-600 underline">
        Go back home
      </Link>
    </div>
  );
}

export default ErrorPage;