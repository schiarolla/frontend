import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { Table } from './ui'

const socket = io()

function Main() {

    const [data, setData] = useState()

    useEffect(() => socket.on('database', results => setData(results)), [])

    const handleClick = () => {
        socket.emit('refresh', results => setData(results))
    }

    return (
        <div>
            <Table data={data} handleClick={handleClick} />
        </div>
    )
}

export { Main }
