import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";

import constants from "../constants";
import { IApplicationState } from "../store";

export interface IPageMenuProps {
    subMenu: string;
    segments: string[];
}

const PageMenu: React.FC<IPageMenuProps> = (props) => {
    const session = useSelector((state: IApplicationState) => state.session);
    const { url } = useRouteMatch();

    const renderAccountLink = () => {
        if (session.user.isAuthenticated) {
            return (
                <NavLink to="/account" className="nav-link" activeClassName="active">
                    My Account ({session.user.name})
                </NavLink>
            );
        }
        return null;
    };

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
                    </Nav>
                );
            case "tournaments":
                if (
                    segments.indexOf("detail") === 1 ||
                    segments.indexOf("contact") === 1 ||
                    segments.indexOf("gallery") === 1 ||
                    segments.indexOf("history") === 1
                ) {
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
                                to={`${url}/gallery/${tournamentName}/${constants.EventCalendarYear}`}
                                className="nav-link"
                                activeClassName="active">
                                Gallery
                            </NavLink>
                            <NavLink
                                to={`${url}/contact/${tournamentName}/${constants.EventCalendarYear}`}
                                className="nav-link"
                                activeClassName="active">
                                Contact
                            </NavLink>
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
            <Nav id="topnav">{selectMenu()}{renderAccountLink()}</Nav>
        </Navbar.Collapse>
    );
};

export default PageMenu;
