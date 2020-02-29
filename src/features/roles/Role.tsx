import React from "react";
import Badge from "react-bootstrap/Badge";
import { TiTimes } from "react-icons/ti";
import styled from "styled-components";

const RoleRemover = styled.a`
    color: white;
    cursor: pointer;
`;
RoleRemover.displayName = "RoleRemover";

export interface IRole {
    id: number;
    role: string;
}

export interface IRoleProps {
    role: IRole,
    RemoveRole: (role: IRole) => void,
}

const Role: React.FC<IRoleProps> = (props) => {
    const { role } = props;
    return (
        <Badge variant="secondary">
            {role.role} <RoleRemover onClick={() => props.RemoveRole(role)}><TiTimes size={16} /></RoleRemover>
        </Badge>
    );
};

export default Role;
