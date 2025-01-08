import React, {useEffect, useState} from "react";
import AddTaskPopup from "./components/AddTaskPopup/AddTaskPopup";
import TaskList from './components/TaskList/TaskList';
import Filter from "./components/Filter/Filter";
import {tasksData, options} from "./constants/constants";
import {ITask} from "./types/types";
import './App.css';

function App() {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<string>('');
    const [addTaskPopup, setAddTaskPopup] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem('tasks')) {
            try {
                setTasks(JSON.parse(localStorage.getItem('tasks') as string));
            } catch {
                alert('Ошибка хранилища, очистите localStorage');
            }
        } else {
            setTasks(tasksData);
            localStorage.setItem('tasks', JSON.stringify(tasksData));
        }
    }, []);

    const createTask = (newTask: ITask) => {
        localStorage.setItem('tasks', JSON.stringify([newTask, ...tasks]));
        setTasks([newTask, ...tasks]);
    }

    const removeTask = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, task: ITask) => {
        e.stopPropagation();
        localStorage.setItem('tasks', JSON.stringify(tasks.filter(t => t.id !== task.id)));
        setTasks(tasks.filter(t => t.id !== task.id));
    }

    const updateTask = (task: ITask) => {
        const newTasks = tasks.map(item => {
            if (item.id === task.id) {
                const updatedItem: ITask = {
                    ...item,
                    title: task.title,
                    description: task.description,
                    deadline: task.deadline,
                    responsiblePerson: task.responsiblePerson,
                    location: task.location,
                };
                return updatedItem;
            }
            return item;
        })
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        setTasks(newTasks);
    }

    const changeStatusTask = (task: ITask) => {
        const newTasks = tasks.map(item => {
            if (item.id === task.id) {
                const updatedItem: ITask = {
                    ...item,
                    status: item.status === 'done' ? 'notDone' : 'done',
                    visible: (selectedFilter.length && selectedFilter === 'done' || selectedFilter === 'notDone') ? !item.visible : item.visible,
                };
                return updatedItem;
            }
            return item;
        })
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        setTasks(newTasks);
    }

    function filter (sort: string)  {
        setSelectedFilter(sort);
        const newTasks = tasks.map(item => {
            if (sort === 'Все задачи') {
                return {...item, visible: true};
            } else if (sort === 'deadline' && item.deadline) {
                return {...item, visible: true};
            } else if (sort === 'responsiblePerson' && item.responsiblePerson) {
                return {...item, visible: true};
            } else if (sort === 'location' && item.location) {
                return {...item, visible: true};
            } else if (sort !== item.status) {
                return {...item, visible: false};
            } else {
                return {...item, visible: true};
            }
        });
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        setTasks(newTasks);
    }

    return (
        <div className='app'>
            <header>
                <h1>Менеджер задач</h1>
                <button className='addTaskBtn' onClick={() => setAddTaskPopup(true)}>Добавить задачу</button>
                <AddTaskPopup visible={addTaskPopup} setVisible={setAddTaskPopup} create={createTask} selectedFilter={selectedFilter}/>
            </header>
            <Filter
                value={selectedFilter}
                defaultValue='Все задачи'
                onChange={filter}
                options={options}
            />
            {tasks.length ?
                <TaskList tasks={tasks} remove={removeTask} update={updateTask} changeStatus={changeStatusTask}/>
                :
                <div>Нет задач</div>
            }
        </div>
    );
}

export default App;
