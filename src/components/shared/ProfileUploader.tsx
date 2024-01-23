
import  { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'

type ProfileUploaderProps = {
    fieldChange: (FILES: File[]) => void;
    mediaUrl: string;
}


const ProfileUploader = ({ fieldChange, mediaUrl }: ProfileUploaderProps) => {

    const [fileUrl, setFileUrl] = useState(mediaUrl)
    const [file, setFile] = useState<File[]>([])
     
     console.log(file)
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFile(acceptedFiles)
        fieldChange(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [])
    const { getRootProps, getInputProps  } = useDropzone(
        {
            onDrop,
            accept: {
                'image/*': ['.png', '.jpeg', '.jpg', '.svg']
            }
        })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {fileUrl ?
                (
                    <div className=' bg-dark-4 rounded  flex flex-col p-6 gap-2 items-center hover:cursor-pointer'>
                       <img src={fileUrl} alt="profile image" className='rounded-full h-44 w-44 hover:opacity-60'/>
                       <p>Click or Drag files to upload</p>
                    </div>
                )
                : (
                     <div className="flex flex-row justify-start">
                    <div className='rounded-full bg-dark-4 hover:bg-slate-800 h-52 w-52 flex flex-col justify-center items-center gap-2 hover:cursor-pointer'>
                     <img src="/assets/icons/add-post.svg" alt="" />
                     <p>Add Profile Pic</p>
                    </div>
                    </div>
                )

            }
        </div>
    )

}

export default ProfileUploader