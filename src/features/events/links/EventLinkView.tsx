import * as React from "react";
import Button from "react-bootstrap/Button";
import { EventLink } from "../../../models/Events";

export enum LinkViewType {
    Link,
    Button,
}

export interface ILinkRenderProps {
    viewType: LinkViewType;
    className?: string;
    external: boolean;
    variant?:
        | "primary"
        | "secondary"
        | "success"
        | "danger"
        | "warning"
        | "info"
        | "dark"
        | "light"
        | "link"
        | "outline-primary"
        | "outline-secondary"
        | "outline-success"
        | "outline-danger"
        | "outline-warning"
        | "outline-info"
        | "outline-dark"
        | "outline-light";
}

export interface IEventLinkViewProps {
    eventLink: EventLink;
    render: ILinkRenderProps;
}

const EventLinkView: React.FunctionComponent<IEventLinkViewProps> = props => {
    const { eventLink, render } = props;

    const renderView = () => {
        switch (render.viewType) {
            case LinkViewType.Link:
                return (
                    <a
                        href={eventLink.url}
                        className={render.className || ""}
                        target={render.external ? "_blank" : "_self"}
                        rel="noopener noreferrer">
                        {eventLink.title}
                    </a>
                );
            case LinkViewType.Button:
                return (
                    <Button
                        as="a"
                        href={eventLink.url}
                        target={render.external ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        size="sm"
                        variant={render.variant || "light"}>
                        {eventLink.title}
                    </Button>
                );
            default:
                return <></>;
        }
    };

    return renderView();
};

export default EventLinkView;
