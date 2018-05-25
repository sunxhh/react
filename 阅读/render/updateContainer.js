import updateContainerAtExpirationTime from './updateContainerAtExpirationTime';

function updateContainer(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ? React$Component < any, any > ,
  callback : ? Function,
): ExpirationTime {
  // const current = container.current;
  const currentTime = 123;
  const expirationTime = 123;
  // const currentTime = recalculateCurrentTime();
  // const expirationTime = computeExpirationForFiber(current);
  return updateContainerAtExpirationTime(
    element,
    container,
    parentComponent,
    currentTime,
    expirationTime,
    callback,
  );
}
export default updateContainer;
