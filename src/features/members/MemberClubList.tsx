import React from "react";

import Table from "react-bootstrap/Table";

import Processing from "../../components/Processing";
import constants from "../../constants";
import { IClub } from "../../models/Clubs";
import { useGetClubsQuery } from "../../services/ClubEndpoints";
import { useGetMembershipsForYearQuery } from "../../services/MembershipEndpoints";
import MemberClubRow from "./MemberClubRow";

const MemberClubList: React.FC = () => {
  const { data: memberships, isLoading: membershipsLoading } = useGetMembershipsForYearQuery(constants.MemberClubYear);
  const { data: clubs, isLoading: clubsLoading } = useGetClubsQuery();

  const getClubList = (): IClub[] => {
    if (!clubsLoading && !membershipsLoading) {
      return clubs.map((club) => {
        const isCurrent = memberships.findIndex((m) => m.club === club.id) >= 0;
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
    <div>
      {membershipsLoading || clubsLoading ? (
        <Processing message="Loading member clubs..." />
      ) : (
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
            {getClubList().map((club) => (
              <MemberClubRow key={club.id} club={club} />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default MemberClubList;
