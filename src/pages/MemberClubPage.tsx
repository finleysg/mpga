import React, { useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ThreeEvenColumns from '../components/layouts/ThreeEvenColumns';
import ClubContactList from '../features/members/ClubContactList';
import GolfCourseView from '../features/members/GolfCourseView';
import MemberClubDetail from '../features/members/MemberClubDetail';
import MemberClubActions from '../store/MemberClubActions';

const MemberClubPage: React.FC = () => {
    const { name } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (name) {
            dispatch(MemberClubActions.LoadMemberClub(name));
        }
    }, [dispatch, name]);

    return (
        <Container fluid={true}>
            <ThreeEvenColumns
                Column1={name && <MemberClubDetail />}
                Column2={name && <ClubContactList />}
                Column3={name && <GolfCourseView />}
            />
        </Container>
    );
};

export default MemberClubPage;
