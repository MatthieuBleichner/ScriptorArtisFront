export interface Task{
    id: string;
    description: string;
    state: string;
    title: string;
}


const TODO = 'TODO';
const ONGOING = 'ONGOING';
const DONE = 'DONE';


export const initialData: Task[] = [
    {
        id: 'task-1',
        title: 'Task 1',
        description: 'Task 1: Description',
        state: TODO
    },
    {
        id: 'task-2',
        title: 'Task 2',
        description: 'Task 2: Description',
        state: TODO
    },
    {
        id: 'task-3',
        title: 'Task 3',
        description: 'Task 3: Description',
        state: ONGOING
    },
    {
        id: 'task-4',
        title: 'Task 4',
        description: 'Task 4: Description',
        state: DONE
    },
];

export interface Column{
    id: string;
    title: string;
    taskIds: string[];
}


export const columns: Column[] = [
    {
        id: TODO,
        title: 'To Do',
        taskIds: ['task-1', 'task-2']
    },
    {
        id: ONGOING,
        title: 'Ongoing',
        taskIds: ['task-3']
    },
    {
        id: DONE,
        title: 'Done',
        taskIds: ['task-4']
    }
];
