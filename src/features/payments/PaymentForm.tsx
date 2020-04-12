import React, { useState } from "react";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import { PaymentMethod, StripeError } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../store";
import * as yup from "yup";

export interface IPaymentData {
    email: string;
    name: string;
}

const schema = yup.object({
    name: yup.string().required("Please enter your name"),
    email: yup.string().email().required("A valid email is required"),
});

export interface IPaymentFormProps {
    Cancel: () => void;
    OnPayment: (paymentMethod: PaymentMethod) => void;
}

const PaymentForm: React.FC<IPaymentFormProps> = (props) => {
    const session = useSelector((state: IApplicationState) => state.session);
    const [paymentError, setPaymentError] = useState<StripeError | undefined>(undefined);
    const stripe = useStripe();
    const elements = useElements();

    const submitPayment = async (data: IPaymentData) => {
        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement!,
            billing_details: {
                email: data.email,
                name: data.name,
            },
        });

        if (error) {
            setPaymentError(error);
        } else {
            if (paymentMethod !== undefined) {
                props.OnPayment(paymentMethod);    
            } else {
                throw new Error("No payment method was created!");
            }
        }
    };

    return (
        <Formik
            validationSchema={schema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={(values) => {
                submitPayment(values);
            }}
            initialValues={
                {
                    name: session.user.isAuthenticated ? session.user.name : "",
                    email: session.user.email || "",
                } as IPaymentData
            }>
            {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Control
                            placeholder="Name"
                            name="name"
                            value={values.name || ""}
                            isValid={touched.name && !errors.name}
                            isInvalid={!!errors.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Control
                            placeholder="Email"
                            name="email"
                            type="email"
                            value={values.email || ""}
                            isValid={touched.email && !errors.email}
                            isInvalid={!!errors.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="card">
                        <CardElement
                            className="form-control"
                            options={{
                                style: {
                                    base: {
                                        color: "#212529",
                                        lineHeight: "1.429",
                                    },
                                    invalid: {
                                        color: "red",
                                    },
                                },
                            }}
                        />
                        {paymentError && <p className="text-danger mt-1">{paymentError.message}</p>}
                    </Form.Group>
                    <Button variant="primary" type="submit" size="sm" className="mt-2" disabled={!stripe}>
                        Pay Dues
                    </Button>
                    <Button variant="light" type="reset" size="sm" className="mt-2 ml-2" onClick={() => props.Cancel()}>
                        Cancel
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default PaymentForm;
