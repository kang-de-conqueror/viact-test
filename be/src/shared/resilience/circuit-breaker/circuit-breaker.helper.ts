import { BrokenCircuitError } from 'cockatiel';

export async function circuitBreakerCallFunctionWithFallback<O>(
  circuitBreakerInstance: any,
  functionToCall: (...argsRest: any[]) => Promise<O>,
  fallback: (...argsRest: any[]) => Promise<O>,
  ...args: any[]
) {
  try {
    return await circuitBreakerInstance.execute(() => {
      console.log('Inside circuitBreakerCallFunctionWithFallback');
      return functionToCall.apply(this, args);
    });
  } catch (e) {
    if (e instanceof BrokenCircuitError) {
      console.log('Circuit breaker open');
      return fallback.apply(this, args);
    } else if (e?.response?.status === 404) {
      console.log('404 Error');
      return fallback.apply(this, args);
    } else {
      throw e;
    }
  }
}
