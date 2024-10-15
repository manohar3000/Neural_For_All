import Hero from '../components/Hero';
import Features from '../components/Features';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

function LandingPage() {
    return (
      <div className="App">
        <Hero />
        <Features />
        <CallToAction />
        <Footer />
      </div>
    );
  }
  
  export default LandingPage;