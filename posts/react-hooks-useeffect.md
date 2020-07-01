---
title: 'React Hooks: useEffect()'
tags: ["javascript", "react"]
published: true
date: '2020-06-30'
---
When we update state, many apps also need to execute side-effects, such as making API calls, communicating with a database, or updating local storage. Since state causes re-renders, we can use the **useEffect** hook to run our side-effect every time I render or re-render occurs, or just when a certain state value is updated.
#  
useEffect has a second argument, which when left out, defaults to mean that the side-effect code should execute every time any state value is changed. When this parameter is provided to useEffect, though, we can change when it runs.
#  
1. Leave out the second argument so code in useEffect runs on mount and re-render of the component:
```  
useEffect(() => { /* side-effect code. */ });
```
#  
#  
1. Set the second parameter as an empty array, which means the useEffect code runs **only** when the component is first mounted, but not when state is updated.
```
useEffect(() => { /* side-effect code. */ }, []);
```
#  
#  
1. Set the second parameter as an array containing a list of one or more state variables. When any of these is updated, execute the useEffect code. Other state variables do not cause the useEffect code to be invoked.
``` 
useEffect(() => { /* side-effect code. */ }, [count, color, loggedIn]);
```

#  
In a component, we can use useEffect as many times as we need! Our code ends up clean and readable, replacing the two lifecycle methods that are required by class components to accomplish the same things (componentDidMount and componentDidUpdate).
#  
Below, the code contained within the useEffect block executes every time the component is rendered. That is, when it first mounts along with every state update that causes a re-render.
#  
```
import React, { useState, useEffect } from 'react';
export default function useEffectExample() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState('pink');
 
  function onCountClick() {
    setCount(count + 1);
  }

  function onColorClick() {
    setColor('blue');
  }
 
  useEffect(() => {
    // Executes every time state is changed. 
    // Any state value.
    // i.e. a fetch or axios request.
  });
 
   useEffect(() => {
    // Executes only 
    // when the color state changes.
    // i.e. some other side-effect.
  }, [color]);

   useEffect(() => {
    // Executes only 
    // when the component mounts for the first time.
    // i.e. some other side-effect.
  }, []);

  return (
    <>
      <p>{count}</p>
      <button type="button" onClick={onCountClick}>
        Increment Counter
      </button>
      <p>{color}</p>
      <button type="button" onClick={onColorClick}>
        Change Color
      </button>
    </>
  );
}
```
#           
Before another effect runs after a re-render, React will clean up the previous render's effects. Some subscriptions, however, may need useEffect to return a cleanup function (anonymous or named is fine) that automatically executes and unsubscribes.
#  
The useEffect hook is also wonderful because it does not block the browser when its side-effects are being run, which makes the app feel fast and responsive!
