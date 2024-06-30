import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from '../Task/Task';
import editIcon from '../../assets/edit-icon.svg'

const Column = ({ column, tasks, openAddTaskModal, openEditTaskModal, renameColumn }) => {
    const [isRenaming, setIsRenaming] = useState(false);
    const [newColumnName, setNewColumnName] = useState(column.title);

    const handleRename = () => {
        setIsRenaming(true);
    };

    const handleSaveRename = () => {
        if (newColumnName.trim() !== '') {
            renameColumn(column?.id, newColumnName);
        }
        setIsRenaming(false);
    };

    const handleCancelRename = () => {
        setNewColumnName(column?.title);
        setIsRenaming(false);
    };

    const handleChange = (e) => {
        setNewColumnName(e.target.value);
    };

    return (
        <div className="bg-gray-300 rounded mx-2.5 p-2.5 min-w-80 flex flex-col">
            <div className="column-header">
                {isRenaming ? (
                    <>
                        <input className='text-sm text-black py-1 px-2 rounded border border-gray-400' type="text" value={newColumnName} onChange={(e) => handleChange(e)} />
                        <div className='flex justify-end gap-2 my-2.5'>
                            <button className='text-sm text-white bg-blue-600 rounded py-1 px-3' onClick={() => handleSaveRename()}>Save</button>
                            <button className='text-sm text-black bg-gray-400 rounded py-1 px-3' onClick={() => handleCancelRename()}>Cancel</button>
                        </div>
                    </>
                ) : (
                    <div className='relative'>
                        <h2 className='text-center bg-gray-950 text-white p-2.5 rounded-t pr-7.5'>{column.title}</h2>
                        <button className='absolute top-2.5 right-3' onClick={handleRename}>
                            <img src={editIcon} alt="edit" />
                        </button>
                    </div>
                )}
            </div>
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <div
                        className="bg-white p-2.5 rounded-b flex-grow overflow-y-auto"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {tasks.map((task, index) => (
                            <Task
                                key={task.id}
                                task={task}
                                index={index}
                                openEditTaskModal={() => openEditTaskModal(task, column?.id)}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <button className='bg-blue-600 text-white rounded p-1' onClick={() => openAddTaskModal(column.id)}>Add Task</button>
        </div>
    );
};

export default Column;