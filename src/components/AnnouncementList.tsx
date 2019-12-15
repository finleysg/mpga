import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Announcement } from '../models/Announcement';
import { getBaseUrl } from '../services/BaseService';
import AnnouncementDetail from './AnnouncementDetail';
import Loading from './Loading';
import { IAnnouncementState, AnnouncementsReducer, AnnouncementActionTypes } from '../store/AnnouncementStore';

const useDataApi = () => {
    
    const initialState: IAnnouncementState = {
        isBusy: false,
        hasError: false,
        data: [],
    }
    const [state, dispatch] = useReducer(AnnouncementsReducer, initialState);
    
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: AnnouncementActionTypes.GET_ANNOUNCEMENTS_REQUESTED});
            try {
                const result = await axios.get(getBaseUrl() + '/announcements/');
                const data = result.data.map((json: any) => new Announcement(json));
                dispatch({ type: AnnouncementActionTypes.GET_ANNOUNCEMENTS_SUCCEEDED, payload: data });
            } catch (error) {
                dispatch({ type: AnnouncementActionTypes.GET_ANNOUNCEMENTS_FAILED, payload: error });
            }
        };
        fetchData();
    }, []);
    return { state };
};

const AnnouncementList: React.FC = () => {
    const { state } = useDataApi();
    return <div>
        {state.isBusy ? <Loading /> :
        state.data.map((announcement: Announcement) => {
            return <AnnouncementDetail announcement={announcement} key={announcement.id} />
        })}
    </div>
}

export default AnnouncementList;
