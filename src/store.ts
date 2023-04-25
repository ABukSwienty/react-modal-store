import { v4 as uuidv4 } from 'uuid';
import { FC } from 'react';

import { createStore } from 'zustand';

type Modal = {
  id: string;
  component: FC<any>;
  props: Record<string, any>;
};

type Store = {
  modal: Modal | null;
  setModal: (component: FC<any>, props: Record<string, any>) => void;
  dismiss: () => void;
  show: boolean;
};

export const modalStore = createStore<Store>((set) => ({
  modal: null,
  setModal: (component, props) => set({ modal: { id: uuidv4(), component, props }, show: true }),
  dismiss: () => set({ show: false }),
  show: true,
}));
