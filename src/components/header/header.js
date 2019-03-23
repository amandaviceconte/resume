import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    let resumeData = this.props.resumeData;

    return (
      <React.Fragment>
        <header id="home">
          <nav id="nav-wrap">
            <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
            <a className="mobile-btn" href="#" title="Hide navigation">Hide navigation</a>
            <ul id="nav" className="nav">
              <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
              <li><a className="smoothscroll" href="#about">About</a></li>
              <li><a className="smoothscroll" href="#resume">Resume</a></li>
              <li><a className="smoothscroll" href="#portfolio">Works</a></li>
            </ul>
          </nav>
          <div className="row banner">
            <div className="banner-text">
              <h1 className="responsive-headline">I'm {resumeData.name}.</h1>
              <h3>I'm a <span>{resumeData.role}</span> passionate about web development. Learn more <a className="smoothscroll" href="#about">about me =D</a>.</h3>
              <hr />
              <ul className="social">
                <li><a href={resumeData.facebook}><i className="fa fa-facebook" /></a></li>
                <li><a href={resumeData.linkedin}><i className="fa fa-linkedin" /></a></li>
                <li><a href={resumeData.instagram}><i className="fa fa-instagram" /></a></li>
                <li><a href={resumeData.github}><i className="fa fa-github" /></a></li>
              </ul>
            </div>
          </div>
          <p className="scrolldown">
            <a className="smoothscroll" href="#about"><i className="icon-down-circle" /></a>
          </p>
        </header>
      </React.Fragment>
    );
  }
}