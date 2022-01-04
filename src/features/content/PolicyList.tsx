import React, { useState } from "react";

import { OverlaySpinner } from "components/Spinner";
import Button from "react-bootstrap/Button";

import { Policy } from "../../models/Policies";
import usePermissions from "../../utilities/Permissions";
import { useGetPoliciesQuery } from "./contentApi";
import { PolicyListProps } from "./contentPropTypes";
import PolicyDetail from "./PolicyDetail";

const PolicyList: React.FC<PolicyListProps> = (props) => {
  const { policyCode } = props;
  const [addNew, setAddNew] = useState(false);
  const permissions = usePermissions();
  const { data: policies, isLoading } = useGetPoliciesQuery(policyCode);

  return (
    <div>
      <OverlaySpinner loading={isLoading} />
      {permissions.canEditPolicies() && (
        <Button variant="link" className="text-warning" onClick={() => setAddNew(true)}>
          Add New
        </Button>
      )}
      {addNew && <PolicyDetail key={0} policy={new Policy({ id: 0 })} edit={true} onClose={() => setAddNew(false)} />}
      {policies?.map((policy) => {
        return (
          <PolicyDetail key={policy.id} policy={new Policy(policy)} edit={false} onClose={() => setAddNew(false)} />
        );
      })}
    </div>
  );
};

export default PolicyList;
