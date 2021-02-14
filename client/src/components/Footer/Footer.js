import React from "react";
import "../../styles/footer.css";

const creators = [
  {
    name: "Laura Gilbert",
    github: "https://github.com/laurakathryngilbert",
    linkedin: "https://www.linkedin.com/in/laura-kathryn-gilbert/",
  },
  {
    name: "Yuliya Kandratsyeva",
    github: "https://github.com/heyitsyuliya",
    linkedin: "https://www.linkedin.com/in/ykandratsyeva/",
  },
  {
    name: "Desiree Nelson",
    github: "https://github.com/Anzu4",
    linkedin: "https://www.linkedin.com/in/desiree-nelson/",
  },
  {
    name: "Katerina Scoullos",
    github: "https://github.com/codingwithkat",
    linkedin: "https://www.linkedin.com/in/katerina-papaloukas-scoullos/",
  },
];

const Footer = () => (
  <div>
    <div className="footer">
      <p>Made with ❤️ by</p>
      <div className="credits">
        {creators.map((creator) => (
          <div>
            <p>{creator.name}</p>
            <a href={creator.github} className="social">
              <i className="fas fa-code-branch"></i>
            </a>
            <a href={creator.linkedin} className="social">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Footer;
