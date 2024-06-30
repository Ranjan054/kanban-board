import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskModal from '../TaskModal/TaskModal';
import Column from '../Column/Column';
import { getIsoMatch } from '../../utility';
import { labels } from '../../constant';

const { P0, P1, P2, P3, P4 } = labels;

const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Task1', description: 'task 1 details', assignedTo: null, dueDate: '2024-06-27T14:25:57.424Z', label: P0 },
        'task-2': { id: 'task-2', content: 'Task2', description: 'task 2 details', assignedTo: null, dueDate: '2024-06-16T14:25:57.424Z', label: P1 },
        'task-3': { id: 'task-3', content: 'Task3', description: 'task 3 details', assignedTo: null, dueDate: '2024-06-12T14:25:57.424Z', label: P2 },
        'task-4': { id: 'task-4', content: 'Task4', description: 'task 4 details', assignedTo: null, dueDate: '2024-06-18T14:25:57.424Z', label: P3 },
        'task-5': { id: 'task-5', content: 'Task5', description: 'task 5 details', assignedTo: null, dueDate: '2024-06-20T14:25:57.424Z', label: P4 },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-2'],
        },
        'column-2': {
            id: 'column-2',
            title: 'In progress',
            taskIds: ['task-3', 'task-4'],
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: ['task-5'],
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
    users: ['User 1', 'User 2', 'User 3', 'User 4', 'User 5'],
    labels: [P0, P1, P2, P3, P4],
    sort: '',
};

function Homepage() {
    const [data, setData] = useState(initialData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeColumnId, setActiveColumnId] = useState(null);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);

            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            const newState = {
                ...data,
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn,
                },
            };

            setData(newState);
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newState = {
            ...data,
            columns: {
                ...data.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        setData(newState);
    };

    const addColumn = () => {
        const newColumnId = `column-${Object.keys(data.columns).length + 1}`;
        const newColumn = {
            id: newColumnId,
            title: `New Column ${Object.keys(data.columns).length + 1}`,
            taskIds: [],
        };

        const newState = {
            ...data,
            columns: {
                ...data.columns,
                [newColumnId]: newColumn,
            },
            columnOrder: [...data.columnOrder, newColumnId],
        };

        setData(newState);
    };

    const addTask = ({ title, description, assignedTo, dueDate, label, columnId }) => {
        const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
        const newTask = {
            id: newTaskId,
            content: title,
            description,
            assignedTo,
            dueDate: getIsoMatch(dueDate) ? dueDate : dueDate.toISOString(),
            label,
        };

        const column = data.columns[columnId];
        const newTaskIds = [...column.taskIds, newTaskId];

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        };

        const newState = {
            ...data,
            tasks: {
                ...data.tasks,
                [newTaskId]: newTask,
            },
            columns: {
                ...data.columns,
                [columnId]: newColumn,
            },
        };

        setData(newState);
    };

    const editTask = (updatedTask) => {
        const newTasks = {
            ...data.tasks,
            [updatedTask.id]: updatedTask,
        };

        const newState = {
            ...data,
            tasks: newTasks,
        };

        setData(newState);
    };

    const deleteTask = (taskId) => {
        const newTasks = { ...data.tasks };
        delete newTasks[taskId];

        const column = data.columns[activeColumnId];
        const newTaskIds = column.taskIds.filter(id => id !== taskId);

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        };

        const newState = {
            ...data,
            tasks: newTasks,
            columns: {
                ...data.columns,
                [activeColumnId]: newColumn,
            },
        };

        setData(newState);

        closeModal();
    };

    const openAddTaskModal = (columnId) => {
        setActiveColumnId(columnId);
        setTaskToEdit(null);
        setIsModalOpen(true);
    };

    const openEditTaskModal = (task, columnId) => {
        setActiveColumnId(columnId);
        setTaskToEdit(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setActiveColumnId(null);
        setTaskToEdit(null);
    };

    const renameColumn = (columnId, newTitle) => {
        const updatedColumns = {
            ...data.columns,
            [columnId]: {
                ...data.columns[columnId],
                title: newTitle,
            },
        };

        const updatedData = {
            ...data,
            columns: updatedColumns,
        };

        setData(updatedData);
    };

    const sortTasks = (tasks) => {
        return tasks.sort((a, b) => {
            if (data.sort === 'asc') {
                return a.content.localeCompare(b.content);
            } else {
                return b.content.localeCompare(a.content);
            }
        });
    };

    return (
        <section
            className="py-10 relative sm:py-4 bg-zinc-100">
            <div className="container mx-auto px-1 sm:px-4">
                <select
                    className='text-base text-black py-1 px-2 border border-gray-600 rounded ml-4'
                    onChange={(e) => setData({ ...data, sort: e.target.value })}
                >
                    <option value="">Sort By Title</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                {/* <button className='bg-blue-600 text-white rounded py-1 px-2.5 ml-2.5 cursor-pointer' onClick={() => addColumn()}>Add Column</button> */}
                <div className='flex items-start gap-x-3 overflow-x-auto py-4 w-full'>
                    <div className="flex">
                        <DragDropContext onDragEnd={onDragEnd}>
                            {data.columnOrder.map((columnId) => {
                                const column = data.columns[columnId];
                                let tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
                                tasks = data.sort ? sortTasks(tasks) : tasks;

                                return (
                                    <Column
                                        key={column.id}
                                        column={column}
                                        tasks={tasks}
                                        openAddTaskModal={openAddTaskModal}
                                        openEditTaskModal={openEditTaskModal}
                                        renameColumn={renameColumn}
                                    />
                                );
                            })}
                        </DragDropContext>
                    </div>
                    <button className='text-base bg-blue-600 text-white rounded py-2 px-4 ml-2.5 whitespace-nowrap' onClick={() => addColumn()}>Add Column</button>
                </div>

                <TaskModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    addTask={({ title, description, assignedTo, dueDate, label }) => addTask({ title, description, assignedTo, dueDate, label, columnId: activeColumnId })}
                    editTask={editTask}
                    taskToEdit={taskToEdit}
                    deleteTask={deleteTask}
                    users={data.users}
                    labels={data.labels}
                />
            </div>
        </section>
    );
}

export default Homepage;