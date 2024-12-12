import React from "react";

import DocumentList from "../../features/documents/DocumentList";
import { DocumentViewType, IDocumentRenderProps } from "../../features/documents/documentPropTypes";
import { IDocumentData } from "../../services/Data";

type EventDocuementProps = {
  documents: IDocumentData[];
  title: string;
  documentType: string;
};

const render = {
  viewType: DocumentViewType.Link,
  external: true,
  variant: "secondary",
} as IDocumentRenderProps;

const EventDocumentList: React.FC<EventDocuementProps> = (props) => {
  const { documents: eventDocuments, title, documentType } = props;

  const documents = eventDocuments?.filter((d) => d.document_type === documentType);

  return (
    <div>
      {documents && documents.length > 0 && (
        <React.Fragment>
          <h5 className="mt-1 text-primary">{title}</h5>
          <DocumentList documents={documents} render={render} />
        </React.Fragment>
      )}
    </div>
  );
};

export default EventDocumentList;
