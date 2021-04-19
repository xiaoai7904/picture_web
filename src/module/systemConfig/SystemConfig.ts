export default class SystemConfig {
  // 首页列表
  static articleList: string = '/api/v1/article/list';
  // 获取作品详情列表
  static articleGet: string = '/api/v1/article/get';
  // 获取推荐列表
  static articleRecommend: string = '/api/v1/article/recommend';
  // 热门作者
  static authorList: string = '/api/v1/author/list';
  // 热门模特
  static modelList: string = '/api/v1/model/list';
  // 登陆
  static login: string = '/api/v1/userfront/login';
  // 忘记密码（设置密码）
  static forgotPassword: string = '/api/v1/userfront/reset-pwd';
  // 修改密码
  static setPassword: string = '/api/v1/userfront/set-pwd';
  // 获取验证码
  static getCode: string = '/api/v1/userfront/get-code';
  // 校验验证码
  static validCode: string = '/api/v1/userfront/valid-code';
  // 登出
  static logout: string = '/api/v1/userfront/logout';
  // 获取用户信息
  static getUserInfo: string = '/api/v1/userfront/user-info';
  // 注册
  static register: string = '/api/v1/userfront/register';
  // 作品评论
  static commentSave: string = '/api/v1/comment/save';
  // 作品点赞
  static articleStar: string = '/api/v1/article/star';
  // 获取评论列表
  static commentList: string = '/api/v1/comment/list';
  // 删除评论
  static delComment: string = '/api/v1/userfront/comment-remove';
  // 关注模特
  static modelFollow: string = '/api/v1/model/follow';
  // 关注摄影
  static authorFollow: string = '/api/v1/author/follow';
  // 热门标签
  static tagList: string = '/api/v1/tag/list';
  // 搜索
  static articleSearch: string = '/api/v1/article/search';
}

export const vipMap: { [key: string]: any } = {
  0: '普通用户',
  1: 'VIP1',
  2: 'VIP2',
  3: 'VIP3',
};
