import React, { useRef, useState } from "react";

import { AsyncTypeahead } from "react-bootstrap-typeahead";

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
  const instance = useRef<AsyncTypeahead<string>>();

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
      <AsyncTypeahead
        id="role-picker"
        ref={(typeahead) => (instance.current = typeahead)}
        placeholder="Search for roles..."
        isLoading={isLoading}
        minLength={1}
        onSearch={(query) => {
          setQuery(query);
        }}
        onChange={(selected) => {
          roles.push({
            id: 0,
            role: selected[0],
          });
          const newRoles = roles.slice(0);
          updateRoles(newRoles);
          props.OnChange(newRoles);
          if (instance && instance.current) {
            instance.current.clear();
          }
        }}
        options={data}
      />
      <RoleList roles={roles} RemoveRole={removeRole} />
      {isError && <span className="text-danger">Doh!</span>}
    </div>
  );
};

export default RolePicker;
