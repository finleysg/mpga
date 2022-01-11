import { MpgaDocument } from "models/Documents";
import { IDocumentData } from "services/Data";

export enum DocumentViewType {
  Link,
  Button,
  Detail,
  Icon,
}

export interface IDocumentSearch {
  key: string;
  tournamentId?: number;
  year?: number;
  documentType?: string;
  documentTypes?: string[];
  tags?: string[];
}

export type DocumentParams = {
  document: IDocumentData;
  file?: File;
};

export type DocumentSearchProps = {
  query: IDocumentSearch;
};

export type DocumentLibrarySearchProps = DocumentSearchProps & {
  onSearch: (query: IDocumentSearch) => void;
};

export type DocumentListProps = {
  documents: IDocumentData[];
  render: IDocumentRenderProps;
};

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

export type DocumentProps = {
  document: MpgaDocument;
};

export type DocumentViewProps = DocumentProps & {
  render: IDocumentRenderProps;
};

export type DocumentEditProps = DocumentProps & {
  file?: File;
  onClose: () => void;
};

export type DocumentDetailProps = DocumentViewProps & {
  edit: boolean;
  onClose: () => void;
};
