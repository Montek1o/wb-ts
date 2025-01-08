import {IOption, ITask} from "../types/types";

export const tasksData: ITask[] = [
    {
        id: 1,
        title: 'Сходить в магазин',
        description: 'Купить хлеб',
        creationDate: '2025-1-7',
        status: 'notDone',
        visible: true,
    },
    {
        id: 2,
        title: 'Уборка',
        description: 'Прибрать на кухне',
        creationDate: '2025-1-7',
        status: 'notDone',
        visible: true,
        deadline: '2025-01-10',
        responsiblePerson: 'Андрей',
    },
    {
        id: 3,
        title: 'Тренировка',
        description: 'Растяжка + Силовые',
        creationDate: '2025-1-6',
        status: 'done',
        visible: true,
        location: 'DDX фитнес',
    }
];

export const options: IOption[] = [
    {
        name: 'Выполненые',
        value: 'done',
    },
    {
        name: 'Не выполненые',
        value: 'notDone',
    },
    {
        name: 'С дедлайном',
        value: 'deadline',
    },
    {
        name: 'С ответственным',
        value: 'responsiblePerson',
    },
    {
        name: 'С местом',
        value: 'location',
    }
];