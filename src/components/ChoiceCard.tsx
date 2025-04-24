
import React from "react";
import { Check } from "lucide-react";
import type { Choice } from "@/contexts/DecimoContext";

interface ChoiceCardProps {
  choice: Choice;
  isSelected: boolean;
  onSelect: () => void;
  className?: string;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({ 
  choice, 
  isSelected, 
  onSelect,
  className = ""
}) => {
  return (
    <div 
      className={`choice-card relative overflow-hidden rounded-2xl card-shadow cursor-pointer
        ${isSelected ? "choice-card-selected" : "hover:scale-[1.02]"} 
        ${className}`}
      onClick={() => onSelect()}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 z-10" />
      
      <img 
        src={choice.image} 
        alt={choice.title}
        className="w-full h-full object-cover"
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
        <h3 className="text-2xl font-bold mb-1">{choice.title}</h3>
        <p className="text-sm text-gray-100">{choice.description}</p>
      </div>
      
      {!isSelected && (
        <div 
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 
            flex items-center justify-center shadow-md z-20 
            transform transition-transform hover:scale-110"
        >
          <Check className="w-5 h-5 text-violet-600" />
        </div>
      )}
    </div>
  );
};

export default ChoiceCard;
