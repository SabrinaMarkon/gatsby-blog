---
title: 'React Hooks: useLayoutEffect()'
tags: ["javascript", "react"]
published: true
date: '2020-07-08'
---
In class-based React apps, we used lifecycle methods instead of hooks. For example, we could control the program using componentDidMount or componentDidUpdate. People familiar with coding classes tend to look for hooks that can substitute for lifecycle methods, and for componentDidMount and componentDidUpdate, hope that the useEffect hook will realize this goal. The useEffect hook, however, works differently than componentDidMount/componentDidUpdate in an important way.
#  
Although useEffect, like componentDidMount or componentDidUpdate, also runs after a state change, its code is non-blocking, so other code coming after it will continue to run rather than wait for the useEffect code to complete. When someone is accustomed to lifecycle methods like componentDidMount that block, they might be surprised by useEffect's asynchronous behavior and when state values are updated. React hooks make the developer think about their code asyncronously, which results in better, more efficient code.
#  
Although most effects can run asynchronously, there are some cases that synchronous code might be needed, such as for measuring layout, scroll position, or element styles. In cases like these where we need the effect to update the DOM before it is painted, we have the useLayoutEffect React hook to use in place of useEffect. This behaves more like componentDidMount or componentDidUpdate.
#  
The useLayoutEffect hook runs after the DOM is updated with any new mutations, but before the browser has repainted them, so the user sees the latest view. In contrast, since the useEffect hook is asynchronous, the browser may have already been repainted before the effect code has completed, and the user will likely see a view that is one state behind.
#  
The API for useLayoutEffect is the same as useEffect, but useLayoutEffect runs synchronously, preventing other code from running until the effects have finished executing.
#  
The timing of what happens with useEffect is like this, because it is asynchronous:
#  
The user interacts with the app in any way that changes state, such as clicking a button or typing in a form.
A re-render is triggered for the React component.
The screen is repainted.
Only now does useEffect run! This means that any state values that are updated in useEffect do not instantly appear on the screen.
Consider the below code using the useEffect hook. When the number on the screen is clicked, it changes. Notice, however, that there is a brief flicker or flash of the text before it changes. That is, if you run the code and click the number on the screen, all digits are updated even if they are the same. You can see the change from a 5 into another 5, for instance. This is because useEffect runs after the render is painted to the browser window (see the steps above!).
#  
```
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Flickers = () => {
  const [num, setNum] = useState(0);

  useEffect(() => {
    if (num === 0) {
      setNum(Math.random());
    }
  }, [num]);

  return (
    <div
      onClick={() => setNum(0)}
      style={{ fontSize: "4em", color: "seagreen" }}
    >
      {num}
    </div>
  );
};

ReactDOM.render(, document.querySelector("#root"));

// (Ceddia, 2019)
```
#  
#           
In contrast, the block of code below is the same as the above, but uses the useLayoutEffect hook instead of useEffect. When you click the number on the screen with this code, there is no flicker or flash of the whole thing changing, because only the digits that are different change. The useLayoutEffect hook, again, is synchronous, so follows similar steps to the useEffect hook, except for an important difference. Steps 3 and 4 here are essentially reversed here:
#  
The user interacts with the app in any way that changes state, such as clicking a button or typing in a form.
A re-render is triggered for the React component.
useEffect runs now! React can't continue on to repaint the screen or anything else until the code in useLayoutEffect has completed, so state updates inside useLayoutEffect will be applied when the scrren is repainted.
The screen is repainted.
#  
```
import React, { useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom";

const NoFlicker = () => {
  const [num, setNum] = useState(0);

  useLayoutEffect(() => {
    if (num === 0) {
      setNum(Math.random());
    }
  }, [num]);

  return (
    <div
      onClick={() => setNum(0)}
      style={{ fontSize: "4em", color: "coral" }}
    >
      {num}
    </div>
  );
};

ReactDOM.render(, document.querySelector("#root"));

// (Ceddia, 2019)
```
#  
#               
Importantly, 99% of the time we should be able to use the useEffect hook, rather than blocking the code with useLayoutEffect. Because useLayoutEffect is synchronous, if the code it needs to run is slow, it can cause performance problems. The browser in this case would not be able to render the view for the user until the effect code has completed, and with slow code, this would be visible to the user.
