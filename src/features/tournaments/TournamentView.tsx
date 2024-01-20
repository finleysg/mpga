import * as React from "react"
import { useEffect, useRef } from "react"

import MarkdownRender from "components/MarkdownRender"
import { NavLink, useLocation } from "react-router-dom"
import styled from "styled-components"

import constants from "../../app-constants"
import { TournamentDetailProps } from "./tournamentPropTypes"

const LogoImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  img {
    width: 75px;
    height: 75px;
    background-size: contain;
    object-fit: scale-down;
  }
`
LogoImage.displayName = "LogoImage"

const TournamentView: React.FC<TournamentDetailProps> = (props) => {
  const { tournament, logoUrl } = props
  const location = useLocation()
  const lastHashRef = useRef<string>("")

  useEffect(() => {
    if (location.hash) {
      lastHashRef.current = location.hash.slice(1)
    }

    if (lastHashRef.current && document.getElementById(lastHashRef.current)) {
      document.getElementById(lastHashRef.current)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      })
    }
  }, [location])

  return (
    <div id={tournament.systemName} style={{ position: "relative" }}>
      <h4 className="text-secondary mb-3">{tournament.name}</h4>
      {logoUrl && (
        <LogoImage>
          <img src={logoUrl} alt={`${tournament.name} host`} />
        </LogoImage>
      )}
      <MarkdownRender text={tournament.description} />
      <NavLink
        to={`/tournaments/detail/${tournament.systemName}/${constants.EventCalendarYear}`}
        className="nav-link"
      >
        {constants.EventCalendarYear} Tournament Details
      </NavLink>
      <NavLink to={`/tournaments/history/${tournament.systemName}`} className="nav-link">
        {tournament.name} Past Winners
      </NavLink>
    </div>
  )
}

export default TournamentView
