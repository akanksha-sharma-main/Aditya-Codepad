import * as React from "react";
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import Head from "next/head";
import "../styles/style.css";
import LoadingBar from 'react-top-loading-bar'
import Navbar from "../assets/navbar";

export default function MyApp(props) {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState()
  const [mykey, setMyKey] = useState()
  const { Component, pageProps } = props;
  useEffect(() => {
    router.events.on('routeChangeStart', () => { setProgress(40) });
    router.events.on('routeChangeComplete', () => { setProgress(100) });
    setKey(Math.random())
    const codeElements = document.querySelectorAll('code');
                codeElements.forEach((code) => {
                    hljs.highlightBlock(code);
                    setMyKey(Math.random())
                });
  }, [router.query])
  return (
    <>
      <LoadingBar
        color='#03c9d7'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Head>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/default.min.css"/>
        <title>Personal Python Docs</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/highlight.min.js"></script>
        <script src="site.js"></script>
      </Head>
      <Navbar/>
      <Component key={mykey} {...pageProps} /></>
  );
}