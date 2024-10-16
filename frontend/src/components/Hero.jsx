import { Link } from 'react-router-dom';

function Hero() {
  return (
      <header className="hero">
        <h1>Unleash the Power of Neural Networks</h1>
        <p>Create, train, and fine-tune deep learning models effortlessly in your browser.</p>
        <Link to="/login" className="cta-button">Get Started</Link>
      </header>
  );
}

export default Hero;
