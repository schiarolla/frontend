import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { Table } from './ui'

const socket = io()

function Main() {

    const [data, setData] = useState()

    useEffect(() => socket.on('database', results => setData(results)), [])

    const handleRefresh = () => {
        socket.emit('refresh', results => setData(results))
    }

    const handleReload = (event, server) => {
        socket.emit('reload', server)
    }

    return (
        <div>
            <Table data={data} handleRefresh={handleRefresh} handleReload={handleReload} />
        </div>
    )
}

export { Main }
