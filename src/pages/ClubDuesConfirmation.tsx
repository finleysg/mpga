import { useStripe } from "@stripe/react-stripe-js"
import { PaymentIntent } from "@stripe/stripe-js"

import { useEffect, useState } from "react"

import { Button, Col, Row } from "react-bootstrap"
import { useSearchParams } from "react-router-dom"

import { useCurrentClub } from "./MemberClubLayoutPage"

const ClubDuesConfirmationPage = () => {
  const [params] = useSearchParams()
  const [intent, setIntent] = useState<PaymentIntent | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const stripe = useStripe()
  const {selectedClub} = useCurrentClub()

  useEffect(() => {
    if (!stripe) return

    const clientSecret = params.get("payment_intent_client_secret")
    if (!clientSecret) {
      setError(new Error("Missing payment intent client secret"))
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ error, paymentIntent }) => {
      setIntent(paymentIntent ?? null)
      if (error) {
        setError(new Error(error.message))
        return
      }
    })
  }, [stripe, params])

	return (
    <Row>
      <Col sm={12} md={{ span: 6, offset: 2 }} lg={{ span: 4, offset: 4 }}>
        {error && (
          <div>
            <h5 className="text-danger">An error occurred processing your payment</h5>
            <p className="text-danger">{error.message}</p>
          </div>
        )}
        {intent?.status === "succeeded" && (
          <div>
            <h5 className="text-primary">
              Your MPGA membership dues payment been processed.
            </h5>
            <p>
              A confirmation email will be sent to any contacts listed for {selectedClub.name} in our system. 
              A payment receipt will also be sent from Stripe, our payment provider. This email
              will be delivered to the email address you provided during the payment process.
            </p>
          </div>
        )}
        <div className="text-center">
          <Button variant="secondary" href="/">Return to Home</Button>
          <Button variant="secondary" className="ms-2" href="/clubs">Return to Member Club list</Button>
        </div>
      </Col>
    </Row>
	)
}

export default ClubDuesConfirmationPage
