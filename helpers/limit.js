module.exports.limit = function(arr, limit) {
  if (!Array.isArray(arr)) {
    console.log('opps');
    return [];
  }
  return arr.slice(0, limit);
}
