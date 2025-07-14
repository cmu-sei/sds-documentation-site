---
tags: tagging
---

# Code blocks

Here is a **code** example:

## Just Markdown

```javascript
const hello = ref()
watch(hello, (value) => {
  alert(value)
})
```

## Code Block (default quality, with title)

::code-block{title="Code example with a title"}
```javascript
const hello = ref()
watch(hello, (value) => {
  alert(value)
})
```
::

## Code Block (average quality, full code example)

::code-block{quality="average"}
```javascript
const hello = ref()
watch(hello, (value) => {
  alert(value)
})
// ...
```

#complete
```javascript
const hello = ref()
watch(hello, (value) => {
  alert(value)
})

alert('here is more code')
```
::

## Code Block (title, good quality)

::code-block{title="test" quality="good"}
```javascript
const hello = ref()
watch(hello, (value) => {
  alert(value)
})
```
::

## Code Block (title, bad quality)

::code-block{title="test" quality="bad"}
```javascript
const hello = ref()
watch(hello, (value) => {
  alert(value)
})
```
::

## Code Block (good quality)

::code-block{quality="good"}
```javascript
const hello = ref()
watch(hello, (value) => {
  alert(value)
})
```
::

## Code Block (bad quality)

::code-block{quality="bad"}
```javascript
const hello = ref()
watch(hello, (value) => {
  alert(value)
})
```
::

## Code Block (rust)

::code-block{title="Rust example"}
```rust
// Function that returns multiple values
fn calculate_dimensions() -> (i32, i32) {
    (30, 50) // Returning a tuple
}

fn main() {
    let (width, height) = calculate_dimensions();
    println!("Width: {}, Height: {}", width, height);
}
```
::

## Code Block (python)

::code-block{title="Python example"}
```python
# Function that returns multiple values
def calculate_dimensions():
    return (30, 50)  # Returning a tuple

# Call the function and unpack values
width, height = calculate_dimensions()
print("Width:", width)
print("Height:", height)
```
::

## Code Block (bash)

::code-block{title="Bash example"}
```bash
#!/bin/bash
# Define a variable
greeting="Hello, World!"
# Print the variable
echo $greeting
```
::

[Back home](/)
