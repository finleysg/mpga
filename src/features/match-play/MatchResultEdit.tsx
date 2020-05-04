import { Formik } from "formik";
import React from "react";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import CancelButton from "../../components/CancelButton";
import { DatePickerField } from "../../components/DatePickerField";
import SubmitButton from "../../components/SubmitButton";
import { MatchResult, Team } from "../../models/Clubs";

export interface IMatchResultEditProps {
    result: MatchResult;
    groups: string[];
    teams: Team[];
    Save: (result: MatchResult) => void;
    Cancel: () => void;
}

const schema = yup.object({
    matchDate: yup.date().required(),
    groupName: yup.string().max(20).required(),
    homeTeam: yup.number().required(),
    homeTeamScore: yup.number().required(),
    awayTeam: yup.number().required(),
    awayTeamScore: yup.number().required(),
    forfeit: yup.bool(),
    notes: yup.string().max(140),
});

const MatchResultEdit: React.FC<IMatchResultEditProps> = (props) => {
    const { result } = props;

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                    const newModel = new MatchResult(values);
                    newModel.id = result.id;
                    props.Save(newModel);
                }}
                initialValues={result}>
                {({ handleSubmit, setFieldValue, handleChange, handleBlur, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="matchDate">
                            <Form.Label>Match Date</Form.Label>
                            <br />
                            <DatePickerField
                                name="matchDate"
                                className="full-width"
                                value={values.matchDate}
                                onChange={setFieldValue}
                                onBlur={handleBlur}
                                dateFormat="MMM dd"
                            />
                            <Form.Control.Feedback type="invalid">{errors.matchDate}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="groupName">
                            <Form.Label>Group</Form.Label>
                            <Form.Control
                                as="select"
                                name="groupName"
                                value={values.groupName}
                                isValid={touched.groupName && !errors.groupName}
                                isInvalid={!!errors.groupName}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                <option value={undefined}>--Select a Group--</option>
                                {props.groups.map((group, idx) => {
                                    return (
                                        <option key={idx} value={group}>
                                            {group}
                                        </option>
                                    );
                                })}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.groupName}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="homeTeam">
                            <Form.Label>Home Team</Form.Label>
                            <Form.Control
                                as="select"
                                name="homeTeam"
                                value={values.homeTeam.toString()}
                                isValid={touched.homeTeam && !errors.homeTeam}
                                isInvalid={!!errors.homeTeam}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                <option value={undefined}>--Home Team--</option>
                                {props.teams
                                    .filter((t) => t.groupName === values.groupName)
                                    .map((team) => {
                                        return (
                                            <option key={team.id} value={team.club.id}>
                                                {team.club.name}
                                            </option>
                                        );
                                    })}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.groupName}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="homeTeamScore">
                            <Form.Label>Home Team Score</Form.Label>
                            <Form.Control
                                name="homeTeamScore"
                                value={values.homeTeamScore.toString()}
                                isValid={touched.homeTeamScore && !errors.homeTeamScore}
                                isInvalid={!!errors.homeTeamScore}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.homeTeamScore}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="awayTeam">
                            <Form.Label>Away Team</Form.Label>
                            <Form.Control
                                as="select"
                                name="awayTeam"
                                value={values.awayTeam.toString()}
                                isValid={touched.awayTeam && !errors.awayTeam}
                                isInvalid={!!errors.awayTeam}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                <option value={undefined}>--Away Team--</option>
                                {props.teams
                                    .filter((t) => t.groupName === values.groupName)
                                    .map((team) => {
                                        return (
                                            <option key={team.id} value={team.club.id}>
                                                {team.club.name}
                                            </option>
                                        );
                                    })}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.groupName}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="awayTeamScore">
                            <Form.Label>Away Team Score</Form.Label>
                            <Form.Control
                                name="awayTeamScore"
                                value={values.awayTeamScore.toString()}
                                isValid={touched.awayTeamScore && !errors.awayTeamScore}
                                isInvalid={!!errors.awayTeamScore}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.awayTeamScore}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="forfeit">
                            <Form.Check
                                type="switch"
                                name="forfeit"
                                value={values.forfeit.toString()}
                                label="Match was a forfeit"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="notes">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                name="notes"
                                placeholder="Notes"
                                value={values.notes}
                                isValid={touched.notes && !errors.notes}
                                isInvalid={!!errors.notes}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.notes}</Form.Control.Feedback>
                        </Form.Group>
                        <SubmitButton />
                        <CancelButton canCancel={result.id! <= 0} OnCancel={() => props.Cancel()} />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default MatchResultEdit;
