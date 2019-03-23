import React, { Component } from 'react';

export default class Resume extends Component {
  render() {
    return (
      <section id="resume">
        {/* ---------------------- Education ---------------------- */}
        <div className="row education">
          <div className="three columns header-col">
            <h1><span>Education</span></h1>
          </div>
          <div className="nine columns main-col">
            <div className="row item">
              <div className="twelve columns">
                <h3>Universidade Veiga de Almeida</h3>
                <p className="info">Computer Science Bachelor<span>•</span> <em className="date">Started in August 2016</em></p>
                <p>

                </p>
              </div>
            </div> {/* item end */}
          </div> {/* main-col end */}
        </div> {/* End Education */}
        
        {/* ---------------------- Skills ---------------------- */}
        <div className="row skill">
          <div className="three columns header-col">
            <h1><span>Skills</span></h1>
          </div>
          <div className="nine columns main-col">
            <div className="bars">
              <ul className="skills">
                <li><span className="bar-expand javascript" /><em>Javascript, HTML5, CSS</em></li>
                <li><span className="bar-expand react" /><em>React, jQuery, Git, GitHub</em></li>
                <li><span className="bar-expand git" /><em>Python, Linux</em></li>
                <li><span className="bar-expand sql" /><em>SQL Server, Java, Django</em></li>
                <li><span className="bar-expand english" /><em>English</em></li>
              </ul>
            </div>{/* end skill-bars */}
          </div> {/* main-col end */}
        </div> {/* End skills */}
      </section>
    );
  }
}