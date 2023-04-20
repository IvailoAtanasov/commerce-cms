import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { setAuthUi } from "@/store/slices/uiSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
    } catch (error) {
      setUser(null);
      router.push("/auth");
    }
  };

  if (!user) return null;

  return (
    <Box
      sx={{
        background: "-webkit-linear-gradient(#141E30, #243B55)",
        // "-webkit-linear-gradient(#0F2027, #203A43, #2C5364)",
        height: "100vh",
      }}
    >
      <Button
        onClick={async () => {
          await Auth.signOut()
            .then(() => {
              dispatch(setAuthUi("signIn"));
            })
            .then(() => {
              router.push("/auth");
            })
            .then(() => {
              setUser(null);
            })
            .catch((e) => console.log(e));
        }}
      >
        SignOut
      </Button>
      {/* <h1>{user?.attributes.email}</h1> */}
    </Box>
  );
}
