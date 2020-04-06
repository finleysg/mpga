import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoadingContainer from "../../components/LoadingContainer";
import { Tournament } from "../../models/Events";
import { IApplicationState } from "../../store";
import TournamentActions from "../../store/TournamentActions";
import TournamentDetail from "./TournamentDetail";

const TournamentList: React.FC = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: IApplicationState) => state.tournament);

    useEffect(() => {
        dispatch(TournamentActions.LoadTournaments());
    }, [dispatch]);

    return (
        <LoadingContainer hasData={true}>
            {state.tournaments
                .filter((t) => t.systemName !== "match-play")
                .map((t: Tournament) => (
                    <TournamentDetail tournament={t} />
                ))}
        </LoadingContainer>
    );
};

export default TournamentList;
