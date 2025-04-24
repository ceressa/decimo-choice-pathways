
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDecimo } from "@/contexts/DecimoContext";

const Welcome: React.FC = () => {
  const { setName } = useDecimo();
  const [nameInput, setNameInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleStartJourney = () => {
    if (nameInput.trim()) {
      setName(nameInput);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-b from-decimo-lavender/30 to-white">
      <div className="w-full max-w-md space-y-10 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-800">Welcome to Decimo</h1>
          <p className="text-slate-600">Your journey of self-reflection and growth begins here</p>
        </div>

        {!isSubmitted ? (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                What shall we call you?
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg border-gray-200 focus:ring-2 focus:ring-purple-300 transition-all"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
              <p className="text-xs text-slate-500">You won't be able to change this later</p>
            </div>

            <Button 
              onClick={handleStartJourney}
              disabled={!nameInput.trim()}
              className="w-full py-6 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              Start My Journey
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="p-8 rounded-2xl bg-white shadow-lg">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Hello, {nameInput}!
              </h2>
              <p className="text-slate-600">
                Every day, you'll face a choice that will shape your path. Each decision matters.
              </p>
            </div>
            <Button 
              className="mt-6 px-8 py-6 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              Begin Today's Choice
            </Button>
          </div>
        )}
      </div>
      
      <div className="mt-16 text-center text-sm text-gray-500">
        <p>Take a moment each day to reflect on your choices</p>
      </div>
    </div>
  );
};

export default Welcome;
