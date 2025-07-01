import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ token, requiredRole, children }) => {
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];

    if (requiredRole && !requiredRole.includes(userRole)) {
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
