import { Card, Button, Form, Input, Table, Modal, message } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'

function SdudentType() {
  const [isShow, setIsShow] = useState(false)
  return (
    <div>
      <Card
        title="学生分类"
        extra={
          <div>
            <Button 
              type='primary' 
              icon={<PlusOutlined />} 
              onClick={() => setIsShow(true)}
            ></Button>
          </div>
        }
      >
        <Form layout='inline'>
          <Form.Item label='姓名'>
            <Input placeholder='请输入要查询的姓名'/>
          </Form.Item>
          <Form.Item label='查询'>
            <Button type='primary' icon={<SearchOutlined />}></Button>
          </Form.Item>
        </Form>
        <Table
          columns={[
            {title: '序号', width: 80},
            {title: '姓名'},
            {title: '照片', width: 120},
            {title: '成绩'},
            {title: '操作', width: 80}
          ]}
        >
        </Table>
      </Card>
      <Modal
        title='编辑输入框'
        open={isShow}
        maskClosable={false}
        onCancel={()=>setIsShow(false)}
        onOk={()=>{
          message.success('添加成功！')
        }}
      >

      </Modal>
    </div>
    
  )
}

export default SdudentType