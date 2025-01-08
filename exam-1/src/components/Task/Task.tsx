import React, {FC, useState} from "react";
import {ITask} from "../../types/types";
import EditTaskPopup from "../EditTaskPopup/EditTaskPopup";
import './Task.css';

interface TaskProps {
    task: ITask;
    remove: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, task: ITask) => void;
    update: (task: ITask) => void;
    changeStatus: (task: ITask) => void;
}

const Task: FC<TaskProps> = ({task, remove, update, changeStatus}) => {
    const [editTaskPopup, setEditTaskPopup] = useState<boolean>(false);
    const rootClasses = ['task'];

    if (task.status === 'done') {
        rootClasses.push('task--completed');
    }
    if (!task.visible) {
        rootClasses.push('task--hide');
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => changeStatus(task)}>
            <div className='task__info'>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                {(task.location || task.responsiblePerson || task.deadline) &&
                    <div>
                        {task.deadline && <p>Крайний срок: {task.deadline}</p>}
                        {task.responsiblePerson && <p>Отвественный: {task.responsiblePerson}</p>}
                        {task.location && <p>Место проведения: {task.location}</p>}
                    </div>
                }
                <hr style={{margin: '6px 0', width: '240px'}}/>
                <div style={{fontStyle: 'italic'}}>{task.status === 'done' ? 'Выполнено' : 'Выполняется...'}</div>
            </div>
            <div className='task__control'>
            <div className='task__icons'>
                    <span className='icons__edit icon' onClick={(e) => {
                        e.stopPropagation();
                        setEditTaskPopup(true);
                    }}>&#9998;</span>
                    <EditTaskPopup visible={editTaskPopup} setVisible={setEditTaskPopup} task={task} update={update}/>
                    <span className='icons__delete icon' onClick={(e) => remove(e, task)}>&#10060;</span>
                </div>
                <p className='task__date'>{task.creationDate}</p>
            </div>
        </div>
    );
};

export default Task;