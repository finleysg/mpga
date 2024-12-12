import React from "react"

import Container from "react-bootstrap/Container"
import { useParams } from "react-router-dom"

import NineThree from "../components/layouts/NineThree"
import LoadingContainer from "../components/LoadingContainer"
import EventDetailView from "../features/events/EventDetailView"
import { EventInformationLinks } from "../features/events/EventInformationLinks"
import { useGetEventQuery } from "../features/events/eventsApi"
import EventGalleryDetail from "../features/events/photos/EventGalleryDetail"
import EventWinnerList from "../features/events/winners/EventWinnerList"
import { EventDetail } from "../models/Events"

const EventDetailPage: React.FC = () => {
	const { name, year } = useParams()
	const { eventDetail, isLoading } = useGetEventQuery(
		{ name, year: +year },
		{
			selectFromResult: (result) => ({
				eventDetail: result.data ? new EventDetail(result.data) : EventDetail.CreateDefault(),
				...result,
			}),
		},
	)

	return (
		<Container fluid={true}>
			<LoadingContainer loading={isLoading}>
				<NineThree
					LeftColumn={<EventDetailView eventDetail={eventDetail} />}
					RightColumn={
						<React.Fragment>
							<EventInformationLinks eventDetail={eventDetail} />
							<EventWinnerList eventDetail={eventDetail} />
							<EventGalleryDetail eventDetail={eventDetail} />
						</React.Fragment>
					}
				/>
			</LoadingContainer>
		</Container>
	)
}

export default EventDetailPage
