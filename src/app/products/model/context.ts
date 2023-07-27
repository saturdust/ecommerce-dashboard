import type { ReactNode } from "react";
import { AuxEmiter } from "./events";

export type AuxContextProps = {
  children: ReactNode;
  emitter?: AuxEmiter;
};
export type AuxContextType =
  | {
      emitter: AuxEmiter;
    }
  | undefined;
