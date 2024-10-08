import React, {useState} from "react";
import classnames from "classnames"
import { useMutation, useQueryCache } from 'react-query'

import { updateTodo } from "api/updateTodo";
import { deleteTodo } from "api/deleteTodo";

import DeleteModal from "components/DeleteModal";

import CheckListIcon from 'assets/svg/checklist'
import ClockIcon from 'assets/svg/clock'
import TrashIcon from 'assets/svg/trash'

type Props = {
  taskId: string,
  title: string,
  status: 'completed' | 'uncompleted'
}

const TaskCard: React.FC<Props> = ({ title, taskId, status }) => {
    // menampilkan modal
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    // membuat cache
    const cache = useQueryCache()

    // menghapus todo
    const [removeTodo] = useMutation(deleteTodo, {
        onSuccess: () => {
            cache.invalidateQueries('todos')
        }
    })

    // mengambil queris data dan status loading
    const [checkTodo, { isLoading }] = useMutation(updateTodo, {
        onSuccess: () => {
            cache.invalidateQueries('todos')
        }
    })

    // handling modal delete
    const handleRemoveTodo = (type: 'delete' | 'cancel') => {
        if (type === 'delete') {
            removeTodo(taskId)
            setShowDeleteModal(false)
        }

        if (type === 'cancel') {
            setShowDeleteModal(false)
        }
    }

    // merubah container berdasarkan status
    const containerClass = classnames('flex justify-center items-center relative rounded shadow-lg p-4 mb-2', {
        'bg-white text-darkPurple': status === 'uncompleted',
        'bg-gray-300 bg-opacity-50': status === 'completed'
    })

    // merubah title berdasarkan status
    const titleClass = classnames('flex-1 text-sm subpixel-antialiased tracking-wid font-bold whitespace-normal truncate', {
        'line-through': status === 'completed'
    })

    // merubah warna icon checklist
    const checkListClass = classnames('w-5 h-5 ml-4', {
        'text-green-400': status === 'completed',
        'text-green-600': status === 'uncompleted'
    })


    return (
        <div className={ containerClass }>
            <p className={titleClass}>
                {title}
            </p>

            {/* edit status */}
            <div className="flex text-darkPurple">
                <span>
                    
                    {/* jika loading maka akan menampilkan clock icon */}
                    {isLoading ? (
                        <ClockIcon />
                    ) : (
                            < CheckListIcon className={checkListClass} onClick={() => checkTodo(taskId)} />
                    )}
                </span>
                
                {/* delete Todo icon */}
                <span className="w-5 h-5 ml-4 text-red-400">
                    <TrashIcon onClick={() => setShowDeleteModal(true)} />
                </span>
            </div>

            <DeleteModal
                inProp={showDeleteModal}
                taskStatus={status}
                onDelete={()=> handleRemoveTodo('delete')}
                onCancel={()=> handleRemoveTodo('cancel')}
            />
        </div>
    )

}

export default TaskCard