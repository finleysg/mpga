import { EventDetail, EventLink, EventPoints, EventPolicy } from "../../models/Events";

export type EventProps = {
  eventDetail: EventDetail;
};

export type EventEditProps = EventProps & {
  onClose: () => void;
};

export type EventCalendarProps = EventProps & {
  onSelect: (linkName: string) => void;
};

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

export type EventLinkListProps = EventProps & {
  linkType: string;
  title: string;
};

export type EventLinkProps = {
  eventLink: EventLink;
};

export type EventLinkEditProps = EventLinkProps & {
  onClose: () => void;
};

export type EventLinkViewProps = EventLinkProps & {
  render: ILinkRenderProps;
};

export type EventLinkDetailProps = EventLinkViewProps & {
  edit: boolean;
};

export type EventPointsProps = {
  points: EventPoints;
};

export type EventPointsEditProps = EventPointsProps & {
  onClose: () => void;
};

export type EventPointsDetailProps = EventPointsEditProps & {
  edit: boolean;
};

export type EventPolicyProps = {
  policy: EventPolicy;
};

export type EventPolicyEditProps = EventPolicyProps & {
  onClose: () => void;
};

export type EventPolicyDetailProps = EventPolicyEditProps & {
  edit: boolean;
};
