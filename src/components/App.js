import React from 'react'
import Users from '../pages/Users'
import Profile from '../pages/Profile'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

const App = () => (
        <BrowserRouter>
            <Routes>
                <Route path="/users" element={<Users />}/>
                <Route path="/users/:userProfile" element={<Profile />}/>
            </Routes>
        </BrowserRouter>
)

export default App

