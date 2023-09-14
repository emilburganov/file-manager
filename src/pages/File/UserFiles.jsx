import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {destroy, get, getBlob} from '../../helpers/request.js';

const UserFiles = () => {
    const [files, setFiles] = useState([]);

    const getUserFiles = async () => {
        const result = await get('/files/disk');
        setFiles(result);
    };

    useEffect(() => {
        (async () => {
            await getUserFiles();
        })();
    }, []);

    const downloadFile = async (fileId) => {
        const result = await getBlob(`/files/${fileId}`);
        const blobURL = URL.createObjectURL(result);

        downloadBlob(blobURL);
    };

    const downloadBlob = (blobURL) => {
        const link = document.createElement('a');
        link.href = blobURL;
        link.download = name;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const destroyFile = async (fileId) => {
        const result = await destroy(`/files/${fileId}`);

        if (result.success) {
            setFiles(files.filter((file) => file.file_id !== fileId));
        }
    };

    return (
        <div className="files">
            <h2 className="files__title">User Files</h2>
            <div className="files__list">
                {files.map((file, index) =>
                    <div key={index} className="files__item files__card">
                        <p>ID: {file.file_id}</p>
                        <p>Name: {file.name}</p>
                        <div className="files__fields-group">
                            <button
                                onClick={() => destroyFile(file.file_id)}
                                className="button danger-button"
                            >
                                Destroy
                            </button>
                            <Link to={'/edit-file/' + file.file_id}>
                                <button className="button warning-button">
                                    Edit
                                </button>
                            </Link>
                            <Link to={'/file-permissons/' + file.file_id}>
                                <button className="button success-button">
                                    File Permissions
                                </button>
                            </Link>
                            <button
                                onClick={() => downloadFile(file.file_id)}
                                className="button"
                            >
                                Download
                            </button>
                        </div>
                    </div>,
                )}
            </div>
        </div>
    );
};

export default UserFiles;