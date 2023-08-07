import { Link } from 'react-router-dom';
import './LandingPage.css'

function LandingPage() {
  return (
    <div className="landing-page-container">
      <img src="/images/full-logo.png" alt="music nexus logo" />
      <Link className='spotify-login' >Log in with spotify</Link>
    </div>
  );
}

export default LandingPage;
