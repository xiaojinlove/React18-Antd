import { Col, Row, Card, Form, Input, Button, message } from 'antd';
import logo from '../assets/logo.jpeg'
import { useNavigate } from 'react-router-dom'

function LogOut() {
  const navigate = useNavigate()
  return (
    <Row>
      <Col
        md={{
          span: 8,
          push: 8
        }}  
        xs={{
          span: 22,
          push: 1
        }}
      >
        <img src={logo} style={{
          width: '300px',
          display: 'block',
          borderRadius: '15px',
          margin: '40px auto' 
        }} />

        <Card title="jam 的学生管理系统React18 + antd">
          <Form 
            labelCol={{
              md: {
                span: 4
              }
            }}
            onFinish = {(n) => {
              console.log(n);
              message.success('登录成功')
              navigate('/admin/student_type')
            }}
          >
            <Form.Item label="用户名" name="username" rules={[
              {
                required: true,
                message: "请输入用户名"
              }
            ]}>
              <Input placeholder='请输入用户名' />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[
              {
                required: true,
                message: "请输入密码"
              }
            ]}>
              <Input placeholder='请输入密码' />
            </Form.Item>
            <Form.Item>
              <Button 
                htmlType='submit' 
                type='primary' 
                style={{margin: '0 auto', display: 'block'}}

              >登录按钮</Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default LogOut