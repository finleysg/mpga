import { Action, Reducer } from "redux";

import { MessageActionTypes } from "./MessageActions";
import { ContactMessage } from '../models/ContactMessage';

export interface IMessageState {
    sending: boolean;
    failed: boolean;
    sent?: ContactMessage;
}

export const defaultState: IMessageState = {
    sending: false,
    failed: false,
};

export interface IMessageStarted extends Action {
    type: MessageActionTypes.MESSAGE_START;
}
export interface IMessageSent extends Action {
    type: MessageActionTypes.MESSAGE_STOP;
    payload: ContactMessage;
}
export interface IMessageFailed extends Action {
    type: MessageActionTypes.MESSAGE_FAILED;
}

type KnownActions = IMessageStarted | IMessageSent | IMessageFailed;

export const MessageReducer: Reducer<IMessageState, KnownActions> = (
    state: IMessageState | undefined,
    action: KnownActions
): IMessageState => {
    if (!state) {
        state = { ...defaultState };
    }

    switch (action.type) {
        case MessageActionTypes.MESSAGE_START: {
            return { ...state, sending: true, sent: undefined, failed: false };
        }
        case MessageActionTypes.MESSAGE_STOP: {
            return { ...state, sending: false, sent: action.payload, failed: false };
        }
        case MessageActionTypes.MESSAGE_FAILED: {
            return { ...state, sending: false, failed: true };
        }
        default:
            return state;
    }
};
