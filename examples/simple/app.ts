import axios from '../../src/index'

// axios({
//   method: 'get',
//   url: '/simple/get',
//   params: {
//     a: 1,
//     b: 2
//   }
// })
// axios({
//   method: 'get',
//   url: '/simple/get/data',
//   params: {
//     a: 1,
//     b: 2
//   }
// })
// axios({
//   method: 'get',
//   url: '/simple/get/data',
//   params: {
//     a: undefined,
//     b: null,
//     c: 8
//   }
// })
axios({
  method: 'get',
  url: '/simple/get?u=9#location',
  params: {
    a: { value: 90 },
    b: ['i', 'b'],
    c: 8,
    d: new Date()
  },
  data: {
    e: 0,
    u: 'i'
  }
})
axios({
  method: 'post',
  url: '/simple/get/data?u=9#location',
  params: {
    a: { value: 90 },
    b: ['i', 'b'],
    c: 8,
    d: new Date()
  },
  data: {
    e: 0,
    u: 'i'
  }
})
