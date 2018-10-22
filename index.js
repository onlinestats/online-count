function Count (params) {
  var n = 0
  var values = {}

  function count (x) {
    if (Array.isArray(x) && params.countArrays) {
      // Case: array as a list of values
      x.forEach(xval => count(xval))
    } else {
      // Case: default
      n += 1
      values[x] = values[x] + 1 || 1
    }
  }

  Object.defineProperty(count, 'n', {
    get: function () {
      return n
    }
  })

  Object.defineProperty(count, 'values', {
    get: function () {
      return values
    }
  })

  Object.defineProperty(count, 'value', {
    value: function value (y) {
      return values[y] || 0
    }
  })

  Object.defineProperty(count, 'probs', {
    get: function () {
      var prob = {}
      for (var key in values) {
        prob[key] = values[key] / n
      }
      return prob
    }
  })

  Object.defineProperty(count, 'prob', {
    value: function value (y) {
      if (n === 0) {
        return 0
      }
      return values[y] / n || 0
    }
  })

  return count
}

module.exports = Count
