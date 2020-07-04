---
title: 'React Hooks: useReducer()'
tags: ["javascript", "react"]
published: true
date: '2020-07-03'
---
To understand the **useReducer** React hook, it helps to first understand what a **reducer** actually is.
#  
First, a reducer is a function that executes code to update global state values depending on an action that is sent (dispatched) to it as a parameter. The name "reducer" comes from the fact that the reducer function receives two values, an action and the current state object. Next, it "reduces" these two values into one that it returns as the new state. To help remember the concept of a reducer, think of the Array reduce method that accepts 1) an accumulator and 2) each item of the array, to reduce an array to a single value. This pattern is what Redux uses to provide access to state variables from React components. Ultimately, a reducer takes in an action and a previous state value, then returns a new state.
#  
There are several important rules for a reducer function to follow:
#  
1. The code inside the reducer function should never mutate its arguments, which are the current state and the dispatched action. To return a new state, a copy of the original should be made first.
#  
1. The reducer code should not be generating side effects, such as database or API calls. It should be a pure function.
#  
1. As well, any functions that the reducer calls within its code should always be pure functions themselves. That is, their output should only depend on their input. For example, Date.now() or Math.random() are not pure functions.
#  
(Copes, 2019)
#  
Using the useReducer hook, our React functional components can also dispatch actions to reducer functions that will run code and update a new copy of state based on the value of the action. An action is essentially just an object with a constant property, "type", that acts as the command sent to the reducer function **optionally** accompanied by an data payload. By default react will pass the state to the dispatcher. but if you want to pass some data the you can add it in the object and pass that object to dispatch.
#  
For example, the below code demonstrates, again, our quintessential counter function. This time, however, it uses a reducer function to update the value of the count state depending on whether the user dispatches an "increment", "decrement", or "reset" action when they choose to click a button. Notice, as well, that the dispatch function expects its parameter to be an **object** type.
#  
    ```
    import React, { useReducer } from 'react';

    const INCREMENT = "increment";
    const DECREMENT = "decrement";
    const RESET = "reset";
    const initialArg = 0;

    const reducer = (state = initialArg, action) => {
    switch(action.type) {
        case INCREMENT:
        return state + 1;
        case DECREMENT:
        return state - 1;
        case RESET:
        return 0;
        default:
        <!-- throw new Error(); -->
        return state;
    }
    }

    export default function Counter() {

    const [count, dispatch] = useReducer(reducer, initialArg)

    return (
        <>
        <div>Counter: {count}</div>
        <button onClick={increment => dispatch({ type: INCREMENT })}>INCREMENT</button>
        <button onClick={decrement => dispatch({ type: DECREMENT })}>DECREMENT</button>
        <button onClick={reset => dispatch({ type: RESET })}>RESET</button>
        </>
        );
    }
    ```
#         
Sometimes, you will see a useReducer hook with **three parameters instead of two**. In addition to the reducer and the initialArg parameters is a third **init** function.
#  
    ```
    const [state, dispatch] = useReducer(reducer, initialArg, init);
    ```
#  
We can create an init function and pass it as a parameter to the useReducer hook in order to create the initial state **lazily**, meaning that we can now calculate the initial state outside the reducer or reset it because of a certain action. We don't need to compute the initial state, that is, until it is needed. Notice in the code below how the reducer calls the init function in response to the "reset" action, which is calculated at that time only.
#  
    ```
    function init(initialCount) {
    return {count: initialCount};
    }

    function reducer(state, action) {
    switch (action.type) {
        case 'increment':
        return {count: state.count + 1};
        case 'decrement':
        return {count: state.count - 1};
        case 'reset':
        return init(action.payload);
        default:
        throw new Error();
    }
    }

    function Counter({initialCount}) {
    const [state, dispatch] = useReducer(reducer, initialCount, init);
    return (
        <>
        Count: {state.count}
        <button onClick={() => dispatch({type: 'reset', payload: initialCount})}>
            Reset
        </button>
        <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        <button onClick={() => dispatch({type: 'increment'})}>+</button>
        </>
    );
    }

    // Code sample from (Reactjs.org, n.d.)
    ```
#          
useReducer is much like useState, except that it has a reducer function as an **intermediary** for when we need to change the state (Ceddia, 2018). Thus, instead of setting state directly, we can execute the dispatch function with any action, and the reducer will execute code based on the action it receives. The reducer will ultimately update the state and return it, and the state change will therefore cause a re-render.
#  
The useReducer hook, then, is often used instead of useState to manage state that is more complex than primitive values, such as nested objects and arrays. It is more suited to code where the state depends on the previous state, since that is received by the reducer function.
#  
    ```
    const [state, dispatch] = React.useReducer(
    fetchUsersReducer,
    {
        users: [
        { name: 'John', subscribred: false },
        { name: 'Jane', subscribred: true },
        ],
        loading: false,
        error: false,
    },
    );
    ```
#          
The code above shows a state with a complicated shape. If any parameters depend on each other, also, the useReducer hook allows us to encapsulate everything nicely into the single reducer function.
#  
Finally, since a reducer is a pure function that always returns the same output for the same input parameters with zero side effects, it is suited for testing, since it does not depend on React (Spukas, 2019).
