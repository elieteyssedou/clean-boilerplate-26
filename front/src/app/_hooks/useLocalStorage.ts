import { useState, useEffect } from 'react';

function getStorageValue(key: string, defaultValue: string | number | boolean) {
  const saved = localStorage.getItem(key);
  const initial = saved ? JSON.parse(saved) : null;
  return initial || defaultValue;
}

const useLocalStorage = (key: string, defaultValue: string | number | boolean) => {
  const [value, setValue] = useState(() => getStorageValue(key, defaultValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
