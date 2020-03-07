import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../store";
import PhotoActions from "../../store/PhotoActions";
import { MpgaPhoto } from '../../models/Documents';
import PhotoThumb from '../gallery/PhotoThumb';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PhotoModal from "../gallery/PhotoModal";

const TournamentPhotoList: React.FC = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: IApplicationState) => state.photos);
    const tournament = useSelector((state: IApplicationState) => state.tournament?.currentTournament);
    // const session = useSelector((state: IApplicationState) => state.session);
    // const canAdd = state.data.findIndex(a => a.id === 0) < 0; // no pending add

    // const savePhoto = useCallback(
    //     (announcement: Photo) => dispatch(PhotoActions.Save(announcement)),
    //     [dispatch]
    // )

    useEffect(() => {
        if (tournament) {
            dispatch(PhotoActions.LoadTournamentPhotos());  
        }
    }, [dispatch, tournament]);

    const layoutThumbs = (photos: MpgaPhoto[]): JSX.Element => {
        const rows = [];
        for (let r = 0; r < Math.ceil(photos.length / 8); r++) {
            const cols = [];
            for (let c = 0; c < 8; c++) {
                cols.push(<Col>{photos[r*8+c] && <PhotoThumb photo={photos[r*8+c]} />}</Col>);
            }
            rows.push(<Row>{cols}</Row>);
        }
        return <div>{rows}</div>;
    }

    return <div>
        <h3 className="text-primary">Tournament Gallery</h3>
        {state.isBusy || !state.data ?
            <Loading /> :
            layoutThumbs(state.data)}
    </div>
}

export default TournamentPhotoList;
