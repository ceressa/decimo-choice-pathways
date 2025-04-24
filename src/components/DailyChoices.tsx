
import React, { useState, useEffect } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDecimo } from "@/contexts/DecimoContext";
import ChoiceCard from "./ChoiceCard";
import StoryView from "./StoryView";

const DailyChoices: React.FC = () => {
  const { userData, currentDay, todayChoices, selectedChoice, selectChoice, goToHome } = useDecimo();
  const [showStory, setShowStory] = useState(false);
  const [showHomeButton, setShowHomeButton] = useState(false);
  
  // Get all available choices for the current day
  const availableChoices = todayChoices.filter(choice => choice.day <= currentDay);
  
  // Handle choice selection
  const handleChoiceSelect = (choiceId: number) => {
    console.log("Choice selected:", choiceId);
    selectChoice(choiceId);
  };
  
  // Transition to show story after card selection animation completes
  useEffect(() => {
    if (selectedChoice) {
      const storyTimer = setTimeout(() => {
        setShowStory(true);
      }, 600); // Time should match the card animation duration
      
      const buttonTimer = setTimeout(() => {
        setShowHomeButton(true);
      }, 6000); // Show home button after 6 seconds
      
      return () => {
        clearTimeout(storyTimer);
        clearTimeout(buttonTimer);
      };
    }
  }, [selectedChoice]);

  // Reset states when going back to home
  useEffect(() => {
    if (!selectedChoice) {
      setShowStory(false);
      setShowHomeButton(false);
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
            
            {showStory && (
              <div className="animate-fade-in">
                <StoryView story={selectedChoice.storyText} userName={userData.name} />
              </div>
            )}
            
            {showHomeButton && (
              <div className="mt-8 flex justify-center animate-fade-in">
                <Button
                  onClick={goToHome}
                  className="flex items-center gap-2 px-6 py-5 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-xl font-medium"
                >
                  <Home className="w-5 h-5" />
                  <span>Return to Journey</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-b from-decimo-lavender/30 to-white">
      <div className="text-center mb-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800">{userData.name}'s Journey</h2>
        <p className="text-gray-600 mt-1">What path will you choose today?</p>
        <div className="text-sm font-medium text-violet-600 mt-2">Day {currentDay} of 7</div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {availableChoices.map((choice) => (
              <div key={choice.id} className="animate-scale-in">
                <ChoiceCard 
                  choice={choice}
                  isSelected={false}
                  onSelect={() => {
                    console.log("Clicked choice card:", choice.id);
                    handleChoiceSelect(choice.id);
                  }}
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
