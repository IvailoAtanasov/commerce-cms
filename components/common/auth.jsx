import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Hub, Auth } from "aws-amplify";

const AuthComponent = React.memo(() => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("useEffect");
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      console.log(event);
      switch (event) {
        case "signIn":
          console.log(data);
          break;
        case "signUp":
          console.log("listener", data);
          break;
        case "signOut":
          console.log(data);
          break;
        case "customOAuthState":
          console.log(data);
      }
    });

    Auth.currentAuthenticatedUser()
      .then((currentUser) => console.log(currentUser))
      .catch(() => console.log("Not signed in"));

    return unsubscribe;
  }, [dispatch]);

  return null;
});
export default AuthComponent;
