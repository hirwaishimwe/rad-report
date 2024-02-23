import React from 'react';
import './AboutUs.css';
import { AiOutlineMail, AiFillLinkedin } from 'react-icons/ai';
import { FaGithub } from 'react-icons/fa';
import teamMembers from '../data/teamMembers';

function AboutUs() {
    return (
        <section className="about-us-container">
            <div>
            <h2>
                <span className="meet-text">Meet Our Team</span>  <br />
                Software Wizards Innovating For Tomorrow (SWIFT) Team 6
            </h2>
        </div>
            
            <div className="team-members">
                {teamMembers.map(({ id, name, linkedin, email, image, role, git }) => (
                    <article key={id} className="member">
                    <img src={image} alt={name} />
                    <h3>{name}</h3>
                    <p className="role">{role}</p>
                    <div className="member-links">
                        <a href={`mailto:${email}`}><AiOutlineMail /></a>
                        <a href={linkedin} target="_blank" rel="noopener noreferrer"><AiFillLinkedin /></a>
                        <a href={git} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                    </div>
                </article>
                ))}
            </div>
        </section>
    );
}

export default AboutUs;
