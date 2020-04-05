import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavItem from "react-bootstrap/NavItem";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";

import constants from "../constants";
import { IApplicationState } from "../store";
import UserActions from "../store/UserActions";

export interface IPageMenuProps {
    subMenu: string;
    segments: string[];
}

const PageMenu: React.FC<IPageMenuProps> = props => {
    const session = useSelector((state: IApplicationState) => state.session);
    const dispatch = useDispatch();
    let { url } = useRouteMatch();

    const selectMenu = () => {
        const { subMenu, segments } = props;
        switch (subMenu) {
            case "home":
                return (
                    <Nav>
                        <NavDropdown title="Affiliated Organizations" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="https://www.mngolf.org/Home" target="_blank">
                                Minnesota Golf Association
                            </NavDropdown.Item>
                            <NavDropdown.Item href="https://www.minnesotapga.com/" target="_blank">
                                Minnesota PGA
                            </NavDropdown.Item>
                            <NavDropdown.Item href="http://www.wirthgolfassociation.org/tcc.html" target="_blank">
                                Twin Cities Championship
                            </NavDropdown.Item>
                            <NavDropdown.Item href="https://www.usga.org/" target="_blank">
                                USGA
                            </NavDropdown.Item>
                        </NavDropdown>
                        {session.user.isAuthenticated ? (
                            <>
                                <NavLink to="/profile" className="nav-link" activeClassName="active">
                                    {session.user.name}
                                </NavLink>
                                <NavItem onClick={() => dispatch(UserActions.Logout())} className="nav-link clickable">
                                    Logout
                                </NavItem>
                            </>
                        ) : (
                            <NavLink to="/login" className="nav-link" activeClassName="active">
                                Club Login
                            </NavLink>
                        )}
                    </Nav>
                );
            case "tournaments":
                if (segments.indexOf("detail") === 1) {
                    const tournamentName = segments[2];
                    return (
                        <Nav>
                            <NavLink
                                to={`${url}/history/${tournamentName}`}
                                className="nav-link"
                                activeClassName="active">
                                History
                            </NavLink>
                            <NavLink
                                to={`${url}/gallery/${tournamentName}`}
                                className="nav-link"
                                activeClassName="active">
                                Gallery
                            </NavLink>
                            <NavLink
                                to={`${url}/contact/${tournamentName}`}
                                className="nav-link"
                                activeClassName="active">
                                Contact
                            </NavLink>
                        </Nav>
                    );
                } else if (segments.indexOf("gallery") === 1) {
                    const tournamentName = segments[2];
                    const years = [];
                    for (let year = 2000; year <= constants.EventCalendarYear; year++) {
                        years.push(year);
                    }
                    return (
                        <Nav>
                            <NavDropdown title="Select Season" id="collasible-nav-dropdown">
                                {years.map(year => {
                                    return (
                                        <NavDropdown.Item key="year">
                                            <NavLink to={`${url}/gallery/${tournamentName}/${year}`}>{year}</NavLink>
                                        </NavDropdown.Item>
                                    );
                                })}
                            </NavDropdown>
                        </Nav>
                    );
                } else {
                    return (
                        <Nav>
                            <NavLink to={`${url}/hard-card`} className="nav-link" activeClassName="active">
                                Hard Card
                            </NavLink>
                            <NavLink to={`${url}/code-of-conduct`} className="nav-link" activeClassName="active">
                                Code of Conduct
                            </NavLink>
                            <NavLink to={`${url}/pace-of-play`} className="nav-link" activeClassName="active">
                                Pace of Play
                            </NavLink>
                            <NavLink to={`${url}/bid`} className="nav-link" activeClassName="active">
                                Tournament Bid
                            </NavLink>
                        </Nav>
                    );
                }
            case "match-play":
                return (
                    <Nav>
                        <NavLink to={`${url}/rules`} className="nav-link" activeClassName="active">
                            Rules
                        </NavLink>
                        <NavLink to={`${url}/results`} className="nav-link" activeClassName="active">
                            Schedule and Results
                        </NavLink>
                        <NavLink to={`${url}/history`} className="nav-link" activeClassName="active">
                            History
                        </NavLink>
                    </Nav>
                );
            case "clubs":
                return <></>;
            case "about":
                return (
                    <Nav>
                        <NavLink to={`${url}/committee`} className="nav-link" activeClassName="active">
                            Executive Committee
                        </NavLink>
                        <NavLink to={`${url}/awards`} className="nav-link" activeClassName="active">
                            Awards
                        </NavLink>
                    </Nav>
                );
            default:
                return null;
        }
    };

    return (
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav id="topnav">{selectMenu()}</Nav>
        </Navbar.Collapse>
    );
};

export default PageMenu;
