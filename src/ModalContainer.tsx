import React, { FC } from 'react';
import { useStore } from 'zustand';
import { modalStore } from './store';

type InnerProps = Record<string, any> & { children?: React.ReactNode };

export interface ModalContainerProps {
  inner?: FC<InnerProps>;
}

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
export const ModalContainer = ({ inner: Inner }: ModalContainerProps) => {
  const { modal, show } = useStore(
    modalStore,
    (state) => ({
      modal: state.modal,
      show: state.show,
    }),
    (prev, current) => prev.modal?.id === current.modal?.id && prev.show === current.show,
  );

  if (!modal) return null;

  const Modal = modal.component;
  const props = modal.props;

  if (Inner) return <Inner>{show && <Modal key={modal.id} {...props} />}</Inner>;

  return show ? <Modal key={modal.id} {...props} /> : null;
};
