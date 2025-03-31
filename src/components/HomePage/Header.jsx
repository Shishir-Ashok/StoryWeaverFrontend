import { Link } from 'react-router-dom';
import './HomePage.css';

export default function Header() {
    return (
        <>
            <header className="header-container">
                <div className="logo">SW</div>
                <div className="header-elements">
                    <input className="search" type="text" name="search" id="search" placeholder="Search" />
                    <Link className="create-post" to={'/create'}>Create</Link>
                    <Link className="logout" to={''}>Logout</Link>
                </div>
            </header>
        </>
    )
}