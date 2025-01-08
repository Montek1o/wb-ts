import React, {FC, useState} from "react";
import {ITask} from "../../types/types";
import {dateFormat} from "../../utils/utils";
import './AddTaskPopup.css';

interface AddTaskPopupProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    create: (newTask: ITask) => void;
    selectedFilter: string;
}

const AddTaskPopup: FC<AddTaskPopupProps> = ({visible, setVisible, create, selectedFilter}) => {
    const [newTask, setNewTask] = useState<ITask>({
        id: Date.now(),
        title: '',
        description: '',
        creationDate: dateFormat(),
        status: 'notDone',
        visible: true,
        deadline: '',
        responsiblePerson: '',
        location: '',
    });
    const rootClasses = ['addTaskPopup'];

    if (visible) {
        rootClasses.push('addTaskPopup--active');
    }

    const addTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        create(newTask);
        setVisible(false);
        setNewTask({
            id: Date.now(),
            title: '',
            description: '',
            creationDate: dateFormat(),
            status: 'notDone',
            visible: true,
            deadline: '',
            responsiblePerson: '',
            location: '',
        });
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className='addTaskPopup__content' onClick={(e) => e.stopPropagation()}>
                <form className='addTaskPopup__form'>
                    <p>Обязательные поля</p>
                    <input
                        className='addTaskPopup__input'
                        type='text'
                        placeholder='Название'
                        value={newTask.title}
                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    />
                    <input
                        className='addTaskPopup__input'
                        type='text'
                        placeholder='Описание'
                        value={newTask.description}
                        onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    />
                    <hr/>
                    <p>Дополнительные поля</p>
                    <div style={{display: 'flex', alignItems: 'center', columnGap: '10px'}}>
                        <span>Крайний срок: </span>
                        <input
                            className='addTaskPopup__input'
                            type='date'
                            min={new Date().toISOString().split('T')[0]}
                            placeholder='Крайний срок'
                            value={newTask.deadline}
                            onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
                        />
                    </div>
                    <input
                        className='addTaskPopup__input'
                        type='text'
                        placeholder='Ответственное лицо'
                        value={newTask.responsiblePerson}
                        onChange={(e) => setNewTask({...newTask, responsiblePerson: e.target.value})}
                    />
                    <input
                        className='addTaskPopup__input'
                        type='text'
                        placeholder='Место проведения'
                        value={newTask.location}
                        onChange={(e) => setNewTask({...newTask, location: e.target.value})}
                    />
                    <button
                        disabled={!newTask.title.length || !newTask.description.length}
                        className='addTaskPopup__btn'
                        onClick={(e) => addTask(e)}
                    >Добавить
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTaskPopup;