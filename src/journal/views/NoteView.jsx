import { SaveOutlined, UploadOutlined } from '@mui/icons-material';
import {React,useEffect,useMemo, useRef} from 'react'
import { Button, Grid, TextField, Typography ,IconButton} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ImageGallery } from '../components';
import {useForm} from '../../hooks/useForm';
import { setActiveNote, startSaveNote,starUploadingFiles } from '../../store/journal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


export const NoteView = () => {

  const dispatch = useDispatch();
  const {active:note, messageSaved , isSaving} = useSelector(state => state.journal);
  const {body, title,date , onInputChange, formState} = useForm(note);
  const fileInputRef = useRef();

  const datetring = useMemo(()=>{
    const newDate = new Date(date);
    return newDate.toUTCString();
  },[date]);

  useEffect(()=>{
    dispatch(setActiveNote(formState));
  },[formState]);

  useEffect(() => {
    if(messageSaved.length > 0){
      Swal.fire('Nota actualizada', messageSaved, 'success');
    }
  }, [messageSaved])
  

  const onSaveNote = () => {

    dispatch(startSaveNote());
  }

  const onFileInputChange = ({target}) =>{

    if(target.files === 0) return;
    console.log('subiendo archivos');
    dispatch(starUploadingFiles(target.files));
  }

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{datetring}</Typography>
        </Grid>
        <Grid item>
          
          <input
            type='file'
            multiple
            ref={fileInputRef}
            onChange={onFileInputChange}
            style={{display:'none'}}
          />

          <IconButton 
            color="primary"
            disabled={isSaving}
            onClick={()=> fileInputRef.current.click()}
          >
            <UploadOutlined/>
          </IconButton>
            <Button 
                disabled={isSaving}
                onClick={onSaveNote}
                color="primary" sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb: 1 }}
                name="title"
                value={title}
                onChange={onInputChange}
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
                name="body"
                value={body}
                onChange={onInputChange}
            />
        </Grid>

        {/* Image gallery */}
        <ImageGallery />

    </Grid>
  )
}
