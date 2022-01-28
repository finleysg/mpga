import { skipToken } from "@reduxjs/toolkit/dist/query";

import React from "react";

import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";

import ThreeEvenColumns from "../components/layouts/ThreeEvenColumns";
import ClubContactList from "../features/member-clubs/ClubContactList";
import GolfCourseView from "../features/member-clubs/GolfCourseView";
import { useGetClubQuery, useGetClubsQuery } from "../features/member-clubs/memberClubApi";
import MemberClubDetail from "../features/member-clubs/MemberClubDetail";
import { Club } from "../models/Clubs";

const MemberClubPage: React.FC = () => {
  const { name } = useParams();
  const { data: clubs } = useGetClubsQuery();
  const { data, isLoading } = useGetClubQuery(clubs?.find((c) => c.system_name === name).id || skipToken);
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
