import React from "react";

import TaskCard from "components/TaskCard";

const TaskList: React.FC = () => {
    return (
        <section className="flex flex-col overflow-x-hidden overflow-y-auto h-taskList rounded">
            
            <TaskCard title="Todo List Hari ini" />
            <TaskCard title="Todo List Hari ini" />
            <TaskCard title="Todo List Hari ini" />
            <TaskCard title="Todo List Hari ini" />
            <TaskCard title="Todo List Hari ini" />
            <TaskCard title="Todo List Hari ini" />
            <TaskCard title="Todo List Hari ini" />
            <TaskCard title="Todo List Hari ini" />
            <TaskCard title="Todo List Hari ini" />
            <TaskCard title="Todo List Hari ini" />
            <TaskCard title="Todo List Hari ini" />
            <TaskCard title="Todo List Hari ini" />
            <TaskCard title="Todo List Hari ini" />
            <TaskCard title="Todo List Hari ini" />
            
        </section>
    )
}

export default TaskList