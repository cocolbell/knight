import React, { useEffect } from 'react'
import { HashRouter, Switch, Link } from 'react-router-dom'
import { Menu } from 'antd'

import Entry from './pages/entry/index'
import History from './pages/history/index'
import './App.css';


function App() {

  return (
    <div className="App">
      <HashRouter>
        <Menu
          style={{ width: 156 }}
          defaultSelectedKeys={['1']}
          mode="inline"
        >
          <Menu.Item key="1"><Link to="/">输入文件</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/history">下载记录</Link></Menu.Item>
        </Menu>
        <div className="container">
          <Switch>
            <HashRouter exact path="/">
              <Entry />
            </HashRouter>
            <HashRouter path="/history">
              <History />
            </HashRouter>
          </Switch>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
