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
  const { Component, pageProps } = props;
  useEffect(() => {
    router.events.on('routeChangeStart', () => { setProgress(40) });
    router.events.on('routeChangeComplete', () => { setProgress(100) });
    setKey(Math.random())
  }, [router.query])
  return (
    <>
      <LoadingBar
        color='#03c9d7'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Head>
        <title>Personal Python Docs</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Navbar/>
      <Component {...pageProps} /></>
  );
}