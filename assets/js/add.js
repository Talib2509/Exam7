let menybtn = document.querySelector(".menu")
let menylst = document.querySelector(".list")
let closebtn = document.querySelector(".close")
console.log(menybtn, menylst, closebtn);
menybtn.addEventListener("click", () => {
    menylst.classList.add("active")
})
closebtn.addEventListener("click", () => {
    menylst.classList.remove("active")
})
let table = document.querySelector("table")
function getall() {
    fetch("http://localhost:3000/all")
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                table.innerHTML += `
            <tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td><button onclick="delete1(${element.id})">delete</button></td>
            <td><button onclick="update(${element.id})">update</button></td>
            </tr>`
            });
        })
}
getall()
function delete1(id) {
    axios.delete(`http://localhost:3000/all/${id}`)
    window.location.reload()
}
let fileInput = document.querySelector(".fileinput")
let plus = document.querySelector(".plus")
let imgpleace = document.querySelector(".pleaceimg")
let nameinp = document.querySelector(".name")
let infoinp = document.querySelector(".info")
let price = document.querySelector(".price")
let btn = document.querySelector(".update")
console.log(btn);
plus.addEventListener("click", () => {
    fileInput.click()
    fileInput.addEventListener("input", (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            imgpleace.src = reader.result
        }
    })
})
function update(id) {
    axios.get(`http://localhost:3000/all/${id}`)
        .then(res => {
            nameinp.value = res.data.name
            infoinp.value = res.data.info
            price.value = res.data.price
            imgpleace.src = res.data.img
        })
    btn.addEventListener("click", () => {
        axios.patch(`http://localhost:3000/all/${id}`, {
            name: nameinp.value,
            info: infoinp.value,
            price: price.value,
            img: imgpleace.src
        })

    })

}
btn.addEventListener("click", () => {
    if (nameinp.value.trim() && infoinp.value.trim() && price.value.trim()){
        axios.post(`http://localhost:3000/all`, {
            name: nameinp.value,
            info: infoinp.value,
            price: price.value,
            img: imgpleace.src
        })
    }else{
        alert("xana bosdu")
        // let inputs=[nameinp,infoinp,price]
        // inputs.forEach(element => {
        //     let current=element.value.trim()==""? "block" :"none"
        //     element.previousElementSibling.display=current;
        // });
    }
})