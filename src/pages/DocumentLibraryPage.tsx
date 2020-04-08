import React from "react";
import Container from "react-bootstrap/Container";

import OneCenteredColumn from "../components/layouts/OneCenteredColumn";
import DocumentLibraryList from "../features/documents/DocumentLibraryList";

const DocumentLibraryPage: React.FC = () => {
    return (
        <Container fluid={true}>
            <OneCenteredColumn>
                <DocumentLibraryList />
            </OneCenteredColumn>
        </Container>
    );
};

export default DocumentLibraryPage;
