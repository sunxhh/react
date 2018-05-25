import getContextForSubtree from './getContextForSubtree';
import scheduleRootUpdate from './scheduleRootUpdate';

function updateContainerAtExpirationTime(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ? React$Component,
  currentTime : ExpirationTime,
  expirationTime: ExpirationTime,
  callback: ? Function,
) {
  // TODO: If this is a nested container, this won't be the root.
  const current = container.current;

  const context = getContextForSubtree(parentComponent);
  if (container.context === null) {
    container.context = context;
  } else {
    container.pendingContext = context;
  }

  return scheduleRootUpdate(
    current,
    element,
    currentTime,
    expirationTime,
    callback,
  );
}

export default updateContainerAtExpirationTime;
