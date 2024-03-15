// import { LineChart } from 'echarts/charts';
// import { options } from './options';
// import * as echarts from 'echarts';

// //基于准备好的DOM，初始化ECharts图表
// var myChart = echarts.init(document.getElementById('main'));

// //指定图表的配置项和数据
// var option = {
//   title: {
//     //配置标题组件
//     text: '风景名胜区门票价格', //设置主标题
//     textStyle: {
//       //设置主标题文字样式
//       color: 'green'
//     },
//     left: 15, //适当调整标题的lef位置
//     top: 0 //适当调整标题的topt位置
//   },
//   tooltip: {
//     //配置提示框组件
//     trigger: 'axis'
//   },
//   legend: {
//     //配置图例组件
//     data: ['景区A', '景区B', '景区C'],
//     left: 260, //适当调整工具框的left位置
//     top: 3 //适当调整工具框的top位置
//   },
//   grid: {
//     //配置网格组件
//     left: '3%',
//     right: '4%',
//     bottom: '3%',
//     containLabel: true
//   },
//   toolbox: {
//     //配置工具箱组件
//     feature: {
//       saveAsImage: {}
//     }
//   },
//   xAxis: {
//     //配置X轴坐标系
//     type: 'category',
//     data: ['2013年', '2014年', '2015年', '2016年', '2017年', '2018年', '2019年']
//   },
//   yAxis: {
//     //配置Y轴坐标系
//     type: 'value'
//   },
//   series: [
//     //配置数据系列
//     {
//       name: '景区A',
//       type: 'line', //设置指定显示为折线
//       step: 'start', //设置指定折线的显示样式
//       data: [120, 140, 120, 160, 250, 280, 240]
//     },
//     {
//       name: '景区B',
//       type: 'line', //设置指定显示为折线
//       step: 'middle', //设置指定折线的显示样式
//       data: [220, 280, 300, 350, 320, 380, 350]
//     },
//     {
//       name: '景区C',
//       type: 'line', //设置指定显示为折线
//       step: 'end', //设置指定折线的显示样式
//       data: [400, 480, 540, 450, 580, 750, 650]
//     }
//   ]
// };
// //使用刚指定的配置项和数据显示图表
// myChart.setOption(option);

const LineECharts = () => {
  return (
    <div>
      echarts
      {/* <LineChart option={options} />
      
       */}
      <div id='main' style='width: 600px; height: 400px'>
        test
      </div>
    </div>
  );
};
export default LineECharts;
