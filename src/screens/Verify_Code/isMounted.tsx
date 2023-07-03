// import { useRef, useEffect } from "react";

// export function useIsMounted() {
//   const isMounted = useRef(false);

//   useEffect(() => {
//     isMounted.current = true;
//     // return () => (isMounted.current = false);
//   }, []);

//   return isMounted;
// }
import { useCallback, useEffect, useRef } from "react";

export function useIsMounted() {
  const isMountedRef = useRef(true);
  const isMounted = useCallback(() => isMountedRef.current, []);

  useEffect(() => {
    return () => void (isMountedRef.current = false);
  }, []);

  return isMounted;
}
