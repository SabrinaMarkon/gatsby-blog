---
title: 'React Hooks: useImperativeHandle()'
tags: ["javascript", "react"]
published: true
date: '2020-07-07'
---
While the **useImperativeHandle** hook is not used often, it is available if we run across a situation where a child component's ref needs to be passed **to its parent component** to use. For example, a parent component may need to control focusing on an input that lives in a child component, or to control scrolling in a child component. The useImperativeHandle hook needs to be used in combination with **forwardRef**. In fact, useImperativeHandle behaves much like the **useRef** hook, in that it allows you to interact with a particular DOM element directly.
#  
Unlike useRef, however, which returns the **instance element** of the DOM node, useImperativeHandle allows you to control **what value** is returned, rather than simply the instance variable itself. Moreover, it allows us to define new functions to replace native functions, such as focus() or blur().
#  
```
useImperativeHandle(ref, createHandle, [deps]);
```
#  
#  
The React documentation provides the below code as an example, which clearly demonstrates how useImperative allows you to change the behavior of focus() to use your own side-effects instead of the native browser focus(). Any parent component that has FancyInput below as its child, like <FancyInput ref={inputRef} /> could call FancyInput's inputRef.current.focus().
#  
```
import React, { useRef, useImperativeHandle, forwardRef } from 'react';
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);

// (ReactJS.org, n.d.)
```
#  
