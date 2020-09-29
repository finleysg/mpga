import React from "react";
import Table from "react-bootstrap/Table";

import constants from "../../constants";
import { IClub } from "../../models/Clubs";
import MemberClubRow from "./MemberClubRow";
import useMemberClubs from "./UseMemberClubs";

const MemberClubList: React.FC = () => {
    const clubs = useMemberClubs();

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
                    {clubs.map((club: IClub) => (
                        <MemberClubRow key={club.id} club={club} />
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default MemberClubList;
