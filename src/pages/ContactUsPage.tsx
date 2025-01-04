import React from "react"

import ContactLayout from "../components/layouts/ContactLayout"
import ContactForm from "../features/contact/ContactForm"

const ContactUsPage: React.FC = () => {
	return (
		<ContactLayout>
			<h3 className="text-primary">Contact the MPGA</h3>
			<p>
				Have a question about the Minnesota Public Golf Association (MPGA), your MPGA membership, an
				MPGA Event, or the contents of this website? Please let us help.
			</p>
			<ContactForm />
		</ContactLayout>
	)
}

export default ContactUsPage
