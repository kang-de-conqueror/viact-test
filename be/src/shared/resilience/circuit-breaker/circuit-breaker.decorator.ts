import { BrokenCircuitError, circuitBreaker, handleAll } from 'cockatiel';

function CircuitBreaker(name: string, config: any, fallbackMethod: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const circuitBreakerInstance = circuitBreaker(handleAll, config);
      try {
        return await circuitBreakerInstance.execute(() => {
          return originalMethod.apply(this, args);
        });
      } catch (e) {
        console.log('Circuit breaker open');
        if (e instanceof BrokenCircuitError) {
          if (typeof this[fallbackMethod] === 'function') {
            return this[fallbackMethod].apply(this, args);
          }
          throw new Error('Service is unavailable');
        } else {
          throw e;
        }
      }
    };

    return descriptor;
  };
}
