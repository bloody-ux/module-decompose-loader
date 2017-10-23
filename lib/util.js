module.exports = {
  convertCamel2Dash: function(input) {
    var str = input[0].toLowerCase() + input.substr(1)
    return str.replace(/([A-Z])/g, function camel2DashReplace($1) {
      return '-' + $1.toLowerCase()
    })
  }
}