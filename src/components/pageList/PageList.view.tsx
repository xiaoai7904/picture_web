import React from 'react';
import ReactDOM from 'react-dom';
import PageHistory from '@/router/PageHistory';
import { ListView, PullToRefresh } from 'antd-mobile';
import Http from '@/module/http/Http';
import SystemConfig from '@/module/systemConfig/SystemConfig';
import './PageList.style.less';

type httpParams = {} | undefined;
interface PageListPros {
  httpApi?: string;
  httpParams?: httpParams;
  httpRequest?: (params: httpParams) => Promise<any>;
  renderRow?: (rowData: any, sectionID: any, rowID: any) => JSX.Element;
}

function defaultHttpRequest(params = {}) {
  return new Http().post(SystemConfig.articleList, params);
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
      datas: [],
      page: 1,
      pageSize: 20,
      hasMore: true,
      refreshing: true,
      isLoading: true,
      dataArr: [],
      height: (document.documentElement.clientHeight * 3) / 4,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      let $$el: any = ReactDOM.findDOMNode(this.lv)?.parentNode;
      let $$bottomBar: any = document.querySelector('.am-tab-bar-bar');
      let bottomBarHeight: number = $$bottomBar ? $$bottomBar.offsetHeight : 50;
      let offsetTop: number = $$el ? $$el.getClientRects()[0].top : 80;
      const hei = document.documentElement.clientHeight - offsetTop - bottomBarHeight;

      this.setState({ height: hei });
      this.getData();
    }, 600);
  }
  getData() {
    //获取数据
    let parmas = Object.assign({ pageSize: this.state.pageSize, page: this.state.page }, this.props.httpParams);

    this.httpRequest(parmas).then(({ data }: any) => {
      const dataList = data.data.page.list;
      const len = dataList.length;
      if (len <= 0) {
        // 判断是否已经没有数据了
        this.setState({
          refreshing: false,
          isLoading: false,
          hasMore: false,
        });

        return false;
      }

      // 这里表示上拉加载更多
      // 合并state中已有的数据和新增的数据
      var dataArr = this.state.dataArr.concat(dataList); //关键代码
      this.setState({
        page: this.state.page,
        dataSource: this.state.dataSource.cloneWithRows(dataArr), // 数据源中的数据本身是不可修改的,要更新datasource中的数据，请（每次都重新）调用cloneWithRows方法
        refreshing: false,
        isLoading: false,
        dataArr: dataArr, // 保存新数据进state
      });
    });
  }

  httpRequest(params = {}): Promise<any> {
    if (this.props.httpRequest) {
      return this.props.httpRequest(params);
    }
    return defaultHttpRequest(params);
  }

  // 下拉刷新
  onRefresh = () => {
    this.setState(
      {
        refreshing: true,
        isLoading: true,
        page: 1, // 刷新嘛，一般加载第一页，或者按你自己的逻辑（比如每次刷新，换一个随机页码）
      },
      () => {
        this.getData();
      }
    );
  };

  // 滑动到底部时加载更多
  onEndReached = (event: any) => {
    // 加载中或没有数据了都不再加载
    if (this.state.isLoading || !this.state.hasMore) {
      return;
    }
    this.setState(
      {
        isLoading: true,
        page: this.state.page + 1, // 加载下一页
      },
      () => {
        this.getData();
      }
    );
  };

  gotoPreview = (id: number) => {
    PageHistory.push(`/preview/${id}`);
  };

  render() {
    const row = (rowData: any, sectionID: any, rowID: any) => {
      return (
        <div className="page-list-item" key={rowID} onClick={() => this.gotoPreview(rowData.id)}>
          <div className="page-list-item-img">
            <img src={rowData.coverImage} alt="" width="100%" height="100%" />
            <span className="pic-number">{rowData.photoNum}</span>
            {rowData.recommend === 1 && <span className="pic-recommend">推荐</span>}
          </div>
          <div className="page-list-item-title">
            <span>{rowData.title}</span>
          </div>
        </div>
      );
    };
    const renderRow = this.props.renderRow ? this.props.renderRow : row
    return (
      <ListView
        className="page-list"
        ref={el => (this.lv = el)}
        dataSource={this.state.dataSource}
        initialListSize={20}
        // renderHeader={() => <span>header</span>}
        renderFooter={() => (
          <div style={{ textAlign: 'center' }}>{this.state.isLoading ? '加载中...' : '暂无更多数据'}</div>
        )}
        renderRow={renderRow}
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
