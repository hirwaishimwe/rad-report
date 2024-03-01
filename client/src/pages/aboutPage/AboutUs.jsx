import { AiFillLinkedin, AiOutlineMail } from "react-icons/ai";

import React from "react";
import { FaGithub } from "react-icons/fa";
import teamMembers from "../data/teamMembers";

function AboutUs() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-blue-500 mb-2">
            Meet Our Team
          </h2>
          <p className="text-gray-600">
            Software Wizards Innovating For Tomorrow (SWIFT) Team 6
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map(
            ({ id, name, linkedin, email, image, role, git }) => (
              <article key={id} className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center justify-center mb-6">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover  "
                  />
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{name}</h3>
                  <p className="text-gray-600">{role}</p>
                </div>
                <div className="flex justify-center">
                  <a href={`mailto:${email}`} className="text-blue-500 mx-2">
                    <AiOutlineMail />
                  </a>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 mx-2"
                  >
                    <AiFillLinkedin />
                  </a>
                  <a
                    href={git}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 mx-2"
                  >
                    <FaGithub />
                  </a>
                </div>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
