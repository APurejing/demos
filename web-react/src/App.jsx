import { useState } from 'react';

import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  useNavigate
} from 'react-router-dom';
import LineECharts from './pages/echarts';
import OptionComponent from './pages/OptionComponent';
import { Button, Tabs } from 'antd';

const mockList = [
  {
    code: 'code1',
    name: 'test1',
    children: [
      { code: 'codeChild1', name: 'testChild1' },
      { code: 'codeChild2', name: 'testChild2' },
      { code: 'codeChild3', name: 'testChild3' }
    ]
  },
  {
    code: 'code2',
    name: 'test2',
    children: [
      { code: 'codeChild1_2', name: 'testChild1_2' },
      { code: 'codeChild2_2', name: 'testChild2_2' },
      { code: 'codeChild3_2', name: 'testChild2_2' },
    ]
  },
  {
    code: 'code3',
    name: 'test3',
    children: []
  }
];

const ComA = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate('/pageA');
      }}
    >
      页面A
      <div>listDemo</div>
    </div>
  );
};

const RightContent = (props) => {
  console.log('Right Component render');
  // eslint-disable-next-line react/prop-types
  return <div className='rightContent'>{props.activeIdx}</div>;
};

const ComB = () => {
  const navigate = useNavigate();

  const [activeIdx, setActiveIdx] = useState('');

  const updateActiveIdx = (idx) => {
    setActiveIdx(idx);
  };

  console.log('Parent Render');

  return (
    <div className='pageB'>
      <div className='content'>
        <OptionComponent></OptionComponent>
      </div>
      {/* <div
        onClick={() => {
          navigate('/pageA');
        }}
      >
        编程式导航去页面A
      </div> */}
    </div>
  );
};

const onClickUpload = () => {
  console.log('click upload');
};
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div onClick={onClickUpload}>
        {/* <Tabs
          style={{ border: '1px solid red', width: '75vw' }}
          defaultActiveKey={mockList[0].code}
          items={mockList.map((parent) => {
            return {
              key: parent.code,
              label: parent.name,
              children: (
                <Tabs
                  defaultActiveKey={
                    parent.children.length ? parent.children[0].code : null
                  }
                  items={
                    parent.children.length
                      ? parent.children.map((child) => {
                          return {
                            key: child.code,
                            label: child.name,
                            children: <div>{child.name}</div>
                          };
                        })
                      : []
                  }
                />
              )
            };
          })}
        /> */}
        <Tabs
          style={{ border: '1px solid red', width: '75vw' }}
          defaultActiveKey={mockList[0].code}
          items={mockList.map((parent) => {
            return {
              key: parent.code,
              label: parent.name,
              children: parent.children.length ? (
                parent.children.map((child) => {
                  return <Button key={child.code}>{child.name}</Button>;
                })
              ) : (
                <Button>{parent.name}</Button>
              )
            };
          })}
        />
      </div>
    )
  },
  {
    path: '/pageA',
    element: (
      <div>
        页面A<Link to='/pageB'>去页面B</Link>
        <Link to='/'>去主页</Link>
        <Link to='/pages/ScrollList'>去list</Link>
      </div>
    )
  },
  {
    path: '/pageB',
    element: <ComB></ComB>
  },
  {
    path: '/pages/echarts',
    element: <LineECharts></LineECharts>
  },
  {
    path: '/pages/ScrollList',
    element: <ComA>test</ComA>
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
