import React, { useRef } from "react"

import LoadingContainer from "../../components/LoadingContainer"
import { CloseableEditContainer, CloseHandle } from "../../components/WithEdit"
import { PageContent } from "../../models/Policies"
import usePermissions from "../../utilities/Permissions"
import { useGetPageContentQuery } from "./contentApi"
import { PageContentDetailProps } from "./contentPropTypes"
import PageContentEdit from "./PageContentEdit"
import PageContentView from "./PageContentView"

const PageContentDetail: React.FC<PageContentDetailProps> = (props) => {
	const { pageCode } = props
	const { pageContent, isLoading } = useGetPageContentQuery(undefined, {
		selectFromResult: (result) => ({
			pageContent: new PageContent(result.data?.find((d) => d.page_type === pageCode)),
			...result,
		}),
	})
	const permissions = usePermissions()
	const closeRef = useRef<CloseHandle>()

	const handleClose = () => {
		closeRef.current?.close()
	}

	return (
		<LoadingContainer loading={isLoading}>
			<CloseableEditContainer
				ref={closeRef}
				initEdit={false}
				canEdit={permissions.canEditPageContent()}
				viewComponent={<PageContentView pageContent={pageContent} />}
				editComponent={<PageContentEdit pageContent={pageContent} onClose={handleClose} />}
			/>
		</LoadingContainer>
	)
}

export default PageContentDetail
