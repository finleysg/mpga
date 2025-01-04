import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { PaymentIntent } from "@stripe/stripe-js"

import { useState } from "react"

import { Formik } from "formik"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import * as yup from "yup"

import { apiUrl, httpClient } from "../../utilities/HttpClient"
import useSession from "../../utilities/SessionHooks"

export interface IPaymentData {
  email: string;
  name: string;
}

const schema = yup.object({
  name: yup.string().required("Please enter your name"),
  email: yup.string().email().required("A valid email is required"),
});

interface PaymentFormProps {
  clubId: number
  Cancel: () => void;
}

const PaymentForm = (props: PaymentFormProps) => {
  const { user } = useSession();
  const [paymentError, setPaymentError] = useState<Error | undefined>(undefined);
  const stripe = useStripe();
  const elements = useElements();

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setPaymentError(error)
    } else if (Object.prototype.hasOwnProperty.call(error, "message")) {
      setPaymentError(new Error((error as { message: string }).message))
    } else {
      setPaymentError(new Error("An unknown error occurred."))
    }
  }

  const submitPayment = async (data: IPaymentData) => {
    if (!stripe || !elements) {
      return;
    }

    try {
      // 1. Validate the payment element.
      const { error: submitError } = await elements!.submit()
      if (submitError) {
        handleError(submitError)
        return
      }
      // 2. Create the payment intent.
      const intent = await httpClient(apiUrl(`/club-dues/${props.clubId}/`), {
        body: JSON.stringify({
          email: data.email,
        })
      }) as PaymentIntent

      // 3. Confirm the payment.
      const { error: confirmError } = await stripe!.confirmPayment({
        elements: elements!,
        clientSecret: intent.client_secret!,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: data.name,
              email: data.email,
              address: {
                country: "US",
              },
            },
          },
          return_url: `${window.location.origin}${window.location.pathname}/dues-confirmation`,
        },
      })

      if (confirmError) {
        handleError(confirmError)
        return
      }
    } catch (error) {
      handleError(error)
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
          name: user.isAuthenticated ? user.name : "",
          email: user.email ?? "",
        } as IPaymentData
      }
    >
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="mb-2">
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
          <Form.Group controlId="email" className="mb-2">
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
          <Form.Group controlId="card" className="mb-2">
            {paymentError && <p className="text-danger mt-2 mb-2">{paymentError.message}</p>}
            <PaymentElement
              options={{
                business: { name: "BHMC" },
                layout: {
                  type: "accordion",
                  defaultCollapsed: false,
                  radios: false,
                  spacedAccordionItems: true,
                },
                fields: {
                  billingDetails: {
                    name: "never",
                    email: "never",
                    address: { country: "never" },
                  },
                },
              }}
            />
          </Form.Group>
          <Button variant="secondary" type="submit" size="sm" className="mt-2" disabled={!stripe}>
            Pay Dues
          </Button>
          <Button variant="light" type="reset" size="sm" className="mt-2 ms-2" onClick={() => props.Cancel()}>
            Cancel
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PaymentForm;
