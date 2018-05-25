import createUpdate from './createUpdate';
import enqueueUpdate from './enqueueUpdate';
import scheduleWork from './scheduleWork';

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

export default scheduleRootUpdate;
