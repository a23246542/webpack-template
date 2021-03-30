// import './styles/app.scss';
// import 'bootstrap';
// import $ from 'jquery';
// // import midImage from '@/assets/mid.jpeg';
// // import { fetchData } from '@/js/utils';
// import midImage from './assets/mid.jpeg';
// import { fetchData } from './js/utils';

// $(function () {
//   $('[data-toggle="tooltip"]').tooltip();

//   const img = document.querySelector('[data-target="dynamic-image"]');
//   img.src = midImage;

//   fetchData().then((data) => {
//     const { userId, id, title } = data;
//     console.log('response', { ...data, newTitle: `new ${data?.title}` });
//   });
// });

console.log('index js')

// 导入
import { fn, name } from './js/fn'
fn()
console.log('name is ', name)

// 箭头函数
const sum = (a, b) => a + b
const result = sum(10, 20)
console.log(result)

// class
class People {
    constructor(name) {
        this.name = name
    }
    sayHi() {
        console.log(`${this.name} say hi`)
    }
}
const zhangsan = new People('张三')
console.log(zhangsan.sayHi())