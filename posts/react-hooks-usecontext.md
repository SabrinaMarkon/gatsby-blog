---
title: 'React Hooks: useContext()'
tags: ["javascript", "react"]
published: true
date: '2020-07-01'
---
The React **useContext** hook is used in combination with the React Context API.
#  
Without using Context in React, props that need to be shared between components are passed as attributes from parent to child to child's child, etc. In addition, functions that update the same values are also passed to child components by the parent as attributes that the child component can use to pass updated props back to the parent.
#  
As you might guess, if the React tree has many levels of parent and child components, this process could become more error prone and unwieldy. It can be hard to keep track of which props are available to a given component, for instance, and code repetition, such as of attributes and functions that pass to the next parent up the tree, makes code less readable. Moreover, some of the components in the process might not even need access to the prop but have to handle it anyway.
#  
So, instead of "prop drilling" through multiple levels in a React component tree, we can use the ***Context API*** and the useContext hook to allow prop values to be shared easily between components, without having to explicitly pass them as variables through every level. The steps are actually quite straightforward!
#  
1. Create a React Context in the highest level of the app that needs access to the values: 
    ```
    const myContext = React.createContext();
    ```
#  
#  
1. The Context we created is an object that contains two values: { Provider, Consumer }.
#  
1. In the render section, enclose the app's children with myContext.Provider, and add a ***value*** attribute where we pass our state variables as an object:
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
1. To access the state in the myContext.Provider value from any child component that needs it, import React's useContext hook and pass the Context, myContext as a parameter.
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