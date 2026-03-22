import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const InputFile = (props) => {
  const t = useTranslations('upload');
  const [uploadState, setUploadState] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadColour, setUploadColour] = useState('default');
  const uploadPageState = props.pageName === 'assesment';

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      if (file.path.split('.').pop() === 'json') {
        reader.onabort = () => console.warn('File Reading was aborted');
        reader.onerror = () => console.warn('file reading has failed');
        reader.onload = () => {
          const results = reader.result;
          try {
            const parsed = JSON.parse(results);
            const hasQuestions = Object.keys(parsed).some(k => k.startsWith('question'));
            const hasMetadata = 'Company Name' in parsed || 'llmAnalysis' in parsed;
            if (!hasQuestions && !hasMetadata) {
              setUploadMessage(t('errorFormat'));
              setUploadColour('red');
              return;
            }
          } catch {
            setUploadMessage(t('errorFormat'));
            setUploadColour('red');
            return;
          }
          sessionStorage.setItem(props.fileName, results);
          location.reload();
          setUploadState(true);
        };
        reader.readAsText(file);
      } else {
        console.warn("File wasn't a JSON");
        setUploadMessage(t('errorFormat'));
        setUploadColour('red');
      }
    });
  }, [t]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <motion.div
        {...getRootProps()}
        className={
          uploadPageState
            ? 'flex justify-around items-center py-3 px-[10%] bg-white/5 border-b border-cyan-400/30'
            : 'border-2 border-dashed border-white/20 rounded-xl p-6 text-center cursor-pointer bg-white/5 backdrop-blur-sm transition-all duration-200 hover:border-cyan-400/50'
        }
        whileHover={uploadPageState ? undefined : { scale: 1.01 }}
        transition={{ duration: 0.15 }}
      >
        <input {...getInputProps()} />
        <p className={`text-lg ${uploadColour === 'red' ? 'text-red-400' : 'text-slate-300'}`}>
          {uploadMessage || t('dropzone')}
        </p>
        <div className="flex justify-center">
          <Image
            src={uploadState ? '/uploadSuccessful.png' : '/dragndrop.png'}
            width={75}
            height={75}
            alt={uploadState ? 'Upload successful' : 'Drag and drop file'}
          />
        </div>
      </motion.div>
    </>
  );
};

export default InputFile;
