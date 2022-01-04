import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "app-store";
import { MpgaDocument } from "models/Documents";
import Button from "react-bootstrap/Button";

import LoadingContainer from "../../components/LoadingContainer";
import Constants from "../../constants";
import { Announcement } from "../../models/Announcement";
import DocumentActions from "../../store/DocumentActions";
import usePermissions from "../../utilities/Permissions";
import { useGetAnnouncementsQuery } from "./announcementApi";
import AnnouncementDetail from "./AnnouncementDetail";

const AnnouncementList: React.FC = () => {
  const dispatch = useAppDispatch();
  const permissions = usePermissions();
  const documentState = useAppSelector((state) => state.documents);
  const { data: announcements, isLoading } = useGetAnnouncementsQuery();
  const [addNew, setAddNew] = React.useState(false);

  const queryKey = "current-documents";

  useEffect(() => {
    dispatch(
      DocumentActions.Load({
        key: queryKey,
        year: Constants.EventCalendarYear,
      }),
    );
  }, [dispatch]);

  const emptyAnnouncement = () => {
    return new Announcement({
      id: 0,
      starts: new Date().toISOString(),
      expires: new Date().toISOString(),
    });
  };

  const getDocuments = () => {
    if (Object.prototype.hasOwnProperty.call(documentState.documents, queryKey)) {
      return documentState.documents[queryKey].map((doc) => new MpgaDocument(doc));
    }
    return [];
  };

  return (
    <div>
      <h3 className="text-primary">MPGA News</h3>
      {permissions.canEditAnnouncements() && !addNew && (
        <Button variant="link" className="text-warning" disabled={addNew} onClick={() => setAddNew(true)}>
          Add Announcement
        </Button>
      )}
      {addNew && (
        <AnnouncementDetail
          key={0}
          announcement={emptyAnnouncement()}
          edit={true}
          documents={getDocuments()}
          onClose={() => setAddNew(false)}
        />
      )}
      <LoadingContainer loading={isLoading}>
        {announcements?.map((announcement) => {
          return (
            <AnnouncementDetail
              key={announcement.id}
              announcement={new Announcement(announcement)}
              edit={false}
              documents={getDocuments()}
              onClose={() => setAddNew(false)}
            />
          );
        })}
      </LoadingContainer>
    </div>
  );
};

export default AnnouncementList;
