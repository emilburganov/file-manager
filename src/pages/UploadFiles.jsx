import {useState} from 'react';
import {get, postFormData} from '../helpers/request.js';
import classnames from 'classnames';

const UploadFiles = () => {
    const [drag, setDrag] = useState(false);
    const [files, setFiles] = useState([]);

    const uploadFiles = async (formData) => {
        const result = await postFormData('/files', formData);
        setFiles(result);
    };

    const collectInputFiles = async (event) => {
        const formData = new FormData();

        setFiles([...event.target.files]);
        files.forEach((file) => formData.append('files[]', file));

        if (files.length) {
            await uploadFiles(formData);
        }
    };

    const collectDragAndDropFiles = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        setFiles([...event.dataTransfer.files]);
        files.forEach((file) => formData.append('files[]', file));

        if (files.length) {
            await uploadFiles(formData);
        }
    };

    const dragStartHandler = (event) => {
        event.preventDefault();
        setDrag(true);
    };

    const dragLeaveHandler = (event) => {
        event.preventDefault();
        setDrag(false);
    };

    const downloadFile = async (fileId) => {
        await get(`/files/{file:${fileId}`);
    }

    return (
        <div className="files">
            <div className="files__input-group">
                <div className="files__input input-group">
                    <label>Upload Files</label>
                    <input
                        onChange={(event) => collectInputFiles(event)}
                        type="file"
                        multiple
                    />
                </div>
            </div>
            <div className="files__drag-and-drop">
                <div
                    onDragStart={(event) => dragStartHandler(event)}
                    onDragOver={(event) => dragStartHandler(event)}
                    onDragLeave={(event) => dragLeaveHandler(event)}
                    onDrop={(event) => collectDragAndDropFiles(event)}
                    className="files__drag-and-drop-field"
                >
                {drag
                    ? <p>Release files to upload</p>
                    : <p>Drag and drop files to upload</p>
                }
                </div>
            </div>
            <div className="files__list">
                {files.map((file, index) =>
                    <div key={index} className="files__item">
                        <span className={classnames('files__status', file.success && 'uploaded')}></span>
                        <p>{file.file_id}</p>
                        а
                        <button
                            onClick={(file) => downloadFile(file.file_id)}
                            className={classnames( 'button', !file.success && 'danger-button')}
                            //disabled={!!file.success}
                        >
                            {!!file.success ? 'Download' : 'File not uploaded'}
                        </button>
                    </div>
                )}
            </div>
        </div>);
};

export default UploadFiles;