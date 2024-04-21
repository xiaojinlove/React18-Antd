import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  ReadOutlined,

} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Dropdown, message } from 'antd';
import logo from '../assets/logo.jpeg'
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
//下拉菜单的menu数据
const items = [
  {
    key: 'userCenter',
    label: (<a>个人中心</a>),
  },
  {
    key: 'logOut',
    label: (<a>退出</a>),
  }
];

const MyLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate()
  const onClick = ({key}) => {
    console.log(key);
    if(key === 'logOut'){
      navigate('/')
    } else {
      message.info('还没开通呢')
    }
  }
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
          onClick={(e) => {
            console.log(e.key);
            navigate(e.key)
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
          <span className='titleDiv'>jam的学生管理系统-React</span>
          <Dropdown
            menu={{
              items, onClick
            }}
          >
            <img src={logo} style={{
              width: '30px',
              borderRadius: '15px',
              float: 'right', 
              marginTop: '20px',
              marginRight: '30px'
            }} />
          </Dropdown>
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