import { circuitBreakerCallFunctionWithFallback } from './circuit-breaker.helper';
import { BrokenCircuitError } from 'cockatiel';

describe('circuitBreakerCallFunctionWithFallback', () => {
  it('should call the functionToCall and return its result', async () => {
    const functionToCall = jest.fn().mockResolvedValue('Function Result');
    const fallback = jest.fn().mockResolvedValue('Fallback Result');
    const circuitBreakerInstance = {
      execute: jest.fn((fn: () => Promise<any>) => fn()),
    };
    const args = [1, 2, 3];

    const result = await circuitBreakerCallFunctionWithFallback(
      circuitBreakerInstance,
      functionToCall,
      fallback,
      ...args,
    );

    expect(circuitBreakerInstance.execute).toHaveBeenCalledTimes(1);
    expect(functionToCall).toHaveBeenCalledWith(...args);
    expect(result).toBe('Function Result');
  });

  it('should call the fallback function when the circuit breaker is open', async () => {
    const functionToCall = jest
      .fn()
      .mockRejectedValue(new BrokenCircuitError());
    const fallback = jest.fn().mockResolvedValue('Fallback Result');
    const circuitBreakerInstance = {
      execute: jest.fn().mockRejectedValue(new BrokenCircuitError()),
    };
    const args = [1, 2, 3];

    const result = await circuitBreakerCallFunctionWithFallback(
      circuitBreakerInstance,
      functionToCall,
      fallback,
      ...args,
    );

    expect(circuitBreakerInstance.execute).toHaveBeenCalledTimes(1);
    expect(fallback).toHaveBeenCalledWith(...args);
    expect(result).toBe('Fallback Result');
  });

  it('should call the fallback function when the response status is 404', async () => {
    const functionToCall = jest
      .fn()
      .mockRejectedValue({ response: { status: 404 } });
    const fallback = jest.fn().mockResolvedValue('Fallback Result');
    const circuitBreakerInstance = {
      execute: jest.fn().mockRejectedValue({ response: { status: 404 } }),
    };
    const args = [1, 2, 3];

    const result = await circuitBreakerCallFunctionWithFallback(
      circuitBreakerInstance,
      functionToCall,
      fallback,
      ...args,
    );

    expect(circuitBreakerInstance.execute).toHaveBeenCalledTimes(1);
    expect(fallback).toHaveBeenCalledWith(...args);
    expect(result).toBe('Fallback Result');
  });

  it('should rethrow the error when it is not a BrokenCircuitError or a 404 response', async () => {
    const error = new Error('Some error');
    const functionToCall = jest.fn().mockRejectedValue(error);
    const fallback = jest.fn().mockResolvedValue('Fallback Result');
    const circuitBreakerInstance = {
      execute: jest.fn().mockRejectedValue(error),
    };
    const args = [1, 2, 3];

    await expect(
      circuitBreakerCallFunctionWithFallback(
        circuitBreakerInstance,
        functionToCall,
        fallback,
        ...args,
      ),
    ).rejects.toThrow(error);

    expect(circuitBreakerInstance.execute).toHaveBeenCalledTimes(1);
    expect(fallback).not.toHaveBeenCalled();
  });
});
