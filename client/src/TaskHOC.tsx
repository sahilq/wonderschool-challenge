import { PropsWithChildren } from "react";
import { Task } from "./schemaTypes";
import TaskComponent from "./Tast";



export interface ITaskHOCProps {
    task: Task;
    getDependencyList: Function;
    toggleTask: Function;
}
const TaskHOC = ({
    task: { task: taskName, id, completedAt, dependencyIds, group },
    getDependencyList,
    toggleTask
}: PropsWithChildren<ITaskHOCProps>) => {
    const handleTaskHOCClick = (id: number) => () => {
        toggleTask(group, id);
    };

    const taskStatus = getDependencyList(group, dependencyIds)
        ? "locked"
        : completedAt
            ? "completed"
            : "incomplete";

    return (
        <TaskComponent
            status={taskStatus}
            onClick={taskStatus === "locked" ? () => { } : handleTaskHOCClick(id)}
        >
            <div>
                {taskStatus === "locked" ? "Locked Task" : taskName}
            </div>
        </TaskComponent>
    );
};



export default TaskHOC;
