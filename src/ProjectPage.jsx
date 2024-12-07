import React, { useEffect, useState } from 'react'
import { FaGithub } from 'react-icons/fa';
import { projects } from "./data/projects.js";  // Assuming your file is named 'projects.js'
import { useNavigate } from 'react-router-dom';

export default function ProjectPage(props) {
    const navigate = useNavigate();    
    const handleClose = () => {
        navigate('/');
    }

    return (
        <div className='project-page'>
            <div id='project-exit'>
                <div id="project-exit--close-btn" onClick={handleClose}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <svg className="polygon" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.8" d="M21.9068 1H13.0932L5.40683 5.40683L1 13.0932V21.9068L5.40683 29.5932L13.0932 34H21.9068L29.5932 29.5932L34 21.9068V13.0932L29.5932 5.40683L21.9068 1Z" stroke="#959292" strokeMiterlimit="10"></path>
                    </svg>
                </div>
            </div>
            <div style={{display: 'flex'}}>
            <div id='project-content'>
                {
                    projects.map((project, index) => (
                        <div className="project-card">
                            <img className='project-image' src={`${project.img}`} alt="" />
                            <div className='project-card-content'>
                                <div className='project-name'>{project.project_name}</div>
                                <div className="project-description">
                                {project.project_description}
                                </div>
                                {project.github_link?
                                <div className="project-github-link">
                                    <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                                        <FaGithub className='project-github-link-icon' />
                                    </a>
                                </div>:""
                                }
                            </div>
                        </div>
                        
                    ))

                }
            </div>
            </div>
        </div>
    )
}   
