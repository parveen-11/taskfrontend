import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <ul className="menu">
          <li className="menu__item">
            <Link className="menu__link">
              Job Application App
            </Link>
          </li>
        </ul>
      </footer>
    </>
  );
}
