import React, {useEffect, useMemo, useState} from 'react';
import styles from './filespage.module.scss';
import Wrapper from '../../components/wrapper/Wrapper';
import {IconButton, Input, InputLabel} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import CardFile from "../../components/card-file/CardFile";
import {useAppDispatch} from "../../redux/reduxHooks";
import {createNewFile, getAllFiles} from "../../redux/filesThunk";
import {useAllFilesSelector} from "../../redux/selectors";
import {searchFiles} from "../../redux/filesSlice";
import AppModal from "../../components/modal/AppModal";
import TextEditorHelper from "./textEditorHelper";

type HelperModalProps = {
  show: boolean;
  onClose: () => void
}
const HelperModal: React.FC<HelperModalProps> = (props) => {
  const {show, onClose} = props;
  return (
      <AppModal show={show} onClose={onClose}>
        <div className={styles.help}>
          <TextEditorHelper/>
        </div>
      </AppModal>
  )
}

type NewFileModalProps = HelperModalProps;

const NewFileModal: React.FC<NewFileModalProps> = (props) => {
  const [filename, setFilename] = useState<string>('');

  const { show, onClose } = props

  const validateError = useMemo(() => {
    if (filename.length  === 0) {
      return 'filename is required';
    }

    if(filename.length > 256) {
      return 'maximum length limit of filename is 256 characters';
    }

    if (!/^([a-zA-Z0-9\s\._-]+)$/.test(filename)) {
      return 'filename is not valid'
    }
  }, [filename])

  const dispatch = useAppDispatch();

  const handleInputFilename = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      setFilename(val);
    } else {
      setFilename('');
    }
  }

  const handleSubmitNewFile = () => {
    if (!validateError) {
      dispatch(createNewFile(filename));
      onClose();
    }
  }

  return (
      <AppModal show={show} onClose={onClose}>
        <div className={styles.newFileWrap}>
          <InputLabel className={styles.inputLabel}>Enter file name</InputLabel>
          {validateError && <span className={styles.error}>{validateError}</span>}
          <Input disableUnderline type='text' placeholder='notes...' className={styles.input}
                 onChange={handleInputFilename}/>
          <div className={styles.newFileBtns}>
            <button onClick={handleSubmitNewFile} disabled={!!validateError} title='create new file'>Confirm</button>
            <button onClick={onClose} title='cancel'>Cancel</button>
          </div>
        </div>
      </AppModal>
  )
}

const FilesPage: React.FC<{}> = () => {
  const {filteredFiles, isLoading} = useAllFilesSelector();
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [createNewFileModal, setCreateNewFileModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllFiles());
  }, [])

  const handleSearchFile = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(searchFiles(value));
  }

  return (
      <Wrapper>
        <div className={styles.buttons}>
          <Input disableUnderline className={styles.search} onChange={handleSearchFile} type='text'
                 startAdornment={<SearchIcon/>}/>
          <IconButton className={styles.add} onClick={() => setCreateNewFileModal(true)} title='create new file'><AddBoxIcon/></IconButton>
          <IconButton className={styles.info} onClick={() => setShowHelpModal(true)} title='help'><HelpCenterIcon/></IconButton>
        </div>
        <div className={styles.files}>
          {isLoading ? <div>Loading...</div> : filteredFiles?.map(file => {
            return (
                <CardFile {...file} key={file.name}/>
            )
          })}
        </div>

        <HelperModal show={showHelpModal} onClose={() => setShowHelpModal(false)}/>
        <NewFileModal show={createNewFileModal} onClose={() => setCreateNewFileModal(false)} />
      </Wrapper>
  )
};

export default FilesPage;