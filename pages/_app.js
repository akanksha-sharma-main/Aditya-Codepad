import * as React from "react";
import { useRouter } from 'next/router'
import Head from "next/head";
import "../styles/style.css";
import LoadingBar from 'react-top-loading-bar'
import Navbar from "../assets/navbar";
import { useState, useEffect } from "react";
import FeatherIcon from 'feather-icons-react';
import axios from 'axios';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { DocumentPlusIcon } from '@heroicons/react/24/outline'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function MyApp(props) {
  const cancelButtonRef = useRef(null)
  const [removefilelocation, setRemoveFileLocation] = useState("")
  const [removedirlocation, setRemoveDirLocation] = useState("")
  const [createfile, setcreatefile] = useState({ username: null, directory: null, filename: null })
  const [deleteType, setdeleteType] = useState("file")
  const [createfilename, setcreatefilename] = useState('')
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [create, setCreate] = useState(false)
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
  const handleFileNameChange = (event) => {
    setcreatefilename(event.target.value);
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
  const [filePath, setfilePath] = useState("tutorials/welcome.md")
  const [firstLine, setfirstLine] = useState("#Welcome to Codepad")
  const filePathSplit = filePath.split("/")
  const [mykey, setMyKey] = useState(Math.random())
  const fetchData = (path) => {
    loadhalf();
    axios.post(`https://akankshasharmamain.pythonanywhere.com/file?path=${path}`)
      .then(async (response) => {
        await setData(response.data.content);
        await loadfull();
      })
      .catch(error => {
        console.log(error);
      });
  }

  function reloadList() {
    fetch('https://akankshasharmamain.pythonanywhere.com/generate')
      .then(response => response.json())
      .then(data => { setDirectoriesAndFiles(data.directoriesAndFile); })
    fetch('https://akankshasharmamain.pythonanywhere.com/dirfiles')
      .then(response => response.json())
      .then(data => { setfiles(data); setlistKey(Math.random()) })
  }
  useEffect(() => {
    fetchData(filePath)
    fetch('https://akankshasharmamain.pythonanywhere.com/generate')
      .then(response => response.json())
      .then(data => { setDirectoriesAndFiles(data.directoriesAndFile); })
    fetch('https://akankshasharmamain.pythonanywhere.com/dirfiles')
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
          <FeatherIcon onClick={async () => {
            await setdeleteType("directory")
            await setRemoveDirLocation(directoryOrFile.directoryname);
            await setOpen(true);
          }} icon="trash-2" className={`absolute z-50 mt-1 right-7 cursor-pointer text-red-400 hover:text-red-500`} width="15px" />
          <FeatherIcon onClick={async () => {
            await setcreatefile({ username: "tutorials", directory: directoryOrFile.directoryname })
            await setCreate(true)
          }} icon="file-plus" className={`absolute z-50 mt-1 right-11 cursor-pointer text-gray-400 hover:text-gray-500`} width="15px" />
          <a onClick={() => { handleShowMoreClick(index); }} className="nav-link nav-item-toggle">{directoryOrFile.directoryname}</a>
          <ul className="nav-list cursor-pointer">
            {directoryOrFile.directoryfiles.map((file, Index) => (
              <li onClick={() => {
                loadhalf(); setfilePath(file.filelocation); setfirstLine(file.firstline); fetchData(file.filelocation)
              }} key={Index} className="nav-item" data-depth="2">
                <FeatherIcon onClick={async () => {
                  await setdeleteType("file");
                  await setRemoveFileLocation(file.filelocation);
                  await setOpen(true);
                }} icon="trash-2" className={`absolute z-50 mt-1 right-2 cursor-pointer text-red-400 hover:text-red-500`} width="15px" />
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
        <FeatherIcon onClick={async () => {
          await setdeleteType("file");
          await setRemoveFileLocation(`tutorials/${myfile.filename}`);
          await setOpen(true);
        }} icon="trash-2" className={`absolute z-50 mt-1 right-2 cursor-pointer text-red-400 hover:text-red-500`} width="15px" />
        <a className="nav-link nav-item-toggle">{myfile.filename}</a>

      </ul>
    )
  }
  return (
    <><Transition.Root show={create} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setCreate}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-200 sm:mx-0 sm:h-10 sm:w-10">
                      <DocumentPlusIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">

                      <Dialog.Title as="div" className="text-base font-light leading-6 text-gray-900">
                        <input value={createfilename} onChange={handleFileNameChange} className="block rounded-lg h-8 w-full border-0 text-gray-900 shadow-sm px-1.5 ring-1 ring-inset ring-gray-300 focus:border-none placeholder:text-gray-400 ml-1 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6" />
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          This will create a <code>.md</code> type file in your choosen directory with the name above.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button style={{ backgroundColor: "#018bff" }}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                    onClick={async () => {
                      await setcreatefile()
                      await fetch('https://akankshasharmamain.pythonanywhere.com/createdirfile', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          "username": createfile.username, "directory": createfile.directory, "filename": createfilename , "filecontent": ""
                        }),
                      })
                      await setCreate(false)
                      await reloadList()
                    }}
                  >
                    Create file
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setCreate(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Delete {deleteType === "file" ? "File" : "Folder"}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete your {deleteType === "file" ? "File" : "Folder"}? All of your data will be permanently
                            removed. This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={async () => {
                        if (deleteType === "file") {
                          await fetch('https://akankshasharmamain.pythonanywhere.com/removefile', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                              "username": "tutorials",
                              "filelocation": removefilelocation
                            }),
                          })
                          await setOpen(false)
                          await reloadList()
                        }
                        else if (deleteType === "directory") {
                          await fetch('https://akankshasharmamain.pythonanywhere.com/removedir', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                              "username": "tutorials",
                              "dirname": removedirlocation
                            }),
                          })
                          await setOpen(false)
                          await reloadList()
                        } else {
                          setOpen(false)
                        }
                      }}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
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
              <div className="h-8 flex justify-end pr-5 text-center items-center bg-gray-100">
                <span className={`${enable} mr-1.5`}><input placeholder={`Enter ${inputType.charAt(0).toUpperCase() + inputType.slice(1)} name`} value={name} onChange={handleNameChange} className="block w-full md:h-6 h-6 border-0 text-gray-900 shadow-sm px-1.5 ring-1 ring-inset ring-gray-300 focus:border-none placeholder:text-gray-400 ml-1 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </span><span className={enable} onClick={async () => {
                  if (name != "" || " ") {
                    if (inputType == "file") {
                      await fetch('https://akankshasharmamain.pythonanywhere.com/createfile', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          "username": "tutorials",
                          "filename": `${name}.md`,
                          "filecontent": ''
                        }),
                      }); await setName("")
                    } else if (inputType == "folder") {
                      await fetch('https://akankshasharmamain.pythonanywhere.com/createdir', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          "username": "tutorials",
                          "dirname": `${name}`
                        }),
                      }); await setName("")
                    }
                  }; reloadList();
                }}><FeatherIcon icon="plus" className="p-1 cursor-pointer bg-[#98b5ff] ml-1 rounded-md" /></span>
                <hr className="h-full w-2" />
                <span onClick={() => { setinputType("file"); setEnable(""); setName("") }}><FeatherIcon icon="file-plus" className="p-1 cursor-pointer" /></span>
                <span onClick={() => { setinputType("folder"); setEnable(""); setName("") }}><FeatherIcon icon="folder-plus" className="p-1 cursor-pointer" /></span>
                <span><FeatherIcon icon="rotate-cw" onClick={() => {
                  reloadList(); setTimeout(() => { setEnable("hidden"); setName("") }, 500)
                }} className="p-1 cursor-pointer" /></span>
              </div>
              <div className="nav-panel-menu is-active" data-panel="menu">
                <nav className="nav-menu">
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
