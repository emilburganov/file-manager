import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import classnames from 'classnames';
import {patch} from '../../helpers/request.js';

const EditFile = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({});
    const [errors, setErrors] = useState({});
    const [messages, setMessages] = useState({});

    const editFile = async (event) => {
        event.preventDefault();
        const result = await patch(`/files/${id}`, credentials);

        if (!result.success) {
            setErrors(result.message);
            setMessages({});
        } else {
            setErrors({});
            setMessages({name: result.message});
        }
    };

    return (
        <div className="files">
            <h2 className="files__title">Edit File</h2>
            <form className="form">
                <div className="input-group">
                    <label>Name</label>
                    <input
                        onChange={(event) =>
                            setCredentials({...credentials, name: event.target.value})}
                        className={classnames('input', errors.name && 'error', messages.name && 'success')}
                        type="text"
                    />
                </div>
                {errors.name && <p className="form__error">{errors.name}</p>}
                {messages.name && <p className="form__message">{messages.name}</p>}

                <button onClick={(event) => editFile(event)} className="button">
                    Edit
                </button>
            </form>
            <button onClick={() => navigate('/user-files')} className="button">
                Back
            </button>
        </div>
    );
};

export default EditFile;