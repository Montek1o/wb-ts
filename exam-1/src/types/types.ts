export interface ITask {
    id: number;
    title: string;
    description: string;
    creationDate: string;
    status: 'done' | 'notDone';
    visible: boolean;
    deadline?: string;
    responsiblePerson?: string;
    location?: string;
}

export interface IOption {
    name: string;
    value: string;
}