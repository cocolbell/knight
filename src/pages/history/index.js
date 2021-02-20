import React, { useEffect } from 'react'
import { Table } from 'antd';

const { ipcRenderer } = window.require('electron')

export default () => {

  useEffect(() => {
    ipcRenderer.on('knight-urls-reply', (event, arg) => {
      console.log(arg) // prints "pong"
    })
  }, [])

  return <Table columns={[
    { title: 'title', key: 'title', dataIndex: 'title' },
    { title: 'status', key: 'status', dataIndex: 'status' },
    { title: 'process', key: 'process', dataIndex: 'process' }
  ]} dataSource={[]} />
}