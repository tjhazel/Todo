export interface TodoItem {
   id: number | undefined;
   title: string;
   createdOn: Date;
   isComplete: boolean;
   completedOn?: Date;
}
