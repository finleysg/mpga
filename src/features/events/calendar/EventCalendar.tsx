import React from "react"

import { useNavigate } from "react-router-dom"

import constants from "../../../app-constants"
import LoadingContainer from "../../../components/LoadingContainer"
import { EventDetail } from "../../../models/Events"
import { useGetAppConfigQuery } from "../../content/contentApi"
import { useGetEventsQuery } from "../eventsApi"
import EventCalendarItem from "./EventCalendarItem"

const EventCalendar: React.FC = () => {
  const { data: appConfig } = useGetAppConfigQuery()
  const season = appConfig?.eventCalendarYear ?? constants.CurrentYear

  const { data: events, isLoading } = useGetEventsQuery(season)
  const navigate = useNavigate()

  const handleNavigation = (linkName: string) => {
    const location = {
      pathname: "/tournaments/",
      hash: `#${linkName}`,
    }
    navigate(location)
  }

  return (
    <div>
      <h3 className="text-primary mb-3">{season} Tournament Calendar</h3>
      <LoadingContainer loading={isLoading}>
        {events
          ?.map((eventData) => new EventDetail(eventData))
          .map((event) => {
            return (
              <EventCalendarItem key={event.id} eventDetail={event} onSelect={handleNavigation} />
            )
          })}
      </LoadingContainer>
    </div>
  )
}

export default EventCalendar
