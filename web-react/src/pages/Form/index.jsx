import { useEffect, useState } from 'react';
import './App.css';
import {
  Form,
  Select,
  Input,
  Button,
  Space,
  Row,
  Col,
  Modal,
  Table
} from 'antd';
// DatePicker,
import { SearchOutlined } from '@ant-design/icons';
import { Route, Routes } from 'react-router-dom';
const { Option } = Select;

function App() {
  const [form] = Form.useForm();
  const [modal1Visible, setModal1Visible] = useState(false);

  const onModalCancel = () => {
    setModal1Visible(false);
    console.log('cancel', modal1Visible);
  };
  const onModalOk = () => {
    setModal1Visible(false);
    console.log('onModalOk', selectedRowName);
    form.setFieldsValue({
      field5: selectedRowName
    });
    console.log('field5--', form.getFieldsValue('field5'));
  };

  const onFinish = (values) => {
    console.log('表单--', values);
    const formObject = form.getFieldsValue();
    console.log('formObject--', formObject);
    const field1 = form.getFieldValue('field1');
    console.log('field1--', field1);
  };

  useEffect(() => {
    // fetch data
    const fetchData = {
      searchValue: '查询value2333',
      optionValue: '111'
    };
    form.setFieldsValue({
      field1: fetchData.optionValue,
      field2: fetchData.searchValue
    });
  }, [form]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => (
        <div style={{ backgroundColor: 'lightblue' }}>{text}</div>
      ),
      align: 'center',
      width: 400
    },
    {
      title: 'Age',
      dataIndex: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address'
    }
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park'
    },
    {
      key: '4',
      name: 'Disabled User',
      age: 99,
      address: 'Sydney No. 1 Lake Park'
    }
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowName, setSelectedName] = useState([]);

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
      setSelectedRowKeys(selectedRows.map((item) => item.key));
      setSelectedName(selectedRows.map((item) => item.name));
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name
    })
  };
  const onClickSearch = () => {
    console.log('click--');
    setModal1Visible(true);
  };
  const suffix = (
    <Button
      type='primary'
      shape='circle'
      icon={<SearchOutlined />}
      onClick={onClickSearch}
    />
  );
  const [open, setOpen] = useState(false);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };
  return (
    <>
      <div></div>

      <div className='div-class'>
        <Form form={form} onFinish={onFinish}>
          <Row style={{ width: '100%' }}>
            <Col span={8}>
              <Form.Item
                label='输入1'
                name='field1'
                rules={[
                  {
                    required: true,
                    message: '必须要填写'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item shouldUpdate noStyle>
                {(form) => {
                  const inputValue = form.getFieldValue('field2');
                  let options = [
                    {
                      label: '选项1',
                      value: '111'
                    },
                    {
                      label: '选项2',
                      value: '222'
                    },
                    {
                      label: '选项3',
                      value: '333'
                    }
                  ];
                  options = inputValue
                    ? options.filter((item) => item.value.includes(inputValue))
                    : options;
                  return (
                    <Form.Item label='单选2:' name='field2'>
                      <Select>
                        {options.map((item) => (
                          <Option value={item.value} key={item.value}>
                            {item.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  );
                }}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='树形单选3'
                name='field3'
                rules={[
                  {
                    required: true,
                    message: '必须要填写'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='树形多选4' name='field4'>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col span={8}>
              <Form.Item
                label='modal1'
                name='field5'
                rules={[
                  {
                    required: true,
                    message: '必须要填写'
                  }
                ]}
              >
                {/* 方案1 弹出modal 禁用input 只能通过点选button输入 */}
                {/* <Input suffix={suffix} value={selectedRowName} disabled /> */}
                {/* 方案2 下拉自定义选择框 但某些属性在项目内不生效 */}
                {/* <Select
                  popupMatchSelectWidth={false}
                  dropdownRender={(menu) => (
                    <div>
                      <div>
                        top <Input />
                      </div>
                      放置options
                      {menu}
                      <Table
                        columns={columns}
                        dataSource={data}
                        rowSelection={{
                          type: 'checkbox',
                          ...rowSelection,
                          selectedRowKeys: selectedRowKeys
                        }}
                        bordered
                        rowKey={(record) => record.key}
                      ></Table>
                      <div>
                        bottom{' '}
                        <Button type='primary' onClick={() => setOpen(false)}>
                          click me to close
                        </Button>
                        <Button type='primary' onClick={() => onModalOk()}>
                          click me to set
                        </Button>
                      </div>
                    </div>
                  )}
                >
                  <Option value='jack'>Jack</Option>
                  <Option value='lucy'>Lucy</Option>
                </Select>{' '} */}
                {/* 方案3 下拉多选选择框 不默认展示表单，通过输入内容 查询点选 只展示批评内容前几条（不符合业务需求） */}
                {/* <Select
                  mode='multiple'
                  defaultValue='lucy'
                  style={{ width: 200 }}
                  onChange={handleChange}
                  options={[
                    {
                      label: 'Manager',
                      options: [
                        { label: 'Jack', value: 'jack' },
                        { label: 'Lucy', value: 'lucy' }
                      ]
                    },
                    {
                      label: 'Engineer',
                      options: [{ label: 'yiminghe', value: 'Yiminghe' }]
                    }
                  ]}
                  showSearch
                  onSearch={onSearch}
                ></Select> */}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item shouldUpdate noStyle>
                {(form) => {
                  const inputValue = form.getFieldValue('field2');
                  let options = [
                    {
                      label: '选项1',
                      value: '111'
                    },
                    {
                      label: '选项2',
                      value: '222'
                    },
                    {
                      label: '选项3',
                      value: '333'
                    }
                  ];
                  options = inputValue
                    ? options.filter((item) => item.value.includes(inputValue))
                    : options;
                  return (
                    <Form.Item label='单选2:' name='field2'>
                      <Select>
                        {options.map((item) => (
                          <Option value={item.value} key={item.value}>
                            {item.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  );
                }}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='树形单选3'
                name='field3'
                rules={[
                  {
                    required: true,
                    message: '必须要填写'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='树形多选4' name='field4'>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col span={8}>
              <Form.Item
                label='输入1'
                name='field1'
                rules={[
                  {
                    required: true,
                    message: '必须要填写'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item shouldUpdate noStyle>
                {(form) => {
                  const inputValue = form.getFieldValue('field2');
                  let options = [
                    {
                      label: '选项1',
                      value: '111'
                    },
                    {
                      label: '选项2',
                      value: '222'
                    },
                    {
                      label: '选项3',
                      value: '333'
                    }
                  ];
                  options = inputValue
                    ? options.filter((item) => item.value.includes(inputValue))
                    : options;
                  return (
                    <Form.Item label='单选2:' name='field2'>
                      <Select>
                        {options.map((item) => (
                          <Option value={item.value} key={item.value}>
                            {item.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  );
                }}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='树形单选3'
                name='field3'
                rules={[
                  {
                    required: true,
                    message: '必须要填写'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='树形多选4' name='field4'>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <div className='action'>
            <Space size='small'>
              <Button
                onClick={() => {
                  form.resetFields();
                }}
              >
                重置
              </Button>
              <Button type='primary' htmlType='submit'>
                查询
              </Button>
              <a style={{ fontSize: 12 }}>
                <Button>下载</Button>
              </a>
            </Space>{' '}
          </div>
        </Form>
        {modal1Visible && (
          <Modal
            width={1000}
            className='modal1'
            open={modal1Visible}
            onOk={(e) => onModalOk(e)}
            onCancel={onModalCancel}
          >
            <Table
              columns={columns}
              dataSource={data}
              rowSelection={{
                type: 'checkbox',
                ...rowSelection,
                selectedRowKeys: selectedRowKeys
              }}
              bordered
              rowKey={(record) => record.key}
            ></Table>
          </Modal>
        )}
        <div style={{ textAlign: 'right' }}></div>
      </div>
      <p
        className='read-the-docs'
        onClick={() => {
          setModal1Visible(true);
        }}
      >
        Click on the Vite and React logos to learn more
      </p>
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
          selectedRowKeys: selectedRowKeys
        }}
        bordered
        rowKey={(record) => record.key}
      ></Table>
    </>
  );
}

{
  /* <Modal>
<Table
  columns={columns}
  dataSource={data}
  rowSelection={{
    type: 'checkbox',
    ...rowSelection,
    selectedRowKeys: selectedRowKeys
  }}
  bordered
  rowKey={(record) => record.key}
></Table>
</Modal> */
}

export default App;
