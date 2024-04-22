import { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  ReadOutlined,

} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Dropdown, message, Breadcrumb } from 'antd';
import logo from '../assets/logo.jpeg'
import { useNavigate, useLocation } from 'react-router-dom';

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
//side的数据
const itemsMenuData = [
  {
    key: '/admin/student_menu',
    icon: <UserOutlined />,
    label: '学生列表',
    children: [{
      label: '学生分类',
      key: '/admin/student_menu/student_type'
    },{
      label: '学生列表',
      key: '/admin/student_menu/student_list'
    },]
  },
  {
    key: '/admin/class_menu',
    icon: <ReadOutlined />,
    label: '班级管理',
    children: [{
      label: '班级分类',
      key: '/admin/class_menu/class_type'
    },{
      label: '班级列表',
      key: '/admin/class_menu/class_list'
    },]
  },
  {
    key: '/admin/course_menu',
    icon: <UploadOutlined />,
    label: '课程管理',
  },
]
//生成面包屑导航
const createNavFn = (path) => {
  //console.log(path);
  let arrObj = []

  const demoFn = (_arr) => {
    _arr.forEach(item => {
      const { children, ...info } = item
      console.log('处理中', info);
      arrObj.push(info)
      if(children) {
        demoFn(children)
      }
    })
  }
  demoFn(itemsMenuData)
  console.log('扁平化数组', arrObj);
  //过滤数据
  const temp = arrObj.filter(item => path.includes(item.key))
  console.log('过滤后的数组', temp);
  if(temp.length > 0) {
    return [{label: '首页', key: '/admin/student_menu/student_type'},...temp]
  }else {
    return []
  }
}

//查找对应的地址
const searchUrlKey = (path) => {
  let arrObj = []
  const demoFn = (_arr) => {
    _arr.forEach( item => {
      //console.log(item);
      if(path.includes(item.key)) {
        arrObj.push(item.key)
        if(item.children) {
          demoFn(item.children)
        }
      }
      
    })
  }
  demoFn(itemsMenuData)
  return arrObj
}

const MyLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  //路由跳转
  const navigate = useNavigate()
  //下拉菜单的点击事件
  const onClick = ({key}) => {
    console.log(key);
    if(key === 'logOut'){
      navigate('/')
    } else {
      message.info('还没开通呢')
    }
  }

  let { pathname } = useLocation()
  //console.log(pathname);
  let demoItemsArr = searchUrlKey(pathname)

  const [navurl, setNavurl] = useState([])
  //面包屑导航监听
  useEffect(() => {
    setNavurl(createNavFn(pathname))
  }, [pathname])
  //console.log(navurl);
  return (
    <Layout style={{width: '100vw', height: '100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logoImg">
          <img src={logo} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={demoItemsArr}
          defaultSelectedKeys={demoItemsArr}
          onClick={(e) => {
            //console.log(e.key);
            navigate(e.key)
          }}
          items={itemsMenuData}
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
          <Breadcrumb 
            items={navurl.map(item => ({
              title: item.label,
            }))}
          />
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default MyLayout;