import { FC } from "react";
import useDynamicSVGImport from './hooks/useDynamicSVGImport';


export interface ITaskProps {
    status: string;
    onClick: (event: React.MouseEvent) => void;

}
const TaskCard: FC<ITaskProps> = ({
    status,
    onClick,
    children
}) => {
    const { SvgIcon } = useDynamicSVGImport(status)
    const isGroup = status === 'group'
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
            onClick={onClick}
        >
            {isGroup && <SvgIcon />}
            <div style={{ padding: '10px' }} >{children}</div>
            {!isGroup && <SvgIcon />}

        </div>
    );
}



export default TaskCard;