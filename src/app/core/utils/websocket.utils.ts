// import { WebSocketGetParam } from '@app/core/services';

/*export interface WSClientMessage {
  type: string;
  data?: any[] | { channelId: string };
}

export function toServerMessage(type: string, data: any[] | { channelId: string }): WSClientMessage {
  const o: WSClientMessage = {
    type: type,
  };

  if (data) {
    o.data = data;
  }

  return o;
}*/

export function getParams2str(params: any[]): string { // WebSocketGetParam
  if (!params) {
    return '';
  }

  return params.reduce((res, param, i) => {
    res += i === 0
      ? '?'
      : '&';

    res += `${ param.name }=${ param.value }`;

    return res;
  }, '');
}
