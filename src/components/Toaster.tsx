import React from "react";
import Toast from "react-bootstrap/Toast";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../store";
import NotificationActions from "../store/NotificationActions";
import { INotificationContent, NotificationType } from "../store/NotificationStore";
import { TiThumbsUp, TiThumbsDown, TiInfoLarge } from "react-icons/ti";

const ToastContainer = styled.div`
    position: absolute;
    top: 60px;
    right: 10px;
`;
ToastContainer.displayName = "ToastContainer";

export const Toaster: React.FC = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: IApplicationState) => state.notifications);

    const background = (message: INotificationContent) => {
        switch (message.type)
        {
            case NotificationType.Information:
                return "bg-info text-white";
            case NotificationType.Success:
                return "bg-success text-white";
            case NotificationType.Error:
                return "bg-danger text-white";
        }
    }

    const foreground = (message: INotificationContent) => {
        switch (message.type)
        {
            case NotificationType.Information:
                return "text-info";
            case NotificationType.Success:
                return "text-success";
            case NotificationType.Error:
                return "text-danger";
        }
    }

    const icon = (message: INotificationContent) => {
        switch (message.type)
        {
            case NotificationType.Information:
                return <TiInfoLarge size={16} color={"white"} />;
            case NotificationType.Success:
                return <TiThumbsUp size={16} color={"white"} />;
            case NotificationType.Error:
                return <TiThumbsDown size={16} color={"white"} />;
        }
    }

    return <ToastContainer>
        {state.data.map((message: INotificationContent) => {
            return <Toast animation={true} key={message.id}
                onClose={() => dispatch(NotificationActions.RemoveToast(message.id))}
                show={message.visible} delay={3000} autohide={true}>
                    <Toast.Header className={background(message)}>
                        <strong className="mr-auto">{icon(message)} {message.title}</strong>
                    </Toast.Header>
                    <Toast.Body className={foreground(message)}>{message.body}</Toast.Body>
            </Toast>
        })}
    </ToastContainer>
}
