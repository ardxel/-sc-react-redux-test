import React, {useState} from 'react';
import styles from './cardfile.module.scss';
import {TextFile} from "../../models/TextFile";
import {IconButton} from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch} from "../../redux/reduxHooks";
import {deleteFile} from "../../redux/filesThunk";
import AppModal from "../modal/AppModal";
import {useNavigate} from "react-router-dom";

type CardFileProps = TextFile

const CardFile: React.FC<CardFileProps> = (props) => {
  const [showText, setShowText] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { name, text, lastModified } = props;

  const dispatch = useAppDispatch();

  const handleShowText = () => {
    setShowText((val) => !val)
  }

  const removeModal = () => setShowDeleteModal(false);

  const showModal = () => setShowDeleteModal(true);

  const _submitDeleteFile = () => {
    dispatch(deleteFile(name));
    removeModal();
  }
  const navigateToEdit = () => {
    if (name) {
      navigate(`/edit/${name}`)
    }
  }
  return (
      <div className={styles.file}>
        {!showText && <div className={styles.background}></div>}
        {!showText && <div className={styles.name}>{name.replace('.txt', '')}</div>}
        <div className={styles.modified}>
          <span>{lastModified[0]}</span>
          <span>{lastModified[1]}</span>
        </div>
        <div className={styles.text} style={{overflowY: showText ? 'scroll' : 'hidden'}}>
          {text.substring(0, (showText ? text.length : 500))}
        </div>
        <div className={styles.fileEditBtns}>
          <IconButton className={styles.watch} title='show text' onClick={handleShowText}><FindInPageIcon/></IconButton>
          <IconButton className={styles.edit} title='edit text' onClick={navigateToEdit}><ArticleIcon/></IconButton>
          <IconButton className={styles.delete} title='delete file' onClick={showModal}><DeleteIcon/></IconButton>
        </div>
        <AppModal show={showDeleteModal}>
          <span className={styles.modalTitle}>Are you sure you want to delete this file?</span>
          <div className={styles.modalBtns}>
            <button onClick={_submitDeleteFile} title='delete'>Delete</button>
            <button onClick={removeModal} title='cancel'>Cancel</button>
          </div>
        </AppModal>
      </div>
  )
};

export default CardFile