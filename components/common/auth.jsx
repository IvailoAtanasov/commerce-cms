import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Hub } from "aws-amplify";

import { setAuthUi } from "@/store/slices/uiSlice";
import { useRouter } from "next/router";

const AuthComponent = React.memo(() => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      console.log("event", event);
      switch (event) {
        case "signIn":
          // console.log("signIn: ", data);

          break;
        case "signUp":
          console.log("signUp", data);
          break;
        // case "signOut":
        //   dispatch(setAuthUi("signIn"));
        //   router.push("/auth");
        //   break;
        case "oAuthSignOut":
          // router.push("/auth");
          // // console.log("social signout");
          // // dispatch(setAuthUi("signIn"));

          break;
        // case "customOAuthState":
        //   console.log("custom oAuth", data);
      }
    });

    // Auth.currentAuthenticatedUser()
    //   .then((currentUser) => console.log("currentUser", currentUser))
    //   .catch(() => console.log("Not signed in"));

    return unsubscribe;
  }, []);

  return null;
});
export default AuthComponent;
