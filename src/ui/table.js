import React from 'react'
import MaterialTable, { MTableGroupbar } from 'material-table'
import { Link, Tooltip } from '@material-ui/core'
import { PowerSettingsNew, Check, ReportProblemOutlined, ErrorOutlineOutlined } from '@material-ui/icons'

function Table({ data, handleReload }) {

    const management = {
        'hpe': 'https://oneview.mscpec.com',
        'hp': 'https://oneview.mscpec.com',
        'lenovo': 'https://xclarity.mscpec.com',
        'dell inc.': 'https://openmanage.mscpec.com',
    }

    const columns = [
        /*{ title: 'Building', field: 'building', defaultGroupOrder: 0 },*/
        { title: 'Room', field: 'room', defaultGroupOrder: 0, defaultGroupSort: 'asc' },
        { title: 'Rack', field: 'rack', defaultGroupOrder: 1, cellStyle: { textTransform: 'capitalize' }, defaultGroupSort: 'asc' },
        { title: 'Hostname', field: 'hostname', defaultSort: 'asc', grouping: false },
        { title: 'IP', field: 'ip', disableClick: true, grouping: false, render: row => <Link color='inherit' href={`https://${row.ip}`} target='_blank'>{row.ip}</Link> },
        { title: 'Manufacturer', field: 'manufacturer', disableClick: true, grouping: false, render: row => <Link color='inherit' href={management[row.manufacturer]} target='_blank'>{row.manufacturer}</Link> },
        { title: 'Model', field: 'model', grouping: false },
        {
            title: 'Power', field: 'power', disableClick: true, render: row =>
                <Tooltip title={row.power === 'on' ? 'Powered On' : 'Powered Off'}>
                    <PowerSettingsNew style={{ fontSize: 20, color: row.power === 'on' ? 'green' : 'red' }} />
                </Tooltip>
        },
        {
            title: 'Health', field: 'health', render: row =>
                row.health === 'ok' ?
                <Tooltip title='Healthy'>
                    <Check style={{ fontSize: 20, color: 'green' }} />
                </Tooltip> :
                row.health === 'warning' ?
                <Tooltip title='Warning'>
                    <ReportProblemOutlined style={{ fontSize: 22, color: 'darkkhaki', paddingTop: 2, paddingRight: 2 }} />
                </Tooltip> :
                row.health === 'critical' &&
                <Tooltip title='Critical'>
                    <ErrorOutlineOutlined style={{ fontSize: 22, color: 'darkred', paddingTop: 2, paddingRight: 3 }} />
                </Tooltip>
            }
        /*{ title: 'Health', field: 'health', render: row => <div style={row.health === 'ok' ? { color: 'green' } : { color: 'red' }}>{row.health}</div> },*/
    ]

    return (
        <div>
            <MaterialTable
                columns={columns}
                data={data || undefined}
                title='Network Scan Inventory'
                /*
                actions={[
                    { icon: 'build', tooltip: 'Reload Server', isFreeAction: false, onClick: handleReload, iconProps: { style: { fontSize: 20, color: 'gray' } } }
                ]}
                */
                options={{
                    rowStyle: {
                        textTransform: 'uppercase',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap'
                    },
                    paging: false,
                    showTitle: true,
                    padding: 'dense',
                    toolbarButtonAlignment: 'left',
                    thirdSortClick: false,
                    actionsColumnIndex: -1,
                    grouping: true,
                    exportButton: true,
                    exportFileName: 'bmc_scan_data'
                }}
                components={{
                    Groupbar: props => {
                        console.log(props)
                        return (
                            <MTableGroupbar {...props} />
                        )
                    }
                }}
                onRowClick={(event, rowData, togglePanel) => togglePanel()}
                detailPanel={row => (
                    <div style={{ padding: 25, marginLeft: 275 }}>
                        <div style={{ padding: 1 }}>
                            <b style={{ paddingRight: 5 }}>Sockets:</b>
                            {row.cpu_count}
                        </div>
                        <div style={{ padding: 1 }}>
                            <b style={{ paddingRight: 5 }}>Cpu Model:</b>
                            {row.cpu_model.toUpperCase()}
                        </div>
                        <div style={{ padding: 1 }}>
                            <b style={{ paddingRight: 5 }}>Asset Tag:</b>
                            {row.asset_tag.toUpperCase()}
                        </div>
                        <div style={{ padding: 1 }}>
                            <b style={{ paddingRight: 5 }}>Guid:</b>{row.guid.toUpperCase()}
                        </div>
                        <div style={{ padding: 1 }}>
                            <b style={{ paddingRight: 5 }}>Memory:</b>
                            {row.memory}GB
                        </div>
                        <div style={{ padding: 1 }}>
                            <b style={{ paddingRight: 5 }}>Serial Number:</b>
                            {row.serial_number.toUpperCase()}
                        </div>
                    </div>
                )}
            />
        </div>
    )
}

export default Table
