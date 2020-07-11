---
title: 'React Hooks: useDebugValue()'
tags: ["javascript", "react"]
published: true
date: '2020-07-10'
---
The **useDebugVlue** React hook is meant to make debugging custom hooks easier by giving them our own custom names. When an error occurs we can see the custom name in the React DevTools stacka trace, which makes it far easier to find the problem in our code.
#  
The useDebugValue hook is **only** executed when both the React DevTools extension is open in the browser, **and** the custom hook related to the useDebugValue is being inspected by the developer. Because the function passed to useDebugValue does not run except under these circumstances, the function has **no performance impact** when the application is running normally. Nevertheless, the React documentation advises to use the useDebugValue hook sparingly, rather than for every custom hook. It is best used when custom hooks are part of a shared library, for instance.
#  
The below code is a React **custom hook** called useLoginStatus. The function computed in the useDebugValue hook will reveal during debugging whether or not the state of the user was online when the error happened.
#  
```
import React, { useState, useDebugValue } from 'react';

export default function useLoginStatus(user) {
  const [loggedIn, setLoggedIn] = useState(null);

  // Other code.

  useDebugValue(loggedIn ? 'Logged In' : 'Logged Out');

  return loggedIn;
}
```
#  
#            
In the debug tools area of React DevTools, we would see something like the below:
#  
```
hooks
>Dispatch:
>History:
>LoginStatus: "Logged In"
    State: true
```
#  
