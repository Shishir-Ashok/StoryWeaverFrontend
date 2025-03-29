import { Link } from 'react-router-dom';
import "./LandingPage.css"

export default function LandingPage() {
  return (
    <div className="landing-page">
        <h1 className="title">Story Weaver</h1>
        <p className="description">
            Weave tales together. Create worlds collaboratively.
        </p>
        <div className="buttons">
            <Link to="/signin">
                <button className="signin-button">Sign In</button>
            </Link>
            <Link to="/signup">
                <button className="signup-button">Sign Up</button>
            </Link>
        </div>
    </div>
  )
}

