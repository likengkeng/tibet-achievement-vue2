import { apiCreator } from './index';

const http = {
  // 序言
  prefaceList: (data: any) => {
    const url = 'preface/list';
    return apiCreator().post(url, data);
  },
  // 领导
  leaderList: (data: any) => {
    const url = 'leader/care/list';
    return apiCreator().post(url, data);
  },
  // 大事记
  memorabiliaList: (data: any) => {
    const url = 'memorabilia/list';
    return apiCreator().post(url, data);
  },
  // 组织工作 && 榜样力量
  powerList: (data: any) => {
    const url = 'organization/power/list';
    return apiCreator().post(url, data);
  },
  // 七地之声
  voiceList: (data: any) => {
    const url = 'area/voice/list';
    return apiCreator().post(url, data);
  },
  // 文章详情-查询文章下的评论列表
  commentList: (data: any) => {
    const url = 'tourist/comment/list';
    return apiCreator().post(url, data);
  },
  // 添加评论
  commentAdd: (data: any) => {
    const url = 'tourist/comment/add';
    return apiCreator().post(url, data);
  },
  // 创建游客
  touristCreate: (data: any) => {
    const url = 'tourist/create';
    return apiCreator().get(url);
  },
  // 游客信息查询
  touristQuery: (data: any) => {
    const url = 'tourist/query';
    return apiCreator().get(url);
  },
}

export default {...http}

