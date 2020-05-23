import { Formik } from "formik";
import React from "react";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import CancelButton from "../../components/CancelButton";
import { DatePickerField } from "../../components/DatePickerField";
import SubmitButton from "../../components/SubmitButton";
import constants from "../../constants";
import { Club, Membership } from "../../models/Clubs";

export interface IMembershipEditProps {
    club: Club;
    Cancel: () => void;
    Save: (data: Membership) => void;
}

const schema = yup.object({
    paymentDate: yup.date().required(),
    paymentType: yup.string().required(),
    paymentCode: yup.string().nullable(),
    notes: yup.string().max(150).nullable(),
});

const MembershipEdit: React.FC<IMembershipEditProps> = (props) => {
    const { club, Cancel, Save } = props;
    const membership = new Membership({
        year: constants.MemberClubYear,
        club: club.id,
        payment_type: "CK",
    });

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                    Save(values);
                }}
                initialValues={membership}>
                {({ handleSubmit, setFieldValue, handleChange, handleBlur, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="paymentDate">
                            <Form.Label>Payment Date</Form.Label>
                            <DatePickerField
                                name="paymentDate"
                                value={values.paymentDate}
                                onChange={setFieldValue}
                                onBlur={handleBlur}
                                dateFormat="yyyy-MM-dd"
                            />
                            <Form.Control.Feedback type="invalid">{errors.paymentDate}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="paymentType">
                            <Form.Label>Payment Type</Form.Label>
                            <Form.Control
                                as="select"
                                name="paymentType"
                                value={values.paymentType}
                                isValid={touched.paymentType && !errors.paymentType}
                                isInvalid={!!errors.paymentType}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                <option value="CK">Check</option>
                                <option value="CA">Waived</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.paymentType}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="paymentCode">
                            <Form.Label>Check Number</Form.Label>
                            <Form.Control
                                name="paymentCode"
                                value={values.paymentCode}
                                isValid={touched.paymentCode && !errors.paymentCode}
                                isInvalid={!!errors.paymentCode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.paymentCode}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="cc.notes">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                name="notes"
                                value={values.notes}
                                isValid={touched.notes && !errors.notes}
                                isInvalid={!!errors.notes}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.notes}</Form.Control.Feedback>
                        </Form.Group>
                        <SubmitButton />
                        <CancelButton canCancel={true} OnCancel={() => Cancel()} />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default MembershipEdit;
