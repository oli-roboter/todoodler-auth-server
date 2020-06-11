export default function adaptRequest(req = {}) {
  return Object.freeze({
    path: req.path,
    method: req.method,
    pathParams: req.parans,
    queryParams: req.query,
    body: req.body,
  });
}
