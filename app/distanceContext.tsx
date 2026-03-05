import { createContext } from "react";

const DistanceContext = createContext<
  [number, React.Dispatch<React.SetStateAction<number>>] | null
>(null);

export default DistanceContext;
