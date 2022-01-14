export const eventController = (function() {
  const _listeners = {};

  const addListener = (actionName, callBack) => {
    _listeners[actionName] = callBack;
  };

  const removeListener = (actionName) => {
    if(_listeners[actionName]) {
      delete _listeners[actionName];
    }
  };

  const handleClick = (event) => {
    const action = event.target.getAttribute('data-action');
    if (_listeners[action]) {
      _listeners[action](event);
    }
  };

  return {
    addListener,
    removeListener,
    handleClick,
  };
})();