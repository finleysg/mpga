import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

interface ISidenavProps {
    isOpen: boolean,
}

// https://bootstrapious.com/p/bootstrap-sidebar
const Sidenav: React.FC<ISidenavProps> = (props) => {
    let history = useHistory();
    
    const goHome = () => {
        history.push("/");
    };

    return (
        <div id="sidebar" className={props.isOpen ? "" : " active"}>
            <div className="sidebar-header" onClick={goHome}></div>
            <div className="flex-column nav">
                <NavLink to="/tournaments" className="nav-link" activeClassName="active">Tournaments</NavLink>
                <NavLink to="/match-play" className="nav-link" activeClassName="active">Team Match Play</NavLink>
                <NavLink to="/clubs" className="nav-link" activeClassName="active">Member Clubs</NavLink>
                <NavLink to="/about" className="nav-link" activeClassName="active">About Us</NavLink>
                <NavLink to="/contact" className="nav-link" activeClassName="active">Contact Us</NavLink>
            </div>
        </div>
    );
}

export default Sidenav;
