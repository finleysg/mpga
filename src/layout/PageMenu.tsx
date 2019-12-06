import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useRouteMatch } from 'react-router';
import { NavLink } from 'react-router-dom';

export interface IPageMenuProps {
    subMenu: string;
}

export const PageMenu: React.FC<IPageMenuProps> = (props) => {

    let { url } = useRouteMatch();

    const selectMenu = (menu: string) => {
        switch (menu) {
            case 'home':
                return <Nav>
                    <NavDropdown title="Affiliated Organizations" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="https://www.mngolf.org/Home" target="_blank">Minnesota Golf Association</NavDropdown.Item>
                        <NavDropdown.Item href="https://www.minnesotapga.com/" target="_blank">Minnesota PGA</NavDropdown.Item>
                        <NavDropdown.Item href="http://www.wirthgolfassociation.org/tcc.html" target="_blank">Twin Cities Championship</NavDropdown.Item>
                        <NavDropdown.Item href="https://www.usga.org/" target="_blank">USGA</NavDropdown.Item>
                    </NavDropdown>
                    <NavLink to="/login" className="nav-link" activeClassName="active">Club Login</NavLink>
                </Nav>;
            case 'tournaments':
                return <Nav>
                    <NavLink to={`${url}/hard-card`} className="nav-link" activeClassName="active">Hard Card</NavLink>
                    <NavLink to={`${url}/code-of-conduct`} className="nav-link" activeClassName="active">Code of Conduct</NavLink>
                    <NavLink to={`${url}/bid`} className="nav-link" activeClassName="active">Tournament Bid</NavLink>
                </Nav>;
            case 'tournament':
                return <></>;
            case 'match-play':
                return <Nav>
                    <NavLink to={`${url}/rules`} className="nav-link" activeClassName="active">Rules</NavLink>
                    <NavLink to={`${url}/register`} className="nav-link" activeClassName="active">Sign Up</NavLink>
                    <NavLink to={`${url}/results`} className="nav-link" activeClassName="active">Past Results</NavLink>
                </Nav>;
            case 'clubs':
                return <Nav>
                    <NavLink to={`${url}/current`} className="nav-link" activeClassName="active">Current Members</NavLink>
                </Nav>;;
            case 'club':
                return <></>;
            case 'about':
                return <Nav>
                <NavLink to={`${url}/committee`} className="nav-link" activeClassName="active">Executive Committee</NavLink>
                <NavLink to={`${url}/past-presidents`} className="nav-link" activeClassName="active">Past Presidents</NavLink>
                <NavLink to={`${url}/awards`} className="nav-link" activeClassName="active">Awards</NavLink>
                <NavLink to={`${url}/history`} className="nav-link" activeClassName="active">History</NavLink>
            </Nav>;
            default:
                return null;
        }
    }

    return (
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav id="topnav">
                {selectMenu(props.subMenu)}
            </Nav>
        </Navbar.Collapse>
    );
};
