import createPortal from './createPortal';
import { ELEMENT_NODE } from './HTMLNodeType';
import DOMRenderer from './DOMRenderer';
import legacyRenderSubtreeIntoContainer from './legacyRenderSubtreeIntoContainer';
const ReactDOM: Object = {
  createPortal,

  findDOMNode(
    componentOrElement: Element | ? React$Component < any, any >
  ): null | Element | Text {
    if (componentOrElement == null) {
      return null;
    }
    // 如果是dom元素直接返回
    if ((componentOrElement: any).nodeType === ELEMENT_NODE) {
      return (componentOrElement: any);
    }

    return DOMRenderer.findHostInstance(componentOrElement);
  },
  // hydrate混合
  hydrate(element: React$Node, container: DOMContainer, callback: ? Function) {
    // TODO: throw or warn if we couldn't hydrate?
    return legacyRenderSubtreeIntoContainer(
      null,
      element,
      container,
      true,
      callback,
    );
  },

  // 构建
  render(
    element: React$Element < any >,
    container: DOMContainer,
    callback: ? Function,
  ) {
    return legacyRenderSubtreeIntoContainer(
      null,
      element,
      container,
      false,
      callback,
    );
  },

  unstable_renderSubtreeIntoContainer(
    parentComponent: React$Component < any, any > ,
    element: React$Element < any > ,
    containerNode: DOMContainer,
    callback: ? Function,
  ) {
    return legacyRenderSubtreeIntoContainer(
      parentComponent,
      element,
      containerNode,
      false,
      callback,
    );
  },

  unmountComponentAtNode(container: DOMContainer) {
    if (container._reactRootContainer) {
      // Unmount should not be batched.
      DOMRenderer.unbatchedUpdates(() => {
        legacyRenderSubtreeIntoContainer(null, null, container, false, () => {
          container._reactRootContainer = null;
        });
      });
      // If you call unmountComponentAtNode twice in quick succession, you'll
      // get `true` twice. That's probably fine?
      return true;
    }
    return false;
  },

  // Temporary alias since we already shipped React 16 RC with it.
  // TODO: remove in React 17.
  unstable_createPortal(...args) {
    return createPortal(...args);
  },

  unstable_batchedUpdates: DOMRenderer.batchedUpdates,

  unstable_deferredUpdates: DOMRenderer.deferredUpdates,

  flushSync: DOMRenderer.flushSync,

  unstable_flushControlled: DOMRenderer.flushControlled,
};

type RootOptions = {
  hydrate ? : boolean,
};

ReactDOM.unstable_createRoot = function createRoot(
  container: DOMContainer,
  options ? : RootOptions,
): ReactRoot {
  const hydrate = options != null && options.hydrate === true;
  return new ReactRoot(container, true, hydrate);
};


export default ReactDOM;
