import { Card, Button, Form, Input, Table, Modal, message } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'
import MyUpload from '../components/MyUpload';
import { get } from '../utils/request';

function SdudentType() {
  const [isShow, setIsShow] = useState(false)
  const [myForm] = Form.useForm()
  const [tableData, setTableData] = useState([])
  get('/getData')
    .then(_d => {
      //console.log(_d.data)
      setTableData(_d.data)
    })
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
          dataSource={tableData}
          columns={[
            {title: '序号', width: 80, dataIndex: 'ids'},
            {title: '姓名', dataIndex: 'name'},
            {
              title: '照片', 
              width: 120,
              render(n, m, k){
                return <img src={n.img} />
              }
            },
            {title: '成绩', dataIndex: 'desc'},
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
          myForm.submit()
        }}
      >
        <Form
          form={myForm}
          labelCol={{span: 3}}
          onFinish={(n)=>{
            message.success('添加成功')
            console.log(n);
          }}
        >
          <Form.Item 
            label='姓名'
            name='name'
            rules={[{
              required: true,
              message: '请输入姓名'
            }]}
          >
            <Input placeholder='请编辑姓名'/>
          </Form.Item>
          <Form.Item label='照片'>
            <MyUpload />
          </Form.Item>
          <Form.Item label='简介' name='desc'>
            <Input placeholder='请编辑简介'/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
    
  )
}

export default SdudentType