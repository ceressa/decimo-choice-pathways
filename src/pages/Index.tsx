
import React, { useState, useEffect } from "react";
import { DecimoProvider, useDecimo } from "@/contexts/DecimoContext";
import Welcome from "@/components/Welcome";
import Home from "@/components/Home";

const DecimoApp: React.FC = () => {
  const { userData } = useDecimo();
  const hasName = userData.name.trim() !== '';
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-decimo-lavender/30 to-white">
      {!hasName ? <Welcome /> : <Home />}
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <DecimoProvider>
      <DecimoApp />
    </DecimoProvider>
  );
};

export default Index;
