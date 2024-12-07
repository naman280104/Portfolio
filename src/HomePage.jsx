import HomeTypingEffect from './HomeTypingEffect';
import init from './HomePageBackground';
import { useEffect, useState } from 'react';
import AboutPage from './AboutPage';
import ProjectPage from './ProjectPage';
import { useNavigate } from 'react-router-dom';



function HomePage() {

    const [showOverlay,setShowOverlay] = useState('')
    const navigate = useNavigate();
    useEffect(()=>{
        init()
        // if(showOverlay==='') init();
        // else document.getElementById('awesome-three-js-background').remove();
        return ()=>{
            document.getElementById('awesome-three-js-background').remove();
        }
    },[showOverlay])

    return (
        <div>
        <div className='home-page'>
            <div className='home-nav'>
                <div className="projects home-icons" style={{ zIndex: 2 }} onClick={()=>navigate('/project')}>Projects</div>
                <div className="about home-icons" style={{ zIndex: 2 }} onClick={()=>{
                    navigate('/about')
                    }}>About</div>
            </div>
            <div className="home-name" style={{ zIndex: 2 }}>
                <HomeTypingEffect />
            </div>
        </div>
        
        {/* <AboutPage close={setShowOverlay} showOverlay={showOverlay}/> */}
        {/* <ProjectPage close={setShowOverlay} showOverlay={showOverlay}/> */}
        </div>
    )
}

export default HomePage
