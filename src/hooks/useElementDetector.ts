import { useState, useEffect, RefObject } from "react";

export interface Options {
  threshold?: number; // Threshold for intersection ratio
}

export interface Callbacks {
  onChangeVisibility?: (
    isVisible: boolean,
    ref: RefObject<HTMLElement>
  ) => void;
  onTriggerEnter?: (ref: RefObject<HTMLElement>) => void;
  onTriggerExit?: (ref: RefObject<HTMLElement>) => void;
  onFirstVisible?: (ref: RefObject<HTMLElement>) => void;
}

/**
 * Custom hook to detect if an element is visible in the viewport
 * @param ref  Reference to the element being observed
 * @param options Options for configuring the IntersectionObserver
 * @param callbacks Callbacks for visibility changes
 * @returns  Return the visibility state
 */
export const useElementDetector = (
  ref: RefObject<HTMLElement>,
  options?: Options,
  callbacks?: Callbacks
): boolean => {
  const [isVisible, setIsVisible] = useState(false); // State to track visibility of the element
  const [firstVisible, setFirstVisible] = useState(false); // State to track if the element is visible for the first time

  if (options?.threshold && options.threshold > 1) {
    throw new Error("'threshold' must be between 0 and 1");
  }

  useEffect(() => {
    // Create an IntersectionObserver to observe changes in visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);

        // Handle enter and exit triggers with additional checks
        if (isIntersecting) {
          callbacks?.onTriggerEnter?.(ref);
          // Call onFirstVisible callback if it's the first time the element is visible
          if (!firstVisible) {
            setFirstVisible(true);
            callbacks?.onFirstVisible?.(ref);
          }
        } else {
          callbacks?.onTriggerExit?.(ref);
        }

        // Call onChangeVisibility callback if provided
        callbacks?.onChangeVisibility?.(isIntersecting, ref);
      },
      { threshold: options?.threshold || 0 } // Configure the observer with threshold from options, default to 0
    );

    // Start observing the target element
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup function to stop observing when component unmounts or ref changes
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, firstVisible]); // Re-run effect when dependencies change

  return isVisible; // Return the visibility state
};
