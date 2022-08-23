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
    <div>
      <button onClick={handleClick}>
        <img name="LinkedIn" src="/icons/LinkedinIcon.png" alt="image"/>
      </button>
      <button onClick={handleClick}>
        <img name="GitHub" src="/icons/GitHubIcon.png" alt="image"/>
      </button>
    </div>
  );
}
