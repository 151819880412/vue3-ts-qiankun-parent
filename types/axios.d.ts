export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RequestOptions {
  // 失败重复请求次数
  retrtyCount?: number;
  // 失败重复请求时间
  retrtyDelay?: number;
  // 将请求参数拼接到url
  joinParamsToUrl?: boolean;
  // 格式化请求参数时间
  formatDate?: boolean;
  //是否处理请求结果
  isTransformResponse?: boolean;
  // 是否返回本机响应头
  // 例如：需要获取响应头时使用此属性
  isReturnNativeResponse?: boolean;
  // 是否加入url
  joinPrefix?: boolean;
  // 接口地址，如果保留为空，则使用默认APIRL
  apiUrl?: string;
  // 请求拼接路径
  urlPrefix?: string;
  // 错误消息提示类型
  errorMessageMode?: ErrorMessageMode;
  // 是否添加时间戳
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  // 是否在标头中发送令牌
  withToken?: boolean;
  // 是否在标头中发送令牌
  withRefreshToken?: boolean;
}

export interface Result<T = any> {
  code: number;
  type: 'success' | 'error' | 'warning';
  message: string;
  data: T;
}

// multipart/form-data: 上传问及那
export interface UploadFileParams {
  // 其他参数
  data?: Recordable;
  // 文件参数接口字段名
  name?: string;
  // 文件名
  file: File | Blob;
  // 文件名
  filename?: string;
  [key: string]: any;
}
