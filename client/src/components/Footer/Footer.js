import React from "react";
import "../../styles/footer.css";

const Footer = () => (
  <div>
    {/* <div className="card-footer">
            <small className="text-muted">Created by Laura Gilbert, Yuliya Kandratsyeva, Desiree Nelson, and
        Katerina Scoullos!{" "}</small>
        </div> */}
    <div className="footer">
      <div className="credits">
        <h3>
          <p className="SWE">Laura Gilbert</p>
          <a href="https://github.com/laurakathryngilbert">
            <i className="fab fa-github"></i>
          </a>{" "}
          <a href="https://www.linkedin.com/in/laura-kathryn-gilbert/">
            <i className="fab fa-linkedin"></i>
          </a>
        </h3>

        <h3>
          <p className="SWE">Yuliya Kandratsyeva</p>
          <a href="https://github.com/heyitsyuliya">
            <i className="fab fa-github"></i>
          </a>{" "}
          <a href="https://www.linkedin.com/in/ykandratsyeva/">
            <i className="fab fa-linkedin"></i>
          </a>
        </h3>

        <h3>
          <p className="SWE">Desiree Nelson</p>
          <a href="https://github.com/Anzu4">
            <i className="fab fa-github"></i>
          </a>{" "}
          <a href="https://www.linkedin.com/in/desiree-nelson/">
            <i className="fab fa-linkedin"></i>
          </a>
        </h3>

        <h3>
          <p className="SWE">Katerina Scoullos</p>
          <a href="https://github.com/codingwithkat">
            <i className="fab fa-github"></i>
          </a>{" "}
          <a href="https://www.linkedin.com/in/katerina-papaloukas-scoullos/">
            <i className="fab fa-linkedin"></i>
          </a>
        </h3>
      </div>
    </div>
  </div>
);

export default Footer;
