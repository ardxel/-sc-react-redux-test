import React, {useEffect, useState} from 'react';
import styles from './editfile.module.scss';
import Wrapper from "../../components/wrapper/Wrapper";
import {IconButton, Input} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../../redux/reduxHooks";
import {editFile, getFile} from "../../redux/filesThunk";
import {changeText} from "../../redux/editFileSlice";
import {HighlightWithinTextarea} from 'react-highlight-within-textarea'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import {useEditFileSelector} from "../../redux/selectors";
import {RequestEditFile} from "../../redux/apiModels";

type EditFilePageProps = {}

const EditFilePage: React.FC<EditFilePageProps> = () => {
  const {filename} = useParams<{ filename: string }>()
  const {file, isLoading, editText} = useEditFileSelector();
  const [searchTerm, setSearchTerm] = useState<string | null>('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (filename) {
      dispatch(getFile(filename))
    } else {
      navigate('/');
    }
  }, [filename])

  const applyHighlights = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) {
      setSearchTerm(null)
    } else {
      setSearchTerm(val);
    }
  }

  const handleChangeText = (nextValue: string) => {
    dispatch(changeText(nextValue))
  }

  const _handleSubmit = () => {
    const body = {name: file?.name as string, text: editText} as RequestEditFile;
    dispatch(editFile(body))
  }

  return (
      <Wrapper>
        <div className={styles.buttons}>
          <span className={styles.name}>{file?.name}</span>
          <IconButton className={styles.send} onClick={_handleSubmit}
                      title='confirm new changes'
                      sx={{display: (file?.text !== editText) ? 'inline-flex' : 'none'}}>
            <CheckBoxIcon color='secondary'/>
          </IconButton>
          <Input disableUnderline className={styles.search} onChange={applyHighlights} type='text'
                 startAdornment={<SearchIcon/>}/>
        </div>
        <div className={styles.editor}>
          {isLoading && <div>Loading...</div>}
          {<HighlightWithinTextarea value={editText} highlight={searchTerm} onChange={handleChangeText}/>}
        </div>
      </Wrapper>
  )
};

export default EditFilePage;