import React from "react";
import "../layout/header.css";
import { NavLink ,Link} from "react-router-dom";

function Header() {
  return (
    <>
      <section className="header">
        <div className="container">
          <div className="col-sm-8 colm-2">
            <ul>
              <li>
                <NavLink activeclassname = "active" to="/form">Form Submittion</NavLink>
              </li>
              <li>
                {/*<a href='http://localhost:4013/download/25b1da47-911c-410f-8cfb-a8f629be2760.pdf' download="FileName.pdf">Download</a>*/}
                <NavLink to="/data">Data</NavLink>
              </li>
            </ul>
          </div>
          <div className="col-sm-4 colm-2">
          <p>JOB-APPLICATION-APP</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;
