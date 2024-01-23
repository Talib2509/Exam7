const images = [
    'https://i.ibb.co/74zXxww/pexels-ylanite-koppens-796614.jpg',
    'https://i.ibb.co/xqp28Rt/pexels-valeriia-miller-2516643.jpg',
    'https://i.ibb.co/wrdD5h3/pexels-pixabay-261434.jpg',
    'https://i.ibb.co/5LYHDH4/pexels-samer-daboul-1627933.jpg',
    'https://i.ibb.co/YDyGq5S/pexels-negative-space-134577.jpg',
    'https://i.ibb.co/9VCSdgH/pexels-wendy-wei-2813135.jpg',
    'https://i.ibb.co/0YDyg0r/pexels-igor-haritanovich-1695052.jpg',
    'https://i.ibb.co/y41Gjtg/pexels-burst-374147.jpg'
]
window.onload = () => {
    // preloading
    let banner = document.querySelector("#banner")
    banner.style.backgroundImage = `url(${images[0]})`
    document.querySelector('.hidden').src = images[1]
    let i = 1
    setInterval(() => {
        banner.style.backgroundImage = `url(${images[i++]})`

        if (i === images.length) i = 0
        else {
            // preload the next image, so that it transitions smoothly
            document.querySelector('.hidden').src = images[i]
        }
    }, 7000)
}
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
let search=document.querySelector(".search")
let filter=document.querySelector(".filter")
console.log(filter);
let cards = document.querySelector(".cards")
console.log(cards);
let allData = []
function allcards(data) {

    cards.innerHTML=""
    data.forEach(element => {
        let hearticon
        if (element.isfav) {
            hearticon = "bi bi-suit-heart-fill"
        } else {
            hearticon = "bi bi-suit-heart"
        }
        cards.innerHTML += `
        <div class="card">
        <div class="img"><img src="${element.img}" alt=""><i class="${hearticon}"
                onclick="togglefav(${element.id},${element.isfav})"></i>
            <div class="button"><a href="deteis.html?id=${element.id}"><button>View Deatils</button></a>
           
            <button
                    onclick="addbasket(${element.id},${element.isbasket})">>add To
                    card
                </button>
                </div>
        </div>
        <div class="info">
            <p class="name">${element.name}</p>
            <p class="price">$${element.price}</p>
    
        </div>
    </div>`
    });
}
search.addEventListener("input",(e)=>{
    let searcvalue=e.target.value.toLowerCase()
    if(searcvalue){
        let filterData=allData.filter(item=>item.name.toLowerCase().includes(searcvalue))
        allcards(filterData)
    }else{
        allcards(allData)
    }
})
filter.addEventListener("change",(e)=>{
    console.log(e.target.value);
    let sordaata=[...allData]
    if(e.target.value="a-z"){
       
        let sortAz=sordaata.sort((a,b)=>a.name.localeCompare(b))

        console.log(sortAz);
        allcards(sortAz)
    }
    else if(e.target.value="z-a"){
        let sortZa=sordaata.sort((a,b)=>b.name.localeCompare(a))
        allcards(sortZa)
    }else{
        allcards(sordaata)
    }
})
function togglefav(id,fav){
    axios.patch(`http://localhost:3000/all/${id}`,{isfav:!fav})
    window.location.reload()
}
function addbasket(id,count){
    if(!count){
        axios.patch(`http://localhost:3000/all/${id}`,{isbasket:count=1})
    }else{
        axios.patch(`http://localhost:3000/all/${id}`,{isbasket:count+1})
    }
}
function getall(){
    fetch("http://localhost:3000/all")
    .then(res=>res.json())
    .then(data=>{
        allData=allData.concat(data)
        allcards(allData)
    })
}
getall()