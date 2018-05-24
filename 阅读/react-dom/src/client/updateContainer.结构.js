ReactRoot.prototype.render = function(
  children: ReactNodeList,
  callback: ? () => mixed,
): Work {
  const root = this._internalRoot;
  const work = new ReactWork();
  callback = callback === undefined ? null : callback;
  if (__DEV__) {
    warnOnInvalidCallback(callback, 'render');
  }
  if (callback !== null) {
    work.then(callback);
  }
  DOMRenderer.updateContainer(children, root, null, work._onCommit);
  return work;
};

function updateContainer(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ? React$Component < any, any > ,
  callback : ? Function,
): ExpirationTime {
  const current = container.current;
  const currentTime = recalculateCurrentTime();
  const expirationTime = computeExpirationForFiber(current);
  return updateContainerAtExpirationTime(
    element,
    container,
    parentComponent,
    currentTime,
    expirationTime,
    callback,
  );
}

function updateContainerAtExpirationTime(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ? React$Component < any, any > ,
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

function scheduleRootUpdate(
  current: Fiber,
  element: ReactNodeList,
  currentTime: ExpirationTime,
  expirationTime: ExpirationTime,
  callback: ? Function,
) {

  const update = createUpdate(expirationTime);
  // Caution: React DevTools currently depends on this property
  // being called "element".
  update.payload = { element };

  callback = callback === undefined ? null : callback;
  if (callback !== null) {
    update.callback = callback;
  }
  enqueueUpdate(current, update, expirationTime);

  scheduleWork(current, expirationTime);
  return expirationTime;
}
