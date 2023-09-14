import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {destroy, get, post} from '../../helpers/request.js';
import classnames from 'classnames';

const FilePermissons = () => {
    const {id} = useParams();
    const [users, setUsers] = useState([]);

    const [credentials, setCredentials] = useState({});
    const [errors, setErrors] = useState({});
    const [messages, setMessages] = useState({});

    const getFile = async () => {
        const result = await get('/files/disk');
        const file = result.find((file) => file.file_id === id)
        setUsers(file.accesses);
    };

    const addPermissons = async (event) => {
        event.preventDefault();
        const result = await post(`/files/${id}/access`, credentials);

        if (!Array.isArray(result)) {
            setMessages({});
            setErrors({email: result.message})

        } else {
            setUsers(result);
            setErrors({});
            setMessages({email: 'User successfully permitted'})
        }
    }

    const destroyPermisson = async (email) => {
        const result = await destroy(`/files/${id}/access`, {email});

        if (result.success !== false) {
            const email = result[0].email;
            setUsers(users.filter((user) => user.email !== email));
        }
    }

    useEffect(() => {
        (async () => {
            await getFile();
        })();
    }, []);

    return (
        <div className="files">
            <h2 className="files__title">Add Permissons For User</h2>
            <form className="form">
                <div className="input-group">
                    <label>Email</label>
                    <input
                        onChange={(event) =>
                            setCredentials({...credentials, email: event.target.value})}
                        className={classnames('input', errors.email && 'error', messages.email && 'success')}
                        type="text"
                    />
                </div>
                {errors.email && <p className="form__error">{errors.email}</p>}
                {messages.email && <p className="form__message">{messages.email}</p>}

                <button onClick={(event) => addPermissons(event)} className="button">
                    Add Permissons
                </button>
            </form>
            <h2 className="files__title">Users</h2>
            <div className="files__list">
                {users.map((user, index) =>
                    <div key={index} className="files__item files__card">
                        <p>Full Name: {user.fullname}</p>
                        <p>Name: {user.email}</p>
                        <div className="files__fields-group">
                            <button
                                onClick={() => destroyPermisson(user.email)}
                                className="button danger-button"
                            >
                                Destroy Permisson
                            </button>
                        </div>
                    </div>,
                )}
            </div>
        </div>
    );
};

export default FilePermissons;