import React from 'react';

import { FaLink } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

import constants from '../../constants';
import { IClub } from '../../models/Clubs';

export interface IMemberClubRowProps {
  club: IClub;
}

const MemberClubRow: React.FC<IMemberClubRowProps> = (props) => {
  const { club } = props;

  return (
    <tr>
      <td className="text-secondary" style={{ fontWeight: "bold" }}>
        {club.isCurrent && `${constants.MemberClubYear} Member`}
      </td>
      <td>
        <NavLink to={"/clubs/" + club.systemName} className="nav-link">
          {club.name}
        </NavLink>
      </td>
      <td className="text-secondary">
        {club.website && (
          <a href={club.website} target="_blank" rel="noopener noreferrer">
            <FaLink size={18} color={"primary"} />
          </a>
        )}
      </td>
      <td>{club.location}</td>
      <td>{club.size ? club.size : "Unknown"}</td>
    </tr>
  );
};

export default MemberClubRow;
