import React, { useState, useEffect } from "react";
import FeatherIcon from 'feather-icons-react';
import axios from 'axios';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import { useRouter } from 'next/router';
import DOMPurify from 'dompurify';

const Index = ({ loadfull, loadhalf }) => {
    const [directoriesAndFiles, setDirectoriesAndFiles] = useState([])
    const [isActive, setIsActive] = useState(Array(directoriesAndFiles.length).fill(false))
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
        const codeElements = document.querySelectorAll('code');
        codeElements.forEach((code) => {
            hljs.highlightBlock(code);
            setMyKey(Math.random())
        });
    }
    const router = useRouter()
    useEffect(async () => {
        fetchData(filePath)
        const codeElements = await document.querySelectorAll('code');
        codeElements.forEach(async (code) => {
            await hljs.highlightBlock(code);
            await setMyKey(Math.random())
        });
        fetch('http://localhost:3001/generate')
            .then(response => response.json())
            .then(data => { setDirectoriesAndFiles(data.directoriesAndFiles) })
    }, [])
    const getfirstline = (firstline) => {
        if(firstline.indexOf("#") !== -1){
        let splitwords = firstline.split('#')
        if (splitwords[1] == '') {
            return splitwords[2]
        } else if (splitwords[0] == '') {
            return splitwords[1]
        } else {
            return firstline
        }}
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
                            <li key={Index} onClick={() => {
                                loadhalf(); setfilePath(file.filelocation); setfirstLine(file.firstline); fetchData(file.filelocation)
                            }} className="nav-item" data-depth="2">
                                <a className="nav-link">{file.filename}</a>
                            </li>
                        ))}
                    </ul>
                </li>
            )
        } else {
            return (
                <li onClick={async () => {
                    await loadhalf();
                    await setfirstLine(directoryOrFile.firstline);
                    await setfilePath(directoryOrFile.filelocation);
                    await fetchData(directoryOrFile.filelocation);
                    const codeElements = document.querySelectorAll('code');
                    codeElements.forEach((code) => {
                        hljs.highlightBlock(code);
                        setMyKey(Math.random())
                    });
                    await setMyKey(Math.random());
                }} key={index} className={`nav-item is-current-page`} data-depth="1">

                    <a className="nav-link nav-item-toggle">{directoryOrFile.firstline}</a>
                </li>
            )
        }
    }



    return (
        <div className="body">
            <div className={`nav-container ${nav}`} data-component="cypher-manual" data-version="5">
                <aside className="nav">
                    <div className="panels">
                        <div className="nav-panel-menu is-active" data-panel="menu">
                            <nav className="nav-menu">
                                <ul className="nav-list">
                                    <li className="nav-item" data-depth="0">
                                        {directoriesAndFiles.map((directoryOrFile, index) => (
                                            <li key={index} className="nav-list">
                                                {renderDirectoryOrFile(directoryOrFile, index)}
                                            </li>
                                        ))}
                                    </li>
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

                <div className="content mt-5">
                    <article key={mykey} className="doc">
                        {data && <div key={mykey} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data) }}></div>}
                    </article>
                </div>
            </main>
        </div>
    )
}

export default Index

export async function getStaticProps() {
    const res = await fetch("http://localhost:3001/generate");
    const data = await res.json();

    return {
        props: {
            fileData: data.directoriesAndFiles,
        }
    }
}  