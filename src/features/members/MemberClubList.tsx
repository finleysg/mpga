import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";

import constants from "../../constants";
import { IClub } from "../../models/Clubs";
import { IApplicationState } from "../../store";
import MemberClubActions from "../../store/MemberClubActions";
import MemberClubRow from "./MemberClubRow";

const MemberClubList: React.FC = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: IApplicationState) => state.memberClubs);

    useEffect(() => {
        if (!state.clubs || state.clubs.length === 0) {
            dispatch(MemberClubActions.LoadMemberClubs());
        }
    }, [dispatch, state.clubs]);

    return (
        <div>
            <Table striped size="sm">
                <thead>
                    <tr>
                        <th>{constants.MemberClubYear}</th>
                        <th>Club</th>
                        <th>Website</th>
                        <th>Location</th>
                        <th>Size</th>
                        {/* <th>President</th> */}
                    </tr>
                </thead>
                <tbody>
                    {state.clubs.map((club: IClub) => (
                        <MemberClubRow key={club.id} club={club} />
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default MemberClubList;
