import { DatePicker, Form, Input, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';

const OptionComponent = (props) => {
  const [form] = useForm();
  console.log('props--', props);
  return (
    <div className='optionComponent'>
      OptionComponent
      <Form style={{ display: 'flex', gap: '56px', marginTop: '16px' }}>
        <Form.Item name='field1' label='field1'>
          <Select placeholder='请选择'></Select>
        </Form.Item>
        <Form.Item name='field2' label='field2'>
          <Input placeholder='请输入'></Input>
        </Form.Item>
        <Form.Item name='field3' label='field3'>
          <DatePicker placeholder='请选择'></DatePicker>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OptionComponent;
