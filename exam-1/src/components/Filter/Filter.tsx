import React, {FC} from 'react';
import {IOption, ITask} from "../../types/types";
import './Filter.css';

interface FilterProps {
    options: IOption[];
    defaultValue: string;
    value: string;
    onChange: (sort: string) => void;
}

const Filter: FC<FilterProps> = ({options, defaultValue, value, onChange}) => {
    return (
        <div className="filter">
            <p>Фильтр:</p>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value={defaultValue}>{defaultValue}</option>
                {options.map(option =>
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                )}
            </select>
        </div>
    );
};

export default Filter;