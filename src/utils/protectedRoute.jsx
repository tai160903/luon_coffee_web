import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ requiredRole, children }) => {
  const token = useSelector((state) => state.auth.tokens?.accessToken);
  console.log("token", token);
  const role = useSelector((state) => state.auth.role);
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    if (requiredRole && !requiredRole.includes(role)) {
      return <Navigate to="*" replace />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  token: PropTypes.string.isRequired,
  requiredRole: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
