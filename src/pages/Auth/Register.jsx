import {useContext, useState} from 'react';
import {post} from '../../helpers/request.js';
import classnames from 'classnames';
import {AuthContext} from '../../context/index.js';

const Register = () => {
    const {setAuth} = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const register = async (event) => {
        event.preventDefault();
        const result = await post('/registration', credentials);

        if (!result.success) {
            const errors = result.message;
            setErrors(errors);
        } else {
            const token = result.token;
            localStorage.setItem('token', token)
            setAuth(true);
        }
    };

    return (
        <div className="auth">
            <form className="form">
                <h3>Register</h3>
                <div className="input-group">
                    <label>First Name</label>
                    <input
                        onChange={(event) =>
                            setCredentials({...credentials, first_name: event.target.value})}
                        className={classnames('input', errors.first_name && 'error')}
                        type="text"
                    />
                </div>
                {errors.first_name && <p className="form__error">{errors.first_name}</p>}
                <div className="input-group">
                    <label>Last Name</label>
                    <input
                        onChange={(event) =>
                            setCredentials({...credentials, last_name: event.target.value})}
                        className={classnames('input', errors.last_name && 'error')}
                        type="text"
                    />
                </div>
                {errors.last_name && <p className="form__error">{errors.last_name}</p>}
                <div className="input-group">
                    <label>Email</label>
                    <input
                        onChange={(event) =>
                            setCredentials({...credentials, email: event.target.value})}
                        className={classnames('input', errors.email && 'error')}
                        type="text"
                    />
                </div>
                {errors.email && <p className="form__error">{errors.email}</p>}
                <div className="input-group">
                    <label>Password</label>
                    <input
                        onChange={(event) =>
                            setCredentials({...credentials, password: event.target.value})}
                        className={classnames('input', errors.password && 'error')}
                        type="password"
                    />
                </div>
                {errors.password && <p className="form__error">{errors.password}</p>}
                <button onClick={register} className="button">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;