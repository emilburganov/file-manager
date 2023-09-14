import {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/index.js';
import {get} from '../helpers/request.js';

const Header = () => {
    const {isAuth, setAuth} = useContext(AuthContext);

    const logout = async () => {
        const result = await get('/logout');

        if (result.success) {
            localStorage.removeItem('token');
            setAuth(false);
        }
    };

    return (
        <header className="header">
            <div className="header__container">
                <Link to="/" className="header__logo">
                    File Manager
                </Link>
                {isAuth &&
                    <nav className="header__nav">
                        <Link to="/upload-files">Upload Files</Link>
                        <Link to="/user-files">User Files</Link>
                        <Link to="/access-files">Access Files</Link>
                    </nav>
                }
                {isAuth ?
                    <div className="header__buttons">
                        <button onClick={logout} className="button">
                            Logout
                        </button>
                    </div>
                    :
                    <div className="header__buttons">
                        <Link to="/login">
                            <button className="button">
                                Login
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="button">
                                Register
                            </button>
                        </Link>
                    </div>
                }
            </div>
        </header>
    );
};

export default Header;