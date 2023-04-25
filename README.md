# React Modal Store

[![npm version](https://badge.fury.io/js/r-modal-store.svg)](https://badge.fury.io/js/r-modal-store)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Headless modal management for React

Easily manage and display modals in your React app with this utility library. It simplifies modal handling without offering pre-built components, allowing for smooth integration with any UI library or custom components.

- [React Modal Store](#react-modal-store)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API](#api)
    - [`createModals`](#createmodals)
    - [Calling modals](#calling-modals)
    - [`ModalContainer`](#modalcontainer)
    - [`useModalStore`](#usemodalstore)
    - [With `framer-motion`](#with-framer-motion)
  - [License](#license)

## Installation

To install using npm:

```bash copy
npm install r-modal-store
```

To install using yarn:

```bash copy
yarn add r-modal-store
```

## Usage

1. Add the `<ModalContainer />` to the root of your app.

```tsx
import { ModalContainer } from 'r-modal-store';

const App = () => {
  return (
    <div>
      <ModalContainer />
      {/* rest of your app */}
    </div>
  );
};
```

2. Create a modal object.

```typescript
import { createModals } from 'r-modal-store';
import MyAlertModal from './MyAlertModal';
import MyConfirmModal form './MyConfirmModal';

const modals = createModals({
  alert: MyAlertModal,
  confirm: MyConfirmModal,
});
```

3. Invoke your modal anywhere in your app.

```tsx
import React from 'react';
import { Button } from 'my-ui-library';
import modal from './modal';

const MyComponent = () => {
  const handleClick = () => {
    modal.alert({ title: 'Hello World!' });
  };

  return <Button onClick={handleClick}>Open Modal</Button>;
};
```

4. Dismiss your modal

```typescript
import { useModalStore } from 'r-modal-store';

const MyModal = () => {
  const { dismiss } = useModalStore();

  return (
    <div>
      <h1>Hello World!</h1>
      <button onClick={dismiss}>Dismiss</button>
    </div>
  );
};
```

## API

### `createModals`

This function creates an object that maps the provided modals to a key and returns a callable function. The callable function takes in the props for that modal and an options object.

### Calling modals

The modal object created with `createModals` accepts one argument:

- props: The props for your modal

```typescript
modal.alert({
  title: 'Hello World!',
});
```

### `ModalContainer`

The `<ModalContainer />` component should be placed at the root of your app. It is responsible for rendering the modals.

It accepts one argument:

- inner: A React function component. This is useful if you need need to wrap you modal with a parent component that needs to pass on a ref.

```tsx
import { ModalContainer } from 'r-modal-store';

const App = () => {
  return (
    <div>
      <ModalContainer inner={MyModalContainer} />
      {/* rest of your app */}
    </div>
  );
};
```

### `useModalStore`

`useModalStore` is a react hook that returns a dismiss function that can be used to dismiss the current modal.

### With `framer-motion`

In order to pick up on the exit animation, you can pass in the `AnimatePresence` component as the `inner` prop to the `<ModalContainer />` component.

```tsx
import { ModalContainer } from 'r-modal-store';

const App = () => {
  return (
    <div>
      <ModalContainer inner={AnimatePresence} />
      {/* rest of your app */}
    </div>
  );
};
```

```tsx
import { useModalStore } from 'r-modal-store';

const MyModal = () => {
  const { dismiss } = useModalStore();

  return (
    <motion.div {...variantProps}>
      <h1>Hello World!</h1>
      <button onClick={dismiss}>Dismiss</button>
    </motion.div>
  );
};
```

## License

[MIT](LICENSE.md)
