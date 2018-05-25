export const UpdateState = 0;
export function createUpdate(expirationTime: ExpirationTime): Update < * > {
  return {
    expirationTime: expirationTime,

    tag: UpdateState,
    payload: null,
    callback: null,

    next: null,
    nextEffect: null,
  };
}
