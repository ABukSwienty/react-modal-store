# React Modal Store

Easily manage and display modals in your React app with this utility library. It simplifies modal handling without offering pre-built components, allowing for smooth integration with any UI library or custom components.

- [React Modal Store](#react-modal-store)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API](#api)
    - [`createModals`](#createmodals)
    - [Calling modals](#calling-modals)
    - [`ModalContainer`](#modalcontainer)
    - [`useModalStore`](#usemodalstore)
  - [A Note on Unmounting](#a-note-on-unmounting)
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

The modal object created with `createModals` accepts two arguments:

- props: The props for your modal
- options (optional): Callback functions for when the modal mounts and unmounts

```typescript
modal.alert(
  {
    title: 'Hello World!',
  },
  {
    onMount: () => {},
    onUnmount: () => {},
  },
);
```

### `ModalContainer`

The `<ModalContainer />` component should be placed at the root of your app. It is responsible for rendering the modals.

### `useModalStore`

`useModalStore` is a react hook that returns a dismiss function that can be used to dismiss the current modal.

## A Note on Unmounting

`r-modal-store` utilizes zustand store to mount and unmount modals. When a modal is dismissed, it is immediately removed.

This may cause issues with libraries like `framer-motion` when you want to apply animations on exit. To resolve this, control when the dismiss function is called.

### With `framer-motion`

```typescript
import { useModalStore } from 'r-modal-store';

const MyModal = () => {
  const [show, setShow] = useState(true);
  const { dismiss } = useModalStore();

  return (
    <AnimatePresence onExitComplete={dismiss}>
      {show && (
        <motion.div {...variantProps}>
          <h1>Hello World!</h1>
          <button onClick={dismiss}>Dismiss</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
```

## License

[MIT](LICENSE.md)
