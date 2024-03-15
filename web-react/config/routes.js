import { createBrowserRouter } from 'react-router-dom';
import OptionComponent from '../src/pages/OptionComponent';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>
  },
  {
    path: '/options',
    element: <OptionComponent />
  },
  {
    path: '/page-a',
    element: <div>page a</div>
  },
  {
    path: '/page-b',
    element: <div>page b</div>
  }
  // {
  //   path: '/pageA',
  //   element: (
  //     <div>
  //       页面A<Link to='/pageB'>去页面B</Link>
  //       <Link to='/'>去主页</Link>
  //       <Link to='/pages/ScrollList'>去list</Link>
  //     </div>
  //   )
  // },
  // {
  //   path: '/pageB',
  //   element: <ComB></ComB>
  // },
]);

export default router;
