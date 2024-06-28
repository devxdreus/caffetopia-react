import { useEffect, useState } from 'react'

const getLocalValue = (key, initValue) => {
  if(typeof window === 'undefined') return initValue;

  const localValue = JSON.parse(localStorage.getItem(key));
  if(localValue) return localValue;

  if(initValue instanceof Function) return initValue();

  return initValue;
}

const useLocalStorage = (key, initValue) =>  {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue]
}

export default function useInput(key, initValue) {
  const [value, setValue] = useLocalStorage(key, initValue);
  const reset = () => setValue(initValue);
  const attributeObj = {
    value,
    onchange: (e) => setValue(e.target.value),
  };

  return [value, reset, attributeObj];
}
