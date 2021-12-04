import React from 'react';

import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../app-store';
import ThreeEvenColumns from '../components/layouts/ThreeEvenColumns';
import ClubContactList from '../features/members/ClubContactList';
import GolfCourseView from '../features/members/GolfCourseView';
import MemberClubDetail from '../features/members/MemberClubDetail';
import { getMemberClub } from '../store/MemberClubSlice';

const MemberClubPage: React.FC = () => {
  const { name } = useParams();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getMemberClub(name));
  }, [dispatch, name]);

  return (
    <Container fluid={true}>
      <ThreeEvenColumns Column1={<MemberClubDetail />} Column2={<ClubContactList />} Column3={<GolfCourseView />} />
    </Container>
  );
};

export default MemberClubPage;
