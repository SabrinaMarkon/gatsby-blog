---
title: 'React Hooks: useRef()'
tags: ["javascript", "react"]
published: true
date: '2020-06-23'
---
**useRef** is a React hook that mutates the current value of a variable that we can optionally initialize with an initial value or leave undefined. Its major difference to the useState hook is that it only updates the value of the variable, but does **not** update state. Consequently, useRef does not cause a re-render like useState does, and we can use it when storing a value in state is neither wanted or necessary.
#  
We create a ref for a React functional component like this:

```
const wasClicked = useRef(false);
```
#  
And we mutate its value using its current property:

```
wasClicked.current = true;
```
#  
If you noticed that wasClicked is a constant, yet we are mutating a value, it is because we are updating the property called "current", not mutating the wasClicked object reference itself.
The functional component below uses a useRef hook. What will be logged to the console? What will appear in the webpage itself (DOM)?
#  

```
import React, { useRef } from "react";

const clickButton = () => {
const wasClicked = useRef("Not Clicked Yet");
const onClick = () => {
    wasClicked.current = "Clicked";
    console.log("Has clicked button? " + wasClicked.current);
};

return (
    <>
    <p>The value of wasClicked is: {wasClicked.current}</p>
    <button onClick={onClick}>Click Me</button>
    </>
);
};

export default clickButton;
```
#  

The code above will update the **value** of wasClicked and log it to the console, however it will not cause the page to re-render, so the text in the DOM stays the **same**.

- Console when the component mounts for the first time: nothing in the console
- DOM when the component mounts for the first time: "The value of wasClicked is: Not Clicked Yet"
- Console when the button is clicked: "Has clicked button? Clicked"
- DOM when the button is clicked: "The value of wasClicked is: Not Clicked Yet".

The **ref** is mutated when the button is clicked, but it does **not** trigger the DOM to be re-rendered, **unlike** when we use useState.

So what would useRef be good for?

Well, if we wanted to track a state value that changes but shouldn't cause a re-render, we can create a useRef hook to use it as an **instance variable**.
A good use of this, for example, would be a situation where we want to run certain code whenever a component updates, but not when the component is first rendered.

For most situations, we would use the useEffect hook to automatically execute the code when the component updates.

On the other hand, however, the useEffect hook is also triggered when a component is **first mounted**, which therefore doesn't meet our requirement above.

In the below code, you can see how we create a variable, using the useRef hook, called firstRender, whose value defaults to true, but is changed to false when the component re-renders. The useEffect hook runs every time a component is rendered or re-rendered, so if we don't want it to run that first time when the component is rendered for the first time, we can check the ref variable firstRender to make sure its value is false before running the code.
#  

```
import React, { useState, useRef, useEffect } from 'react';

export default function ComponentWithRefInstanceVariable() {
  const [count, setCount] = useState(0);
 
  function onClick() {
    setCount(count + 1);
  }
 
  const isFirstRender = useRef(true);
 
  useEffect(() => {
    if (isFirstRender.current) {

      /* 
      * This is the first time the component is mounted, so DO NOT run the
      * code (in the else statement). Set isFirstRender to false though
      * for when the component loads again.
      */

      isFirstRender.current = false;

    } else {
      // this won't run if isFirstRender.current = true, which is only
      // when the component is FIRST rendered. 
      console.log(
        `
          I am a useEffect hook's logic
          which runs for a component's
          re-render.
        `
      );
    }
  });
 
  return (
    <>
      <p>{count}</p>
 
      <button type="button" onClick={onClick}>
        Increase
      </button>
    </>
  );
}
// Code example (Wieruch, 2020). 
```
#  
         
The useRef hook is frequently used with DOM elements in order to get their values out without having to store them in state. The useRef hook contains a reference to a DOM node which we can then access directly. This is the **React way of accessing an HTML element** instead of using things like getElementById.

In the below code example, you can see how we can make a useRef object we name inputRef, and pass inputRef to the ref attribute of a text input field. Now, we can access the value of the text field with the inputRef object's **current** property, **inputRef.current**.
#  

