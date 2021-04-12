import React from 'react';
import ReactDOM from 'react-dom';
import PageHistory from '@/router/PageHistory';
import { ListView, PullToRefresh } from 'antd-mobile';
import './PageList.style.less';
// function MyBody(props: any) {
//   return (
//     <div className="am-list-body my-body">
//       <span style={{ display: 'none' }}>you can custom body wrap element</span>
//       {props.children}
//     </div>
//   );
// }
interface PageListPros {
  index: number;
}

const data = [
  'https://img.yalayi.net/img/gallery/492/cover.jpg!coverimg',
  'https://img.yalayi.net/img/gallery/340/cover.jpg!coverimg',
  'https://img.yalayi.net/img/gallery/217/cover.jpg!coverimg',
  'https://img.yalayi.net/img/gallery/299/cover.jpg!coverimg',
  'https://img.yalayi.net/img/gallery/237/cover.jpg!coverimg',
];
const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataArr = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    dataArr.push(`row - ${pIndex * NUM_ROWS + i}`);
  }
  return dataArr;
}

export default class PageView extends React.Component<PageListPros> {
  lv: any;
  state: any;
  rData: any = [];
  constructor(props: any) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1: any, row2: any) => row1 !== row2,
    });

    this.state = {
      dataSource,
      isLoading: true,
      refreshing: true,
      height: (document.documentElement.clientHeight * 3) / 4,
    };
  }

  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    // simulate initial Ajax
    setTimeout(() => {
      let $$el: any = ReactDOM.findDOMNode(this.lv)?.parentNode;
      let $$bottomBar: any = document.querySelector('.am-tab-bar-bar');
      let bottomBarHeight: number = $$bottomBar ? $$bottomBar.offsetHeight : 50;
      let offsetTop: number = $$el ? $$el.getClientRects()[0].top : 80;

      const hei = document.documentElement.clientHeight - offsetTop - bottomBarHeight;

      genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(genData()),
        isLoading: false,
        refreshing: false,
        height: hei,
      });
    }, 600);
  }
  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false,
      });
    }, 600);
  };
  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
  //     });
  //   }
  // }

  onEndReached = (event: any) => {
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    // console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = [...this.rData, ...genData(++pageIndex)];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  };
  gotoPreview = () => {
    PageHistory.push('/preview')
  }

  render() {
    // const separator = (sectionID: any, rowID: any) => (
    //   <div
    //     key={`${sectionID}-${rowID}`}
    //     style={{
    //       backgroundColor: '#F5F5F9',
    //       height: 8,
    //       borderTop: '1px solid #ECECED',
    //       borderBottom: '1px solid #ECECED',
    //     }}
    //   />
    // );
    // let index = data.length - 1;
    const row = (rowData: any, sectionID: any, rowID: any) => {
      // if (index < 0) {
      //   index = data.length - 1;
      // }
      // const obj = data[index--];
      return (
        <div className="page-list-item" key={rowID} onClick={this.gotoPreview}>
          <div className="page-list-item-img">
            <img src={data[this.props.index]} alt="" width="100%" height="100%" />
            <span className="pic-number">49P</span>
          </div>
          <div className="page-list-item-title">
            <span>现实生活</span>
          </div>
        </div>
      );
    };

    return (
      <ListView
        className="page-list"
        ref={el => (this.lv = el)}
        dataSource={this.state.dataSource}
        // renderHeader={() => <span>header</span>}
        renderFooter={() => (
          <div style={{ padding: 30, textAlign: 'center' }}>{this.state.isLoading ? '加载中...' : '暂无更多数据'}</div>
        )}
        renderRow={row}
        // renderSeparator={separator}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        pageSize={4}
        onScroll={() => {
          // console.log('scroll');
        }}
        pullToRefresh={
          <PullToRefresh
            indicator={{}}
            direction={'down'}
            distanceToRefresh={25}
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            getScrollContainer={() => undefined}
          />
        }
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}
