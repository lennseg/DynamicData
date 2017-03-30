/**
 * Calculate the number of occurrences of each word in a text.
 * Words less than two letters are ignored.
 *
 * @param {String} text The input string.
 * @return {Object} An object with each word as a property and their occurence as a value.
 *
 */
module.exports = function (text) {
  const re = /n't|\W[a-z]'|'[a-z]\W|[^a-z'ÀÁÂĂÂÃÈÉÊÌÎÍÒÓÔÕȘȚÙÚĂĐĨŨƠàáăââãèéêîìíòóôõùúășțđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềếềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/g

  return text
    .toLowerCase()
    .replace(re, ' ')
    .split(' ')
    .filter(word => word.length > 1)
    .reduce((acc, word) => {
      if (!acc[word]) {
        acc[word] = 1
      } else {
        acc[word] += 1
      }
      return acc
    }, {})
}
