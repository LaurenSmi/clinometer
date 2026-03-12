import { createContext } from "react";

const UnitContext = createContext<
  [string, React.Dispatch<React.SetStateAction<"m" | "ft">>] | null
>(null);

export default UnitContext;
