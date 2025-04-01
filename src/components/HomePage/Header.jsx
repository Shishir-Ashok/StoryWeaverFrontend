import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../utils/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './HomePage.css';


export default function Header() {

    const { logout } = useContext(AuthContext)
    const handleLogout = () => {
        logout();
    }

    const [searchActive, setSearchActive] = useState(false);

    const toggleSearch = () => {
        setSearchActive((prev) => !prev);
    };

    return (
        <>
            <header className="header-container">
                <div className="logo">SW</div>
                <div className="header-elements">
                    <div className={`search-container ${searchActive ? 'active' : ''}`}>
                        <span className="search-icon" onClick={toggleSearch}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </span>
                        <input className="search" type="text" name="search" id="search" placeholder="Search" />
                    </div>
                    <Link className="create-post" to={'/create'}>Create</Link>
                    <Link className="logout" to={''} onClick={handleLogout}>Logout</Link>
                </div>
            </header>
        </>
    )
}