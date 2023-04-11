import React from "react";
import "@/styles/globals.css";
import createEmotionCache from "@/utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { useRouter } from "next/router";
import Layout from "@/layouts/Layout";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/utils/theme";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "@/store/store";
import { Provider } from "react-redux";
import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";

const clientSideEmotionCache = createEmotionCache();

Amplify.configure({ ...awsExports, ssr: true });

let persistor = persistStore(store);

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();
  const LayoutComponent = router.pathname.startsWith(`/auth`)
    ? React.Fragment
    : Layout;

  return getLayout(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <LayoutComponent>
              <Component {...pageProps} />
            </LayoutComponent>
          </ThemeProvider>
        </CacheProvider>
      </PersistGate>
    </Provider>
  );
}
