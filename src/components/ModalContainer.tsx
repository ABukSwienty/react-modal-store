import React from 'react';
import { useStore } from 'zustand';
import { modalStore } from '../store';

/**
 * Modal container. Should be at the root of the app.
 *
 * @example
 *
 * const App = () => {
 *
 *  return (
 *    <>
 *     <ModalContainer />
 *    </>
 *  )
 * }
 *
 * @returns JSX.Element | null
 *
 */
export const ModalContainer = () => {
  const { modal } = useStore(
    modalStore,
    (state) => ({
      modal: state.modal,
    }),
    (prev, current) => prev.modal?.id === current.modal?.id,
  );

  if (!modal) return null;

  const Modal = modal.component;
  const props = modal.props;

  return <Modal key={modal.id} {...props} />;
};
