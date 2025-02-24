// 1.Promis 用于处理异步操作和回调函数
// console.log('任务1：同步');
// console.log('任务2：同步');
// console.log('任务3：同步');
// setTimeout(() => {
//     console.log('任务4：异步');
// }, 1000);

// const p1 = new Promise((resolve, reject) => {
//     // resolve('任务成功得到的数据1')
//     reject('任务失败得到的数据1')

// });
// p1.then(data => {
//     console.log(data);
//     return new Promise((resolve, reject) => {
//         resolve('任务成功得到的数据2')
//         // reject('任务失败得到的数据2')
//     })
// }, err => {
//     console.log('任务1失败了');
//     throw new Error('任务1失败了');
// })
// .then(data => {
//     console.log(data);
// }, err => {
//     console.log('任务2失败了');
// })
// .catch(error => {
//     console.log(error);
// })
// // console.log(p1);

// Async await
// 1. async函数准备一个返回一个Promise对象
function asyncTask(){
    return new Promise((resolve, reject) => {
        // 假装有一些关键代码...
        const isSuccess = true
        if(isSuccess){
            resolve('任务2:成功得到的数据')
        }else{
            reject('任务2:失败得到的数据')
        }
    })
}
// 2. 为使用await的函数添加async
async function main(){
    console.log('任务1')
    const data = await asyncTask()
    console.log(data);
    console.log('任务3')
}
main()
// 3. await后面可以跟一个Promise对象，如果不是，会自动转为Promise对象
// 4. await等待的Promise对象如果成功，就会返回成功的结果，如果失败，就会抛出异常，可以通过try catch捕获
// 5. await只能在async函数中使用
// 6. async函数返回的是一个Promise对象，可以用then方法处理
// 7. async函数返回的Promise对象的状态由await后面的Promise对象决定
// 8. async函数返回的Promise对象的值由await后面的Promise对象的结果决定
// 9. async函数内部的return返回的值会成为then方法回调函数的参数
// 10. async函数内部抛出的错误会导致返回的Promise对象变为reject状态，抛出的错误对象会成为catch方法的回调函数参数
// 11. async函数内部抛出的错误不会影响后续代码的执行
// 12. 多个await后面的Promise对象会按顺序执行
// 13. await后面的Promise对象如果是reject状态，可以通过try catch捕获
