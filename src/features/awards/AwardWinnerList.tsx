import React from "react";

import Button from "react-bootstrap/Button";

import { AwardWinner } from "../../models/Events";
import usePermissions from "../../utilities/Permissions";
import { AwardViewProps } from "./awardPropTypes";
import AwardWinnerDetail from "./AwardWinnerDetail";

const AwardWinnerList: React.FC<AwardViewProps> = (props) => {
  const { award } = props;
  const [addNew, setAddNew] = React.useState(false);
  const permissions = usePermissions();

  return (
    <div>
      {permissions.canEditAwards() && (
        <Button variant="link" className="text-warning" onClick={() => setAddNew(true)}>
          Add New
        </Button>
      )}
      {addNew && (
        <AwardWinnerDetail
          key={0}
          edit={true}
          winner={new AwardWinner({ id: 0, award: award.id })}
          award={award}
          onClose={() => setAddNew(false)}
        />
      )}
      {award.winners.map((winner: AwardWinner) => (
        <AwardWinnerDetail
          key={winner.id}
          edit={false}
          winner={winner}
          award={award}
          onClose={() => setAddNew(false)}
        />
      ))}
    </div>
  );
};

export default AwardWinnerList;
