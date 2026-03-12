import { createContext } from "react";

type StepContextType = [number, (step: number) => void];

const StepContext = createContext<StepContextType | null>(null);

export default StepContext;
