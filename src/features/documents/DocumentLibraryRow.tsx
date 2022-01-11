import React from "react";

import { useGetTournamentsQuery } from "features/tournaments/tournamentApi";
import moment from "moment";
import Badge from "react-bootstrap/Badge";
import { FaPencilAlt, FaRegFile, FaRegFileExcel, FaRegFilePdf, FaRegFileWord } from "react-icons/fa";

import { MpgaDocument } from "../../models/Documents";
import { DocumentProps } from "./documentPropTypes";

type DocumentLibraryRowProps = DocumentProps & {
  onEdit: (doc: MpgaDocument) => void;
};

const DocumentLibraryRow: React.FC<DocumentLibraryRowProps> = (props) => {
  const { document, onEdit } = props;
  const { data: tournaments } = useGetTournamentsQuery();

  const tournament = document.tournament && tournaments.find((t) => t.id === document.tournament);

  const renderExtension = (ext: string) => {
    switch (ext) {
      case "doc":
      case "docx":
        return (
          <a href={document.file} target="_blank" className="text-info" rel="noopener noreferrer">
            <FaRegFileWord size={24} />
          </a>
        );
      case "xls":
      case "xlsx":
        return (
          <a href={document.file} target="_blank" className="text-success" rel="noopener noreferrer">
            <FaRegFileExcel size={24} />
          </a>
        );
      case "pdf":
        return (
          <a href={document.file} target="_blank" className="text-danger" rel="noopener noreferrer">
            <FaRegFilePdf size={24} />
          </a>
        );
      default:
        return (
          <a href={document.file} target="_blank" rel="noopener noreferrer">
            <FaRegFile size={24} />
          </a>
        );
    }
  };

  return (
    <React.Fragment>
      <tr>
        <td>{renderExtension(document.extension)}</td>
        <td>{document.year}</td>
        <td>{document.title}</td>
        <td>{document.documentType}</td>
        <td>{tournament?.name}</td>
        <td>{moment(document.lastUpdate).format("MMM Do YYYY h:mm a")}</td>
        <td>
          {document.tags?.map((t) => {
            return (
              <Badge key={t.id} className="mr-1" variant="dark">
                {t.name}
              </Badge>
            );
          })}
        </td>
        <td className="clickable text-warning" onClick={() => onEdit(document)}>
          <FaPencilAlt size={18} color={"warning"} />
        </td>
      </tr>
    </React.Fragment>
  );
};

export default DocumentLibraryRow;
