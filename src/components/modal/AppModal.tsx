import React from 'react';
import styles from './modal.module.scss';
import {Box, Modal} from "@mui/material";

interface AppModalProps {
  show: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

const AppModal: React.FC<AppModalProps> = (props) => {
  const {show, children, onClose} = props;
  return (
      <Modal open={show} onClose={onClose}>
        <Box className={styles.modal}>
          {children}
        </Box>
      </Modal>
  )
};

export default AppModal;