// 2.Proxy 代理对象
// const obj = {name:'Cici', age:18}
// const container = document.getElementById('container')
// container.textContent = obj.name
// const p1 = new Proxy(obj,{
//     get(target, property){
//         return obj[property]
//     },
//     set(target, property, value){
//         obj[property] = value
//         container.textContent = obj.name
//     }
// })
// console.log(p1.name)
// p1.age = 21
// p1.name = '黄茜'

// console.log(obj.name);
// obj.name = '黄茜'
// console.log(obj);
// const container = document.getElementById('container')
// container.textContent = obj.name


// 3.模块化Module
// EMS
// import moduleA from './a.js'
// import moduleB from './b.js'
// console.log(moduleA)
// console.log(moduleB)
// import {aTitle, aFn} from './a.js'
// import {bTitle, bFn} from './b.js'
// console.log(aTitle,aFn,bTitle,bFn)
const moduleA = require('./c.js')
console.log(moduleA)