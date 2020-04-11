import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";

import { IClub } from "../../models/Clubs";
import { IApplicationState } from "../../store";
import UserActions from "../../store/UserActions";
import HomeClubForm from "./HomeClubForm";

export interface IHomeClubProps {
    clubs: IClub[];
}

const HomeClub: React.FC<IHomeClubProps> = (props) => {
    const [doEdit, setDoEdit] = useState(false);
    const dispatch = useDispatch();
    const session = useSelector((state: IApplicationState) => state.session);

    const updateHomeClub = (homeClub: string) => {
        dispatch(UserActions.UpdateContact(session.contact?.id!, { home_club: homeClub }));
        setDoEdit(false);
    };

    return (
        <div>
            <Row>
                <Col xs={3}>Home Club</Col>
                <Col xs={8}>{session.contact?.homeClub || "Click 'change' to update your home club."}</Col>
                <Col xs={1}>
                    <Button variant="link" className="text-info" onClick={() => setDoEdit(!doEdit)}>
                        {doEdit ? "cancel" : "change"}
                    </Button>
                </Col>
            </Row>
            {doEdit && (
                <Row>
                    <Col xs={12}>
                        <HomeClubForm
                            clubs={props.clubs}
                            homeClub={session.contact?.homeClub}
                            OnChange={(club) => updateHomeClub(club)}
                        />
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default HomeClub;
