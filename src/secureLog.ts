import IOptions from './interfaces/options.interface';
import { maskSecretLeaks } from './maskLeakedSecret';
import {
  getGlobalConsoleObject,
  getGlobalObject,
  setGlobalConsoleObject,
} from './utils';
import { checkForPotentialSecrets } from './utils/checkForPotentialSecrets';
import { handleSecretLeakResult } from './utils/handleSecretLeakResult';

/**
 * Represents a secure logging utility that wraps the console object.
 * It provides additional functionality for logging and ensures that sensitive information is not accidentally logged.
 */
class SecureLog {
  cachedLog: Console;
  disabled: boolean;
  Console: console.ConsoleConstructor;

  PREFIX = 'Onboardbase Signatures here:';

  constructor(private options: IOptions = {}) {
    this.disabled =
      options?.disableOn && process.env.NODE_ENV === options?.disableOn;
    if (this.disabled) return;

    const globalObject: any = getGlobalObject();
    if (options?.forceNewInstance) {
      // reset the global console to standard console object
      globalObject.console = globalObject.obbinitialized
        ? globalObject.console.cachedLog
        : console;
    } else if (globalObject.obbinitialized) {
      return globalObject.console as SecureLog;
    }
    this.cachedLog = getGlobalConsoleObject();
    this.PREFIX = this.options.prefix ?? this.PREFIX;
    globalObject.console = this;
    globalObject.obbinitialized = false;
  }

  useActualConsole() {
                       // setGlobalConsoleObject(this.cachedLog);
                     }

  hasSecretLeak(...args: any) {
    const checkResult = checkForPotentialSecrets(args);
    return !!checkResult?.length;
  }

  /**
   * Logs the provided arguments to the console, while checking for potential secrets.
   * If the `disableConsoleOn` option is set and the current environment matches the value,
   * the console logging will be disabled.
   *
   * @param args - The arguments to be logged.
   */
  log(...args: any) {
    if (this.disabled) return;

    const checkResult = checkForPotentialSecrets(args);
    handleSecretLeakResult(checkResult, this.cachedLog, this.options);
    const valuesIn = checkResult.map((key: string) => process.env[key]);
    const data = this.options.maskLeakedSecrets
      ? maskSecretLeaks(args, valuesIn)
      : args;
    this.cachedLog.log.apply(console, [this.PREFIX, ...data]);
  }

  clear() {
    // do whatever here with the passed parameters
    this.cachedLog.clear.apply(null);
  }

  assert(...args: any) {
    // do whatever here with the passed parameters
    this.cachedLog.assert.apply(null, args);
  }

  debug(...data: any[]): void;
  debug(message?: any, ...optionalParams: any[]): void;
  debug(...args: any): void {
    if (this.disabled) return;

    const checkResult = checkForPotentialSecrets(args);
    handleSecretLeakResult(checkResult, this.cachedLog);
    const valuesIn = checkResult.map((key: string) => process.env[key]);
    const data = this.options.maskLeakedSecrets
      ? maskSecretLeaks(args, valuesIn)
      : args;
    this.cachedLog.debug.apply(console, [this.PREFIX, ...data]);
  }
  error(...data: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
  error(...args: any): void {
    const modArgs = args || [];

    if (this.disabled) return;

    if (!modArgs[1]?.skipValidationCheck) {
      const checkResult = checkForPotentialSecrets(args);
      handleSecretLeakResult(checkResult, this.cachedLog, this.options);
    }

    const logValue = modArgs?.[1]?.skipValidationCheck
      ? [this.PREFIX, modArgs?.[0]]
      : [this.PREFIX, ...modArgs];

    this.cachedLog.error.apply(console, logValue);
  }
  profile(label?: string): void {
    return this.cachedLog.profile(label);
  }
  profileEnd(label?: string): void {
    return this.cachedLog.profileEnd.bind(null, label);
  }
  info(...data: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
  info(...args: any): void {
    if (this.disabled) return;

    const checkResult = checkForPotentialSecrets(args);
    handleSecretLeakResult(checkResult, this.cachedLog, this.options);
    this.cachedLog.info.apply(console, [this.PREFIX, ...args]);
  }
  warn(...data: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
  warn(...args: any): void {
    if (this.disabled) return;

    const checkResult = checkForPotentialSecrets(args);
    handleSecretLeakResult(checkResult, this.cachedLog, this.options);
    const valuesIn = checkResult.map((key: string) => process.env[key]);
    const data = this.options.maskLeakedSecrets
      ? maskSecretLeaks(args, valuesIn)
      : args;
    this.cachedLog.warn.apply(console, [this.PREFIX, ...data]);
  }
  dir(item?: any, options?: any): void;
  dir(obj: any): void;
  dir(obj?: unknown, options?: unknown): void {
    throw new Error('Method not implemented.');
  }
  dirxml(...data: any[]): void;
  dirxml(...data: any[]): void;
  dirxml(...data: unknown[]): void {
    throw new Error('Method not implemented.');
  }
  count(label?: string): void;
  count(label?: string): void;
  count(label?: unknown): void {
    throw new Error('Method not implemented.');
  }
  countReset(label?: string): void;
  countReset(label?: string): void;
  countReset(label?: unknown): void {
    throw new Error('Method not implemented.');
  }
  group(...data: any[]): void;
  group(...label: any[]): void;
  group(...label: unknown[]): void {
    throw new Error('Method not implemented.');
  }
  groupCollapsed(...data: any[]): void;
  groupCollapsed(...label: any[]): void;
  groupCollapsed(...label: unknown[]): void {
    throw new Error('Method not implemented.');
  }
  groupEnd(): void;
  groupEnd(): void;
  groupEnd(): void {
    throw new Error('Method not implemented.');
  }

  table(tabularData?: any, properties?: string[]): void;
  table(tabularData: any, properties?: readonly string[]): void;
  table(...args: any): void {
    throw new Error('Method not implemented.');
  }
  time(label?: string): void;
  time(label?: string): void;
  time(label?: unknown): void {
    throw new Error('Method not implemented.');
  }
  timeEnd(label?: string): void;
  timeEnd(label?: string): void;
  timeEnd(label?: unknown): void {
    throw new Error('Method not implemented.');
  }
  timeLog(label?: string, ...data: any[]): void;
  timeLog(label?: string, ...data: any[]): void;
  timeLog(label?: unknown, ...data: unknown[]): void {
    throw new Error('Method not implemented.');
  }
  timeStamp(label?: string): void;
  timeStamp(label?: string): void;
  timeStamp(label?: unknown): void {
    throw new Error('Method not implemented.');
  }
  trace(...data: any[]): void;
  trace(message?: any, ...optionalParams: any[]): void;
  trace(message?: unknown, ...optionalParams: unknown[]): void {
    throw new Error('Method not implemented.');
  }
}

export default SecureLog;
