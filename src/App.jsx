import {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import Header from './components/Header.jsx';
import UploadFiles from './pages/File/UploadFiles.jsx';
import UserFiles from './pages/File/UserFiles.jsx';
import FilePermissons from './pages/File/FilePermissons.jsx';
import EditFile from './pages/File/EditFile.jsx';
import AccessFiles from './pages/File/AccessFiles.jsx';
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
                            <Route path="/user-files" element={<UserFiles/>}/>
                            <Route path="/file-permissons/:id" element={<FilePermissons/>}/>
                            <Route path="/edit-file/:id" element={<EditFile/>}/>
                            <Route path="/access-files" element={<AccessFiles/>}/>
                            <Route index path="*" element={<UploadFiles/>}/>
                        </Routes>
                        :
                        <Routes>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route index path="*" element={<Login/>}/>
                        </Routes>
                    }
                </div>
            </BrowserRouter>
        </AuthContext.Provider>

    );
}

export default App;
