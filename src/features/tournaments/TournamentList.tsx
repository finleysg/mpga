import React from "react"

import constants from "../../app-constants"
import LoadingContainer from "../../components/LoadingContainer"
import { useGetEventsQuery } from "../../features/events/eventsApi"
import { EventDetail, Tournament } from "../../models/Events"
import { useGetAppConfigQuery } from "../content/contentApi"
import TournamentDetail from "./TournamentDetail"

const TournamentList: React.FC = () => {
  const { data: appConfig } = useGetAppConfigQuery()
  const { data: events, isLoading: eventsLoading } = useGetEventsQuery(appConfig?.eventCalendarYear ?? constants.CurrentYear)

  return (
    <LoadingContainer loading={eventsLoading}>
      {events?.map((evt) => {
        const eventInstance = new EventDetail(evt)
        return (
          <TournamentDetail
            key={evt.tournament.id}
            tournament={new Tournament(evt.tournament)}
            logoUrl={eventInstance.location?.logoUrl}
          />
        )
      })}
    </LoadingContainer>
  )
}

export default TournamentList
