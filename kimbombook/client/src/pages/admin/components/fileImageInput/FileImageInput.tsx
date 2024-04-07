import { useEffect, useRef, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../../../../firebase/config'

import styles from './fileImageInput.module.css'

interface FileInputImageProps {
  fileImageUrl: string
  setFileImageUrl: (fileImageUrl: string) => void
  type: 'books' | 'authors'
}

const FileImageInput: React.FC<FileInputImageProps> = ({ fileImageUrl, setFileImageUrl, type }) => {
  const fileRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [filePercent, setFilePercent] = useState<number>(0)
  const [fileUploadError, setFileUploadError] = useState<boolean>(false)

  useEffect(() => {
    if (file != null) {
      handleFileUpload(file)
    }
  }, [file])

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleFileUpload = (file: File) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, `${type}/${fileName}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePercent(Math.round(progress))
      },
      error => {
        console.log(error)
        setFileUploadError(true)
      },
      () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileImageUrl(downloadURL)
        })
      }
    )
  }

  return (
    <div className={styles.fileImageInput}>
      <input
        type='file'
        ref={fileRef}
        hidden
        accept='image/*'
        onChange={(e) => {
          if (e.target.files != null) {
            setFile(e.target.files[0])
          }
        }}
      />

      <img
        onClick={() => { fileRef.current?.click() }}
        src={fileImageUrl}
        className={styles.fileImageInput__image}
      />
      <p className={styles.fileImageInput__message}>
        {fileUploadError
          ? (<span className={styles.red}>Error Image Upload</span>)
          : filePercent > 0 && filePercent < 100
            ? (<span>{`Uploading ${filePercent}%`}</span>)
            : filePercent === 100
              ? (<span className={styles.green}>Succesfully uploaded!</span>)
              : ('')
          }
      </p>
    </div>
  )
}

export default FileImageInput
