import React, {useCallback, useState} from 'react';
import './styles.css';
import {useDropzone} from 'react-dropzone';
import {FiUpload} from 'react-icons/fi';

interface Props{
    onFileUploaded:(file:File) => void;
}

const Dropzone: React.FC<Props> = ({onFileUploaded}) => {
  
    const [selecteFileUrl,setSelectedFileUrl] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file);
        setSelectedFileUrl(fileUrl);
        onFileUploaded(file);
    }, [onFileUploaded])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: 'image/*'
        })

    return (
        <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} accept="image/*" />
        
            {selecteFileUrl
                ? <img src={selecteFileUrl} alt=""/>
                : (
                    isDragActive ?
                    <p>Solte a imagem aqui ...</p> :
                    <p> <FiUpload/> Insira a imagem do estabelecimento.</p>
                )
            }
        
        </div>
    )
    }

export default Dropzone;