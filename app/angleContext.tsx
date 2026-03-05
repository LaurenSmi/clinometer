import { createContext } from "react";
type AngleState = {
  angleToTop: number;
  angleToBottom: number;
};

const AngleContext = createContext<
  [AngleState, React.Dispatch<React.SetStateAction<AngleState>>] | null
>(null);

export default AngleContext;
