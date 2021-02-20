import React, { useEffect } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'

const { ipcRenderer } = window.require('electron')

export default () => {

  useEffect(() => {
    ipcRenderer.on('knight-urls-reply', (event, arg) => {
      console.log(arg) // prints "pong"
    })
  }, [])

	const onFinish = (values) => {
		if (values.url) {
			ipcRenderer.send('knight-urls-download', values)
		}
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
		<Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="url"
        name="url"
        rules={[{ required: true, message: 'url必须要填哦' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
					开始下载
        </Button>
      </Form.Item>
    </Form>
	)
}