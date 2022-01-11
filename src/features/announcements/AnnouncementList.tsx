import React from "react";

import { useGetDocumentsQuery } from "features/documents/documentApi";
import { MpgaDocument } from "models/Documents";
import Button from "react-bootstrap/Button";

import LoadingContainer from "../../components/LoadingContainer";
import Constants from "../../constants";
import { Announcement } from "../../models/Announcement";
import usePermissions from "../../utilities/Permissions";
import { useGetAnnouncementsQuery } from "./announcementApi";
import AnnouncementDetail from "./AnnouncementDetail";

const AnnouncementList: React.FC = () => {
  const [addNew, setAddNew] = React.useState(false);
  const permissions = usePermissions();
  const { data: announcements, isLoading } = useGetAnnouncementsQuery();
  const { documents, docsLoading } = useGetDocumentsQuery(
    {
      key: "current-documents",
      year: Constants.EventCalendarYear,
    },
    {
      selectFromResult: ({ data, isLoading }) => ({
        documents: data.map((d) => new MpgaDocument(d)),
        docsLoading: isLoading,
      }),
    },
  );

  const emptyAnnouncement = () => {
    return new Announcement({
      id: 0,
      starts: new Date().toISOString(),
      expires: new Date().toISOString(),
    });
  };

  return (
    <LoadingContainer loading={isLoading || docsLoading}>
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
        );
      })}
    </LoadingContainer>
  );
};

export default AnnouncementList;
