import React, { useState, useEffect } from "react";
var showdown = require('showdown')


const Index = ({ fileData }) => {
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
          if (file.dir) {
            const firstLines = filesByName[file.name].map(file => file.first_line);
            return (
              <li key={index} className="nav-item is-current-page is-active" data-depth="1">
                <a className="nav-link nav-item-toggle">{file.name}</a>
                <ul className="nav-list">
                  {firstLines.map((line, i) => (
                    <li key={i} className="nav-item " data-depth="2">
                      <a className="nav-link">{line}</a>
                    </li>
                  ))}
                </ul>
              </li>
            );
          } else {
            return (
              <li key={index} className="nav-item" data-depth="1">
                <a className="nav-link nav-item-toggle">{file.name}</a>
              </li>
            );
          }
        });
      }
      
    return (
        <div className="body">
            <div className="nav-container" data-component="cypher-manual" data-version="5">
                <aside className="nav">
                    <div className="panels">
                        <div className="nav-panel-menu is-active" data-panel="menu">
                            <nav className="nav-menu">
                                <ul className="nav-list">
                                    <li className="nav-item " data-depth="0">
                                        <ul className="nav-list">
                                                {renderFileList(fileData.data)}
                                            {/* {fileData.data.map((file, index) => (
                                                <li key={index} className="nav-item" data-depth="1">
                                                <a className="nav-link nav-item-toggle">{file.first_line.split('#')[1]}</a>
                                                <ul className="nav-list">
                                                    <li className="nav-item" data-depth="2">
                                                        <a className="nav-link" href="introduction/neo4j-databases-graphs/">Neo4j databases and graphs</a>
                                                    </li>
                                                    <li className="nav-item" data-depth="2">
                                                        <a className="nav-link" href="introduction/querying-updating-administering/">Querying, updating and administering</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            ))} */}
                                            {/* <li className="nav-item" data-depth="1">
                                                <a className="nav-link" href="./">The Neo4j Cypher Manual v5</a>
                                            </li>
                                            <li className="nav-item" data-depth="1">
                                                <a className="nav-link nav-item-toggle" href="introduction/">Introduction</a>
                                                <ul className="nav-list">
                                                    <li className="nav-item" data-depth="2">
                                                        <a className="nav-link" href="introduction/neo4j-databases-graphs/">Neo4j databases and graphs</a>
                                                    </li>
                                                    <li className="nav-item" data-depth="2">
                                                        <a className="nav-link" href="introduction/querying-updating-administering/">Querying, updating and administering</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item is-current-page is-active" data-depth="1">
                                                <a className="nav-link nav-item-toggle" href="syntax/">Syntax</a>
                                                <ul className="nav-list">
                                                    <li className="nav-item" data-depth="2">
                                                        <a className="nav-link" href="syntax/values/">Values and types</a>
                                                    </li>
                                                </ul>
                                            </li> */}
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
                        <button className="nav-toggle" aria-label="Toggle Table of Contents"></button>
                        <a href="./" className="home-link is-current" aria-label="Go to home page"></a>
                        <nav className="breadcrumbs" aria-label="breadcrumbs">
                            <ul>
                                <li><a href="./">Cypher Manual</a></li>
                                <li><a href="./">
                                    The Neo4j Cypher Manual v5
                                </a></li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="content">
                    <article className="doc">

                    </article>
                </div>
            </main>
        </div>
    )
}

export default Index

export async function getStaticProps() {
    const res = await fetch('http://localhost:3001');
    const data = await res.json();

    return {
        props: {
            fileData: { data }
        }
    }
}  