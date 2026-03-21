import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

// local imports
import styles from '../styles/inputfile.module.css'

//component for input files to session data - the props will be used as the name for the session data
const InputFile = (props) => {
    const t = useTranslations('upload')

    const [uploadState, setUploadState] = useState(false)
    const [uploadMessage, setUploadMessage] = useState('')
    const [uploadColour, setUploadColour] = useState("default")
    var uploadPageState = false
    if (props.pageName == "assesment"){
        uploadPageState = true
    }

    const onDrop = useCallback( (acceptedFiles) =>{
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            //check if file is .json
            if(file.path.split('.').pop()=='json' ){
                reader.onabort = () => console.warn('File Reading was aborted')
                reader.onerror = () => console.warn('file reading has failed')
                reader.onload = () => {
                    const results = reader.result
                    try {
                        const parsed = JSON.parse(results)
                        // Validate it has at least one question key or llmAnalysis
                        const hasQuestions = Object.keys(parsed).some(k => k.startsWith('question'))
                        const hasMetadata = 'Company Name' in parsed || 'llmAnalysis' in parsed
                        if (!hasQuestions && !hasMetadata) {
                            setUploadMessage(t('errorFormat'))
                            setUploadColour("red")
                            return
                        }
                    } catch {
                        setUploadMessage(t('errorFormat'))
                        setUploadColour("red")
                        return
                    }
                    sessionStorage.setItem(props.fileName, results)
                    location.reload()
                    setUploadState(true)
                }
                reader.readAsText(file)
            }else{
                console.warn("File wasn't a JSON")
                setUploadMessage(t('errorFormat'))
                setUploadColour("red")
            }
        });

    },[t],

    )

    const {getRootProps, getInputProps} = useDropzone({onDrop})
    return (
        <>
        <div {...getRootProps()} className = {uploadPageState? styles.pageNav:styles.uploadfile}>
          <input {...getInputProps()} />
          <p className="middle" style={{uploadColour,fontSize: "20px"}} >{uploadMessage || t('dropzone')}</p>
          <div className = "middle">
             <Image src = {uploadState? "/uploadSuccessful.png":"/dragndrop.png"} width={75} height = {75} className="middle" alt={uploadState ? "Upload successful" : "Drag and drop file"}/>
          </div>
        </div>

        </>
      );
}

export default InputFile;
