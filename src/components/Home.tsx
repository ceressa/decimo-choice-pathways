
import React from "react";
import { useDecimo } from "@/contexts/DecimoContext";
import DailyChoices from "./DailyChoices";
import ProgressTracker from "./ProgressTracker";
import StoryPreview from "./StoryPreview";
import TaskList from "./TaskList";

const Home: React.FC = () => {
  const { userData, selectedChoice } = useDecimo();
  
  // Mock tasks for demonstration
  const mockTasks = [
    {
      id: "task1",
      text: "Reflect on the meaning of today's story",
      completed: false
    },
    {
      id: "task2",
      text: "Share your thoughts with a friend",
      completed: false
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      {selectedChoice ? (
        <DailyChoices />
      ) : (
        <div className="flex-1 flex flex-col p-6 bg-gradient-to-b from-decimo-lavender/30 to-white">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800">{userData.name}'s Story</h2>
            <p className="text-gray-600 mt-1">Your journey unfolds day by day</p>
          </div>
          
          <div className="mb-8 animate-fade-in">
            <ProgressTracker />
          </div>
          
          {userData.choices.length > 0 && (
            <div className="mb-8 animate-fade-in">
              <StoryPreview />
            </div>
          )}
          
          <div className="mb-8 animate-fade-in">
            <TaskList tasks={mockTasks} />
          </div>
          
          <div className="flex-1">
            <DailyChoices />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
