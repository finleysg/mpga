import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useRouteMatch } from 'react-router';

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
                    <Nav.Link href="/login">Club Login</Nav.Link>
                </Nav>;
            case 'tournaments':
                return <Nav>
                    <Nav.Link href={`${url}/hard-card`}>Hard Card</Nav.Link>
                    <Nav.Link href={`${url}/code-of-conduct`}>Code of Conduct</Nav.Link>
                    <Nav.Link href={`${url}/bid`}>Tournament Bid</Nav.Link>
                </Nav>;
            case 'tournament':
                return <></>;
            case 'match-play':
                return <Nav>
                    <Nav.Link href={`${url}/rules`}>Rules</Nav.Link>
                    <Nav.Link href={`${url}/sign-up`}>Sign Up</Nav.Link>
                    <Nav.Link href={`${url}/past-results`}>Past Results</Nav.Link>
                </Nav>;
            case 'clubs':
                return <Nav>
                    <Nav.Link href={`${url}/current`}>Current Members</Nav.Link>
                </Nav>;;
            case 'club':
                return <></>;
            case 'about':
                return <Nav>
                <Nav.Link href={`${url}/committee`}>Executive Committee</Nav.Link>
                <Nav.Link href={`${url}/past-presidents`}>Past Presidents</Nav.Link>
                <Nav.Link href={`${url}/awards`}>Awards</Nav.Link>
                <Nav.Link href={`${url}/history`}>History</Nav.Link>
            </Nav>;
            default:
                return null;
        }
    }

    return (
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav>
                {selectMenu(props.subMenu)}
            </Nav>
        </Navbar.Collapse>
    );
};
