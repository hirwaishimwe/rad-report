import React from 'react';
import './AboutUs.css';
import { AiOutlineMail } from 'react-icons/ai';
import { AiFillLinkedin } from 'react-icons/ai';

import member1Img from './images/HirwaIshimwe.jpg';
import member2Img from './images/Christopher Alphonse.jpg';
import member3Img from './images/Dimitri Legaspi.jpg';
import member4Img from './images/Derinell Rojas.jpg';
import member5Img from './images/Jerison Feliz.jpg';
import member6Img from './images/rifflene.png';


function AboutUs() {
    return (
        <div className="about-us-container">
            <h2>
                <span className="meet-text">Meet</span>  <br />
                Software Wizards Innovating For Tomorrow (SWIFT) Team 6
            </h2>
            <div className="team-members">
                <div className="member">
                    <img src={member1Img} alt="Hirwa" />
                    <p>Hirwa Ishimwe</p>
                    <a href="mailto:hirwaishimwe2@gmail.com"><AiOutlineMail /></a>
                    <a href="https://www.linkedin.com/in/hirwa-ishimwe" target="_blank" rel="noopener noreferrer"><AiFillLinkedin /></a>
                </div>
                <div className="member">
                    <img src={member2Img} alt="Christopher" />
                    <p>Christopher Alphonse</p>
                    <a href="mailto:christopheralphonse96@gmail.com"><AiOutlineMail /></a>
                    <a href="https://www.linkedin.com/in/christopheralphonse/" target="_blank" rel="noopener noreferrer"><AiFillLinkedin /></a>
                </div>
                <div className="member">
                    <img src={member3Img} alt="Dimitri" />
                    <p>Dimitri Legaspi</p>
                    <a href="mailto:dimitri.legaspi@gmail.com"><AiOutlineMail /></a>
                    <a href="https://www.linkedin.com/in/dimitri-legaspi/" target="_blank" rel="noopener noreferrer"><AiFillLinkedin /></a>
                </div>
                <div className="member">
                    <img src={member4Img} alt="Derinell" />
                    <p>Derinell Rojas</p>
                    <a href="mailto:dmrojaa@gmail.com"><AiOutlineMail /></a>
                    <a href="https://www.linkedin.com/in/derinellrojas/" target="_blank" rel="noopener noreferrer"><AiFillLinkedin /></a>
                </div>
                <div className="member">
                    <img src={member5Img} alt="Jerison" />
                    <p>Jerison Feliz</p>
                    <a href="mailto:jerisonfeliz15@gmail.com"><AiOutlineMail /></a>
                    <a href="https://www.linkedin.com/in/jerison-feliz/" target="_blank" rel="noopener noreferrer"><AiFillLinkedin /></a>
                </div>
                <div className="rifflene">
                    <img src={member6Img} alt="Rifflene" />
                    <p>Rifflene Altidor</p>
                    <a href="mailto:raltidor@falcon.bentley.edu"><AiOutlineMail /></a>
                    <a href="https://www.linkedin.com/in/rifflene-altidor-23ba6520b/" target="_blank" rel="noopener noreferrer"><AiFillLinkedin /></a>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
