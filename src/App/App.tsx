import objstr from 'obj-str';
import * as React from 'react';
import styles from './App.block.css';

export default function App() {
  const style = objstr({
    [styles]: true,
  });
  return <h1 className={style}>Hello world!</h1>;
}
