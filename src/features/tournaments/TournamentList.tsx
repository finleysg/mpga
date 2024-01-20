import React from "react"

import { useGetEventsQuery } from "features/events/eventsApi"

import constants from "../../app-constants"
import LoadingContainer from "../../components/LoadingContainer"
import { EventDetail, Tournament } from "../../models/Events"
import { useGetTournamentsQuery } from "./tournamentApi"
import TournamentDetail from "./TournamentDetail"

const TournamentList: React.FC = () => {
  const exclude = ["match-play", "fall-meeting", "spring-meeting", "centennial"]
  const { data: events, isLoading: eventsLoading } = useGetEventsQuery(constants.EventCalendarYear)
  const { tournaments, isLoading } = useGetTournamentsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      tournaments: data
        ?.filter((t) => exclude.indexOf(t.system_name) < 0)
        .map((t) => new Tournament(t)),
      isLoading,
    }),
  })

  return (
    <LoadingContainer loading={isLoading || eventsLoading}>
      {tournaments &&
        tournaments.map((tournament) => {
          const eventData = events?.find((e) => e.tournament.id === tournament.id)
          if (eventData) {
            const eventInstance = new EventDetail(eventData)
            return (
              <TournamentDetail
                key={tournament.id}
                tournament={tournament}
                logoUrl={eventInstance.location?.logoUrl}
              />
            )
          }
          return <TournamentDetail key={tournament.id} tournament={tournament} />
        })}
    </LoadingContainer>
  )
}

export default TournamentList
