import { FC } from 'react';
import { modalStore } from './store';

const createSingle = <T>(modal: FC<T>) => {
  return (props: T) => {
    modalStore.getState().setModal(modal, props || {});
  };
};

type ModalMap<T extends Record<string, object>> = {
  [K in keyof T]: FC<T[K]>;
};

type ModalCaller<T extends Record<string, object>> = {
  [K in keyof T]: (props: T[K]) => void;
};

/**
 * Create modal callers and use them throughout your app. Can be called anywhere.
 *
 * @example
 * import { createModals } from 'react-modal-store'
 * import { MyConfirmModal, MyAlertModal } from 'my-components'
 *
 * const modal = createModals({
 *  confirm: MyConfirmModal,
 *  alert: MyAlertModal,
 * })
 *
 * modal.confirm({ myProps: "Foo bar" }) // props derived from MyConfirmModal
 *
 * modal.alert({ myProps: "Foo bar" }) // props derived from MyAlertModal
 *
 *
 * @param args Record of modals
 * @returns Record of modal callers
 */
export const createModals = <T extends Record<string, object>>(args: ModalMap<T>): ModalCaller<T> => {
  const keys = Object.keys(args) as (keyof T)[];

  const caller = keys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: createSingle(args[key]),
    }),
    {} as Record<keyof typeof args, any>,
  );

  return caller as ModalCaller<T>;
};
