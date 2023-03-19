import { useState, useEffect } from 'react'

function DirectoryList() {
  const [directoriesAndFiles, setDirectoriesAndFiles] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/generate')
      .then(response => response.json())
      .then(data => setDirectoriesAndFiles(data.directoriesAndFiles))
  }, [])

  const renderDirectoryOrFile = (directoryOrFile, index) => {
    if (directoryOrFile.isdir) {
      return (

<li key={index} className={`nav-item is-current-page is-active`} data-depth="1">
                    
                    <a  className="nav-link nav-item-toggle">{directoryOrFile.directoryname}</a>
                    <ul className="nav-list cursor-pointer">
                        {directoryOrFile.directoryfiles.map((file, Index) => (
                            <li key={Index} className="nav-item">
                                <a className="nav-link">{file.filename}</a>
                            </li>
                        ))}
                    </ul>
                </li>
      )
    } else {
      return (
        <li key={index} className={`nav-item is-current-page`}>
            <a className="nav-link nav-item-toggle">{directoryOrFile.filename}</a>
        </li>
      )
    }
  }

  return (
    <ul>
      {directoriesAndFiles.map((directoryOrFile, index) => (
        <li key={index}>
          {renderDirectoryOrFile(directoryOrFile, index)}
        </li>
      ))}
    </ul>
  )
}

export default DirectoryList
