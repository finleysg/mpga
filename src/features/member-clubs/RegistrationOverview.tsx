import * as React from "react";

import { PageCodes } from "../../app-constants";
import { IDocumentSearch } from "../../features/documents/documentPropTypes";
import PageContentDetail from "../content/PageContentDetail";
import LatestOnly from "../documents/LatestOnly";

interface IRegistrationOverviewProps {}

const RegistrationOverview: React.FunctionComponent<IRegistrationOverviewProps> = () => {
  const query: IDocumentSearch = {
    key: "dues",
    documentTypes: ["Club Registration"],
  };

  return (
    <React.Fragment>
      <PageContentDetail pageCode={PageCodes.ClubRegistration} />
      <LatestOnly query={query} />
      {/* <PageContentDetail pageCode={PageCodes.IndividualRegistration} />
      <Button variant="secondary" size="sm" className="ml-2" onClick={() => navigate("/account/register")}>
        Create an Account
      </Button> */}
    </React.Fragment>
  );
};

export default RegistrationOverview;
