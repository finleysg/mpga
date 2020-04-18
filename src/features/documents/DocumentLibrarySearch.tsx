import { Formik } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import MultiSelect from "../../components/MultiSelect";
import { Tournament } from "../../models/Events";
import { IDocumentSearch } from "../../store/DocumentActions";

export interface IDocumentLibrarySearchProps {
    query: IDocumentSearch;
    tournaments: Tournament[];
    OnSearch: (query: IDocumentSearch) => void;
}

interface IQuery {
    tournamentId?: number;
    year?: number;
    documentTypes?: string[];
    tags?: string;
}

const schema = yup.object({
    year: yup.number().nullable(),
    tournamentId: yup.number().nullable(),
    documentTypes: yup.string().nullable(),
    tags: yup.string().nullable(),
});

const DocumentLibrarySearch: React.FC<IDocumentLibrarySearchProps> = (props) => {
    const { query, OnSearch } = props;
    const search: IQuery = {
        tournamentId: query.tournamentId,
        year: query.year,
        documentTypes: query.documentTypes,
        tags: query.tags?.join(","),
    };

    return (
        <Formik
            validationSchema={schema}
            onSubmit={(values, actions) => {
                const newQuery = Object.assign({}, query);
                newQuery.year = values.year;
                newQuery.tournamentId = values.tournamentId;
                newQuery.documentTypes = values.documentTypes;
                newQuery.tags = values.tags?.split(",") || [];
                OnSearch(newQuery);
            }}
            onReset={(values, actions) => {
                actions.resetForm({
                    values: {},
                });
                OnSearch({ key: query.key });
            }}
            initialValues={search}>
            {({ handleSubmit, handleReset, handleChange, handleBlur, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit} onReset={handleReset}>
                    <Form.Row>
                        <Col sm={1}>
                            <Form.Control
                                name="year"
                                placeholder="Year"
                                width="80px"
                                type="number"
                                value={values.year?.toString() || ""}
                                isValid={touched.year && !errors.year}
                                isInvalid={!!errors.year}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
                        </Col>
                        <Col sm={3}>
                            <MultiSelect
                                clearText="Clear"
                                closeText="Apply"
                                label="Select..."
                                initialValues={values.documentTypes}
                                onChange={(selections) => (values.documentTypes = selections)}>
                                <option value="Agenda">Agenda</option>
                                <option value="ByLaws">ByLaws</option>
                                <option value="Club Registration">Club Registration</option>
                                <option value="Financial">Financial</option>
                                <option value="Match Play">Match Play</option>
                                <option value="Match Play Brackets">Match Play Brackets</option>
                                <option value="Minutes">Minutes</option>
                                <option value="Other">Other</option>
                                <option value="Registration">Registration</option>
                                <option value="Results">Results</option>
                                <option value="Standing Orders">Standing Orders</option>
                                <option value="Tee Times">Tee Times</option>
                            </MultiSelect>
                        </Col>
                        <Col sm={3}>
                            <Form.Control
                                as="select"
                                name="tournamentId"
                                value={values.tournamentId?.toString() || ""}
                                isValid={touched.tournamentId && !errors.tournamentId}
                                isInvalid={!!errors.tournamentId}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                <option value={undefined}></option>
                                {props.tournaments.map((tournament) => {
                                    return <option key={tournament.id} value={tournament.id}>{tournament.name}</option>;
                                })}
                            </Form.Control>
                        </Col>
                        <Col sm={3}>
                            <Form.Control
                                name="tags"
                                placeholder="Tags (comma separated)"
                                value={values.tags || ""}
                                isValid={touched.tags && !errors.tags}
                                isInvalid={!!errors.tags}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Col>
                        <Col sm={2}>
                            <Button variant="secondary" type="submit" size="sm">
                                Search
                            </Button>
                            <Button className="ml-2" variant="light" type="reset" size="sm">
                                Clear
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            )}
        </Formik>
    );
};

export default DocumentLibrarySearch;
