import "./AboutUs.css";

import { AiFillLinkedin, AiOutlineMail } from "react-icons/ai";

import React from "react";
import teamMembers from "./teamMembers";

function AboutUs() {
    return (
        <div className="about-us-container">
            <h2>
                <span className="meet-text">Meet</span> <br />
                Software Wizards Innovating For Tomorrow (SWIFT) Team 6
            </h2>
            <div className="team-members">
                {teamMembers.map(({ id, name, linkedin, email, image }) => (
                    <div className="member" key={id}>
                        <img src={image} alt={name} />
                        <p>{name}</p>
                        <a href={`mailto:${email}`}>
                            <AiOutlineMail />
                        </a>
                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <AiFillLinkedin />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AboutUs;
