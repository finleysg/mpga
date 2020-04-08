import React from "react";
import Badge from "react-bootstrap/Badge";
import { FaDownload, FaPencilAlt } from "react-icons/fa";

import { MpgaDocument } from "../../models/Documents";
import moment from "moment";

export interface IDocumentLibraryRowProps {
    document: MpgaDocument;
    tournaments: Map<number, string>;
    OnEdit: (doc: MpgaDocument) => void;
}

const DocumentLibraryRow: React.FC<IDocumentLibraryRowProps> = (props) => {
    const { document } = props;

    return (
        <React.Fragment>
            <tr>
                <td>{document.extension}</td>
                <td>{document.year}</td>
                <td>{document.title}</td>
                <td>{document.documentType}</td>
                <td>{document.tournament && props.tournaments.get(document.tournament)}</td>
                <td>{moment(document.lastUpdate).format("MMM Do YYYY h:mm a")}</td>
                <td>
                    {document.tags?.map((t) => {
                        return (
                            <Badge key={t.id} className="mr-1" variant="info">
                                {t.name}
                            </Badge>
                        );
                    })}
                </td>
                <td>
                    <a href={document.file} target="_blank" rel="noopener noreferrer">
                        <FaDownload size={18} color={"teal"} />
                    </a>
                </td>
                <td className="clickable" onClick={() => props.OnEdit(document)}>
                    <FaPencilAlt size={18} color={"gold"} />
                </td>
            </tr>
        </React.Fragment>
    );
};

export default DocumentLibraryRow;
