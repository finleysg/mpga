import React, { useState } from "react";

import { useAppDispatch } from "app-store";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import useSession from "utilities/SessionHooks";

import { IClubData } from "../../services/Data";
import UserActions from "../../store/UserActions";
import HomeClubForm from "./HomeClubForm";

type HomeClubProps = {
  clubs: IClubData[];
};

const HomeClub: React.FC<HomeClubProps> = (props) => {
  const [doEdit, setDoEdit] = useState(false);
  const dispatch = useAppDispatch();
  const { contact } = useSession();

  const updateHomeClub = (homeClub: string) => {
    dispatch(UserActions.UpdateContact(contact?.id!, { home_club: homeClub }));
    setDoEdit(false);
  };

  return (
    <div>
      <Row>
        <Col xs={3}>Home Club</Col>
        <Col xs={8}>{contact?.homeClub || "Click 'change' to update your home club."}</Col>
        <Col xs={1}>
          <Button variant="link" className="text-info" onClick={() => setDoEdit(!doEdit)}>
            {doEdit ? "cancel" : "change"}
          </Button>
        </Col>
      </Row>
      {doEdit && (
        <Row>
          <Col xs={12}>
            <HomeClubForm clubs={props.clubs} homeClub={contact?.homeClub} OnChange={(club) => updateHomeClub(club)} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default HomeClub;
