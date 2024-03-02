export function findUniqBy(a: any, key: any) {
  var seen: any = {};
  return a.filter(function (item: any) {
    var k = key(item);
    return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  });
}
