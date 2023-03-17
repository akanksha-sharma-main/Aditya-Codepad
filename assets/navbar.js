import React from 'react'

const Navbar = () => {
    return (
        <nav className="navbar">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
    
          <img className="navbar-logo" src="https://dist.neo4j.com/wp-content/uploads/20210422142941/neo4j-logo-2020.svg" alt="Neo4j Docs"/>
          </a>
    
          </div>
    
          <button className="navbar-search search-button mr-3" data-target="topbar-nav" id="search_open_mobile" aria-label="Open Search">
          <a className="navbar-link search-button" href="#search" id="search_open"><svg width="23px" height="23px" viewBox="0 0 23 23" version="1.1"  className="fill-current float-right" id="search" role="button" title="Search Website">
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                    <g transform="translate(-2.000000, -2.000000)" stroke="#a0aec0" strokeWidth="1.5">
                      <circle transform="translate(11.389364, 11.388564) rotate(-23.025000) translate(-11.389364, -11.388564) " cx="11.3893642" cy="11.3885639" r="8.056"></circle>
                      <path d="M17.0853333,17.0844444 L23.3333333,23.3333333"></path>
                    </g>
                  </g>
                </svg></a>
          </button>
          <button className="navbar-burger" data-target="topbar-nav" aria-label="Mobile Navigation Button">
            <span></span>
            <span></span>
            <span></span>
          </button>
        
        <div id="topbar-nav" className="navbar-menu">
                <div className="navbar-end">
            <div className="navbar-item">
              <a className="navbar-link search-button" href="#search" id="search_open"><svg width="23px" height="23px" viewBox="0 0 23 23" version="1.1"  className="fill-current float-right" id="search" role="button" title="Search Website">
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                    <g transform="translate(-2.000000, -2.000000)" stroke="#a0aec0" strokeWidth="1.5">
                      <circle transform="translate(11.389364, 11.388564) rotate(-23.025000) translate(-11.389364, -11.388564) " cx="11.3893642" cy="11.3885639" r="8.056"></circle>
                      <path d="M17.0853333,17.0844444 L23.3333333,23.3333333"></path>
                    </g>
                  </g>
                </svg><span className="navbar-mobile">Search</span></a>
            </div>
          </div>
        </div>
      </nav>
    )
}

export default Navbar