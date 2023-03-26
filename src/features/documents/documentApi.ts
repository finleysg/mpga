import { IDocumentData } from "../../services/Data";
import { mpgaApi } from "../../services/MpgaApi";
import { DocumentParams, IDocumentSearch } from "./documentPropTypes";

const prepareFormData = (params: DocumentParams): FormData => {
  const { document, file } = params;
  const form = new FormData();
  if (document.id) {
    form.append("id", document.id.toString());
  }
  if (document.tournament) {
    form.append("tournament", document.tournament.toString());
  }
  if (document.tags) {
    const tags = document.tags.map((tag) => tag.name).join("|");
    form.append("tags", tags);
  }
  form.append("document_type", document.document_type);
  form.append("year", document.year.toString());
  form.append("title", document.title);
  if (file) {
    form.append("file", file, file.name);
  }
  return form;
};

const prepareQueryString = (query: IDocumentSearch): string => {
  const year = query.year || 0;
  const tournamentId = query.tournamentId || 0;
  let queryString = "?d=1";
  if (year > 0) {
    queryString = queryString + `&year=${year}`;
  }
  if (tournamentId > 0) {
    queryString = queryString + `&tournament=${tournamentId}`;
  }
  if (query.documentType) {
    queryString = queryString + `&type=${query.documentType}`;
  } else if (query.documentTypes) {
    queryString = queryString + query.documentTypes.map((t) => `&type=${t}`);
  }
  if (query.tags) {
    queryString = queryString + `&tags=${query.tags}`;
  }
  return queryString;
};

const extendedApi = mpgaApi.injectEndpoints({
  endpoints: (build) => ({
    getDocuments: build.query<IDocumentData[], IDocumentSearch>({
      query: (q) => ({ url: "/documents/" + prepareQueryString(q), method: "GET" }),
      providesTags: [{ type: "Documents", id: "LIST" }],
    }),
    updateDocument: build.mutation<IDocumentData, DocumentParams>({
      query(params) {
        const { id } = params.document;
        return {
          url: `/documents/${id}/`,
          method: "PUT",
          data: prepareFormData(params),
        };
      },
      invalidatesTags: [{ type: "Documents", id: "LIST" }],
    }),
    addDocument: build.mutation<IDocumentData, DocumentParams>({
      query(params) {
        return {
          url: "/documents/",
          method: "POST",
          data: prepareFormData(params),
        };
      },
      invalidatesTags: [{ type: "Documents", id: "LIST" }],
    }),
    deleteDocument: build.mutation<IDocumentData, number>({
      query(id) {
        return {
          url: `/documents/${id}/`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Documents", id: "LIST" }],
    }),
  }),
});

export const { useGetDocumentsQuery, useAddDocumentMutation, useUpdateDocumentMutation, useDeleteDocumentMutation } =
  extendedApi;
