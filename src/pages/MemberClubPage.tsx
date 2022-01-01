import React from "react";

import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";

import ThreeEvenColumns from "../components/layouts/ThreeEvenColumns";
import ClubContactList from "../features/members/ClubContactList";
import GolfCourseView from "../features/members/GolfCourseView";
import MemberClubDetail from "../features/members/MemberClubDetail";
import { Club } from "../models/Clubs";
import { useGetClubQuery, useGetClubsQuery } from "../services/ClubEndpoints";

const MemberClubPage: React.FC = () => {
  const { name } = useParams();
  const { data: clubs } = useGetClubsQuery();
  const { data, isLoading } = useGetClubQuery(clubs?.find((c) => c.system_name === name).id);
  const selectedClub = new Club(data);

  return (
    <Container fluid={true}>
      {!isLoading && (
        <ThreeEvenColumns
          Column1={<MemberClubDetail club={selectedClub} />}
          Column2={<ClubContactList club={selectedClub} />}
          Column3={<GolfCourseView club={selectedClub} />}
        />
      )}
    </Container>
  );
};

export default MemberClubPage;
