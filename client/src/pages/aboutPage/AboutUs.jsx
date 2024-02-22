import "./AboutUs.css";

import { AiFillLinkedin, AiOutlineMail } from "react-icons/ai";

import React from "react";
import { FaGithub } from "react-icons/fa";
import teamMembers from "../data/teamMembers";

function AboutUs() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-9xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-widest text-gray-900 sm:text-4xl">
                        Meet our Team
                    </h2>
                    <p className="sm">
                        Software Wizards Innovating For Tomorrow (SWIFT) Team 6
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quaerat animi fugiat
                    </p>
                </div>
                <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                    {teamMembers.map(
                        ({ id, name, linkedin, email, image, role, git }) => (
                            <li key={id}>
                                <div className="flex items-center gap-x-6">
                                    <img
                                        className=" object-scale-down h-48 w-50"
                                        src={image}
                                        alt=""
                                    />
                                    <div>
                                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                                            {name}
                                        </h3>
                                        <p className="text-sm font-semibold leading-6 text-indigo-600">
                                            {role}
                                        </p>
                                        <div className="flex gap-2">
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

                                            <a
                                                href={git}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <FaGithub />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ),
                    )}
                </ul>
            </div>
        </div>
    );
}

export default AboutUs;
