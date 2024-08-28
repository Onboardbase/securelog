export const isString = (value: any) => typeof value === 'string';
export const isObject = (value: any) =>
  !!value && Object.prototype.toString.call(value) === '[object Object]';
export const isArray = (value: any) => !!value && Array.isArray(value);

const isBrowser = () => {
  try {
    return window && window?.navigator && !global.process;
  } catch (error) {
    return false;
  }
};

export const getGlobalConsoleObject = () => {
  return isBrowser() ? window.console : global.console;
};

export const setGlobalConsoleObject = (obj: Console) => {
  return isBrowser() ? (window.console = obj) : (global.console = obj);
};

export const getGlobalObject = () => {
  return isBrowser() ? window : global;
};
