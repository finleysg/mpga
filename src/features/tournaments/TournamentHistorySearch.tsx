import React from 'react';

import { Formik } from 'formik';
import { Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';

export interface ITournamentHistorySearch {
    year?: number;
    location?: string;
    division?: string;
    team?: string;
}

export interface ITournamentHistorySearchProps {
    divisionLabel: string;
    hideLocation: boolean;
    search: ITournamentHistorySearch;
    OnSearch: (search: ITournamentHistorySearch) => void;
}

const schema = yup.object({
    year: yup.number(),
    location: yup.string().nullable(),
    division: yup.string().nullable(),
    team: yup.string().nullable(),
});

const TournamentHistorySearch: React.FC<ITournamentHistorySearchProps> = (props) => {
    const { search, divisionLabel, OnSearch } = props;

    return (
        <Formik
            validationSchema={schema}
            onSubmit={(values, actions) => {
                if (values.year) {
                    values.year = +values.year;
                }
                OnSearch(values);
            }}
            onReset={(values, actions) => {
                actions.resetForm({ values: {} });
                OnSearch({});
            }}
            initialValues={search}>
            {({ handleSubmit, handleReset, handleChange, handleBlur, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit} onReset={handleReset}>
                    <Row>
                        <Form.Group as={Col} controlId="year">
                            <Form.Control
                                name="year"
                                placeholder="Year"
                                type="number"
                                value={values.year?.toString() || ""}
                                isValid={touched.year && !errors.year}
                                isInvalid={!!errors.year}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.year}
                            </Form.Control.Feedback>
                        </Form.Group>
                        {!props.hideLocation && (
                            <Form.Group as={Col} controlId="location">
                                <Form.Control
                                    name="location"
                                    placeholder="Location"
                                    value={values.location || ""}
                                    isValid={touched.location && !errors.location}
                                    isInvalid={!!errors.location}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form.Group>
                        )}
                        <Form.Group as={Col} controlId="division">
                            <Form.Control
                                name="division"
                                placeholder={divisionLabel}
                                value={values.division || ""}
                                isValid={touched.division && !errors.division}
                                isInvalid={!!errors.division}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="team">
                            <Form.Control
                                name="team"
                                placeholder="Team / Club"
                                value={values.team || ""}
                                isValid={touched.team && !errors.team}
                                isInvalid={!!errors.team}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Group>
                        <Col>
                            <Button variant="secondary" type="submit" size="sm">
                                Search
                            </Button>
                            <Button className="ml-2" variant="light" type="reset" size="sm">
                                Clear
                            </Button>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
};

export default TournamentHistorySearch;
