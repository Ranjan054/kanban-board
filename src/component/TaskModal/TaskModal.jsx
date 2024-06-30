import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getIsoMatch } from '../../utility';


const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.60)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid #ccc',
        background: 'rgb(243 244 246)',
        width: '60%'
    },
};

const TaskModal = ({ isOpen, onRequestClose, addTask, editTask, taskToEdit, deleteTask, users, labels }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [label, setLabel] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.content);
            setDescription(taskToEdit.description);
            setAssignedTo(taskToEdit.assignedTo);
            setDueDate(getIsoMatch(taskToEdit.dueDate) ? taskToEdit?.dueDate : taskToEdit?.dueDate?.toISOString());
            setLabel(taskToEdit.label);
        } else {
            setTitle('');
            setDescription('');
            setAssignedTo('');
            setDueDate(new Date());
            setLabel('');
        }
    }, [taskToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskToEdit) {
            editTask({ ...taskToEdit, content: title, description, assignedTo, dueDate, label });
        } else {
            addTask({ title, description, assignedTo, dueDate, label });
            setTitle('');
            setDescription('');
            setAssignedTo('');
            setDueDate(new Date());
            setLabel('');
        }
        onRequestClose();
    };

    const onDateChange = (date) => {
        setDueDate(date.toISOString());
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Task Modal"
            style={customStyles}
        >
            <h2 className='text-2xl text-black font-semibold'>{taskToEdit ? 'Edit Task' : 'Add Task'}</h2>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 mt-4'>
                    <div className='flex gap-2 items-center'>
                        <label className='w-1/4 text-base text-black'>
                            Title:
                        </label>
                        <input
                            placeholder='Title...'
                            className='w-[75%] border border-gray-600 rounded py-1 px-2 text-base text-black'
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} required
                        />
                    </div>
                    <div className='flex gap-2 items-center'>
                        <label className='w-1/4 text-base text-black'>
                            Description:
                        </label>
                        <textarea
                            placeholder='Description...'
                            className='w-[75%] border border-gray-600 rounded py-1 px-2 text-base text-black'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className='flex gap-2 items-center'>
                        <label className='w-1/4 text-base text-black'>
                            Due Date:
                        </label>
                        <DatePicker
                            selected={dueDate}
                            onChange={(date) => onDateChange(date)}
                            timeInputLabel="Time:"
                            dateFormat="dd/MM/yyyy h:mm aa"
                            showTimeInput
                            className='border border-gray-600 rounded py-1 px-2 text-base text-black'
                            required
                            placeholder={'Select Date Time...'}
                        />
                    </div>

                    <div className='flex gap-2 items-center'>
                        <label className='w-1/4 text-base text-black'>
                            Label
                        </label>
                        <select className='py-1 px-2 border border-gray-600 rounded text-base text-black' value={label} onChange={(e) => setLabel(e.target.value)}>
                            <option value="">Select Label</option>
                            {labels.map(user => <option key={user} value={user}>{user}</option>)}
                        </select>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <label className='w-1/4 text-base text-black'>
                            Assigned To:
                        </label>
                        <select className='py-1 px-2 border border-gray-600 rounded text-base text-black' value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                            <option value="">Select User</option>
                            {users.map(user => <option key={user} value={user}>{user}</option>)}
                        </select>
                    </div>

                    <div className='flex justify-end gap-2'>
                        <button className='text-base text-white bg-blue-600 rounded py-1 px-3' type="submit">{taskToEdit ? 'Save Changes' : 'Add Task'}</button>
                        <button className='text-base text-black bg-gray-300 rounded py-1 px-3' type="button" onClick={() => onRequestClose()}>Cancel</button>
                        {taskToEdit ? (
                            <button className='text-base text-white bg-red-500 py-1 rounded px-3' onClick={() => deleteTask(taskToEdit?.id)}>Delete</button>
                        ) : null}
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default TaskModal;