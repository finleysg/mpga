import { Formik } from 'formik';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';

import { IClubContactProps } from './ClubContactView';
import {ClubContact, ClubContactRole, Contact} from '../../models/Clubs';
import Confirm from '../../components/Confirm';
import RolePicker from "../roles/RolePicker";
import {IRole} from "../roles/Role";

export interface IClubContactData {
    firstName: string;
    lastName: string;
    primaryPhone?: string;
    alternatePhone?: string;
    email: string;
    addressTxt?: string;
    city?: string;
    state?: string;
    zip?: string;
    notes?: string;
    isPrimary: boolean;
    sendEmail: boolean;
    useForMailings: boolean;
    roles?: IRole[];
}

export interface IClubContactEditProps extends IClubContactProps {
    Cancel: () => void,
    Delete: (clubContact: ClubContact) => void,
    Save: (id: number, data: IClubContactData) => void,
}

const phoneRegEx = /^[2-9]\d{2}-\d{3}-\d{4}$/;
const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    primaryPhone: yup.string().matches(phoneRegEx).required(),
    alternatePhone: yup.string().matches(phoneRegEx).nullable(),
    isPrimary: yup.boolean(),
    useForMailings: yup.boolean(),
    addressTxt: yup.string().when('useForMailings', {
        is: (value) => value === true,
        then: yup.string().required("a valid address is required for mailing"),
        otherwise: yup.string().nullable()
    }),
    city: yup.string().when('useForMailings', {
        is: (value) => value === true,
        then: yup.string().required(),
        otherwise: yup.string().nullable()
    }),
    state: yup.string().when('useForMailings', {
        is: (value) => value === true,
        then: yup.string().required(),
        otherwise: yup.string().nullable()
    }),
    zip: yup.string().when('useForMailings', {
        is: (value) => value === true,
        then: yup.string().required(),
        otherwise: yup.string().nullable()
    }),
});

const translateClubContact = (cc: ClubContact): IClubContactData => {
    const contact = cc.contact || new Contact({});    
    return {
        firstName: contact.firstName,
        lastName: contact.lastName,
        primaryPhone: contact.primaryPhone,
        alternatePhone: contact.alternatePhone,
        email: contact.email,
        addressTxt: contact.addressTxt,
        city: contact.city,
        state: contact.state,
        zip: contact.zip,
        notes: contact.notes,
        isPrimary: cc.isPrimary,
        sendEmail: cc.sendEmail,
        useForMailings: cc.useForMailings,
        roles: cc.roles?.map((r: ClubContactRole) => {
            return {id: r.id!, role: r.role!};
        })
    }
};

const ClubContactEdit: React.FC<IClubContactEditProps> = (props) => {
    const cc = translateClubContact(props.clubContact);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showAddress, setShowAddress] = useState(cc.useForMailings);

    const handleConfirmDeleteCancel = () => {
        setShowConfirmation(false);
    };

    const handleConfirmDeleteContinue = () => {
        setShowConfirmation(false);
        props.Delete(props.clubContact);
    };

    return (
        <div>
            <Formik
                validationSchema={schema}
                onSubmit={(values, actions) => {
                    props.Save(props.clubContact.id || 0, values);
                    actions.setSubmitting(false);
                }}
                initialValues={cc}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    errors,
                    isSubmitting,
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="cc.firstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control placeholder="First name" name="firstName"
                                value={values.firstName}
                                isValid={touched.firstName && !errors.firstName}
                                isInvalid={!!errors.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            <Form.Control.Feedback type="invalid">
                                {errors.firstName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="cc.lastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control placeholder="Last name" name="lastName"
                                value={values.lastName}
                                isValid={touched.lastName && !errors.lastName}
                                isInvalid={!!errors.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            <Form.Control.Feedback type="invalid">
                                {errors.lastName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="cc.email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control placeholder="Email" name="email"
                                value={values.email}
                                isValid={touched.email && !errors.email}
                                isInvalid={!!errors.email}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="cc.primaryPhone">
                            <Form.Label>Primary phone</Form.Label>
                            <Form.Control placeholder="xxx-xxx-xxxx" name="primaryPhone"
                                value={values.primaryPhone}
                                isValid={touched.primaryPhone && !errors.primaryPhone}
                                isInvalid={!!errors.primaryPhone}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            <Form.Control.Feedback type="invalid">
                                {errors.primaryPhone}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Format: xxx-xxx-xxxx
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="cc.alternatePhone">
                            <Form.Label>Alternate phone</Form.Label>
                            <Form.Control placeholder="xxx-xxx-xxxx" name="alternatePhone"
                                value={values.alternatePhone}
                                isValid={touched.alternatePhone && !errors.alternatePhone}
                                isInvalid={!!errors.alternatePhone}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            <Form.Control.Feedback type="invalid">
                                {errors.alternatePhone}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Format: xxx-xxx-xxxx
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="cc.roles">
                            <Form.Label>Roles</Form.Label>
                            <RolePicker selectedRoles={values.roles || []} OnChange={(roles: IRole[]) => values.roles = roles} />
                        </Form.Group>
                        <Form.Group controlId="cc.isPrimary">
                            <Form.Check name="isPrimary"
                                label={"This is a primary contact"}
                                checked={values.isPrimary}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                        </Form.Group>
                        <Form.Group controlId="cc.useForMailings">
                            <Form.Check name="useForMailings"
                                label={"Send mailings to this contact"}
                                checked={values.useForMailings}
                                onChange={(e: any) => {
                                    setShowAddress(!showAddress);
                                    handleChange(e);
                                }}
                                onBlur={handleBlur} />
                        </Form.Group>
                        {showAddress &&
                        <>
                            <Form.Group controlId="cc.addressTxt">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="Street address" name="addressTxt"
                                    value={values.addressTxt}
                                    isValid={touched.addressTxt && !errors.addressTxt}
                                    isInvalid={!!errors.addressTxt}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.addressTxt}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="cc.city">
                                <Form.Label>City</Form.Label>
                                <Form.Control placeholder="City" name="city"
                                    value={values.city}
                                    isValid={touched.city && !errors.city}
                                    isInvalid={!!errors.city}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.city}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="cc.state">
                                <Form.Label>State</Form.Label>
                                <Form.Control placeholder="State" name="state"
                                    value={values.state}
                                    isValid={touched.state && !errors.state}
                                    isInvalid={!!errors.state}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.state}
                                </Form.Control.Feedback>
                                <Form.Text className="text-muted">
                                    Two-letter state code (MN, WI, etc.)
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="cc.zip">
                                <Form.Label>Zip code</Form.Label>
                                <Form.Control placeholder="Zip code" name="zip"
                                    value={values.zip}
                                    isValid={touched.zip && !errors.zip}
                                    isInvalid={!!errors.zip}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.zip}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </>}
                        <Button variant="primary" type="submit" size="sm" disabled={isSubmitting}>
                            Save
                        </Button>
                        {props.clubContact.id === 0 &&
                            <Button className="ml-1" variant="light" size="sm" onClick={props.Cancel}>Cancel</Button>
                        }
                        {props.clubContact.id! > 0 &&
                            <Button className="ml-1" variant="outline-danger" size="sm" onClick={() => setShowConfirmation(true)}>Delete</Button>
                        }
                    </Form>
                )}
            </Formik>
            <Confirm 
                show={showConfirmation}
                titleText="Remove Contact?"
                messageText="Please confirm that we should remove this contact from your club."
                confirmText="Remove Contact"
                DoCancel={handleConfirmDeleteCancel}
                DoConfirm={handleConfirmDeleteContinue}
            />
        </div>
    );
};

export default ClubContactEdit;
