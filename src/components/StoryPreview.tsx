
import React, { useState } from "react";
import { useDecimo } from "@/contexts/DecimoContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const StoryPreview: React.FC = () => {
  const { userData, currentDay, viewStory } = useDecimo();
  const [expanded, setExpanded] = useState(false);
  
  // Get the most recent choice ID from user data
  const latestChoiceId = userData.choices.length > 0 
    ? userData.choices[userData.choices.length - 1] 
    : null;
  
  if (!latestChoiceId) return null;
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="bg-decimo-peach/20 p-4">
        <CardTitle className="text-lg">Today's Story Chapter</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {expanded ? (
          <Button 
            onClick={() => viewStory(latestChoiceId)}
            className="w-full bg-violet-100 hover:bg-violet-200 text-violet-800"
          >
            Continue Reading
          </Button>
        ) : (
          <Button 
            onClick={() => setExpanded(true)}
            variant="outline" 
            className="w-full text-violet-700 border-violet-200"
          >
            View Today's Chapter
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default StoryPreview;
