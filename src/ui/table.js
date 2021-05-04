import React from 'react'
import MaterialTable from 'material-table'

const columns = [
    { title: 'Building', field: 'building', defaultGroupOrder: 0 },
    { title: 'Room', field: 'room', defaultGroupOrder: 1 },
    { title: 'Rack', field: 'rack', defaultGroupOrder: 2 },
    { title: 'Hostname', field: 'hostname' },
    { title: 'IP', field: 'ip' },
    { title: 'Manufacturer', field: 'manufacturer' },
    { title: 'Model', field: 'model' },
]

function Table({ data, handleClick }) {
    return (
        <div>
            <MaterialTable
                columns={columns}
                data={data || undefined}
                title='bmc_scan_data'
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
                    thirdSortClick: false,
                    exportButton: true
                }}
                detailPanel={row => (
                    <div style={{ padding: 25, marginLeft: 'calc(100vw / 4)' }}>
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
                            <b>Health:   </b>
                            {row.health.toUpperCase()}
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
