import React, { useState } from "react";

import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import CancelButton from "../../components/CancelButton";
import Confirm from "../../components/Confirm";
import DeleteButton from "../../components/DeleteButton";
import SubmitButton from "../../components/SubmitButton";
import { ClubContact, ClubContactRole, Contact, IClubContact, IRole } from "../../models/Clubs";
import { useAddClubContactMutation, useUpdateClubContactMutation } from "../../services/ClubEndpoints";
import RolePicker from "../roles/RolePicker";
import { ClubContactEditProps } from "./MemberPropTypes";

const schema = yup.object({
  firstName: yup.string().max(30).required(),
  lastName: yup.string().max(30),
  email: yup.string().email().required(),
  primaryPhone: yup.string().required(),
  notes: yup.string().max(150).nullable(),
  isPrimary: yup.boolean().required(),
  useForMailings: yup.boolean().required(),
  addressTxt: yup.string().when("useForMailings", {
    is: (value) => value === true,
    then: yup.string().required("a valid address is required for mailing"),
    otherwise: yup.string().nullable(),
  }),
  city: yup.string().when("useForMailings", {
    is: (value) => value === true,
    then: yup.string().required(),
    otherwise: yup.string().nullable(),
  }),
  state: yup.string().when("useForMailings", {
    is: (value) => value === true,
    then: yup.string().required(),
    otherwise: yup.string().nullable(),
  }),
  zip: yup.string().when("useForMailings", {
    is: (value) => value === true,
    then: yup.string().required(),
    otherwise: yup.string().nullable(),
  }),
});

const translateClubContact = (cc: ClubContact): IClubContact => {
  const contact = cc.contact || new Contact({});
  return {
    firstName: contact.firstName,
    lastName: contact.lastName,
    primaryPhone: contact.primaryPhone,
    email: contact.email,
    addressTxt: contact.addressTxt,
    city: contact.city,
    state: contact.state,
    zip: contact.zip,
    notes: cc.notes,
    isPrimary: cc.isPrimary,
    sendEmail: cc.sendEmail,
    useForMailings: cc.useForMailings,
    roles: cc.roles?.map((r: ClubContactRole) => {
      return { id: r.id!, role: r.role! };
    }),
  };
};

const ClubContactEdit: React.FC<ClubContactEditProps> = (props) => {
  const cc = translateClubContact(props.clubContact);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAddress, setShowAddress] = useState(cc.useForMailings);
  const [, { isLoading: isUpdating }] = useUpdateClubContactMutation();
  const [, { isLoading: isCreating }] = useAddClubContactMutation();

  const handleConfirmDeleteCancel = () => {
    setShowConfirmation(false);
  };

  const handleConfirmDeleteContinue = () => {
    setShowConfirmation(false);
    props.onRemove(props.clubContact);
  };

  return (
    <div>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          props.onSave(values);
        }}
        initialValues={cc}
      >
        {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="cc.firstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                placeholder="First name"
                name="firstName"
                value={values.firstName}
                isValid={touched.firstName && !errors.firstName}
                isInvalid={!!errors.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="cc.lastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                placeholder="Last name"
                name="lastName"
                value={values.lastName}
                isValid={touched.lastName && !errors.lastName}
                isInvalid={!!errors.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="cc.email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Email"
                name="email"
                value={values.email}
                isValid={touched.email && !errors.email}
                isInvalid={!!errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="cc.primaryPhone">
              <Form.Label>Primary phone</Form.Label>
              <Form.Control
                placeholder="xxx-xxx-xxxx"
                name="primaryPhone"
                value={values.primaryPhone}
                isValid={touched.primaryPhone && !errors.primaryPhone}
                isInvalid={!!errors.primaryPhone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.primaryPhone}</Form.Control.Feedback>
              <Form.Text className="text-muted">Format: xxx-xxx-xxxx</Form.Text>
            </Form.Group>
            <Form.Group controlId="cc.roles">
              <Form.Label>Roles</Form.Label>
              <RolePicker selectedRoles={values.roles || []} OnChange={(roles: IRole[]) => (values.roles = roles)} />
            </Form.Group>
            <Form.Group controlId="cc.isPrimary">
              <Form.Check
                name="isPrimary"
                label={"This is a primary contact"}
                value={values.isPrimary.toString()}
                checked={values.isPrimary}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group controlId="cc.useForMailings">
              <Form.Check
                name="useForMailings"
                label={"Send mailings to this contact"}
                value={values.useForMailings.toString()}
                checked={values.useForMailings}
                onChange={(e: any) => {
                  setShowAddress(!showAddress);
                  handleChange(e);
                }}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group controlId="cc.notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                name="notes"
                value={values.notes || ""}
                isValid={touched.notes && !errors.notes}
                isInvalid={!!errors.notes}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.notes}</Form.Control.Feedback>
              <Form.Text className="text-muted">For multiple captains, indicate the team here.</Form.Text>
            </Form.Group>
            {showAddress && (
              <>
                <Form.Group controlId="cc.addressTxt">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    placeholder="Street address"
                    name="addressTxt"
                    value={values.addressTxt}
                    isValid={touched.addressTxt && !errors.addressTxt}
                    isInvalid={!!errors.addressTxt}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Form.Control.Feedback type="invalid">{errors.addressTxt}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="cc.city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    placeholder="City"
                    name="city"
                    value={values.city}
                    isValid={touched.city && !errors.city}
                    isInvalid={!!errors.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="cc.state">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    placeholder="State"
                    name="state"
                    value={values.state}
                    isValid={touched.state && !errors.state}
                    isInvalid={!!errors.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
                  <Form.Text className="text-muted">Two-letter state code (MN, WI, etc.)</Form.Text>
                </Form.Group>
                <Form.Group controlId="cc.zip">
                  <Form.Label>Zip code</Form.Label>
                  <Form.Control
                    placeholder="Zip code"
                    name="zip"
                    value={values.zip}
                    isValid={touched.zip && !errors.zip}
                    isInvalid={!!errors.zip}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
                </Form.Group>
              </>
            )}
            <SubmitButton busy={isCreating || isUpdating} />
            <DeleteButton
              canDelete={props.clubContact.id !== 0}
              title="Remove"
              OnDelete={() => setShowConfirmation(true)}
            />
            <CancelButton canCancel={props.clubContact.id === 0} OnCancel={() => props.onCancel()} />
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
