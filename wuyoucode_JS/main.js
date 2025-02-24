// 1、变量和常量
{
    let count = 0;
    // console.log(count);
    const BASE_URL = 'http://www.baidu.com';
    // console.log(BASE_URL);
}

// 2、模板字符串
const str1 = 'hello';
const str2 = `${str1}Cici${str1} 
嘿嘿 字符串`;
// console.log(str2);

// 3、解构赋值
const [a, b, c] = [1, 2, 3];
// console.log(a, b, c);

const {name:username, age:userAge, ...otherInfo} ={
    name: 'Cici',
    age: 18,
    gender: 'female',
    category: 'student'
}
// console.log(obj);
// console.log(username, userAge, otherInfo);

// 4.数组和对象的扩展
// 4.1 扩展运算符
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [...arr1, ...arr2, 10, 18];
// console.log(arr3);

const obj1 = {
    name: 'Cici',
    age: 18
}
const obj2 = {
    b:2,
    c:3
}
const obj3 = {
    ...obj1,
    ...obj2,
    d:4
}
// console.log(obj3);

// 4.2 数组方法 将伪数组转换为数组 Array.from()
function fn(){
    Array.from(arguments).forEach(function(item) {
        // console.log(item);
    })
}
fn(1, 2, 3);

//4.3对象的方法 Object.assign()对象的浅拷贝，对象的和并
const objA = {
    name: 'Cici',
    age: 18
}
// objB.name = 'a';
const objB = {  
    gender: 'female',
}
const objC = Object.assign({},objA, objB)
// console.log(objA, objB, objC);

// 5. Class类 constructor本身是一个构造方法,可以在类里面定义属性和方法
class A{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    introduce(){
        console.log(`你好，我是${this.name},今年${this.age}岁`);
    }
}
const a1 = new A('Cici', 18);
console.log(a1);
// a1.introduce();

// 5.1继承
class B extends A{
    constructor(name, age, gender){
        super(name, age);
        this.gender = gender;
    }

    sayHello(){
        console.log(`你好，我是${this.name},今年${this.age}岁,我是一个${this.gender}生`)
    }
}

const b1 = new B('Cici', 18, '女');
// b1.sayHello();
// b1.introduce();

// 6.箭头函数
const getSum1 = n => n + 3;
console.log(getSum1(5));
const getSum2 = (n1, n2) => n1 + n2;
console.log(getSum2(5, 3));
const getSum3 =(n1, n2, ...other) => console.log(n1, n2, other);
console.log(getSum3(5, 3, 4, 5, 6));
const getResult = arr => {
    let sum = 0
    arr.forEach(item => sum += item);
    return sum;
}
console.log(getResult([1, 2, 3, 4, 5]));