import {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Header from './components/Header.jsx';
import UploadFiles from './pages/UploadFiles.jsx';
import {AuthContext} from './context/index.js';
import './styles/App.css';

function App() {
    const token = localStorage.getItem('token');
    const [isAuth, setAuth] = useState(!!token);

    return (
        <AuthContext.Provider value={{isAuth, setAuth}}>
            <BrowserRouter>
                <Header/>
                <div className="container">
                    {isAuth ?
                        <Routes>
                            <Route path="/upload-files" element={<UploadFiles/>}/>
                            <Route index path="*" element={<Home/>}/>
                        </Routes>
                        :
                        <Routes>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route index path="*" element={<Home/>}/>
                        </Routes>
                    }
                </div>
            </BrowserRouter>
        </AuthContext.Provider>

    );
}

export default App;
