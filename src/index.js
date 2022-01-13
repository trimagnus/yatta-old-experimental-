import './main.css';

const app = document.getElementById('content');

let eventController = (function() {
  let _listeners = {};

  let addListener = (actionName, callBack) => {
    _listeners[actionName] = callBack;
  };

  let handleClick = (event) => {
    let listeners = _listeners;
    let action = event.target.getAttribute('data-action');

    if (_listeners[action]) {
      _listeners[action](event);
    }
  };

  return {
    addListener,
    handleClick
  };
})();

document.documentElement.addEventListener('click', eventController.handleClick, false);