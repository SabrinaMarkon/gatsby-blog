---
title: 'React Hooks: useMemo()'
tags: ["javascript", "react"]
published: true
date: '2020-07-05'
---
Although the useCallback and useMemo React hooks seem similar, while useCallback is used to create a memoized callback function to child components, the purpose of useMemo, in contrast, is to create a memoized value.
#  
When an operation is computationally expensive or slow, a memoized value means that after it is calculated once, the value is cached so that next time we need it, we don't need to perform the expensive calculation again, and can instead used the cached version. In other words, if the inputs have not changed, neither should the output, therefore it does not need to be re-calculated using an expensive function.
#  
To use the useMemo hook, we need to pass it two parameters, a function (the slow, costly one) that creates the value we want to be memoized, and an array of parameters that if they change, trigger the function to run again to re-calculate the memoized value. If none of the parameters in the array change, the function does not need to run since the value should not be changed, which optimizes our code. Every parameter for the callback function that calculates the memoized value should be included in the array, since that is what the array items represent (ReactJS.org, n.d.).
#  
```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
#  
#  
Above, if either dependency, a or b, changes, we have to re-calculate the value of "memoizedValue" with the computeExpensiveValue function. Otherwise, if neither a nor b changes, we can use "memoizedValue" without computing it. The first time it is computed is when a component is first mounted, and it should not include side effects, since those should be in the useEffect hook instead. The useMemo and useEFfect hooks have similar code with an array as the second parameter, but useEffect is for side effects, whereas useMemo is for memoized values.
#  
**Importantly**, if the array is left out like the below code, the value will never be memoized, because there are no dependencies saying that it shouldn't be recalculated. That is, the value would be recalculated every time the component re-renders if there are no parameters in the array.
#  
```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b));
```
#  
#  
On the other hand, if the array is included, but empty, it is like saying that the function should only be run once, when the component renders for the first time.
#  
```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), []);
```
#  
#  
In addition, code should work regardless of whether useMemo works or not, as the React documentation advises (ReactJS.org, n.d.). Thus, we can first write our code without using useMemo, then add it in afterwards.
#  
The useCallback and useMemo hooks replace the shouldComponentUpdate lifecycle method or PureComponent that React classes use, and allows memoization to be used with React functional components.
