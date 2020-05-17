import { useSelector } from "react-redux";
import { IApplicationState } from "../store";

const usePermissions = () => {
    const app = useSelector((state: IApplicationState) => state.app);
    const layout = useSelector((state: IApplicationState) => state.layout);
    const session = useSelector((state: IApplicationState) => state.session);

    const isOnlyClubContact = () => {
        const user = session.user;
        return user.isClubContact && !user.isCommittee && !user.isAdmin;
    }

    const canPostMatchResult = () => {
        const user = session.user;
        return user.isAuthenticated;
    };

    const canToggleEditMode = () => {
        const user = session.user;
        if (isOnlyClubContact()) {
            // Enable only on the club details page
            return layout.subMenu === "clubs" && layout.segments.length === 2 && layout.segments[1] === user.clubId;
        } else {
            return user.isCommittee || user.isHistorian || user.isAdmin;
        }
    };

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
        const user = session.user;
        return user.isCommittee || user.isAdmin;
    };

    const canEditDocuments = () => {
        const user = session.user;
        return app.editMode && (user.isCommittee || user.isAdmin);
    };

    const canViewReports = () => {
        const user = session.user;
        return user.isCommittee || user.isAdmin;
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
