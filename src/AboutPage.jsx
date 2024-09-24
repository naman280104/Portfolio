import React, { useEffect, useState } from 'react'
import myImage from './assets/myimg.jpeg'; // Adjust the path as necessary
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';

export default function AboutPage(props) {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (props.showOverlay === 'about') {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [props.showOverlay]);

    const handleClose = () => {
        props.close('');
    }

    const splitWords = (text) => {
        return text.split(' ').map((word, index) => (
            <span key={index} style={{'--index': index}} >
                {word}
            </span>
        ));
    };

    return (

        <div className={`about-page ${isVisible ? 'visible' : ''}`}>
            <div id='about-exit'>
                <div id="about-exit--close-btn" onClick={handleClose}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <svg className="polygon" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.8" d="M21.9068 1H13.0932L5.40683 5.40683L1 13.0932V21.9068L5.40683 29.5932L13.0932 34H21.9068L29.5932 29.5932L34 21.9068V13.0932L29.5932 5.40683L21.9068 1Z" stroke="#959292" strokeMiterlimit="10"></path>
                    </svg>
                </div>
            </div>

            <div id='about-content' >
                <div id='about-left-content'>
                    <div id='about-my-image'>
                        <img src={myImage} alt="" />
                    </div>
                    <div id='about-img-break'></div>
                    <div id='about-social-icons'>
                        <a href="https://github.com/naman280104" target="_blank" rel="noopener noreferrer">
                            <FaGithub className='about-icons' />
                        </a>
                        <a href="https://www.linkedin.com/in/naman-goyal-1a91ab228/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className='about-icons' />
                        </a>
                        <a href="https://www.instagram.com/naman_goyal28" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className='about-icons' />
                        </a>
                        <a href="mailto:naman280104@gmail.com" target="_blank" rel="noopener noreferrer">
                            <AiOutlineMail className='about-icons' />
                        </a>
                    </div>

                </div>
                <div id='about-right-content'>

                    <h1 id='about-title' split-by='word' letter-animation='fadeIn'>
                        {splitWords('Naman Goyal')}
                    </h1>
                    <h2 id='about-role' split-by='word' letter-animation='fadeIn'>
                        {splitWords('Software Engineer')}
                    </h2>
                    <br />
                    <h3 id='about-me'>
                        <p split-by='word' letter-animation='fadeIn'>{splitWords("Hi! I'm a final year Computer Science student at IIT Jodhpur, Rajasthan. I'm originally from Dholpur, Rajasthan. I'm really passionate about technology and enjoy tackling coding challenges and building new applications.")}</p>

                        <p split-by='word' letter-animation='fadeIn'>{splitWords("My focus has been on algorithms, software development and core concepts of computer science. I love to come up with creative ideas and implemneting them in real life.")} </p>

                        <p split-by='word' letter-animation='fadeIn'>{splitWords("Outside of tech, I stay active through various games like badminton, TT and cricket, which helps me stay sharp and motivated.")}</p>

                        <p split-by='word' letter-animation='fadeIn'>{splitWords("As I finish college, I'm excited about applying my skills in the tech industry and looking forward to new opportunities.")}</p>

                        <p split-by='word' letter-animation='fadeIn'>{splitWords("Thanks for visiting my portfolio!")}</p>
                    </h3>
                </div>
            </div>
        </div>
    )
}
