
export interface Reason{
  reason:string;
}

export function createReason(reason: string): Reason {
  return {reason};
}
