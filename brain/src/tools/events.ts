import type { VCBrainState, WorkflowEvent, WorkflowStage } from "../state.js";

export interface EmitEventInput {
  stage: WorkflowStage;
  eventType: string;
  nodeIds?: string[];
  payload?: unknown;
  /** Override timestamp for deterministic tests. */
  timestamp?: number;
}

/**
 * `emit_graph_event` — append a structured visualization event to state.
 * Used by the orchestrator to drive the 3D graph (highlight, pulse, fly-to).
 */
export function emitGraphEvent(state: VCBrainState, input: EmitEventInput): WorkflowEvent {
  const event: WorkflowEvent = {
    id: `evt_${state.events.length + 1}`,
    stage: input.stage,
    eventType: input.eventType,
    timestamp: input.timestamp ?? Date.now(),
    nodeIds: input.nodeIds,
    payload: input.payload ?? {},
  };
  state.events.push(event);
  return event;
}
