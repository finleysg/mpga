import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";

import { ClubContact, Club } from "../../models/Clubs";
import { IApplicationState } from "../../store";
import ReportActions from "../../store/ReportActions";
import { CSVLink } from "react-csv";

interface IClubContactReportProps {
    filter?: string;
}

const ClubContactsReport: React.FunctionComponent<IClubContactReportProps> = (props) => {
    const { filter } = props;
    const dispatch = useDispatch();
    const reportData = useSelector((state: IApplicationState) => state.reports);

    useEffect(() => {
        if (!reportData.clubContacts || reportData.clubContacts.length === 0) {
            dispatch(ReportActions.GetClubContacts());
        }
    }, [dispatch, reportData.clubContacts]);

    const formatRoles = (cc: ClubContact): string => {
        return (cc.roles && cc.roles?.map(r => r.role).join(", ")) || "";
    }

    const applyFilter = (cc: ClubContact): boolean => {
        if (filter === "primary") {
            return cc.isPrimary;
        } else if (filter === "mailings") {
            return cc.useForMailings;
        } else if (filter === "captains") {
            const role = cc.roles?.findIndex(r => r.role && r.role.indexOf("Captain") >= 0);
            return role !== undefined && role >= 0;
        }
        return true;
    }

    const getHeaders = () => {
        const headers = [
            { label: "Home Club", key: "homeClub" },
            { label: "First Name", key: "firstName" },
            { label: "Last Name", key: "lastName" },
            { label: "Email", key: "email" },
            { label: "Phone", key: "phone" },
        ];
        if (filter === "mailings") {
            headers.push({ label: "Address", key: "address" });
            headers.push({ label: "City", key: "city" });
            headers.push({ label: "State", key: "state" });
            headers.push({ label: "zip", key: "zip" });
        }
        headers.push({ label: "Roles", key: "roles" });
        if (filter === "captains") {
            headers.push({ label: "Notes", key: "notes" });
        }
        return headers;
    };

    const getData = (): any[] => {
        const contacts: any[] = [];
        reportData.clubs.forEach((club: Club) => {
            club.clubContacts.filter(cc => applyFilter(cc)).forEach((cc: ClubContact) => {
                if (filter === "mailings") {
                    contacts.push({
                        homeClub: club.name,
                        firstName: cc.contact?.firstName,
                        lastName: cc.contact?.lastName,
                        email: cc.contact?.email,
                        phone: cc.contact?.primaryPhone,
                        address: cc.contact?.addressTxt,
                        city: cc.contact?.city,
                        state: cc.contact?.state,
                        zip: cc.contact?.zip,
                        roles: formatRoles(cc),
                    });
                } else if (filter === "captains") {
                    contacts.push({
                        homeClub: club.name,
                        firstName: cc.contact?.firstName,
                        lastName: cc.contact?.lastName,
                        email: cc.contact?.email,
                        phone: cc.contact?.primaryPhone,
                        roles: formatRoles(cc),
                        notes: cc.contact?.notes,
                    });
                } else {
                    contacts.push({
                        homeClub: club.name,
                        firstName: cc.contact?.firstName,
                        lastName: cc.contact?.lastName,
                        email: cc.contact?.email,
                        phone: cc.contact?.primaryPhone,
                        roles: formatRoles(cc),
                    });
                }
            });
        });
        return contacts;
    };

    const getFilename = (): string => {
        if (filter === "primary") {
            return "MpgaPrimaryContacts.csv";
        } else if (filter === "mailings") {
            return "MpgaMailingAddresses.csv";
        } else if (filter === "captains") {
            return "MpgaTeamCaptains.csv";
        } else {
            return "MpgaClubContacts.csv";
        }
    }

    return (
        <div>
            <CSVLink
                data={getData()}
                headers={getHeaders()}
                enclosingCharacter={'"'}
                filename={getFilename()}>
                Download
            </CSVLink>
            <Table striped size="sm">
                <thead>
                    <tr>
                        <th>Home club</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        {filter === "mailings" && <th>Address</th>}
                        {filter === "mailings" && <th>City</th>}
                        {filter === "mailings" && <th>State</th>}
                        {filter === "mailings" && <th>Zip</th>}
                        <th>Role(s)</th>
                        {filter === "captains" && <th>Notes</th>}
                    </tr>
                </thead>
                <tbody>
                    {reportData.clubs.map((club: Club) =>
                        club.clubContacts.filter(cc => applyFilter(cc)).map((cc: ClubContact) => (
                            <tr>
                                <td>{club.name}</td>
                                <td>{cc.contact?.firstName}</td>
                                <td>{cc.contact?.lastName}</td>
                                <td>{cc.contact?.email}</td>
                                <td>{cc.contact?.primaryPhone}</td>
                                {filter === "mailings" && <td>{cc.contact?.addressTxt}</td>}
                                {filter === "mailings" && <td>{cc.contact?.city}</td>}
                                {filter === "mailings" && <td>{cc.contact?.state}</td>}
                                {filter === "mailings" && <td>{cc.contact?.zip}</td>}
                                <td>{formatRoles(cc)}</td>
                                {filter === "captains" && <td>{cc.notes}</td>}
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default ClubContactsReport;
