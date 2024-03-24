import React from "react";
import { useQuery } from "react-query";

import { getTodos } from "api/getTodos";

import TaskCard from "components/TaskCard";

const TaskList: React.FC = () => {

    // menampilkan pesan saat proses query
    const {isLoading, isError, error, data} = useQuery('todos', getTodos)
    
    if (isLoading) {
        return (
            <div>Is Loading.....</div>
        )
    }

    if (isError) {
        return (
            <div>Is Error... {error}</div>
        )
    }

    return (
        <section className="flex flex-col overflow-x-hidden overflow-y-auto h-taskList rounded">
            
            {
                // ambil data dari database dengan map
                data?.todos.map((todo) => {
                    return (
                        // mengambil parameter dari data, untuk proses update
                        <TaskCard
                            key={todo._id}
                            title={todo.title}
                            taskId={todo._id}
                            status={todo.status}
                        />

                    )
                })
            }

        </section>
    )
}

export default TaskList