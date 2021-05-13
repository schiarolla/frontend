import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table } from './ui'

function Main() {

    const [data, setData] = useState()

    useEffect(() => {
        axios.get('http://localhost:4005/bmc')
            .then(response => setData(response.data))
    }, [])

    const handleRefresh = () => {
        axios.post('http://localhost:4005/bmc')
            .then(response => setData(response.data))
    }

    return (
        <div>
            <Table data={data} handleRefresh={handleRefresh} />
        </div>
    )
}

export { Main }
