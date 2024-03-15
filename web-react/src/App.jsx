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
    element: <div onClick={onClickUpload}>upload</div>
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
