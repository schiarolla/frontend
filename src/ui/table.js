import React from 'react'
import MaterialTable from 'material-table'
import { Link } from '@material-ui/core'

const management = {
    'hpe': 'https://oneview.mscpec.com',
    'hp': 'https://oneview.mscpec.com',
    'lenovo': 'https://xclarity.mscpec.com',
    'dell inc.': 'https://openmanage.mscpec.com',
}

const columns = [
    { title: 'Building', field: 'building', defaultGroupOrder: 0 },
    { title: 'Room', field: 'room', defaultGroupOrder: 1 },
    { title: 'Rack', field: 'rack', defaultGroupOrder: 2, cellStyle: { textTransform: 'capitalize' } },
    { title: 'Hostname', field: 'hostname' },
    { title: 'IP', field: 'ip', disableClick: true, render: row => <Link color='inherit' href={`https://${row.ip}`} target='_blank'>{row.ip}</Link> },
    { title: 'Manufacturer', field: 'manufacturer', disableClick: true, render: row => <Link color='inherit' href={management[row.manufacturer]} target='_blank'>{row.manufacturer}</Link> },
    { title: 'Model', field: 'model' },
    { title: 'Power', field: 'power', render: row => <div style={row.power === 'on' ? { color: 'green' } : { color: 'red' }}>{row.power}</div> },
    { title: 'Health', field: 'health', render: row => <div style={row.health === 'ok' ? { color: 'green' } : { color: 'red' }}>{row.health}</div> },
]

function Table({ data, handleClick }) {
    return (
        <div>
            <MaterialTable
                columns={columns}
                data={data || undefined}
                actions={[
                    { icon: 'refresh', tooltip: 'Refresh BMC Data', isFreeAction: true, onClick: handleClick }
                ]}
                options={{
                    rowStyle: {
                        textTransform: 'uppercase',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap'
                    },

                    paging: false,
                    showTitle: false,
                    padding: 'dense',
                    toolbarButtonAlignment: 'left',
                    thirdSortClick: false
                }}
                onRowClick={(event, rowData, togglePanel) => togglePanel()}
                detailPanel={row => (
                    <div style={{ padding: 25, marginLeft: 275 }}>
                        <div>
                            <b>Sockets:   </b>
                            {row.cpu_count}
                        </div>
                        <div>
                            <b>Cpu Model:   </b>
                            {row.cpu_model.toUpperCase()}
                        </div>
                        <div>
                            <b>Asset Tag:   </b>
                            {row.asset_tag.toUpperCase()}
                        </div>
                        <div>
                            <b>Guid:   </b>{row.guid.toUpperCase()}
                        </div>
                        <div>
                            <b>Memory:   </b>
                            {row.memory}GB
                        </div>
                        <div>
                            <b>Serial Number:   </b>
                            {row.serial_number.toUpperCase()}
                        </div>
                    </div>
                )}
            />
        </div>
    )
}

export default Table
