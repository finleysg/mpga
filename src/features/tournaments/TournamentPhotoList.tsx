import React, { useCallback, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Loading from "../../components/Loading";
import { MpgaPhoto } from "../../models/Documents";
import { IApplicationState } from "../../store";
import PhotoActions from "../../store/PhotoActions";
import PhotoThumb from "../gallery/PhotoThumb";

const TournamentPhotoList: React.FC = () => {
    let { year } = useParams();
    const dispatch = useDispatch();
    const state = useSelector((state: IApplicationState) => state.photos);
    const tournament = useSelector((state: IApplicationState) => state.tournament?.currentTournament);

    const savePhoto = useCallback((photo: MpgaPhoto) => dispatch(PhotoActions.UpdatePhoto(photo)), [dispatch]);

    useEffect(() => {
        if (tournament) {
            dispatch(PhotoActions.LoadTournamentPhotos(year ? +year : undefined));
        }
    }, [dispatch, tournament, year]);

    const layoutThumbs = (photos: MpgaPhoto[]): JSX.Element => {
        if (photos.length === 0) {
            return (
                <p>
                    We don't have any pictures for this season. Have a tournament photo to share? Send them to
                    info@mpga.net
                </p>
            );
        } else {
            const rows = [];
            for (let r = 0; r < Math.ceil(photos.length / 8); r++) {
                const cols = [];
                for (let c = 0; c < 8; c++) {
                    cols.push(
                        <Col key={r * 8 + c}>
                            {photos[r * 8 + c] && (
                                <PhotoThumb photo={photos[r * 8 + c]} Save={savePhoto} />
                            )}
                        </Col>
                    );
                }
                rows.push(<Row key={r}>{cols}</Row>);
            }
            return <div>{rows}</div>;
        }
    };

    return (
        <div>
            <h3 className="text-primary">
                {year} {tournament.name} Gallery
            </h3>
            {state.isBusy || !state.data ? <Loading /> : layoutThumbs(state.data)}
        </div>
    );
};

export default TournamentPhotoList;
