import * as React from "react";
import { useRouter } from 'next/router'
import Head from "next/head";
import "../styles/style.css";
import LoadingBar from 'react-top-loading-bar'
import Navbar from "../assets/navbar";
import { useState, useEffect } from "react";
import FeatherIcon from 'feather-icons-react';
import axios from 'axios';

export default function MyApp(props) {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [name, setName] = useState('')
  const [key, setKey] = useState()
  const { Component, pageProps } = props;
  useEffect(() => {
    router.events.on('routeChangeStart', () => { setProgress(40) });
    router.events.on('routeChangeComplete', () => { setProgress(100) });
    setKey(Math.random())
  }, [router.query])
  const [enable, setEnable] = useState("hidden")
  const handleNameChange = (event) => {
    setName(event.target.value);
  }
  const loadhalf = () => {
    setProgress(40)
  }
  const loadfull = () => {
    setProgress(100)
  }
  const [inputType, setinputType] = useState("file")
  const [directoriesAndFiles, setDirectoriesAndFiles] = useState([])
  const [files, setfiles] = useState([])
  const [isActive, setIsActive] = useState(Array(directoriesAndFiles.length).fill(false))
  const [listkey, setlistKey] = useState(Math.random())
  const [nav, setnav] = useState('not-active')
  const [data, setData] = useState()
  const [filePath, setfilePath] = useState("tutorials\\09 tutorial\\Tutorial.md")
  const [firstLine, setfirstLine] = useState("#Typecasting in python")
  const filePathSplit = filePath.split("\\")
  const [mykey, setMyKey] = useState(Math.random())
  const fetchData = (path) => {
    loadhalf();
    axios.post(`http://localhost:3001/file?path=${path}`)
      .then(async (response) => {
        await setData(response.data.content);
        await loadfull();
      })
      .catch(error => {
        console.log(error);
      });
  }

function reloadList(){
  fetch('http://localhost:3001/generate')
      .then(response => response.json())
      .then(data => { setDirectoriesAndFiles(data.directoriesAndFile); })
    fetch('http://localhost:3001/dirfiles')
      .then(response => response.json())
      .then(data => { setfiles(data); setlistKey(Math.random())})
}
  useEffect(() => {
    fetchData(filePath)
    fetch('http://localhost:3001/generate')
      .then(response => response.json())
      .then(data => { setDirectoriesAndFiles(data.directoriesAndFile); })
    fetch('http://localhost:3001/dirfiles')
      .then(response => response.json())
      .then(data => { setfiles(data) })
  }, [])
  const getfirstline = (firstline) => {
    if (firstline.indexOf("#") !== -1) {
      let splitwords = firstline.split('#')
      if (splitwords[1] == '') {
        return splitwords[2]
      } else if (splitwords[0] == '') {
        return splitwords[1]
      } else {
        return firstline
      }
    }
    else {
      return firstline
    }
  }
  const handleShowMoreClick = (index) => {
    const updatedShowMore = [...isActive]
    updatedShowMore[index] = !updatedShowMore[index]
    setIsActive(updatedShowMore)
  }
  const renderDirectoryOrFile = (directoryOrFile, index) => {
    if (directoryOrFile.isdir) {
      return (

        <li key={index} className={`nav-item is-current-page ${isActive[index] ? 'is-active' : ''}`} data-depth="1">
          <FeatherIcon icon={`chevron-${isActive[index] ? 'down' : 'right'}`} className={`absolute z-50 mt-1 right-2`} width="15px" />
          <a onClick={() => { handleShowMoreClick(index) }} className="nav-link nav-item-toggle">{directoryOrFile.directoryname}</a>
          <ul className="nav-list cursor-pointer">
            {directoryOrFile.directoryfiles.map((file, Index) => (
              <li onClick={() => {
                loadhalf(); setfilePath(file.filelocation); setfirstLine(file.firstline); fetchData(file.filelocation)
              }} key={Index} className="nav-item" data-depth="2">
                <a className="nav-link">{file.filename}</a>
              </li>
            ))}
          </ul>
        </li>
      )
    }
  }

  const fileitems = [];
  for (const myfile of files) {
    fileitems.push(
      <ul onClick={() => {
        loadhalf(); setfilePath(myfile.filelocation); setfirstLine(myfile.firstline); fetchData(myfile.filelocation)
      }} key={myfile.filename} className={`nav-item is-current-page`} data-depth="1">
        <a className="nav-link nav-item-toggle">{myfile.filename}</a>
        <FeatherIcon onClick={()=>{fetch('http://localhost:3001/removefile', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          "username": "tutorials",
                          "dirname": `${name}`
                        }),
                      })}} icon="trash-2" className={`absolute z-50 mt-1 right-2 cursor-pointer text-red-400 hover:text-red-500`} width="15px" />
      </ul>
    )
  }
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
      <Navbar />
      <div className="body">
        <div className={`nav-container ${nav}`} data-component="cypher-manual" data-version="5">
          <aside className="nav">
            <div className="panels">
              <div className="nav-panel-menu is-active" data-panel="menu">
                <nav className="nav-menu">
                  <div className="h-8 flex justify-end pr-5 text-center items-center bg-gray-100">
                    <span className={`${enable} mr-1.5`}><input placeholder={`Enter ${inputType.charAt(0).toUpperCase() + inputType.slice(1)} name`} value={name} onChange={handleNameChange} className="block w-full md:h-6 h-6 border-0 text-gray-900 shadow-sm px-1.5 ring-1 ring-inset ring-gray-300 focus:border-none placeholder:text-gray-400 ml-1 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </span><span className={enable} onClick={() => {if(inputType=="file" && name!="" || " "){
                      fetch('http://localhost:3001/createfile', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          "username": "tutorials",
                          "filename": `${name}.md`,
                          "filecontent": ''
                        }),
                      })} else if(inputType=="folder" && name!="" || " ") {
                        fetch('http://localhost:3001/createdir', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          "username": "tutorials",
                          "dirname": `${name}`
                        }),
                      })
                      };reloadList();
                    }}><FeatherIcon icon="plus" className="p-1 cursor-pointer bg-[#98b5ff] ml-1 rounded-md" /></span>
                    <hr className="h-full w-2" />
                    <span onClick={()=>{setinputType("file");setEnable("")}}><FeatherIcon icon="file-plus" className="p-1 cursor-pointer" /></span>
                    <span onClick={()=>{setinputType("folder");setEnable("")}}><FeatherIcon icon="folder-plus" className="p-1 cursor-pointer" /></span>
                    <span><FeatherIcon icon="rotate-cw" onClick={() => {
                      reloadList();setTimeout(()=>{setEnable("hidden"); setName("")}, 500)
                    }} className="p-1 cursor-pointer" /></span>
                  </div>
                  <ul key={listkey} className="nav-list">
                    <ul className="nav-item " data-depth="0">
                      {directoriesAndFiles.slice(1).map((directoryOrFile, index) => (
                        <li key={index}>
                          {renderDirectoryOrFile(directoryOrFile, index)}
                        </li>
                      ))}
                      {fileitems}
                    </ul>
                  </ul>
                </nav>
              </div>
            </div>
          </aside>
        </div>
        <main className="article">
          <div className="toolbar" role="navigation">
            <div className="toolbar-wrapper">
              <button onClick={() => {
                if (nav === "is-active") {
                  setnav("not-active")
                } else {
                  setnav("is-active")
                }
              }} className="nav-toggle" aria-label="Toggle Table of Contents"></button>
              <a href="/" className="home-link is-current" aria-label="Go to home page"></a>
              <nav className="breadcrumbs cursor-default" aria-label="breadcrumbs">
                <ul>
                  <li><a>{filePathSplit[0]}</a></li>
                  <li><a>{filePathSplit[1]}</a></li>
                  <li><a>{firstLine}</a></li>
                </ul>
              </nav>
            </div>
          </div>
          <Component data={data} key={mykey} {...pageProps} />
        </main>
      </div>
    </>
  );
}