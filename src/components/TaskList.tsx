
import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDecimo } from "@/contexts/DecimoContext";
import type { Task } from "@/contexts/DecimoContext";

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const { userData, completeTask } = useDecimo();
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-4">Today's Tasks</h3>
      
      <div className="space-y-3">
        {tasks.map((task) => {
          const isCompleted = userData.taskCompletions[task.id] || task.completed;
          
          return (
            <div 
              key={task.id} 
              className={`flex items-center gap-3 p-3 border rounded-lg transition-all
                ${isCompleted ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
            >
              <Button
                size="sm"
                variant="outline"
                className={`w-8 h-8 rounded-full flex-shrink-0 p-0
                  ${isCompleted 
                    ? "bg-green-500 text-white border-green-500 hover:bg-green-600 hover:text-white" 
                    : "border-gray-300 text-gray-400"}`}
                onClick={() => !isCompleted && completeTask(task.id)}
                disabled={isCompleted}
              >
                <Check className="w-4 h-4" />
              </Button>
              
              <span className={`text-sm ${isCompleted ? "text-green-800 line-through" : "text-gray-700"}`}>
                {task.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;
