import React, {PropsWithChildren} from 'react';
import styles from './wrapper.module.scss';

type WrapperProps = {};

const Wrapper: React.FC<PropsWithChildren<WrapperProps>> = (props) => {
  return (
      <main className={styles.main}>
        <div className={styles.container}>
          {props.children}
        </div>
      </main>
  )
};

export default Wrapper