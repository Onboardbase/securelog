/**
 * Represents the options for the secure-log library.
 */
export default interface IOptions {
  /**
   * Specifies when to disable the secure-log functionality.
   * It can be set to 'development' or 'production'.
   */
  disableOn?: 'development' | 'production';

  /**
   * Specifies when to disable logging to the console.
   * It can be set to 'development' or 'production'.
   */
  disableConsoleOn?: 'development' | 'production';

  /**
   * Specifies whether to only log warnings instead of throwing errors.
   */
  warnOnly?: boolean;

  ignoreInitializedObject?: boolean;

  globalConsoleObject?: Console;
}
