import { skipToken } from "@reduxjs/toolkit/query"

import React, { useState } from "react"

import { FaCamera } from "react-icons/fa"

import { EditOrView } from "../../../components/EditContainer"
import LoadingContainer from "../../../components/LoadingContainer"
import ToggleEditButton from "../../../components/ToggleEditButton"
import { useGetRandomPhotoQuery } from "../../../features/gallery/galleryApi"
import { MpgaPhoto } from "../../../models/Documents"
import usePermissions from "../../../utilities/Permissions"
import PhotoUpload from "../../gallery/PhotoUpload"
import { EventProps } from "../eventsPropType"
import EventGalleryView from "./EventGalleryView"

const EventGalleryDetail: React.FC<EventProps> = (props) => {
	const { eventDetail } = props
	const [doUpload, setDoUpload] = useState(false)
	const permissions = usePermissions()
	const { data: photo, isLoading } = useGetRandomPhotoQuery(eventDetail.tournament.id || skipToken)

	return (
		<LoadingContainer loading={isLoading} hide={false}>
			<EditOrView $edit={doUpload}>
				{permissions.canManageEvent() && (
					<ToggleEditButton
						isEditting={doUpload}
						openIcon={<FaCamera size={20} color={"warning"} />}
						onToggled={() => setDoUpload(!doUpload)}
					/>
				)}
				{doUpload && (
					<PhotoUpload
						tournamentId={eventDetail.tournament.id}
						year={eventDetail.eventYear}
						onClose={() => setDoUpload(false)}
					/>
				)}
				{!doUpload && (
					<EventGalleryView eventDetail={eventDetail} samplePhoto={new MpgaPhoto(photo)} />
				)}
			</EditOrView>
		</LoadingContainer>
	)
}

export default EventGalleryDetail
