import BackToTop from '../../components/BackToTop';
import { 
    Features, 
    OverRall, 
    Continue, 
    Milestones, 
    Video, 
    HeroSection, 
    AboutUs 
} from '../../components';

function Landing() {
    
    return (
        <div className="w-full scroll-smooth">
            <HeroSection />
            {/* <Introduction /> */}
            <div className="container mx-auto bg-white px-4">
                <Features />
                <Video />
                <OverRall />
                <Continue />
                <Milestones />
                <AboutUs />
            </div>
            <BackToTop />
        </div>
    )
}

export default Landing