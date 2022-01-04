import { useAppSelector } from "app-store";

import useSession from "./SessionHooks";

const usePermissions = () => {
  const app = useAppSelector((state) => state.app);
  const layout = useAppSelector((state) => state.layout);
  const { user } = useSession();

  const isOnlyClubContact = () => {
    return user.isClubContact && !user.isCommittee && !user.isAdmin;
  };

  const canPostMatchResult = () => {
    return user.isAuthenticated;
  };

  const canToggleEditMode = () => {
    if (isOnlyClubContact()) {
      // Enable only on the club details page
      return layout.subMenu === "clubs" && layout.segments.length === 2 && layout.segments[1] === user.clubId;
    } else {
      return user.isCommittee || user.isHistorian || user.isAdmin;
    }
  };

  const canEditAnnouncements = () => {
    return app.editMode && (user.isOfficer || user.isAdmin);
  };

  const canAddCommittee = () => {
    return app.editMode && (user.isOfficer || user.isAdmin);
  };

  const canEditCommittee = () => {
    return app.editMode && (user.isCommittee || user.isAdmin);
  };

  const canEditClubPage = () => {
    if (app.editMode && isOnlyClubContact()) {
      // Enable only on the club details page
      return layout.subMenu === "clubs" && layout.segments.length === 2 && layout.segments[1] === user.clubId;
    } else {
      return app.editMode && (user.isClubContact || user.isOfficer || user.isAdmin);
    }
  };

  const canViewWiki = () => {
    return false;
    // const user = session.user;
    // return app.editMode && (user.isClubContact || user.isCommittee || user.isAdmin);
  };

  const canViewDocumentLibrary = () => {
    return user.isCommittee || user.isAdmin;
  };

  const canEditDocuments = () => {
    return app.editMode && (user.isCommittee || user.isAdmin);
  };

  const canViewReports = () => {
    return user.isCommittee || user.isAdmin;
  };

  const canManageEvent = () => {
    return app.editMode && (user.isCommittee || user.isAdmin);
  };

  const canEditPolicies = () => {
    return app.editMode && (user.isOfficer || user.isAdmin);
  };

  const canEditPageContent = () => {
    return app.editMode && (user.isOfficer || user.isAdmin);
  };

  const canEditTournamentHistory = () => {
    return app.editMode && (user.isCommittee || user.isHistorian || user.isAdmin);
  };

  const canEditAwards = () => {
    return app.editMode && (user.isCommittee || user.isHistorian || user.isAdmin);
  };

  const canEditPhotos = () => {
    return app.editMode && (user.isCommittee || user.isClubContact || user.isHistorian || user.isAdmin);
  };

  const canUploadPhotos = () => {
    return app.editMode && (user.isCommittee || user.isHistorian || user.isAdmin);
  };

  const canEnterPayment = () => {
    return app.editMode && (user.isOfficer || user.isAdmin);
  };

  return {
    canPostMatchResult,
    canToggleEditMode,
    canEditAnnouncements,
    canEditClubPage,
    canAddCommittee,
    canEditCommittee,
    canViewWiki,
    canViewDocumentLibrary,
    canEditDocuments,
    canViewReports,
    canManageEvent,
    canEditPolicies,
    canEditPageContent,
    canEditTournamentHistory,
    canEditAwards,
    canEditPhotos,
    canUploadPhotos,
    canEnterPayment,
  };
};

export default usePermissions;
