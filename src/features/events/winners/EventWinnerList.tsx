import React, { useState } from "react";

import { useGetTournamentWinnersQuery } from "features/tournaments/tournamentApi";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { ITournamentWinnerData } from "services/Data";

import LoadingContainer from "../../../components/LoadingContainer";
import { ITournamentWinnerGroup, TournamentWinner } from "../../../models/Events";
import usePermissions from "../../../utilities/Permissions";
import { EventProps } from "../eventsPropType";
import EventWinnerDetail from "./EventWinnerDetail";

const EventWinnerList: React.FunctionComponent<EventProps> = (props) => {
  const { eventDetail } = props;

  const permissions = usePermissions();
  const [addNew, setAddNew] = useState(false);
  const { groups, isLoading } = useGetTournamentWinnersQuery(eventDetail.tournament.systemName, {
    selectFromResult: ({ data }) => ({
      groups: data?.reduce((acc: ITournamentWinnerGroup[], item: ITournamentWinnerData) => {
        const group = acc.find((g) => g.year === item.year);
        if (group) {
          group.winners.push(new TournamentWinner(item));
        } else {
          acc.push({
            year: item.year,
            location: item.location,
            tournament: eventDetail.tournament,
            winners: [new TournamentWinner(item)],
          });
        }
        return acc;
      }, []),
      isLoading,
    }),
  });

  const mostRecentWinner =
    groups?.length > 0
      ? (groups[0] as ITournamentWinnerGroup)
      : ({ year: eventDetail.eventYear - 1, location: "loading...", winners: [] } as ITournamentWinnerGroup);

  return (
    <LoadingContainer loading={isLoading} hide={groups?.length === 0}>
      <h3 className="text-primary">{mostRecentWinner.year} Winners</h3>
      <h4>{mostRecentWinner.location}</h4>
      {mostRecentWinner.winners.map((winner) => {
        return <EventWinnerDetail key={winner.id} edit={false} winner={winner} onClose={() => setAddNew(false)} />;
      })}
      {addNew && (
        <EventWinnerDetail
          key={0}
          edit={true}
          winner={
            new TournamentWinner({
              tournament: eventDetail.tournament.id,
              year: eventDetail.eventYear,
              location: eventDetail.location.name,
            })
          }
          onClose={() => setAddNew(false)}
        />
      )}
      <p>* Net Score</p>
      {permissions.canManageEvent() && (
        <Button variant="link" className="text-warning" onClick={() => setAddNew(true)}>
          New Winner
        </Button>
      )}
      <NavLink
        to={`/tournaments/history/${eventDetail.tournament?.systemName}`}
        className={(isActive) => ("nav-link" + isActive ? "active" : "")}
      >
        Championship History
      </NavLink>
    </LoadingContainer>
  );
};

export default EventWinnerList;
