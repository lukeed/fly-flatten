const fs = require('fs')
const path = require('path')

export default function () {
  this.flatten = function (options = {}) {
    const levels = options.levels || 0

    this.unwrap().then(files => {
      let output = []

      for (let file of files) {
        if (!fs.statSync(file).isDirectory()) {
          const base = path.basename(file)
          const dirs = (levels > 0) ? (getDirectories(file, levels) + '/') : ''
          output.push(dirs+base)
        }
      }

      // truncated file paths are here
      // need to relate each one to its original data stream
      console.log( output )

      return output
    })

    return this
  }
}

function getDirectories(file, levels) {
  let dirs = path.dirname(file)
  dirs = (dirs[0] == '/') ? dirs.substr(1) : dirs

  const arr = dirs.split('/')
  const len = arr.length

  if (levels >= len) {
    return dirs
  }

  return arr.splice(len - levels).join('/')
}
