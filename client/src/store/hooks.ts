import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './configureStore';
import useConstant from 'use-constant';
import { useState, useEffect } from 'react';
import { useAsync } from 'react-async-hook';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Generic reusable hook
export const useDebouncedSearch = (searchFunction) => {

    // Handle the input text state
    const [inputText, setInputText] = useState('');
    const [page, setPage] = useState(1);
    // Debounce the original search async function
    const debouncedSearchFunction = useConstant(() =>
      AwesomeDebouncePromise(searchFunction, 800)
    );
  
    // The async callback is run each time the text changes,
    // but as the search function is debounced, it does not
    // fire a new request on each keystroke
    const searchResults = useAsync(
      async () => {
        if (inputText.length === 0) {
          return [];
        } else {
          return debouncedSearchFunction(inputText);
        }
      },
      [debouncedSearchFunction, inputText, page]
    );
  
    // Return everything needed for the hook consumer
    return {
      inputText,
      setInputText,
      searchResults,
      setPage,
      page,
    };
  };

export const useScript = (url: string) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

export const useScripts = (urls: string[]) => {
  useEffect(() => {
    let scriptStore: HTMLScriptElement[] = [];
    for (const url of urls) {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      document.body.appendChild(script);
      scriptStore.push(script);
    }
    return () => {
      for (const script of scriptStore) {
        document.body.removeChild(script);
      }
    };
  }, [urls]);
};