import type { Emitter } from "@/helpers/emitter";

export type AuxEmiter = Emitter<AuxEventType>;

export interface AuxEventType {
  "@search": string;
  "@filter/select-category": string;
}
