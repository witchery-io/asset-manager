

/**
 *
 * @param params :: generating url segments array
 * only this module
 */
export function generateUrl(params) {
  let strUrl = './settings';
  if (params.type) {
    strUrl += `/${params.type}`;
  }

  if (params.id) {
    strUrl += `/${params.id}`;
  }

  if (params.subType) {
    strUrl += `/${params.subType}/${params.subId}`;
  }

  if (params.id) {
    // todo ::
    // strUrl += params.orderTab ? `/${params.orderTab}` : '/orders';
  }

  return strUrl;
}
