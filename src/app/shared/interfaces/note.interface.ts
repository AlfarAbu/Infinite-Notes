export interface Note { 
    id: number;
    title: string;
    content: string;
    color: string;
    isPinned?: boolean;
    createdOn?: Date;
    modifiedOn?: Date;
}