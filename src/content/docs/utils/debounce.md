---
title: Debounce
description: A guide to using the debounce util.
---

`debounce` is a utility function that delays the execution of a callback until a specified amount of time has passed since the last time it was invoked. It's useful for optimizing performance, especially in events like input changes, window resizing, or scrolling.

```js
export function debounce(callback, wait) {
  let timeoutId = null;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}
```

## Params

| Name       | Type     | Description                                              |
| ---------- | -------- | -------------------------------------------------------- |
| `callback` | Function | The function to be executed after the debounce time.     |
| `wait`     | Number   | The number of milliseconds to delay after the last call. |

## Returns

**Function**: A debounced version of the original function.

## Examples

```js
const log = debounce((msg) => {
  console.log(msg);
}, 500);

// Simulate rapid calls
log('first call');
log('second call');
log('third call');

// Only "third call" will be logged after 500ms
```
