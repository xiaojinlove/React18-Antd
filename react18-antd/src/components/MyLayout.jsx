import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  ReadOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import logo from '../assets/logo.jpeg'

const { Header, Sider, Content } = Layout;

const MyLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{width: '100vw', height: '100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logoImg">
          <img src={logo} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={({key}) => {
            console.log(key);
          }}
          items={[
            {
              key: '/admin/student_menu',
              icon: <UserOutlined />,
              label: '学生列表',
              children: [{
                label: '学生分类',
                key: '/admin/student_type'
              },{
                label: '学生列表',
                key: '/admin/student_list'
              },]
            },
            {
              key: '/admin/class_menu',
              icon: <ReadOutlined />,
              label: '班级管理',
              children: [{
                label: '班级分类',
                key: '/admin/class_type'
              },{
                label: '班级列表',
                key: '/admin/class_list'
              },]
            },
            {
              key: '/admin/course_menu',
              icon: <UploadOutlined />,
              label: '课程管理',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default MyLayout;