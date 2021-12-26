import { KEYCODES } from "../Components/Utils/KeyCodes";
import { useEffect } from 'react';

const useOnEscapeKeyDown = (isListening: any, onEscapeKeyDown: any) => {
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.keyCode === KEYCODES.ESCAPE) {
        onEscapeKeyDown();
      }
    };

    if (isListening) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [ isListening, onEscapeKeyDown ]);
};

export default useOnEscapeKeyDown;