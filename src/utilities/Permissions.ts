import { useSelector } from "react-redux";
import { IApplicationState } from "../store";

const usePermissions = () => {
    const app = useSelector((state: IApplicationState) => state.app);
    const session = useSelector((state: IApplicationState) => state.session);

    const canPostMatchResult = () => {
        const user = session.user;
        return user.isAuthenticated;
    };

    const canToggleEditMode = () => {
        const user = session.user;
        return (user.isCommittee || user.isHistorian || user.isAdmin);
    }

    const canEditAnnouncements = () => {
        const user = session.user;
        return app.editMode && (user.isOfficer || user.isAdmin);
    };

    const canAddCommittee = () => {
        const user = session.user;
        return app.editMode && (user.isOfficer || user.isAdmin);
    };

    const canEditCommittee = () => {
        const user = session.user;
        return app.editMode && (user.isCommittee || user.isAdmin);
    };

    const canEditClubPage = () => {
        const user = session.user;
        return app.editMode && (user.isClubContact || user.isOfficer || user.isAdmin);
    };

    const canViewWiki = () => {
        return false;
        // const user = session.user;
        // return app.editMode && (user.isClubContact || user.isCommittee || user.isAdmin);
    };

    const canViewDocumentLibrary = () => {
        const user = session.user;
        return (user.isCommittee || user.isAdmin);
    };

    const canEditDocuments = () => {
        const user = session.user;
        return app.editMode && (user.isCommittee || user.isAdmin);
    };

    const canViewReports = () => {
        return false;
        // const user = session.user;
        // return app.editMode && (user.isCommittee || user.isAdmin);
    };

    const canManageEvent = () => {
        const user = session.user;
        return app.editMode && (user.isCommittee || user.isAdmin);
    };

    const canEditPolicies = () => {
        const user = session.user;
        return app.editMode && (user.isOfficer || user.isAdmin);
    };

    const canEditPageContent = () => {
        const user = session.user;
        return app.editMode && (user.isOfficer || user.isAdmin);
    };

    const canEditTournamentHistory = () => {
        const user = session.user;
        return app.editMode && (user.isCommittee || user.isHistorian || user.isAdmin);
    };

    const canEditAwards = () => {
        const user = session.user;
        return app.editMode && (user.isCommittee || user.isHistorian || user.isAdmin);
    };

    const canEditPhotos = () => {
        const user = session.user;
        return app.editMode && (user.isCommittee || user.isClubContact || user.isHistorian || user.isAdmin);
    };

    const canUploadPhotos = () => {
        const user = session.user;
        return app.editMode && (user.isCommittee || user.isHistorian || user.isAdmin);
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
    };
};

export default usePermissions;
