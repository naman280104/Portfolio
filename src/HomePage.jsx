import HomeTypingEffect from './HomeTypingEffect';
import init from './HomePageBackground';



function HomePage() {
    init();
    return (
        <div>
            <div className="home-name" style={{ zIndex: 2 }}>
                <HomeTypingEffect />
            </div>
        </div>
    )
}

export default HomePage
