import "./Footer.css"
import React from "react";

const url = {
    LinkedIn: "https://www.linkedin.com/in/daniel-gutierrez-460a8417b/",
    GitHub: "https://github.com/kyoh2014"
}
export default function Footer() {
  const handleClick = (e) => {
    e.preventDefault();
    window.open(url[e.target.name], "_blank")
  };

  return (
    <div className="footer_main">
      <button className="linkedin_button" name="LinkedIn" onClick={handleClick}>
        <img className="linkedin_icon" name="LinkedIn" src="/icons/LinkedinIcon.png" alt="image"/>
      </button>
      <button className="github_button" name="GitHub" onClick={handleClick}>
        <img className="github_icon" name="GitHub" src="/icons/GitHubIcon.png" alt="image"/>
      </button>
    </div>
  );
}
