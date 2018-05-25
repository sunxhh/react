function scheduleWork(fiber: Fiber, expirationTime: ExpirationTime) {
  return scheduleWorkImpl(fiber, expirationTime, false);
}

function scheduleWorkImpl(
  fiber: Fiber,
  expirationTime: ExpirationTime,
  isErrorRecovery: boolean,
) {
  recordScheduleUpdate();

  let node = fiber;
  while (node !== null) {
    // Walk the parent path to the root and update each node's
    // expiration time.
    if (
      node.expirationTime === NoWork ||
      node.expirationTime > expirationTime
    ) {
      node.expirationTime = expirationTime;
    }
    if (node.alternate !== null) {
      if (
        node.alternate.expirationTime === NoWork ||
        node.alternate.expirationTime > expirationTime
      ) {
        node.alternate.expirationTime = expirationTime;
      }
    }
    if (node.return === null) {
      if (node.tag === HostRoot) {
        const root: FiberRoot = (node.stateNode: any);
        if (!isWorking &&
          nextRenderExpirationTime !== NoWork &&
          expirationTime < nextRenderExpirationTime
        ) {
          // This is an interruption. (Used for performance tracking.)
          interruptedBy = fiber;
          resetStack();
        }
        if (
          // If we're in the render phase, we don't need to schedule this root
          // for an update, because we'll do it before we exit...
          !isWorking ||
          isCommitting ||
          // ...unless this is a different root than the one we're rendering.
          nextRoot !== root
        ) {
          // Add this root to the root schedule.
          requestWork(root, expirationTime);
        }
        if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {

        }
      } else {

        return;
      }
    }
    node = node.return;
  }
}
export default scheduleWork;
