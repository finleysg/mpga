import axios from 'axios';
import { Announcement } from '../models/Announcement';
import { getBaseUrl } from './BaseService';

const url = getBaseUrl();

export async function getAnnouncements(): Promise<Announcement[]> {
	const response = await axios.get(url + '/announcements/');
	return response.data.map((json: any) => new Announcement(json));
}
