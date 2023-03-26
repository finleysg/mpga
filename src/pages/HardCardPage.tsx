import React from "react";

import LoadingContainer from "components/LoadingContainer";
import { useGetDocumentsQuery } from "features/documents/documentApi";
import { IDocumentSearch } from "features/documents/documentPropTypes";
import Container from "react-bootstrap/Container";

import OneCenteredColumn from "../components/layouts/OneCenteredColumn";

const HardCardPage: React.FC = () => {
  const query: IDocumentSearch = {
    key: "dues",
    year: 2023,
    documentTypes: ["Hard Card"],
  };
  const { data: documents, isLoading } = useGetDocumentsQuery(query);
  const hardCard = documents?.slice(0, 1);

  return (
    <Container fluid={true}>
      <OneCenteredColumn>
        <LoadingContainer loading={isLoading}>
          {hardCard?.length > 0 && (
            <iframe title="MPGA Hard Card" src={hardCard[0].file} width="100%" height={window.innerHeight - 100} />
          )}
        </LoadingContainer>
      </OneCenteredColumn>
    </Container>
  );
};

export default HardCardPage;
