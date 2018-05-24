import ReactRoot from './reactRoot';

function legacyCreateRootFromDOMContainer(
  container: DOMContainer,
  forceHydrate: boolean,
): Root {
  // hydrate 描述的是 ReactDOM 复用 ReactDOMServer 服务端渲染的内容时尽可能保留结构，并补充事件绑定等
  // Client 特有内容的过程。
  // const shouldHydrate =
  //   forceHydrate || shouldHydrateDueToLegacyHeuristic(container);
  const shouldHydrate = false;
  // First clear any existing content.
  // 清空子元素
  if (!shouldHydrate) {
    let rootSibling;
    while ((rootSibling = container.lastChild)) {
      container.removeChild(rootSibling);
    }
  }
  // Legacy roots are not async by default.
  // 默认情况下，遗留根不是异步的。
  const isAsync = false;
  return new ReactRoot(container, isAsync, shouldHydrate);
}

export default legacyCreateRootFromDOMContainer;
