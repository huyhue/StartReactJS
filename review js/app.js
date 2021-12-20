// ------Arrow function
// const logger = (log) => {
//     console.log(log);
// }
// const logger = log =>   console.log(log);

// logger("Message....");

// const sum = (a, b) => ({a:a, b:b });
// console.log(sum(2, 2))

// ------Modules: import export
// import {logger2} from "./logger/index.js";
// import * as constants from './constants.js';

// console.log(constants);
// logger2('Test message...', constants.TYPE_WARN);

// --------Enhanced object literals
// var name = 'Javascript';
// var price = 1000;
// var fieldName = 'new-name';

// var course = {
//     name,
//     price,
//     [fieldName]: "huyhue",
//     getName(){
//         return name;
//     }
// };
// console.log(course.getName());

// --------- Spread
// function logger({name, price, ...rest}){
//     console.log(name);
//     console.log(price);
//     console.log(rest);
// }

// logger({
//     name: 'Javascript',
//     price: 1000,
//     description: 'Description content'
// });
// function logger([a, b, ...rest]){
//     console.log(a);
//     console.log(b);
//     console.log(rest);
// }
// logger([2,3,5,4,55]);

// var arr1 = ['javascript', 'ruby', 'php'];
// var arr2 = ['reactjs', 'dart'];
// var arr = [...arr1,...arr2];
// console.log(arr);

// var arr1 = {
//     name: 'huy',
//     api: 'server'
// };
// var arr = {
//     ...arr1,
//     name: 'hoa'
// }
// console.log(arr);

// var a = [1, 5,7,5,3];
// function logger(...rest){
//     for (let i = 0; i < rest.length; i++) {
//         console.log(rest[i]);
//     }
// }
// logger(...a);

// var arr = [1, 5, 7];
// var [a,,c] = arr;
// console.log(a,c);

var course = {
    name: 'javascription',
    price: 1000,
    image: 'image-des',
    children: {
        name: 'ReactJS'
    }
};
var { name: parentName, children: {name: childName}} = course;
console.log(parentName);
console.log(childName);