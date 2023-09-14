import {useEffect, useState} from 'react';
import {get, getBlob} from '../../helpers/request.js';

const AccessFiles = () => {
    const [files, setFiles] = useState([]);

    const getAccessFiles = async () => {
        const result = await get('/shared');
        setFiles(result);
    };

    useEffect(() => {
        (async () => {
            await getAccessFiles();
        })();
    }, []);

    const downloadFile = async (fileId) => {
        const result = await getBlob('/files/' + fileId);
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

    return (
        <div className="files">
            <h2 className="files__title">Access Files</h2>
            <div className="files__list">
                {files.map((file, index) =>
                    <div key={index} className="files__item files__card">
                        <p>ID: {file.file_id}</p>
                        <p>Name: {file.name}</p>
                        <div className="files__fields-group">
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

export default AccessFiles;