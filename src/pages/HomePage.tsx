import React from "react";

import Container from "react-bootstrap/Container";

import { PageCodes, PolicyCodes } from "../app-constants";
import centennial from "../assets/img/centennial.png";
import ThreeEvenColumns from "../components/layouts/ThreeEvenColumns";
import AnnouncementList from "../features/announcements/AnnouncementList";
import PageContentDetail from "../features/content/PageContentDetail";
import PolicyList from "../features/content/PolicyList";
import EventCalendar from "../features/events/calendar/EventCalendar";

const HomePage: React.FC = () => {
  return (
    <Container fluid={true}>
      <ThreeEvenColumns
        Column1={
          <>
            <div className="centennial">
              <a href="http://mpgacentennial.wixsite.com/my-site" target="_blank" rel="noreferrer">
                <img alt="MPGA 100th Anniversary" src={centennial} style={{ width: "100%" }} />
              </a>
            </div>
            <h3 className="text-center mb-4">
              <a href="http://mpgacentennial.wixsite.com/my-site" target="_blank" rel="noreferrer">
                Visit Our 100th Anniversary Website
              </a>
            </h3>
            <AnnouncementList />
          </>
        }
        Column2={<EventCalendar />}
        Column3={
          <>
            <PageContentDetail pageCode={PageCodes.Home} />
            <PolicyList policyCode={PolicyCodes.AboutUs} />
          </>
        }
      />
    </Container>
  );
};

export default HomePage;
