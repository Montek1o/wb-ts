import React, {FC, useEffect, useState} from "react";
import {ITask} from "../../types/types";
import './EditTaskPopup.css';

interface EditTaskPopupProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    task: ITask;
    update: (task: ITask) => void;
}

const EditTaskPopup: FC<EditTaskPopupProps> = ({visible, setVisible, task, update}) => {
    const [editTask, setEditTask] = useState<ITask>({
        id: task.id,
        title: task.title,
        description: task.description,
        creationDate: task.creationDate,
        status: task.status,
        visible: task.visible,
        deadline: task.deadline,
        responsiblePerson: task.responsiblePerson,
        location: task.location,
    });
    const rootClasses = ['editTaskPopup'];

    if (visible) {
        rootClasses.push('editTaskPopup--active');
    }

    const updateTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, task: ITask) =>  {
        e.preventDefault();
        update(editTask);
        setVisible(false);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={(e) => {
            e.stopPropagation();
            setVisible(false);
            setEditTask({
                id: task.id,
                title: task.title,
                description: task.description,
                creationDate: task.creationDate,
                status: task.status,
                visible: task.visible,
                deadline: task.deadline,
                responsiblePerson: task.responsiblePerson,
                location: task.location,
            });
        }}>
            <div className='editTaskPopup__content' onClick={(e) => e.stopPropagation()}>
                <form className='editTaskPopup__form'>
                    <p>Обязательные поля</p>
                    <input
                        className='editTaskPopup__input'
                        type='text'
                        placeholder='Название'
                        value={editTask.title}
                        onChange={(e) => setEditTask({...editTask, title: e.target.value})}
                    />
                    <input
                        className='editTaskPopup__input'
                        type='text'
                        placeholder='Описание'
                        value={editTask.description}
                        onChange={(e) => setEditTask({...editTask, description: e.target.value})}
                    />
                    <hr/>
                    <p>Дополнительные поля</p>
                    <div style={{display: 'flex', alignItems: 'center', columnGap: '10px'}}>
                        <span>Крайний срок: </span>
                        <input
                            className='editTaskPopup__input'
                            type='date'
                            min={new Date().toISOString().split('T')[0]}
                            placeholder='Крайний срок'
                            value={editTask.deadline}
                            onChange={(e) => setEditTask({...editTask, deadline: e.target.value})}
                        />
                    </div>
                    <input
                        className='editTaskPopup__input'
                        type='text'
                        placeholder='Ответственное лицо'
                        value={editTask.responsiblePerson}
                        onChange={(e) => setEditTask({...editTask, responsiblePerson: e.target.value})}
                    />
                    <input
                        className='editTaskPopup__input'
                        type='text'
                        placeholder='Место проведения'
                        value={editTask.location}
                        onChange={(e) => setEditTask({...editTask, location: e.target.value})}
                    />
                    <button
                        disabled={!editTask.title.length || !editTask.description.length}
                        className='editTaskPopup__btn'
                        onClick={(e) => updateTask(e, editTask)}
                    >Обновить
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditTaskPopup;