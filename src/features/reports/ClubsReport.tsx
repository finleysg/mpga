import React from "react"

import Table from "react-bootstrap/Table"
import { CSVLink } from "react-csv"

import constants from "../../app-constants"
import LoadingContainer from "../../components/LoadingContainer"
import { useGetClubsQuery } from "../../features/member-clubs/memberClubApi"
import { useGetMembershipsForYearQuery } from "../../features/member-clubs/membershipApi"
import { IMembershipData } from "../../services/Data"

interface IClubReportProps {
  current: boolean;
}

const ClubsReport: React.FC<IClubReportProps> = (props) => {
  const { current } = props;
  const { data: memberships, isLoading: membershipsLoading } = useGetMembershipsForYearQuery(constants.CurrentYear);
  const { data: clubs, isLoading: clubsLoading } = useGetClubsQuery();

  const getClubList = (): any[] => {
    if (!clubsLoading && !membershipsLoading) {
      return clubs.map((club) => {
        const membership = memberships.find((m) => m.club === club.id && m.year === constants.CurrentYear);
        return {
          id: club.id,
          name: club.name,
          systemName: club.system_name,
          isCurrent: membership?.id > 0,
          website: club.website,
          location: club.golf_course?.name || "unaffiliated",
          size: club.size,
          paymentDate: membership?.payment_date,
          paymentMethod: paymentMethod(membership),
        };
      });
    }
    return [];
  };

  const paymentMethod = (membership: IMembershipData): string => {
    if (membership) {
      if (membership.payment_type === "CK") {
        return `Check (${membership.payment_code})`;
      } else if (membership.payment_type === "OL") {
        return "Online";
      } else {
        return "Other";
      }
    }
    return "None";
  };

  const getHeaders = () => {
    const headers = [
      { label: "Name", key: "name" },
      { label: "System Name", key: "systemName" },
      { label: "Home Course", key: "homeCourse" },
      { label: "Members", key: "members" },
    ];
    if (current) {
      headers.push({ label: "Date", key: "paymentDate" });
      headers.push({ label: "Payment Method", key: "paymentMethod" });
    }
    return headers;
  };

  const getData = () => {
    if (current) {
      return getClubList()
        .filter((c) => c.isCurrent)
        .map((club: any) => {
          return {
            id: club.id,
            name: club.name,
            systemName: club.systemName,
            homeCourse: club.location,
            members: club.size,
            paymentDate: club.paymentDate,
            paymentMethod: club.paymentMethod,
          };
        });
    }
    return getClubList().map((club: any) => {
      return {
        id: club.id,
        name: club.name,
        systemName: club.systemName,
        homeCourse: club.location,
        members: club.size,
      };
    });
  };

  return (
    <LoadingContainer loading={clubsLoading || membershipsLoading}>
      <CSVLink
        data={getData()}
        headers={getHeaders()}
        enclosingCharacter={'"'}
        filename={current ? "CurrentMpgaClubs.csv" : "MpgaClubs.csv"}
      >
        Download
      </CSVLink>
      <Table striped size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>System name</th>
            <th>Home course</th>
            <th>Members</th>
            {current && <th>Date</th>}
            {current && <th>Payment Method</th>}
          </tr>
        </thead>
        <tbody>
          {getData().map((club: any) => (
            <tr key={club.id}>
              <td>{club.name}</td>
              <td>{club.systemName}</td>
              <td>{club.homeCourse}</td>
              <td>{club.members}</td>
              {current && <td>{club.paymentDate}</td>}
              {current && <td>{club.paymentMethod}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </LoadingContainer>
  );
};

export default ClubsReport;
