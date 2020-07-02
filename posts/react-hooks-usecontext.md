---
title: 'React Hooks: useContext()'
tags: ["javascript", "react"]
published: true
date: '2020-07-01'
---
The React **useContext** hook is used in combination with the React Context API.
#  
Without using Context in React, props that need to be shared between components are passed as attributes from parent to child to child's child, etc. In addition, functions that update those same props are also passed to child components by the parent as attributes that the child component can use to pass updated props back to the parent.
#  
As you might guess, if the React tree has many levels of parent and child components, this process could become more error prone and unwieldy. It can be hard to keep track of which props are available to a given component, for instance. As well, code repetition of attributes and functions that pass  up the tree, through potentially many levels of parent components, makes code less readable. Some of the components in the process might not even need access to the prop but have to handle it anyway.
#  
So, instead of "prop drilling" through multiple levels in a React component tree, we can use the **Context API and the useContext hook** to allow prop values to be shared easily between components, without having to explicitly pass them as variables through every level. The steps are actually quite straightforward!
#  
1. Create a React Context in the highest level of the app that needs access to the values. Adding it to the index.js or App.js would give the entire app access, for instance: 
    ```
    const myContext = React.createContext();
    ```
#  
#  
1. The Context we created is an object that contains two values: { Provider, Consumer }.
#  
1. In the render section, enclose the app's children with myContext.Provider, and add a ***value*** attribute where we pass our state variables and the functions to update them as an object:
#  

    ```
    export default function myApp() {
    const [count, setCount] = useState(1);
    const [greeting, setGreeting] = useState('Hai thar!');

    return (
        <myContext.Provider value={{
        count,
        greeting,
        setCount,
        setGreeting
        }}>
        <div>
            <ChildComponent />
        </div>
        </myContext.Provider>
    );
    }
    ```
#   
#  
1. To access the state in the myContext.Provider value from any child component that needs it, import React's useContext hook and pass the Context, myContext as a parameter. Easy Peasy!
#  

    ```
    import React, { useContext } from 'react';

    export default function ChildComponent() {
    const value = useContext(myContext);
    return (
        <div>The value of the greeting state variable: {value.greeting}</div>
    );
    }
    ```
# 
#  
1. If we want to update state from the ChildComponent, the setGreeting and setCount methods are also available in the Context. Cool!
#  

```
  import React, { useContext } from 'react';
  
  export default function ChildComponent() {
    const value = useContext(myContext);
    return (
      <>
        <div>The value of the greeting state variable: {value.greeting}</div>
        <label>Update Greeting: </label>
        <input type="text" name="greeting" onChange={e => value.setGreeting(e.target.value)} value={greeting} />
      </>
    );
  }
```

#  
#  
Importantly, when the values provided by myContext.Provider change, the value will also be updated in **all child components that use those values**, triggering them to re-render **recursively**. That is, if a child component that uses useContext re-renders, **all its children that use the useContext hook** (but not the children that **don't**!) will also re-render! Becasue of this, the app could take a performance hit, but we can remedy this by using React memo or PureComponent on child components so they don't re-render if they do not need to.

The React useContext hook also allows us to create multiple Contexts, and we can then nest child components in the ones they need access to.