
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StoryViewProps {
  story: string;
  userName: string;
}

const StoryView: React.FC<StoryViewProps> = ({ story, userName }) => {
  // Replace name placeholders with the user's name
  const personalizedStory = story.replace(/\{name\}/g, userName);
  
  // Split the story into paragraphs for better display
  const paragraphs = personalizedStory.split(/\n+/);

  return (
    <Card className="bg-decimo-gray/60 backdrop-blur-sm border-none shadow-sm">
      <CardContent className="pt-6">
        <div className="prose prose-violet max-w-none">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-800 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryView;
