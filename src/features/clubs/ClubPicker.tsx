import React from "react";
import { Club } from "../../models/Clubs";
import ClubSearch from "./ClubSearch";
import Form from "react-bootstrap/Form";
import { IClubData } from "./ClubApi";

export interface IClubPickerProps {
    doSelect: boolean;
    club: Club;
    OnSelect: (club: IClubData) => void;
}

const ClubPicker: React.FC<IClubPickerProps> = props => {
    return (
        <div>
            {props.doSelect ? (
                <React.Fragment>
                    <Form.Control name="clubName" value={props.club.name} readOnly={true} />
                    <ClubSearch OnSelect={props.OnSelect} />
                </React.Fragment>
            ) : (
                <Form.Control name="clubName" value={props.club.name} readOnly={true} />
            )}
        </div>
    );
};

export default ClubPicker;
