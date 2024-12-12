import { PageContent, Policy } from "../../models/Policies";

export type PageContentViewProps = {
  pageContent: PageContent;
};

export type PageContentEditProps = PageContentViewProps & {
  onClose: () => void;
};

export type PageContentDetailProps = {
  pageCode: string;
};

export type PolicyListProps = {
  policyCode: string;
};

export type PolicyViewProps = {
  policy: Policy;
};

export type PolicyEditProps = PolicyViewProps & {
  onClose: () => void;
};

export type PolicyDetailProps = PolicyEditProps & {
  edit: boolean;
};
