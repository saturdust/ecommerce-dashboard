import type { FC } from "react";
import { createContext, useContext, useMemo } from "react";

import useEmitter from "../hooks/useEmitter";
import { AuxContextProps, AuxContextType } from "../model/context";

/**
 * @constant AuxContext
 */
const AuxContext = createContext<AuxContextType>(undefined);

/**
 * @function AuxProvider
 * @param {AuxContextprops} props
 */
const AuxProvider: FC<AuxContextProps> = (props) => {
  const { children, emitter: mitt } = props;

  const emitter = useEmitter(mitt);

  const value: AuxContextType = useMemo(() => {
    return { emitter };
  }, [emitter]);

  return <AuxContext.Provider value={value}>{children}</AuxContext.Provider>;
};

/**
 * @function useAuxContext
 */
const useAuxContext = () => {
  const context = useContext<AuxContextType>(AuxContext);

  if (context === undefined) {
    throw new Error("useAuxContext must be used within a AuxContext Provider");
  }

  return context;
};

export default AuxProvider;

export { AuxContext, AuxProvider, useAuxContext };
