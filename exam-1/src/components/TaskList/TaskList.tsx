import React, {FC} from "react";
import Task from '../Task/Task';
import {ITask} from "../../types/types";
import './TaskList.css';

interface TaskListProps {
    tasks: ITask[];
    remove: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, task: ITask) => void;
    update: (task: ITask) => void;
    changeStatus: (task: ITask) => void;
}

const TaskList: FC<TaskListProps> = ({tasks, remove, update, changeStatus}) => {
    function checkVisible(tasks: ITask[]) {
        return tasks.every(task => !task.visible);
    }

    return (
        <div className='taskList'>
            {tasks.map(task =>
                <Task task={task} key={task.id} remove={remove} update={update} changeStatus={changeStatus}/>
            )}
            {checkVisible(tasks) && <div>Нет подходящих задач</div>}
        </div>
    );
};

export default TaskList;