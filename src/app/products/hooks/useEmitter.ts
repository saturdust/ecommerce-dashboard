import { useRef } from "react";

import mitt from "@/helpers/emitter";
import type { AuxEmiter, AuxEventType } from "../model/events";

/**
 * @function useEmitter
 * @param {AuxEmiter} emitter
 */
const useEmitter = (emitter?: AuxEmiter) => {
  const _emitter = useRef(emitter ?? mitt<AuxEventType>());

  return _emitter.current;
};

export default useEmitter;
