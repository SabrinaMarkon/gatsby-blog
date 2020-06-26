---
title: 'React Hooks: useState()'
tags: ["javascript", "react"]
published: true
date: '2020-06-23'
---
React functional components use the **useState** React hook to keep track of "stateful" values, or variable value changes that we need to keep track of in our application.
In the code below, you can see a typical example of a useState hook.
#  
```
let initialState = 0;
const [count, setCount] = useState(initialState);
```
#  
The useState hook is passed an optional initialState parameter, and is assigned to a destructured array that tells us the stateful variable's name our program can use, along with a "set" function that our program can use to update that variable's value.
#  
1. **let initialState = 0** is the optional starting value of the count variable.
1. **count** is the name of the stateful value our program needs to read and update.
1. **setCount** is the name of the declarative function we will call that will automatically update the value of count for us to whatever we tell it to.
#  
So, in our program, if want to increment count whenever we click a button, the onClick function would call setCount(newCount) where newCount = ++count;
Here is an example of a functional component using useState to keep track of a counter:
#  

```
/* When the "Click Me" button is clicked, the onClick event fires
 * and the incrementCount function is called that uses setCount to 
 * increment the count variable. */

import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const incrementCount = () => setCount(count + 1);

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={incrementCount}>Click Me</button>
    </>
  );
}

export default Counter;
```
#  
So for each stateful variable your program needs, the **generalized** format to set up the useState hook is:
#  
```
const [state, setState] = useState(initialState);
```
