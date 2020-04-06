import { Api } from "../http";
import NotificationActions from "./NotificationActions";
import { ContactMessage } from '../models/ContactMessage';

export enum MessageActionTypes {
    MESSAGE_START = "MESSAGE_START",
    MESSAGE_STOP = "MESSAGE_STOP",
    MESSAGE_FAILED = "MESSAGE_FAILED",
}

const url = "/messages/";

const MessageActions = {
    SendMessage: (message: ContactMessage) => async (dispatch: any) => {
        dispatch({ type: MessageActionTypes.MESSAGE_START });
        try {
            const payload = message.prepJson();
            await Api.post(url, payload);
            dispatch({ type: MessageActionTypes.MESSAGE_STOP, payload: message });
            dispatch(NotificationActions.ToastSuccess("Your message has been sent."));
        } catch (error) {
            dispatch({ type: MessageActionTypes.MESSAGE_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
};

export default MessageActions;
