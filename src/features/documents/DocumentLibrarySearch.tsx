import React from "react";

import { Formik } from "formik";
import { Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

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
  documentType?: string;
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
    documentType: query.documentType,
    tags: query.tags?.join(","),
  };
  const documentOptions = [
    { value: "Agenda", label: "Agenda" },
    { value: "ByLaws", label: "ByLaws" },
    { value: "Club Registration", label: "Club Registration" },
    { value: "Financial", label: "Financial" },
    { value: "Match Play", label: "Match Play" },
    { value: "Match Play Brackets", label: "Match Play Brackets" },
    { value: "Minutes", label: "Minutes" },
    { value: "Other", label: "Other" },
    { value: "Registration", label: "Registration" },
    { value: "Results", label: "Results" },
    { value: "Standing Orders", label: "Standing Orders" },
    { value: "Tee Times", label: "Tee Times" },
  ];

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, actions) => {
        const newQuery = Object.assign({}, query);
        newQuery.year = values.year;
        newQuery.tournamentId = values.tournamentId;
        newQuery.documentType = values.documentType;
        newQuery.tags = values.tags?.split(",") || [];
        OnSearch(newQuery);
      }}
      initialValues={search}
    >
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} sm={3} md={2} lg={1}>
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
            <Col xs={12} sm={5} md={2} lg={3}>
              <Form.Control
                as="select"
                name="documentType"
                value={values.documentType?.toString() || ""}
                isValid={touched.documentType && !errors.documentType}
                isInvalid={!!errors.documentType}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value={undefined}></option>
                {documentOptions.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  );
                })}
              </Form.Control>
            </Col>
            <Col xs={12} sm={4} md={3} lg={3}>
              <Form.Control
                as="select"
                name="tournamentId"
                value={values.tournamentId?.toString() || ""}
                isValid={touched.tournamentId && !errors.tournamentId}
                isInvalid={!!errors.tournamentId}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value={undefined}></option>
                {props.tournaments.map((tournament) => {
                  return (
                    <option key={tournament.id} value={tournament.id}>
                      {tournament.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Col>
            <Col xs={12} sm={6} md={3} lg={3}>
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
            <Col xs={12} sm={6} md={2} lg={2}>
              <Button variant="secondary" type="submit" size="sm">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default DocumentLibrarySearch;