```
  // ComponentWithRefForDOMElement component.
import React, { useRef } from 'react';

export default function ComponentWithRefForDOMElement() {

const inputRef = useRef();

function onSubmit(event) {
    event.preventDefault();

    // Will log the current value of the text field to the console.
    console.log(inputRef.current.value); // whatever you've typed in the field.

    // Will log which DOM node inputRef refers to, along with its attributes, 
    // including name, id, style, etc. if present.
    console.log(inputRef.current); // <input type="text" id="lol" style="color: red;">

    // Changes the style of the inputRef's text to blue!
    inputRef.current.style = "color: blue";
}

return (
    <>
    {/* <p>{inputRef.current.value}</p> */}
    <form onSubmit={onSubmit}>
        <input type="text" id="lol" style={{ color: "red" }} ref={inputRef} />
    </form>
    </>
);
} 
```
#  

Observe that while we can log the inputRef to the console or change styles, a change in value that we type is not updated in the DOM (where we have &lt;p&gt;{inputRef.current.value}&lt;/p&gt;).

That is, we cannot see the changes to value in the DOM, and get an error when the component loads if we try to access it if the initial value is undefined. If the initial state is not undefined, we still see nothing in the DOM.

###forwardRef:

Above, we only need to include the useRef hook by adding the ref attribute to the input field (the ref={inputRef} part), but what do we do when the DOM nodes we need to access are in a **child component** instead? That is, how would we access the input field in a case like this, where the input field is actually inside a child component instead of directly in the return statement of the ComponentWithRefForDOMElement component?
#  

```
// ComponentWithRefForDOMElement component.
import React, { useRef } from 'react';

import ChildComponentWithTheInputField from './ChildComponentWithTheInputField';

export default function ComponentWithRefForDOMElement() {

const inputRef = useRef();

function onSubmit(event) {
    event.preventDefault();

    // Will log the current value of the text field to the console.
    console.log(inputRef.current.value); // whatever you've typed in the field.

    // Will log which DOM node inputRef refers to, along with its attributes, 
    // including name, id, style, etc. if present.
    console.log(inputRef.current); // <input type="text" id="lol" style="color: red;">

    // Changes the style of the inputRef's text to blue!
    inputRef.current.style = "color: blue";
}

return (
    <>
    {/* <p>{inputRef.current.value}</p> */}
    <form onSubmit={onSubmit}>
        <ChildComponentWithTheInputField id="lol" style={{ color: "red" }} ref={inputRef} />
    </form>
    </>
);
} 

////////////////////////////////////////////////////////////////////

// ChildComponentWithTheInputField
import React from 'react';

const ChildComponentWithTheInputField = () => {
return (
    <input />;
);
}

export default ChildComponentWithTheInputField;
```
#  
          
See how we have "ChildComponentWithTheInputField" in the parent component's (ComponentWithRefForDOMElement) return statement instead of &lt;input type="text" id="lol" style={{ color: "red" }} ref={inputRef} /&gt;? How do we use refs in this situation to access the input DOM node? we don't have access to the references directly!

Well, it turns out that all we have to do is pass the ref as another parameter to the child component after the props (either as ...props or destructured below as {type, id, style}), then we can include the ref in the atttributes of the input field in the child component's (ChildComponentWithTheInputField) return statement.

Then, we create a constant of the child component that we export as a forwarded ref instead of the child component directly.
#  

```
// ChildComponentWithTheInputField
import React from 'react';

const ChildComponentWithTheInputField = ({type, id, style}, ref) => {
    return (
    <input ref={ref} type={type} id={id} style={style} />;
    );
}

const forwardedChildComponentRef = React.forwardRef(ChildComponentWithTheInputField);

export default forwardedChildComponentRef;
```
#  
      
Thus, forwardRef is just when we need to forward a reference into a component. Nothing needs to change in the parent component, and all we need to do in the child is to add a ref parameter and create a forwardRef version of the child component to export for use in other components (such as the parent).
