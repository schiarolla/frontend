import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Main } from './main'
import 'typeface-roboto'

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='*' element={<Main />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
)
