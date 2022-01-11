import React from "react";

import { useGetEventQuery } from "features/events/eventsApi";
import { useParams } from "react-router-dom";

import ContactLayout from "../components/layouts/ContactLayout";
import LoadingContainer from "../components/LoadingContainer";
import constants from "../constants";
import ContactForm from "../features/contact/ContactForm";
import { ContactMessage } from "../models/ContactMessage";

const EventContactPage: React.FC = () => {
  const { name } = useParams();
  const { data: eventDetail, isLoading } = useGetEventQuery({ name, year: constants.EventCalendarYear });

  return (
    <ContactLayout>
      <LoadingContainer loading={isLoading}>
        <h3 className="text-primary">Contact the {eventDetail.name} Chairs</h3>
        <p>Messages sent here are routed to the tournament chairs. They will respond as soon possible.</p>
        <ContactForm message={new ContactMessage("Tournament", eventDetail.name)} />
      </LoadingContainer>
    </ContactLayout>
  );
};

export default EventContactPage;
