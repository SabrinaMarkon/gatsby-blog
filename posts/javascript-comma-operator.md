---
title: 'How to Use the JavaScript Comma Operator'
tags: ["javascript", "nodejs"]
published: true
date: '2020-05-03'
---
Most of us are familiar with common JavaScript arithmetic, comparison, and assignment operators, such as those for addition, string concatenators, greater-than or less-than comparisons, and many more we learn during the first days of a new JavaScript learning path. 

Indeed, frequently-used operators can be used for most situations, so many developers are often surprised when they first encounter the **comma operator**, and in fact many basic JavaScript tutorials and classes don't even mention it! 

Importantly, the comma operator should not be mistaken for the commas in arrays, objects, or functions. It is a completely different use of a comma.

### Example: ###
At first, the below code with its comma operator might look strange to someone who has never encountered it.
<br /><br />

```
let x = 1;
let y = (x++, x);
console.log(y); // outputs: 2
```
<br />
From left to right, the comma operator will evaluate the operands, then return the value of the last operand after the comma.

First, it will compute x++ and get 2. Then, it will return the value of x because x appears at the end, after the comma. 
Since x is returned as 2, that value is assigned to y, and console.log(y) prints 2.

Mostly is just a neat, short way of evaluating an expression, then returning a value in one line to assign to a variable. 

But why can't we just do it without the comma operator? For example:
<br /><br />

```
let x = 1;
let y = x++;
console.log(y);
```
<br />
Well, if you try that, you'll see that the output is not 2, but 1. 
console.log(y) here says that y is equal to 1.
y = 1 only because the value of x is returned and assigned to y *before* x is incremented!
If we want y to contain the incremeneted value of x, therefore, we need to return it after it is incremented, *then* assign it to y.

The comma operator assures us that the value of a variable is what we will expect it to be. As a novice, especially, the difference between ++x and x++ is sometimes confusing, so the comma operator can help to eliminate things that might surprise us from our code. 

## The Comma Operator in For Loops ##

The comma operator is also used in for loops that involve multi-dimensional arrays that would otherwise require nested loops. 

For instance, instead of using nested for loops with the quintessential 'i' loop enclosing a 'j' loop, we can write a single for loop that initializes both i and j in its parenthesis. That is, we can use the comma operator to supply multiple parameters to the for loop.
Note that this does **not** improve the performance of the loop. It's Big Oh is still quadratic. It does tend to be more readable and concise, however.

### Example: ###

If we wanted to get the diagonal items in a two-dimensional array (matrix):
<br /><br />

```
for (let i = 0, j = 9; i <= 9; i++, j--) {
    console.log(`myArray[${i}][${j}] = ` + myArray[i][j]);
}
```

<br />
Finally, be aware of the comma operator's behavior in assignments. 
For instance, in the code below, the value of the left-most expression, a = b = 3, will evaluate to 3, however the c = 4 right-most expression after the comma operator still evaluates and returns 4.
<br /><br />

```
let a, b, c;
a = b = 3, c = 4; // 4
console.log(a); // 3
```

<br />
On the other hand, below the assignment expression is enclosed in parenthesis. Both y = 5 and z = 6 are evaluated, but only 6 is assigned to x, because the z = 6 on the right-most side of the comma is the one returned.
<br /><br />

```
let x, y, z;
x = (y = 5, z = 6); // 6
```

<br />
Have you observed any interesting quirks of the comma operator, or have any cool examples of its usage? Comment below!

