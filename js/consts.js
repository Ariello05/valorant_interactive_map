const errors = {
  argumentError: 'Invalid argument in a function call',
  notImplementedError: "This functionality wasnt't implemented"
}

const champion_names = {
  SAGE: 'sage',
  SOVA: 'sova',
  BRIMSTONE: 'brimstone'
}

const map_names = {
  BIND: 'bind',
  SPLIT: 'split',
  HAVEN: 'haven'
}

const map_fetches = {
  BIND: 'https://api.jsonbin.io/b/5ea03eb55fa47104cea5096d/15',
  SPLIT: '',
  HAVEN: ''
}

export { champion_names, errors, map_names, map_fetches }
