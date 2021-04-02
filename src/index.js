import 'bootstrap';
import $ from 'jquery';
import '@/style/app.scss';
// import 'bootstrap.bundle';
import '@babel/polyfill'
import { fetchData } from '@/js/utils';
import { sum } from '@/js/math';
import midImage from '@/assets/mid.jpg';

$(function () {
  //讀取js
  $('[data-toggle="tooltip"]').tooltip();

  //讀取檔案
  const img = document.querySelector('[data-target="dynamic-image"]');
  img.src = midImage;

  fetchData().then((data) => {
    const { userId, id, title } = data;
    console.log('response', { ...data, newTitle: `new ${data?.title}` });
  });
});

console.log('home page');

// 导入
import { fn, name } from './js/fn'
fn()
console.log('name is ', name)

// 箭头函数
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