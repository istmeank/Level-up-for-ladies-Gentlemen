import React from "react";
import CosmicBackground from "@/components/perception/CosmicBackground";
import PerceptionHeader from "@/components/perception/PerceptionHeader";
import MultiStepForm from "@/components/perception/MultiStepForm";

const PerceptionForm: React.FC = () => {
  return (
    <CosmicBackground className="min-h-[100svh] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <PerceptionHeader />
        <div className="mt-6">
          <MultiStepForm />
        </div>
      </div>
    </CosmicBackground>
  );
};

export default PerceptionForm;


