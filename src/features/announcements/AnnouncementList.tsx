import React from "react"

import Button from "react-bootstrap/Button"

import Constants from "../../app-constants"
import LoadingContainer from "../../components/LoadingContainer"
import { useGetDocumentsQuery } from "../../features/documents/documentApi"
import { Announcement } from "../../models/Announcement"
import { MpgaDocument } from "../../models/Documents"
import usePermissions from "../../utilities/Permissions"
import { useGetAppConfigQuery } from "../content/contentApi"
import { useGetAnnouncementsQuery } from "./announcementApi"
import AnnouncementDetail from "./AnnouncementDetail"

const AnnouncementList: React.FC = () => {
	const [addNew, setAddNew] = React.useState(false)
	const permissions = usePermissions()
  const { data: appConfig } = useGetAppConfigQuery()
	const { data: announcements, isLoading } = useGetAnnouncementsQuery()
	const { documents, docsLoading } = useGetDocumentsQuery(
		{
			key: "current-documents",
			year: appConfig?.eventCalendarYear ? appConfig.eventCalendarYear - 1 : Constants.CurrentYear,
		},
		{
			selectFromResult: ({ data, isLoading }) => ({
				documents: data?.map((d) => new MpgaDocument(d)) || [],
				docsLoading: isLoading,
			}),
		},
	)

	const emptyAnnouncement = () => {
		return new Announcement({
			id: 0,
			starts: new Date().toISOString(),
			expires: new Date().toISOString(),
		})
	}

	return (
		<LoadingContainer loading={isLoading || docsLoading}>
			<h3 className="text-primary">MPGA News</h3>
			{permissions.canEditAnnouncements() && !addNew && (
				<Button
					variant="link"
					className="text-warning"
					disabled={addNew}
					onClick={() => setAddNew(true)}
				>
					Add Announcement
				</Button>
			)}
			{addNew && (
				<AnnouncementDetail
					key={0}
					announcement={emptyAnnouncement()}
					edit={true}
					documents={documents}
					onClose={() => setAddNew(false)}
				/>
			)}
			{announcements?.map((announcement) => {
				return (
					<AnnouncementDetail
						key={announcement.id}
						announcement={new Announcement(announcement)}
						edit={false}
						documents={documents}
						onClose={() => setAddNew(false)}
					/>
				)
			})}
		</LoadingContainer>
	)
}

export default AnnouncementList
