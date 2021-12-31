import React from "react";

import styled from "styled-components";

import { IRole } from "../../models/Clubs";
import Role from "./Role";

const RoleContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  li {
    display: inline;
    padding-right: 5px;
  }
`;
RoleContainer.displayName = "RoleContainer";

export interface IRoleListProps {
  roles: IRole[];
  RemoveRole: (role: IRole) => void;
}

const RoleList: React.FC<IRoleListProps> = (props) => {
  const { roles } = props;
  return (
    <RoleContainer>
      {roles &&
        roles.map((role: IRole) => (
          <li key={role.id}>
            <Role role={role} RemoveRole={() => props.RemoveRole(role)} />
          </li>
        ))}
    </RoleContainer>
  );
};

export default RoleList;
