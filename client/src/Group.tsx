import { FC } from "react";
import type { Task } from "./schemaTypes";
import TaskComponent from "./Tast";



export interface IGroupProps {
    name: string;
    tasks: Task[];
    setSelectedGroup: (name: string) => void;
}
const Group: FC<IGroupProps> = ({
    name,
    tasks,
    setSelectedGroup
}) => {

    const totalCount = tasks.length;
    const completeCount = tasks.filter(({ completedAt }) => completedAt !== null)
        .length;

    const handleGroupClick = () => {
        setSelectedGroup(name);
    };

    return (
        <TaskComponent status="group" onClick={handleGroupClick}>
            <div >{name}</div>
            <div className="task-group-subtitle">
                {completeCount} of {totalCount} tasks complete
            </div>
        </TaskComponent>
    );
};



export default Group;
