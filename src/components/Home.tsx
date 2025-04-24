
import React from "react";
import { useDecimo } from "@/contexts/DecimoContext";
import DailyChoices from "./DailyChoices";
import ProgressTracker from "./ProgressTracker";

const Home: React.FC = () => {
  const { userData, selectedChoice } = useDecimo();
  
  return (
    <div className="min-h-screen flex flex-col">
      {selectedChoice ? (
        <DailyChoices />
      ) : (
        <div className="flex-1 flex flex-col p-6 bg-gradient-to-b from-decimo-lavender/30 to-white">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800">Welcome back, {userData.name}</h2>
            <p className="text-gray-600 mt-1">Continue your journey of growth</p>
          </div>
          
          <div className="mb-8 animate-fade-in">
            <ProgressTracker />
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
