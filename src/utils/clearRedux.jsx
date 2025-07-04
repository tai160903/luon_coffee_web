import { logout } from "../redux/authSlice";
import { persistor } from "../redux/store";

export const clearReduxState = (dispatch) => {
  console.log("Clearing Redux state and persistor");
  dispatch(logout());
  persistor.purge();
};
