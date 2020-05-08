---
title: 'How to Use the JavaScript Comma Operator'
tags: ["javascript", "nodejs"]
published: true
date: '2020-05-03'
---
Most of us are familiar with common JavaScript operators, including +, -, %, and others. Indeed, these can be used for most situations, so many developers are often surprised when they first encounter the comma operator.

At first, an expression like this:

```
let x = 1;
y = (x++, x);
```

might look strange to someone who has never encountered it, yet I am here to tell you that it isn't really hard at all!

It is just a neat, short way of evaluating an expression, then returning a value in one line.

From left to right, the comma operator will evaluate operands, then return the value of the last operand after the comma.

For instance:
```
let x = 1;
y = (x++, x);
console.log(y); // outputs: 2
```
The reason the code outputs 2 is simple. Remember, the comma operator will evaluate the operands from left to right, so it will first compute x++ and get 2. Then, it will return the value of x because x appears at the end, after the comma. 

Since x is returned as 2, that value is assigned to y, and console.log(y) prints 2.



