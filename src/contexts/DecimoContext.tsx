
import React, { createContext, useContext, useEffect, useState } from "react";

// Types for our context
export type Choice = {
  id: number;
  day: number;
  title: string;
  description: string;
  image: string;
  tasks: Task[];
  traitPoints?: {
    [key: string]: number;
  };
};

export type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type UserData = {
  name: string;
  dayProgress: number;
  choices: number[];
  taskCompletions: {
    [taskId: number]: boolean;
  };
  traitPoints: {
    [trait: string]: number;
  };
};

type DecimoContextType = {
  userData: UserData;
  currentDay: number;
  todayChoices: Choice[];
  selectedChoice: Choice | null;
  setName: (name: string) => void;
  selectChoice: (choiceId: number) => void;
  completeTask: (taskId: number) => void;
  goToHome: () => void;
};

const mockChoicesData: Choice[] = [
  {
    id: 1,
    day: 1,
    title: "Adventure",
    description: "Embrace new experiences and step out of your comfort zone",
    image: "https://images.unsplash.com/photo-1682687982107-14492010e05e?q=80&w=1000",
    tasks: [
      { id: 101, text: "Try something new today that challenges you", completed: false },
      { id: 102, text: "Document your experience in a journal entry", completed: false }
    ],
    traitPoints: { courage: 2, openness: 2 }
  },
  {
    id: 2,
    day: 1,
    title: "Reflection",
    description: "Take time to look inward and understand yourself better",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=1000",
    tasks: [
      { id: 103, text: "Meditate for 10 minutes in a quiet space", completed: false },
      { id: 104, text: "Write down three insights about yourself", completed: false }
    ],
    traitPoints: { wisdom: 2, patience: 2 }
  },
  {
    id: 3,
    day: 2,
    title: "Connection",
    description: "Strengthen your bonds with others through meaningful interaction",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=1000",
    tasks: [
      { id: 105, text: "Reach out to someone you haven't spoken to in a while", completed: false },
      { id: 106, text: "Have a deep conversation beyond small talk", completed: false }
    ],
    traitPoints: { empathy: 2, kindness: 2 }
  },
  {
    id: 4,
    day: 2,
    title: "Creation",
    description: "Express yourself through a creative outlet",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=1000",
    tasks: [
      { id: 107, text: "Spend 30 minutes on a creative project", completed: false },
      { id: 108, text: "Share your creation with at least one person", completed: false }
    ],
    traitPoints: { creativity: 2, expression: 2 }
  },
];

// Initial user data
const initialUserData: UserData = {
  name: "",
  dayProgress: 0,
  choices: [],
  taskCompletions: {},
  traitPoints: {
    courage: 0,
    openness: 0,
    wisdom: 0,
    patience: 0,
    empathy: 0,
    kindness: 0,
    creativity: 0,
    expression: 0
  }
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

  // Mark a task as completed
  const completeTask = (taskId: number) => {
    setUserData(prev => ({
      ...prev,
      taskCompletions: {
        ...prev.taskCompletions,
        [taskId]: true
      }
    }));

    // Update the selected choice tasks if viewing that choice
    if (selectedChoice) {
      const updatedTasks = selectedChoice.tasks.map(task => 
        task.id === taskId ? { ...task, completed: true } : task
      );
      setSelectedChoice({
        ...selectedChoice,
        tasks: updatedTasks
      });
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
    completeTask,
    goToHome
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
