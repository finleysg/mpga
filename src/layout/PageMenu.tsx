import React from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import useSession from "utilities/SessionHooks";

import constants from "../constants";

export interface IPageMenuProps {
  subMenu: string;
  segments: string[];
}

const PageMenu: React.FC<IPageMenuProps> = (props) => {
  const { user } = useSession();

  const renderAccountLink = () => {
    if (user.isAuthenticated) {
      return (
        <NavLink to="/account" className="nav-link">
          My Account ({user.name})
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
              <NavLink to={`/tournaments/history/${tournamentName}`} className="nav-link">
                History
              </NavLink>
              <NavLink
                to={`/tournaments/gallery/${tournamentName}/${constants.EventCalendarYear}`}
                className="nav-link"
              >
                Gallery
              </NavLink>
              <NavLink
                to={`/tournaments/contact/${tournamentName}/${constants.EventCalendarYear}`}
                className="nav-link"
              >
                Contact
              </NavLink>
            </Nav>
          );
        } else {
          return (
            <Nav>
              <NavLink to={`/tournaments/hard-card`} className="nav-link">
                Hard Card
              </NavLink>
              <NavLink to={`/tournaments/code-of-conduct`} className="nav-link">
                Code of Conduct
              </NavLink>
              <NavLink to={`/tournaments/pace-of-play`} className="nav-link">
                Pace of Play
              </NavLink>
              <NavLink to={`/tournaments/bid`} className="nav-link">
                Tournament Bid
              </NavLink>
            </Nav>
          );
        }
      case "match-play":
        return (
          <Nav>
            <NavLink to={`/match-play/rules`} className="nav-link">
              Rules
            </NavLink>
            <NavLink to={`/match-play/results`} className="nav-link">
              Schedule and Results
            </NavLink>
            {/* <NavLink to={`/match-play/history`} className="nav-link">
              History
            </NavLink> */}
          </Nav>
        );
      case "clubs":
        return <></>;
      case "about":
        return (
          <Nav>
            <NavLink to={`/about/committee`} className="nav-link">
              Executive Committee
            </NavLink>
            <NavLink to={`/about/awards`} className="nav-link">
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
      <Nav id="topnav">
        {selectMenu()}
        {renderAccountLink()}
      </Nav>
    </Navbar.Collapse>
  );
};

export default PageMenu;
