import React, { useRef, useState } from "react";

import { Typeahead, TypeaheadRef } from "react-bootstrap-typeahead";

import { IRole } from "../../models/Clubs";
import RoleList from "./RoleList";
import useRoleApi from "./RolesApi";

export interface IRolePickerProps {
  selectedRoles: IRole[];
  OnChange: (currentRoles: IRole[]) => void;
}

const RolePicker: React.FC<IRolePickerProps> = (props) => {
  const [{ isLoading, isError, data }, setQuery] = useRoleApi("", []);
  const [roles, updateRoles] = useState(props.selectedRoles);
  const typeaheadRef = useRef<TypeaheadRef>();

  const removeRole = (role: IRole) => {
    const idx = roles.findIndex((t) => t.role === role.role);
    if (idx >= 0) {
      const updatedRoles = roles.slice(0);
      updatedRoles.splice(idx, 1);
      updateRoles(updatedRoles);
      props.OnChange(updatedRoles);
    }
  };

  return (
    <div>
      <Typeahead
        id="role-picker"
        ref={typeaheadRef}
        placeholder="Search for roles..."
        isLoading={isLoading}
        minLength={1}
        onChange={(selected) => {
          roles.push({
            id: 0,
            role: selected[0] as string,
          });
          const newRoles = roles.slice(0);
          updateRoles(newRoles);
          props.OnChange(newRoles);
          typeaheadRef.current?.clear()
        }}
        options={data}
      />
      <RoleList roles={roles} RemoveRole={removeRole} />
      {isError && <span className="text-danger">Doh!</span>}
    </div>
  );
};

export default RolePicker;
