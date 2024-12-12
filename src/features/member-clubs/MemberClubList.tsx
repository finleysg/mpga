import React from "react";

import Table from "react-bootstrap/Table";

import constants from "../../app-constants";
import LoadingContainer from "../../components/LoadingContainer";
import { IClub } from "../../models/Clubs";
import { useGetClubsQuery } from "./memberClubApi";
import MemberClubRow from "./MemberClubRow";
import { useGetMembershipsForYearQuery } from "./membershipApi";

const MemberClubList: React.FC = () => {
  const { data: memberships, isLoading: membershipsLoading } = useGetMembershipsForYearQuery(constants.MemberClubYear);
  const { data: clubs, isLoading: clubsLoading } = useGetClubsQuery();

  const getClubList = (): IClub[] => {
    if (!clubsLoading && !membershipsLoading) {
      return clubs.map((club) => {
        const isCurrent = memberships.findIndex((m) => m.club === club.id && m.year === constants.MemberClubYear) >= 0;
        return {
          id: club.id,
          name: club.name,
          systemName: club.system_name,
          isCurrent: isCurrent,
          website: club.website,
          location: club.golf_course?.name || "unaffiliated",
          size: club.size,
        };
      });
    }
    return [];
  };

  return (
    <LoadingContainer loading={membershipsLoading || clubsLoading}>
      <Table striped size="sm">
        <thead>
          <tr>
            <th>{constants.MemberClubYear}</th>
            <th>Club</th>
            <th>Website</th>
            <th>Location</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {getClubList()?.map((club) => (
            <MemberClubRow key={club.id} club={club} />
          ))}
        </tbody>
      </Table>
    </LoadingContainer>
  );
};

export default MemberClubList;
