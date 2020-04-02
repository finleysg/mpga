import React from "react";
import Container from "react-bootstrap/Container";

import OneCenteredColumn from "../components/layouts/OneCenteredColumn";
import { PageCodes } from "../constants";
import PageContentDetail from "../features/content/PageContentDetail";
import LatestOnly from "../features/documents/LatestOnly";
import { IDocumentSearch } from "../store/DocumentActions";
import DocumentLoader from "../features/documents/DocumentLoader";

const AboutUsPage: React.FC = () => {
    const query: IDocumentSearch = {
        key: "bylaws",
        documentTypes: ["ByLaws"],
    };
    return (
        <Container fluid={true}>
            <DocumentLoader query={query} />
            <OneCenteredColumn>
                <h1 className="text-secondary">About Us</h1>
                <PageContentDetail pageCode={PageCodes.OurMission} />
                <h3 className="text-primary">By Laws</h3>
                <LatestOnly query={query} />
            </OneCenteredColumn>
        </Container>
    );
};

export default AboutUsPage;
