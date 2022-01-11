import React, { useState } from "react";

import { useAppDispatch } from "app-store";
import Button from "react-bootstrap/Button";
import { useLocation, useNavigate } from "react-router";

import EditContainer from "../../components/EditContainer";
import { MatchResult } from "../../models/Clubs";
import AppActions from "../../store/AppActions";
import usePermissions from "../../utilities/Permissions";
import MatchResultEdit from "./MatchResultEdit";

const MatchResultEntry: React.FC = () => {
  const [doEdit, setDoEdit] = useState(false);
  const permissions = usePermissions();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const goRegister = () => {
    dispatch(AppActions.SaveLocation(location.pathname));
    navigate("/account/register");
  };

  return (
    <React.Fragment>
      <EditContainer
        doEdit={doEdit}
        hideEdit={true}
        canEdit={permissions.canPostMatchResult()}
        onToggleEdit={() => setDoEdit(!doEdit)}
        viewComponent={
          <React.Fragment>
            {permissions.canPostMatchResult() && (
              <Button variant="secondary" size="lg" onClick={() => setDoEdit(true)}>
                Post Result
              </Button>
            )}
            {!permissions.canPostMatchResult() && (
              <div>
                <p>
                  To post a match play result, please log in. If you don't have an account, click the button below to
                  sign up.
                </p>
                <Button variant="secondary" className="ml-2" onClick={() => goRegister()}>
                  Create an Account
                </Button>
              </div>
            )}
          </React.Fragment>
        }
        editComponent={<MatchResultEdit result={new MatchResult({ id: 0 })} onClose={() => setDoEdit(false)} />}
      />
    </React.Fragment>
  );
};

export default MatchResultEntry;
