import * as React from "react";
import Button from "react-bootstrap/Button";

import { PageCodes } from "../../constants";
import useNavigation from "../../routes/Navigation";
import { IDocumentSearch } from "../../store/DocumentActions";
import PageContentDetail from "../content/PageContentDetail";
import DocumentLoader from "../documents/DocumentLoader";
import LatestOnly from "../documents/LatestOnly";

interface IRegistrationOverviewProps {}

const RegistrationOverview: React.FunctionComponent<IRegistrationOverviewProps> = () => {
    const navigator = useNavigation();
    const query: IDocumentSearch = {
        key: "dues",
        documentTypes: ["Club Registration"],
    };

    return (
        <React.Fragment>
            <DocumentLoader query={query} />
            <PageContentDetail pageCode={PageCodes.ClubRegistration} />
            <LatestOnly query={query} />
            <PageContentDetail pageCode={PageCodes.IndividualRegistration} />
            <Button variant="secondary" size="sm" className="ml-2" onClick={() => navigator.navigate("/account/register")}>
                Create an Account
            </Button>
        </React.Fragment>
    );
};

export default RegistrationOverview;
