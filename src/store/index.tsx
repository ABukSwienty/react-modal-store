import { v4 as uuidv4 } from 'uuid';
import { FC } from 'react';

import { createStore } from 'zustand';
import { ModalOptions } from '../types';

type Modal = {
  id: string;
  component: FC<any>;
  props: Record<string, any>;
  options?: ModalOptions;
};

type Store = {
  modal: Modal | null;
  setModal: (component: FC<any>, props: Record<string, any>, options?: ModalOptions) => void;
  dismiss: () => void;
};

export const modalStore = createStore<Store>((set) => ({
  modal: null,
  setModal: (component, props, options) => {
    const onMount = options?.onMount;
    set({ modal: { id: uuidv4(), component, props, options } });
    onMount?.();
  },
  dismiss: () => {
    const onUnmount = modalStore.getState().modal?.options?.onUnmount;
    set({ modal: null });
    onUnmount?.();
  },
}));
