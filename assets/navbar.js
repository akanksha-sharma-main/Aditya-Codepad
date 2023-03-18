import React from 'react';
import Link from "next/link";


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">

          <img className="navbar-logo" src="https://th.bing.com/th/id/R.60a2750039f7273f41bcb4ada00e761a?rik=7GGJS2p2OOPhhg&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fpython-logo-transparent%2fpython-logo-transparent-22.png&ehk=FnvntKvfA2g8Wai00iqiTH%2fu2DEdtPpgV0ejxYLoZpI%3d&risl=&pid=ImgRaw&r=0" alt="Python Docs" />
        </a>

      </div>

      <button className="navbar-search search-button" data-target="topbar-nav" id="search_open_mobile" aria-label="Open Search">
        <a className="navbar-link search-button " id="search_open"><svg width="23px" height="23px" viewBox="0 0 23 23" version="1.1" className="fill-current float-right" id="search" role="button" title="Search Website">
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
          <div className="navbar-item has-dropdown is-hoverable getting-started-cta">
            <Link href="/signup"><a className="navbar-link primary">Get Started</a></Link>
            <div className="navbar-dropdown">
              <Link href="/signup"><div className="navbar-item project">
                <a className="project-name cursor-pointer">
                  <div>Codepad <span className="aura-ticker cursor-pointer">Signup</span></div>
                  <div className="project-subtitle">Start writing your coding notes here noted</div>
                </a>
              </div></Link>
              <Link href="/login"><div className="navbar-item project cursor-pointer">
                <a className="project-name">
                  <div>Already a member <span className="aura-ticker-l cursor-pointer">Login</span></div>
                  <div className="project-subtitle">Login now to continue writing your codenotes</div>
                </a>
              </div></Link>
            </div>
          </div>
          <div className="navbar-item">
            <a className="navbar-link search-button" id="search_open"><svg width="23px" height="23px" viewBox="0 0 23 23" version="1.1" className="fill-current float-right" id="search" role="button" title="Search Website">
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