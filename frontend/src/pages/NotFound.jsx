import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className=" min-h-screen flex items-center justify-center bg-gray-100">
      <div className=" text-center">
        <h1 className="text-9xl font-bold text-gray-300">404</h1>
        <h2 className=" text-2xl font-bold text-gray-800 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mt-2 ">
          Sorry , the page you are looking for does not exist.
        </p>
        <div className="mt-6">
          <Button onClick={() => navigate("../pages/Dashboard")}>Go to Dashboard</Button>
          <Button
            onClick={() => navigate(-1)}
            variant="secondary"
            className=" ml-3"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
