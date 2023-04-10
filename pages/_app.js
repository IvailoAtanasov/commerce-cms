import React from "react";
import "@/styles/globals.css";
import createEmotionCache from "@/utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { useRouter } from "next/router";
import Layout from "@/layouts/Layout";

const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
  ...appProps
}) {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();
  const LayoutComponent = router.pathname.startsWith(`/auth`)
    ? React.Fragment
    : Layout;

  return getLayout(
    <CacheProvider value={emotionCache}>
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
    </CacheProvider>
  );
}
