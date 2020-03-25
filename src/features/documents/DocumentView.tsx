import React from "react";
import { MpgaDocument } from "../../models/Documents";
import Button from "react-bootstrap/Button";

export enum DocumentViewType {
    Link,
    Button,
    Detail,
    Icon,
}

export interface IDocumentRenderProps {
    viewType: DocumentViewType;
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

export interface IDocumentViewProps {
    document: MpgaDocument;
    render: IDocumentRenderProps;
}

const DocumentView: React.FC<IDocumentViewProps> = props => {
    const { document, render } = props;

    const renderView = () => {
        switch (render.viewType) {
            case DocumentViewType.Link:
                return (
                    <a
                        href={document.file!}
                        className={render.className || ""}
                        target={render.external ? "_blank" : "_self"}>
                        {document.title}
                    </a>
                );
            case DocumentViewType.Button:
                return (
                    <Button
                        as="a"
                        href={document.file}
                        target={render.external ? "_blank" : "_self"}
                        size="sm"
                        variant={render.variant || "light"}>
                        {document.title}
                    </Button>
                );
            case DocumentViewType.Detail:
                return (
                    <p>
                        <a
                            href={document.file!}
                            className={render.className || ""}
                            target={render.external ? "_blank" : "_self"}>
                            {document.title}
                        </a>
                        <span>{document.year}</span>
                        <span>{document.lastUpdate}</span>
                        <span>TODO: derive type</span>
                    </p>
                );
            default:
                return <></>;
        }
    };

    return renderView();
};

export default DocumentView;
