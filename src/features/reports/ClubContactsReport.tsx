import React from "react";

import { useGetClubContactsQuery, useGetClubsQuery } from "features/member-clubs/memberClubApi";
import Table from "react-bootstrap/Table";
import { CSVLink } from "react-csv";

import { ClubContact } from "../../models/Clubs";

interface IClubContactReportProps {
  filter?: string;
}

const ClubContactsReport: React.FunctionComponent<IClubContactReportProps> = (props) => {
  const { filter } = props;
  const { data: clubContacts } = useGetClubContactsQuery();
  const { data: clubs } = useGetClubsQuery();

  const formatRoles = (cc: ClubContact): string => {
    return (cc.roles && cc.roles?.map((r) => r.role).join(", ")) || "";
  };

  const applyFilter = (cc: ClubContact): boolean => {
    if (filter === "primary") {
      return cc.isPrimary;
    } else if (filter === "mailings") {
      return cc.useForMailings;
    } else if (filter === "captains") {
      const role = cc.roles?.findIndex((r) => r.role && r.role.indexOf("Captain") >= 0);
      return role !== undefined && role >= 0;
    }
    return true;
  };

  const getClub = (cc: ClubContact) => {
    return clubs?.find((c) => (c.id = cc.club));
  };

  const getHeaders = () => {
    const headers = [
      { label: "Home Club", key: "homeClub" },
      { label: "First Name", key: "firstName" },
      { label: "Last Name", key: "lastName" },
      { label: "Email", key: "email" },
      { label: "Phone", key: "phone" },
      { label: "Club Url", key: "clubUrl" },
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
    clubContacts
      ?.map((cc) => new ClubContact(cc))
      .filter((cc) => applyFilter(cc))
      .forEach((cc: ClubContact) => {
        if (filter === "mailings") {
          contacts.push({
            homeClub: getClub(cc).name,
            firstName: cc.contact?.firstName,
            lastName: cc.contact?.lastName,
            email: cc.contact?.email,
            phone: cc.contact?.primaryPhone,
            clubUrl: `https://mpga.net/clubs/${getClub(cc).system_name}`,
            address: cc.contact?.addressTxt,
            city: cc.contact?.city,
            state: cc.contact?.state,
            zip: cc.contact?.zip,
            roles: formatRoles(cc),
          });
        } else if (filter === "captains") {
          contacts.push({
            homeClub: getClub(cc).name,
            firstName: cc.contact?.firstName,
            lastName: cc.contact?.lastName,
            email: cc.contact?.email,
            phone: cc.contact?.primaryPhone,
            clubUrl: `https://mpga.net/clubs/${getClub(cc).system_name}`,
            roles: formatRoles(cc),
            notes: cc.contact?.notes,
          });
        } else {
          contacts.push({
            homeClub: getClub(cc).name,
            firstName: cc.contact?.firstName,
            lastName: cc.contact?.lastName,
            email: cc.contact?.email,
            phone: cc.contact?.primaryPhone,
            clubUrl: `https://mpga.net/clubs/${getClub(cc).system_name}`,
            roles: formatRoles(cc),
          });
        }
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
  };

  return (
    <div>
      <CSVLink data={getData()} headers={getHeaders()} enclosingCharacter={'"'} filename={getFilename()}>
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
            <th>Club Page Url</th>
            {filter === "captains" && <th>Notes</th>}
          </tr>
        </thead>
        <tbody>
          {getData().map((cc: any) => (
            <tr key={cc.id}>
              <td>{cc.homeClub}</td>
              <td>{cc.contact?.firstName}</td>
              <td>{cc.contact?.lastName}</td>
              <td>{cc.contact?.email}</td>
              <td>{cc.contact?.primaryPhone}</td>
              {filter === "mailings" && <td>{cc.contact?.addressTxt}</td>}
              {filter === "mailings" && <td>{cc.contact?.city}</td>}
              {filter === "mailings" && <td>{cc.contact?.state}</td>}
              {filter === "mailings" && <td>{cc.contact?.zip}</td>}
              <td>{cc.roles}</td>
              <td>cc.clubUrl</td>
              {filter === "captains" && <td>{cc.notes}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ClubContactsReport;
