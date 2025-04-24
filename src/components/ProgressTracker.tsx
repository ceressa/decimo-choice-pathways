
import React from "react";
import { useDecimo } from "@/contexts/DecimoContext";

const ProgressTracker: React.FC = () => {
  const { userData, currentDay } = useDecimo();
  
  // Create an array of 7 days to display progress
  const days = Array.from({ length: 7 }, (_, i) => i + 1);
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">Your Journey</h3>
      
      <div className="flex justify-between items-center">
        {days.map((day) => {
          const isDayCompleted = userData.choices.some((choiceId) => {
            // This should check if any choice from this day was selected
            // For now, we'll just check if the day is less than current day
            return day < currentDay;
          });
          
          const isCurrentDay = day === currentDay;
          
          return (
            <div 
              key={day} 
              className={`flex flex-col items-center space-y-2
                ${isDayCompleted ? "text-green-600" : isCurrentDay ? "text-violet-600" : "text-gray-400"}`}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium
                  ${isDayCompleted 
                    ? "bg-green-100 border-2 border-green-500" 
                    : isCurrentDay 
                      ? "bg-violet-100 border-2 border-violet-500" 
                      : "bg-gray-100 border-2 border-gray-200"}`}
              >
                {day}
              </div>
              <span className="text-xs font-medium">Day {day}</span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"
          style={{ width: `${((currentDay - 1) / 7) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressTracker;
