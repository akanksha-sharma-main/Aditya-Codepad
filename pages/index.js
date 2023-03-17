import React, { useState, useEffect } from "react";
import FeatherIcon from 'feather-icons-react';
import axios from 'axios';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import { useRouter } from 'next/router'
import DOMPurify from 'dompurify'

const Index = ({ fileData }) => {
    const [nav, setnav] = useState('not-active')
    const [data, setData] = useState()
    const [filePath, setfilePath] = useState(fileData.data[0].path)
    const [firstLine, setfirstLine] = useState(fileData.data[0].first_line)
    const filePathSplit = filePath.split("\\")
    const [mykey, setMyKey] = useState(Math.random())
    const url = `https://akankshasharmamain.pythonanywhere.com/file?path=${filePath}`
    const fetchData = (path) => {
        axios.post(url)
            .then(response => {
           console.log(response); setData(response.data.content);
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
        axios.post(url,)
            .then(response => {
                setData(response.data.content);
                const codeElements = document.querySelectorAll('code');
                codeElements.forEach((code) => {
                    hljs.highlightBlock(code);
                    setMyKey(Math.random())
                });
            })
            .catch(error => {
                console.log(error);
            });
        const codeElements = await document.querySelectorAll('code');
        codeElements.forEach(async (code) => {
            await hljs.highlightBlock(code);
            await setMyKey(Math.random())
        });

    }, [])

    function renderFileList(files) {
        // Group files by name
        const filesByName = files.reduce((acc, file) => {
            if (!acc[file.name]) {
                acc[file.name] = [];
            }
            acc[file.name].push(file);
            return acc;
        }, {});

        // Render file list
        return files.map((file, index) => {
            const [isActive, setIsActive] = useState(Array(fileData.length).fill(false))

            const handleShowMoreClick = (index) => {
                const updatedShowMore = [...isActive]
                updatedShowMore[index] = !updatedShowMore[index]
                setIsActive(updatedShowMore)
            }
            if (file.dir) {
                const firstLines = { file: filesByName[file.name].map(file => file.first_line), path: filesByName[file.name].map(file => file.path) }
                return (
                    <li key={index} className={`nav-item is-current-page ${isActive[index] ? 'is-active' : ''}`} data-depth="1">
                        <FeatherIcon icon={`chevron-${isActive[index] ? 'down' : 'right'}`} className={`absolute z-50 mt-1 right-2`} width="15px" />
                        <a onClick={() => { handleShowMoreClick(index) }} className="nav-link nav-item-toggle">{file.name}</a>
                        <ul className="nav-list cursor-pointer">
                            {firstLines.file.map((line, i) => (
                                <li key={i} onClick={() => {
                                    setfilePath(firstLines.path[i]); setfirstLine(line); fetchData(filePath)
                                }} className="nav-item" data-depth="2">
                                    <a className="nav-link">{line}</a>
                                </li>
                            ))}
                        </ul>
                    </li>
                );
            } else {
                return (
                    <li onClick={async () => {
                        await setfirstLine(file.first_line);
                        await setfilePath(file.path);
                        await fetchData(file.path);
                        const codeElements = document.querySelectorAll('code');
                        codeElements.forEach((code) => {
                            hljs.highlightBlock(code);
                            setMyKey(Math.random())
                        });
                        await setMyKey(Math.random());
                    }} key={index} className={`nav-item is-current-page`} data-depth="1">
                        <a className="nav-link nav-item-toggle">{file.name}</a>
                    </li>
                );
            }
        });
    }



    return (
        <div className="body">

            <div className={`nav-container ${nav}`} data-component="cypher-manual" data-version="5">
                <aside className="nav">
                    <div className="panels">
                        <div className="nav-panel-menu is-active" data-panel="menu">
                            <nav className="nav-menu">
                                <ul className="nav-list">
                                    <li className="nav-item " data-depth="0">
                                        <ul key={mykey} className="nav-list">
                                            {renderFileList(fileData.data)}
                                        </ul>
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
                        <button onClick={()=>{
                            if(nav === "is-active"){
                                setnav("not-active")
                            } else {
                                setnav("is-active")
                            }
                        }} className="nav-toggle"  aria-label="Toggle Table of Contents"></button>
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
    const res = await fetch(`http://akankshasharmamain.pythonanywhere.com`);
    const data = await res.json();

    return {
        props: {
            fileData: { data },
        }
    }
}  