---
title: 'React Hooks: useCallback()'
tags: ["javascript", "react"]
published: true
date: '2020-07-04'
---
To understand the **useCallback** React hook, it helps to first understand the problem it is intended to solve.
#  
When we have a child component that needs to re-render often, **all** its functions will also reinstantiate every time, even those that handle a different state variable than the one that changed. Although this might not be a big deal in a smaller component, it can cause a performance hit in a more complex component that has multiple state values. 
#  
If one state value is changed, it should only cause functions that **access it** to be reinstantiated again, and leave functions that do not alone. This is not the case by default, however!
#  
For example, in the code below, updating the value of the "count1" state will cause a re-render that recreates **all** functions in the component, including **both** functions that don't even concern "count1". The incrementCount2 and decrementCount2 functions are for "count2" only, but are **recreated anyway** when count1 is updated.
#  
```
import React, { useState } from "react";

const Counter = () => {
const [count1, setCount1] = useState(0);
const [count2, setCount2] = useState(0);

// count1 functions. When count1 is updated, the component
// re-renders and has to recreate all the functions, even the two
// that do not even use count1.
const incrementCount1 = () => {
    setCount1(count1 + 1);
};
const decrementCount1 = () => {
    setCount1(count1 - 1);
};

// count2 functions. When count2 is updated, the component
// re-renders and has to recreate all the functions, even the two
// that do not even use count2.
const incrementCount2 = () => {
    setCount2(count2 + 1);
};
const decrementCount2 = () => {
    setCount2(count2 - 1);
};

return (
    <>
    Count1: {count1} <br />
    Count2: {count2} <br />
    <button onClick={incrementCount1}>Increment count1</button>
    <button onClick={decrementCount1}>Decrement count1</button>
    <button onClick={incrementCount2}>Increment count2</button>
    <button onClick={decrementCount2}>Decrement count2</button>
    </>
);
};

export default Counter;                
```
#  
#             
To solve the problem, we can make it so that we don't recreate functions in a re-render that do not concern the state value that was updated. That is, we can use the useCallback hook to **memoize** a function's callback so it only changes if one of its own corresponding inputs changes (Noring, n.d.).
#  
All we need to do is wrap each of the functions with a useCallback that has an array for its second parameter that includes any state values that should cause the function to be recreated when the component re-renders.
#  
```
import React, { useState } from "react";

const Counter = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // count1 functions. When count1 is updated, the component
  // re-renders and has to recreate all the functions, even the two
  // that do not even use count1.
  const incrementCount1 = useCallback(() => {
    setCount1(count1 + 1);
  }, [count1]);

  const decrementCount1 = useCallback(() => {
    setCount1(count1 - 1);
  }, [count1]);

  // count2 functions. When count2 is updated, the component
  // re-renders and has to recreate all the functions, even the two
  // that do not even use count2.
  const incrementCount2 = useCallback(() => {
    setCount2(count2 + 1);
  }, [count2]);

  const decrementCount2 = useCallback(() => {
    setCount2(count2 - 1);
  }, [count2]);

  return (
    <>
      Count1: {count1} <br />
      Count2: {count2} <br />
      <button onClick={incrementCount1}>Increment count1</button>
      <button onClick={decrementCount1}>Decrement count1</button>
      <button onClick={incrementCount2}>Increment count2</button>
      <button onClick={decrementCount2}>Decrement count2</button>
    </>
  );
};

export default Counter;
```
#  
#                
Now, with each call wrapped in a useCallback hook, the functions will only be reinstantiated when the state values specified in the second parameter array are changed, thus optimizing performance!
