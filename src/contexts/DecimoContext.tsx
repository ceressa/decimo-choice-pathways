
import React, { createContext, useContext, useEffect, useState } from "react";

// Types for our context
export type Choice = {
  id: number;
  day: number;
  title: string;
  description: string;
  image: string;
  storyText: string;
  traitPoints?: {
    [key: string]: number;
  };
};

export type Task = {
  id: string;
  text: string;
  completed: boolean;
};

type UserData = {
  name: string;
  dayProgress: number;
  choices: number[];
  lastViewedDay: number;
  traitPoints: {
    [trait: string]: number;
  };
  taskCompletions: {
    [taskId: string]: boolean;
  };
};

type DecimoContextType = {
  userData: UserData;
  currentDay: number;
  todayChoices: Choice[];
  selectedChoice: Choice | null;
  setName: (name: string) => void;
  selectChoice: (choiceId: number) => void;
  goToHome: () => void;
  viewStory: (choiceId: number) => void;
  completeTask: (taskId: string) => void;
};

// Mock story content - this would come from Firebase in production
const mockChoicesData: Choice[] = [
  {
    id: 1,
    day: 1,
    title: "The Forgotten Path",
    description: "A mysterious trail leads deep into an ancient forest",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=1000",
    storyText: "You step onto the path, leaves crunching beneath your feet. The air grows still as you venture deeper into the woods. Ancient trees tower above, their branches forming a cathedral-like canopy that filters the sunlight into golden shafts. A sense of being watched prickles at the back of your neck, but when you turn, there is only stillness. Something tells you this journey will change everything.",
    traitPoints: { courage: 2, curiosity: 2 }
  },
  {
    id: 2,
    day: 1,
    title: "The Hidden Door",
    description: "A weathered door stands mysteriously in an abandoned wall",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=1000",
    storyText: "The door's worn surface feels warm beneath your fingertips, despite the cool air surrounding it. As you push it open, hinges groaning with age, a corridor of soft light unfolds before you. The air smells of old books and distant spices. You hesitate at the threshold, the world you know behind you, an unknown realm ahead. Taking a deep breath, you step through, the door closing silently behind you.",
    traitPoints: { wisdom: 2, intuition: 2 }
  },
  {
    id: 3,
    day: 2,
    title: "The Whispering Statue",
    description: "A marble figure that seems to speak when no one is listening",
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=1000",
    storyText: "The statue's marble eyes seem to follow you as you approach. In the quiet courtyard, you could swear the stone lips move ever so slightly. When you place your ear close to the cold surface, a whisper emerges—not sound, but thought, flowing directly into your mind. 'Seek the one who walks between worlds,' it says. 'They have been waiting for you.' As you step back, startled, the statue returns to silent stillness, but something has awakened within you.",
    traitPoints: { empathy: 2, perception: 2 }
  },
  {
    id: 4,
    day: 2,
    title: "The Luminescent Cave",
    description: "An underwater cavern that glows with mysterious blue light",
    image: "https://images.unsplash.com/photo-1682687982107-14492010e05e?q=80&w=1000",
    storyText: "Cold water closes around you as you dive deeper, following the faint blue glow. The cave opens suddenly—a vast chamber adorned with crystals that pulse with living light. As you float in the center, time seems suspended. Images flash through your mind: ancient cities, forgotten languages, faces of people you somehow recognize but have never met. When you finally surface, gasping for air, you carry knowledge within you that wasn't there before—secrets that were old when the world was young.",
    traitPoints: { curiosity: 2, bravery: 2 }
  },
];

// Mock tasks data
const mockTasks: Task[] = [
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

// Initial user data
const initialUserData: UserData = {
  name: "",
  dayProgress: 0,
  choices: [],
  lastViewedDay: 0,
  traitPoints: {
    courage: 0,
    curiosity: 0,
    wisdom: 0,
    intuition: 0,
    empathy: 0,
    perception: 0,
    bravery: 0
  },
  taskCompletions: {}
};

// Create the context
const DecimoContext = createContext<DecimoContextType | undefined>(undefined);

export const DecimoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    // Load from localStorage if available
    const savedData = localStorage.getItem("decimoUserData");
    return savedData ? JSON.parse(savedData) : initialUserData;
  });
  
  const [currentDay, setCurrentDay] = useState<number>(1); // This would normally be determined by comparing to start date
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  
  // Get today's choices based on the current day
  const todayChoices = mockChoicesData.filter(choice => choice.day === currentDay);

  useEffect(() => {
    // Save to localStorage whenever userData changes
    localStorage.setItem("decimoUserData", JSON.stringify(userData));
  }, [userData]);

  // Set the user's name
  const setName = (name: string) => {
    setUserData(prev => ({ ...prev, name }));
  };

  // Handle choice selection
  const selectChoice = (choiceId: number) => {
    const choice = mockChoicesData.find(c => c.id === choiceId);
    if (!choice) return;
    
    setSelectedChoice(choice);
    
    // Update user data with the choice and any trait points
    setUserData(prev => ({
      ...prev,
      choices: [...prev.choices, choiceId],
      traitPoints: {
        ...prev.traitPoints,
        ...(choice.traitPoints ? 
          Object.entries(choice.traitPoints).reduce((acc, [trait, points]) => {
            acc[trait] = (prev.traitPoints[trait] || 0) + points;
            return acc;
          }, {} as Record<string, number>) : {})
      }
    }));
  };

  // Complete a task
  const completeTask = (taskId: string) => {
    setUserData(prev => ({
      ...prev,
      taskCompletions: {
        ...prev.taskCompletions,
        [taskId]: true
      }
    }));
  };

  // View a specific story 
  const viewStory = (choiceId: number) => {
    const choice = mockChoicesData.find(c => c.id === choiceId);
    if (!choice) return;
    
    setSelectedChoice(choice);
    
    // Update last viewed day if viewing a past day
    if (choice.day > userData.lastViewedDay) {
      setUserData(prev => ({
        ...prev,
        lastViewedDay: choice.day
      }));
    }
  };

  // Go back to home screen
  const goToHome = () => {
    setSelectedChoice(null);
  };

  const value = {
    userData,
    currentDay,
    todayChoices,
    selectedChoice,
    setName,
    selectChoice,
    viewStory,
    goToHome,
    completeTask
  };

  return (
    <DecimoContext.Provider value={value}>
      {children}
    </DecimoContext.Provider>
  );
};

export const useDecimo = () => {
  const context = useContext(DecimoContext);
  if (context === undefined) {
    throw new Error("useDecimo must be used within a DecimoProvider");
  }
  return context;
};
