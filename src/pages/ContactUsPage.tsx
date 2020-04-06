import React from "react";

import ContactLayout from "../components/layouts/ContactLayout";
import ContactForm from "../features/contact/ContactForm";
import { ContactMessage } from "../models/ContactMessage";

const ContactUsPage: React.FC = () => {
    return (
        <ContactLayout>
            <h3 className="text-primary">Contact the MPGA</h3>
            <p>
                Messages sent here are routed to the MPGA officers. They will respond as soon possible. If this message
                is a request or question regarding a tournament, use the tournament contact page.
            </p>
            <p>If you have a question specifically about the website, please send an email to admin@mpga.net</p>
            <ContactForm message={new ContactMessage("General")} />
        </ContactLayout>
    );
};

export default ContactUsPage;
