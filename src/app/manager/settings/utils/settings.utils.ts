

/**
 *
 * @param params :: generating url segments array
 * only this module
 */
export function generateUrl(params) {
  let strUrl = './settings';
  if (params.generalTab) {
    strUrl += `/${params.generalTab}`;
  }

  if (params.id) {
    strUrl += `/${params.id}`;
  }

  if (params.subType) {
    strUrl += `/${params.subType}/${params.subId}`;
  }

  if (params.orderTab) {
    strUrl += `/${params.orderTab}`;
  }

  return strUrl;
}
