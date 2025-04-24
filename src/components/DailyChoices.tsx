
import React, { useState } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDecimo } from "@/contexts/DecimoContext";
import ChoiceCard from "./ChoiceCard";
import TaskList from "./TaskList";

const DailyChoices: React.FC = () => {
  const { userData, currentDay, todayChoices, selectedChoice, selectChoice, goToHome } = useDecimo();
  const [showTasks, setShowTasks] = useState(false);
  
  // Transition to show tasks after card selection animation completes
  React.useEffect(() => {
    if (selectedChoice) {
      const timer = setTimeout(() => {
        setShowTasks(true);
      }, 600); // Time should match the card animation duration
      
      return () => clearTimeout(timer);
    }
  }, [selectedChoice]);

  if (selectedChoice) {
    return (
      <div className="min-h-screen flex flex-col p-6">
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-md animate-fade-in">
            <ChoiceCard 
              choice={selectedChoice} 
              isSelected={true}
              onSelect={() => {}}
              className="w-full aspect-[3/4] mb-6"
            />
            
            {showTasks && (
              <>
                <div className="animate-fade-in">
                  <TaskList tasks={selectedChoice.tasks} />
                </div>
                
                <div className="mt-8 flex justify-center animate-fade-in">
                  <Button
                    onClick={goToHome}
                    className="flex items-center gap-2 px-6 py-5 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-xl font-medium"
                  >
                    <Home className="w-5 h-5" />
                    <span>Back to Home</span>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-b from-decimo-lavender/30 to-white">
      <div className="text-center mb-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800">Hello, {userData.name}</h2>
        <p className="text-gray-600 mt-1">Are you ready for today's choice?</p>
        <div className="text-sm font-medium text-violet-600 mt-2">Day {currentDay} of 7</div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {todayChoices.map((choice) => (
              <div key={choice.id} className="animate-scale-in">
                <ChoiceCard 
                  choice={choice}
                  isSelected={false}
                  onSelect={() => selectChoice(choice.id)}
                  className="w-full aspect-[3/4]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyChoices;
