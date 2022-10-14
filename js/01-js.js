if (!localStorage.getItem('article_list')) {
    const xhr = new XMLHttpRequest()
    xhr.open('get', 'https://api.iynn.cn/mock?t=2')
    xhr.onload = (() => {
        localStorage.setItem('article_list', JSON.stringify(JSON.parse(xhr.responseText).data))
    })
    xhr.send()
}
let data = JSON.parse(localStorage.getItem('article_list'))
    //渲染
let render = (data) => {
        let str = ''
        data.forEach(elem => {
            str += ` <tr id="${elem.id}">
    <td>${elem.id}</td>
    <td>${elem.title}</td>
    <td>${elem.user}</td>
    <td>${elem.date}</td>
    <td>
        <button>删除</button>
        <button>编辑</button>
    </td>
</tr>`
        })
        document.querySelector('tbody').innerHTML = str
        console.log(data);
    }
    //初始渲染
render(data)
    //数据新增
let num = null
const add1 = document.getElementById('add1')
const add2 = document.getElementById('add2')
const add3 = document.getElementById('add3')
const btn1 = document.querySelector('body>header>button')
let render2 = () => {
    localStorage.setItem('article_list', JSON.stringify(data))
    render(data)
}
btn1.addEventListener('click', () => {
        let obj = {}
        obj.user = add2.value
        obj.title = add1.value
        obj.date = add3.value
        obj.id = data.length + 1
        data.push(obj)
        render2()
    })
    //数据删除
document.querySelector('tbody').addEventListener('click', (e) => {
        e = e || window.event
        if (e.target.innerHTML == '删除') {
            data.forEach((elem, i) => {
                if (elem.id == e.target.parentNode.parentNode.id) {
                    data.splice(i, 1)
                }
                render2()
            })
        }
        //数据修改
        if (e.target.innerHTML == '编辑') {
            num = e.target.parentNode.parentNode.id
            document.querySelector('aside').style.display = 'flex'
            document.querySelector('#d1 input:nth-child(1)').value =
                e.target.parentNode.parentNode.children[1].innerHTML
            document.querySelector('#d1 input:nth-child(2)').value =
                e.target.parentNode.parentNode.children[2].innerHTML
            document.querySelector('#d1 input:nth-child(3)').value =
                e.target.parentNode.parentNode.children[3].innerHTML
        }
    })
    //模态框隐藏
let hidden = (e) => {
    e = window.event || e
    if (e.target.id == 'd3' || e.target.id == 'd1' || e.target.id == 'd2') {
        console.log(e.target);
        document.querySelector('aside').style.display = 'none'
    }
}
document.querySelector('aside').addEventListener('click', hidden)
    //数据重新渲染
const end = document.getElementById('end')
end.addEventListener('click', () => {
    data.forEach(elem => {
        if (elem.id == num) {
            elem.title = document.querySelector('#d1 input:nth-child(1)').value
            elem.user = document.querySelector('#d1 input:nth-child(2)').value
            elem.date = document.querySelector('#d1 input:nth-child(3)').value
        }
        render2()
        document.querySelector('aside').style.display = 'none'
    })
})