import { Link } from 'react-router-dom';


function CallToAction() {
    return (
      <section className="cta-section">
        <h2>Ready to Build Your Next Neural Network?</h2>
        <p>Sign up or try the demo now and experience the future of deep learning.</p>
        <Link to="/signUp" className="cta-button">Sign Up</Link>
      </section>
    );
  }
  
export default CallToAction;