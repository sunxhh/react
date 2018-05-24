import { ReactNodeList } from './ReactTypes';
import { ReactPortal } from './ReactPortal';
type DOMContainer = |
  (Element & {
    _reactRootContainer: ? Root,
  }) |
  (Document & {
    _reactRootContainer: ? Root,
  });

function createPortal(
  children: ReactNodeList,
  container: DOMContainer,
  key: ? string = null,
) {
  // TODO: pass ReactDOM portal implementation as third argument
  return ReactPortal.createPortal(children, container, null, key);
}
export default createPortal;
