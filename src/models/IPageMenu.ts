export interface IPageMenu {
    url: string,
    title: string,
    target: string,
    children?: IPageMenu[],
};
