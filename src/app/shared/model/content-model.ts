export interface ContentModel {
    [key: string]: {title: string; description?: string;};
}

export interface ContentDialogData {
    contentType: string;
    url: string;
}