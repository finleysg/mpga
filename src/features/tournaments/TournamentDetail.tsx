import React, { useRef } from "react"

import { CloseableEditContainer, CloseHandle } from "../../components/WithEdit"
import usePermissions from "../../utilities/Permissions"
import TournamentEdit from "./TournamentEdit"
import { TournamentDetailProps } from "./tournamentPropTypes"
import TournamentView from "./TournamentView"

const TournamentDetail: React.FC<TournamentDetailProps> = (props) => {
  const { tournament, logoUrl } = props
  const permissions = usePermissions()
  const closeRef = useRef<CloseHandle>()

  const handleClose = () => {
    closeRef.current.close()
  }

  return (
    <CloseableEditContainer
      ref={closeRef}
      initEdit={false}
      canEdit={permissions.canEditPageContent()}
      viewComponent={<TournamentView tournament={tournament} logoUrl={logoUrl} />}
      editComponent={<TournamentEdit tournament={tournament} onClose={handleClose} />}
    />
  )
}

export default TournamentDetail
