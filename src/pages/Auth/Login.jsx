import {useState, useContext} from 'react';
import {post} from '../../helpers/request.js';
import classnames from 'classnames';
import {AuthContext} from '../../context/index.js';

const Login = () => {
    const {setAuth} = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const login = async (event) => {
        event.preventDefault();
        const result = await post('/authorization', credentials);

        if (!result.success) {
            setErrors({
                email: 'Invalid login or password.',
                password: 'Invalid login or password.',
            });
        } else {
            const token = result.token;
            localStorage.setItem('token', token);
            setAuth(true);
        }
    };

    return (
        <div className="auth">
            <form className="form">
                <h3>Login</h3>
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
                <button onClick={login} className="button">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;