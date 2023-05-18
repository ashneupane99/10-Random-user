const apiUrl = "https://randomuser.me/api/"
let userList = []
// Promise method:
// const fethUser = ()=> {
//     fetch(apiUrl)
//     .then((response)=> {
//         return response.json()
//     })
//     .then((data)=>{
//         console.log(data)
//     })
// .catch((error)=> {//handle the error})
// }
// fethUser()


//async/await method:
const fethUser = async (params = "?results=10")=> {
    try {
        const response = await fetch(apiUrl + params)
    
    const data = await response.json()
    console.log(data)
    userList = data.results
    displayUser(data.results)
    } catch (error) {
        console.log(error)
    }
   
}
fethUser()

const displayElm = document.getElementById("list")
const countElm = document.getElementById("count")



const displayUser = (user)=> {
console.log(user)

let str = ""

user.map((item, i) => {
    str += `<div class="card" style="width: 18rem;">
    <img src="${item?.picture?.large}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${item?.name.title} ${item?.name.first} ${item?.name.last}</h5>
      <div class="card-text">
      <div><i class="fa-solid fa-envelope" 
      ></i> ${item?.email}
      </div>
      <div>
     <i class="fa-solid fa-phone"></i> ${item?.cell}</div>
      
      <div><i class="fa-solid fa-map-pin"> </i> ${item?.location?.street.number} ${item?.location?.street.name}
      ${item?.location?.city} ${item?.location?.state} ${item?.location?.country}</div>
      </div>
     
    </div>
  </div>`

  
})

displayElm.innerHTML = str
countElm.innerText = user.length

}

//change gender dynamically
 
document.getElementById("select").addEventListener("change", (e) => {
    const { value } = e.target
    const path = "?results=10&gender=" + value
    fethUser(path)
 })

 document.getElementById("search-input")
 .addEventListener("keyup", (e)=> {
    const {value} = e.target
    let filteredUsers = userList.filter ((item) => {
        const fullName = (item.name.first + " " + item.name.last).toLowerCase()
        return fullName.includes(value.toLowerCase())
    })
    displayUser(filteredUsers)
 })