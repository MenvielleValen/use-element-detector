# ⭐ UseElementDetector Hook React

Custom hook designed to detect if an element is visible within the viewport.

## Installation

To install the `useElementDetector` hook from npm, use the following command:

```bash
npm i use-detector-hook
```

## Usage useElementDetector(ref, options?, callbacks?)

```javascript
import { useState, useEffect, useRef } from "react";
import { useElementDetector } from "use-detector-hook";

// Example component
const MyComponent = () => {
  const elementRef = useRef(null);

  /*
    ELEMENT REF: REQUIRED
    OPTIONS: OPTIONAL
    CALLBACKS: OPTIONAL
  */
  const isVisible = useElementDetector(
    elementRef,
    { threshold: 0.5 },
    {
      onTriggerEnter: () => console.log("ON TRIGGER ENTER"),
      onTriggerExit: () => console.log("ON TRIGGER EXIT"),
      onChangeVisibility: (visibility) =>
        console.log(`ON CHANGE ${visibility}`),
      onFirstVisible: () => console.log("FIRST TIME ON VIEWPORT"),
    }
  );

  return (
    <div ref={elementRef}>
      {isVisible ? "Element is visible!" : "Element is not visible!"}
    </div>
  );
};
```

#### Parameters

- `ref`: Reference to the element being observed.
- `options` (optional): Options for configuring the IntersectionObserver.
  - `threshold` (optional): Threshold for intersection ratio.
- `callbacks` (optional): Callbacks for visibility changes.
  - `onChangeVisibility` (optional): Callback triggered when visibility changes.
  - `onTriggerEnter` (optional): Callback triggered when the element enters the viewport.
  - `onTriggerExit` (optional): Callback triggered when the element exits the viewport.
  - `onFirstVisible` (optional): Callback triggered when the element enters the viewport for the first time.
