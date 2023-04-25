import { modalStore } from './store';
import { useRef } from 'react';

export const useModalStore = () => {
  const dismiss = useRef(modalStore.getState().dismiss);

  return {
    dismiss: dismiss.current,
  };
};
