import { Draggable } from 'react-beautiful-dnd';
import editIconBlack from '../../assets/edit-icon-black.svg'
import { formatISODate, getLabelColor } from '../../utility';

const Task = ({ task, index, openEditTaskModal }) => {

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div
                    className="flex flex-col justify-between bg-gray-300 mb-2.5 p-2.5 rounded"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div className='relative'>
                        <h4 className='text-black text-xl pr-6'>{task.content}</h4>
                        <button className='absolute top-0.5 right-0' onClick={openEditTaskModal}>
                            <img src={editIconBlack} alt="edit" />
                        </button>
                    </div>
                    <p className='text-black text-base mt-2.5'>{task.description}</p>
                    <div className='flex gap-3 items-center'>
                        {task?.dueDate ? (
                            <p className='text-black text-base mt-2.5'>{formatISODate(task.dueDate)}</p>
                        ) : null}
                        {task?.label ? (
                            <p className={`${getLabelColor(task?.label)} text-base mt-2.5 font-semibold`}>{task.label}</p>
                        ) : null}
                    </div>
                    <p className='text-gray-900 text-sm mt-2'>Assigned to: <span className='text-black font-medium'>{task.assignedTo}</span></p>
                </div>
            )}
        </Draggable>
    );
}

export default Task;