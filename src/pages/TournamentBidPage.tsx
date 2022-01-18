import React from "react";

import { PageCodes } from "../app-constants";
import ContactLayout from "../components/layouts/ContactLayout";
import ContactForm from "../features/contact/ContactForm";
import PageContentDetail from "../features/content/PageContentDetail";
import { ContactMessage } from "../models/ContactMessage";

const TournamentBidPage: React.FC = () => {
  return (
    <ContactLayout>
      <PageContentDetail pageCode={PageCodes.TournamentBids} />
      <ContactForm message={new ContactMessage("Bid")} />
    </ContactLayout>
  );
};

export default TournamentBidPage;
