import * as React from "react";

import { CloseableEditContainer, CloseHandle } from "../../../components/WithEdit";
import usePermissions from "../../../utilities/Permissions";
import { EventLinkDetailProps } from "../eventsPropType";
import EventLinkEdit from "./EventLinkEdit";
import EventLinkView from "./EventLinkView";

const EventLinkDetail: React.FunctionComponent<EventLinkDetailProps> = (props) => {
  const permissions = usePermissions();
  const { eventLink, edit, render } = props;
  const closeRef = React.useRef<CloseHandle>();

  const handleClose = () => {
    closeRef.current.close();
  };

  return (
    <CloseableEditContainer
      ref={closeRef}
      initEdit={edit}
      canEdit={permissions.canManageEvent()}
      viewComponent={<EventLinkView eventLink={eventLink} render={render} />}
      editComponent={<EventLinkEdit eventLink={eventLink} onClose={handleClose} />}
    />
  );
};

export default EventLinkDetail;
