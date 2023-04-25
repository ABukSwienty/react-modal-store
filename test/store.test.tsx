import React from 'react';
import { describe, it, expect } from 'vitest';
import { modalStore } from '../src/store';

const Modal = () => <div>Modal</div>;

describe('store', () => {
  it('should be able to get the modal', () => {
    const modal = modalStore.getState();

    expect(modal).toBeTruthy();
    expect(modal.modal).toBeNull();
  });

  it('should be able to set the modal', () => {
    const modal = modalStore.getState();

    modal.setModal(Modal, {});

    expect(modalStore.getState().modal?.component).toEqual(Modal);
  });

  it('should be able to clear the modal', () => {
    const modal = modalStore.getState();

    modal.setModal(Modal, {});

    expect(modalStore.getState().modal?.component).toEqual(Modal);

    modal.dismiss();

    expect(modalStore.getState().show).toBeFalsy();
  });

  it('should create unique ids', () => {
    const modal = modalStore.getState();

    modal.setModal(Modal, {});

    const prevId = modalStore.getState().modal?.id;

    modal.setModal(Modal, {});

    const nextId = modalStore.getState().modal?.id;

    expect(prevId).not.toEqual(nextId);
  });
});
