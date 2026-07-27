let lastError: Error | null = null;

// Capture unhandled errors for the SSR error boundary
if (typeof globalThis !== "undefined") {
  const origOnError = globalThis.onerror;
  globalThis.onerror = (...args: Parameters<NonNullable<OnErrorEventHandler>>) => {
    if (args[4] instanceof Error) lastError = args[4];
    if (typeof origOnError === "function") return (origOnError as Function)(...args);
    return false;
  };
}

export function consumeLastCapturedError(): Error | null {
  const err = lastError;
  lastError = null;
  return err;
}
