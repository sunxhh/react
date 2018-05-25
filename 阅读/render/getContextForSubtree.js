function getContextForSubtree(
  parentComponent: ? React$Component < any, any > ,
): Object {
  if (!parentComponent) {
    return {};
  }

  const fiber = ReactInstanceMap.get(parentComponent);
  const parentContext = findCurrentUnmaskedContext(fiber);
  return isContextProvider(fiber) ?
    processChildContext(fiber, parentContext) :
    parentContext;
}

export default getContextForSubtree;
