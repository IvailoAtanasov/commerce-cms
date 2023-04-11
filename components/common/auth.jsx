import React from "react";
import { useDispatch } from "react-redux";

const AuthComponent = React.memo(() => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((data) => {
      if (data) {
        listener(data, dispatch, setActiveUser, setAtuhGroups, setAuthError);
        return unsubscribe;
      }
    });

    // eslint-disable-next-line
  }, [dispatch]);

  return null;
});
export default AuthComponent;
