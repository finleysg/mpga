import React from "react";

import SmallLeftLargeRight from "../components/layouts/SmallLeftLargeRight";
import constants from "../constants";
import DocumentLoader from "../features/documents/DocumentLoader";
import MatchPlayDocuments from "../features/match-play/MatchPlayDocuments";
import { MatchResultList } from "../features/match-play/MatchResultList";
import { IDocumentSearch } from "../store/DocumentActions";
import MatchResultEntry from "../features/match-play/MatchResultEntry";

const MatchPlayResultsPage: React.FC = () => {
    const queryKey = "match-play";
    const query: IDocumentSearch = {
        key: queryKey,
        documentTypes: ["Match Play", "Match Play Brackets"],
        year: constants.MatchPlayYear,
    };
    return (
        <SmallLeftLargeRight
            LeftColumn={
                <React.Fragment>
                    <h3 className="text-primary">Schedule and Results</h3>
                    <DocumentLoader query={query} />
                    <MatchPlayDocuments query={query} />
                    <h3 className="text-primary">Post a Match Result</h3>
                    <MatchResultEntry />
                </React.Fragment>
            }
            RightColumn={
                <React.Fragment>
                    <h3 className="text-primary">2020 Match Results</h3>
                    <MatchResultList />
                </React.Fragment>
            }
        />
    );
};

export default MatchPlayResultsPage;
