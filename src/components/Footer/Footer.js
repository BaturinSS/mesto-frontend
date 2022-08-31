import React from "react";
import './Footer.css'

function Footer() {
  return (
    <div className="footer">
      <p className="footer__copyright">
        © 2022 - {new Date().getFullYear()}. Батурин Сергей
      </p>
    </div>
  )
}

export default Footer;