const data = {
    persons:[]
}

const cards = document.querySelector('.cards-div');

const detailinfo=document.querySelector('.more-person-info')
console.log(cards, detailinfo)


const cardcontent = ({ id, url,type, title, description }) => {
    return `
    
   <div class='mt-3 indudialcard ' id=${id} key=${id}>
<div class="card shadow-sm solocard" style="width:350px;">
   
  
 <img src=${url}  class="card-img-top person-image" alt=${title}>
 
 
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <span class="badge bg-primary rounded-pill">${type}</span>
    <p  class="card-text">${description.substr(0, 50)}</p>
  </div>

  <div class="card-body d-flex align-items-center justify-content-between">
  
    <button href="#" class="card-link btn btn-dark " id=${id} name=${id}  data-bs-toggle="modal" data-bs-target="#view__more_personmodel" onclick='alternativeopen(${id})'>view more</button>
    <div class="edit d-flex align-items-center edit-delete ">
<a href="#" onclick=' editpersoninfo.apply(this,arguments)' name=${id}><i class="fa-solid fa-pen-to-square" name=${id}></i> Edit</a>
<a href="#" name=${id} class="text-danger" onclick='deletetheperson.apply(this,arguments)'><i name=${id} class="fa-solid fa-trash"></i> Delete</a>
    </div>
  </div>
</div>


    </div>
    
    
    
    `
    
}


const viewmoreinfo = ({ id, url, type, title, description }) => { 
let date=new Date(parseInt(id))
    return `
    
    <div id=${id}>

    <img src=${url} width="100%"  class='img-fluid rounded'         />
    <Strong class='text-muted text-sm' >Created on ${date.toDateString()} </strong>
    <h2>${title} <span class="badge bg-primary rounded-pill">${type}</span></h2>

     <p class="card-text">${description}</p>

    </div>
    
    
    
    
    `
}

const updatelocalstorage = () => {
    
    localStorage.setItem(
        'persons',
        JSON.stringify({
           persons: data.persons,
        })
    )
}

const loadformloaclstorage = () => {
    let personcopy = JSON.parse(localStorage.persons);
    if (personcopy) data.persons = personcopy.persons;
       
        data.persons.map(x => {
            cards.insertAdjacentHTML('beforeend',cardcontent(x))
        })
    
}

const handelsubmit = () => {
    const id = Date.now()
    const input = {
        url:document.getElementById('imageurl').value,
        title:document.getElementById('personname').value,
        description:document.getElementById("description").value,
        type:document.getElementById("persontype").value,
    }

    cards.insertAdjacentHTML(
        'beforeend', cardcontent({
            ...input,
            id,
        })
    )
    data.persons.push({
            ...input,
            id,
    })
    updatelocalstorage()
}

const openpersoninfo = (e) => {
    console.log(e)
    if (!e) e = window.event;
    const getperson = data.persons.find(({ id }) => id === e.target.id);
    // detailinfo.innerHTML=viewmoreinfo(getperson)
    console.log(getperson)
}


const alternativeopen = (id) => {
    console.log(id)
    let searchedid = id;
    // if (!e) e = window.event;
    const getperson = data.persons.find(({ id }) => id === searchedid);
   
    detailinfo.innerHTML=viewmoreinfo(getperson)
    // console.log(detailinfo)
    // console.log(getperson)
}


const deletetheperson = (e) => {
    if (!e) e = window.event;
    const personid = e.target.name;
    console.log(personid)
    const removerdperson = data.persons.filter(x => {
        return x.id!=personid
    })
    data.persons = removerdperson
    updatelocalstorage()
    let element = document.getElementById(personid);
element.parentNode.removeChild(element);
    
}

const searchperson = (e) => {
        if (!e) e = window.event;
    while (cards.firstChild) {
    cards.removeChild(cards.firstChild)
}
    const resultdata = data.persons.filter(({ title }) => {
     return   title.toLowerCase().includes(e.target.value.toLowerCase())
    })

    resultdata.map((x) => {
       return  cards.insertAdjacentHTML('beforeend', cardcontent(x))
    });
}


const editpersoninfo = (e) => {
    if (!e) e = window.event;
    const targetid = e.target.name;

   let element = document.getElementById(targetid);
    console.log(element.firstElementChild.childNodes[3].lastElementChild)
    let parentNode = e.target.parentNode;
    let title=element.firstElementChild.childNodes[3].childNodes[1];
    let description=element.firstElementChild.childNodes[3].lastElementChild;
    let type = element.firstElementChild.childNodes[3].childNodes[3];
    let submitbutton = element.firstElementChild.childNodes[5].firstElementChild;
    title.setAttribute("contenteditable", "true");
type.setAttribute("contenteditable", "true");
description.setAttribute("contenteditable", "true");
    submitbutton.setAttribute("onclick", `saveedit(this,arguments)`)
    submitbutton.removeAttribute('data-bs-toggle')
        submitbutton.removeAttribute('data-bs-target')
submitbutton.innerHTML='Save changes'
}

const saveedit = (e) => {
    if (!e) e = window.event;
    
    

  console.log(e)
    const targetid = e.getAttribute('id');
    console.log(targetid)
 let element = document.getElementById(targetid);
    console.log(element.firstElementChild.childNodes[3].lastElementChild)
    // let parentNode = e.target.parentNode;
    let title=element.firstElementChild.childNodes[3].childNodes[1];
    let description=element.firstElementChild.childNodes[3].lastElementChild;
    let type = element.firstElementChild.childNodes[3].childNodes[3];
    let submitbutton = element.firstElementChild.childNodes[5].firstElementChild;

    const updateddata = {
        title:title.innerText,
        description:description.innerText,
        type:type.innerText,
        
    }

    // console.log(updateddata)

    let datacopy = data.persons;

    datacopy = datacopy.map(x => 
     
       
        x.id == targetid ? {
            id: x.id,
            url: x.url,
            title: updateddata.title,
            description: updateddata.description,
            type: updateddata.type
        }
            : x
        
    
     
    
    )
    console.log(datacopy,"last")

    data.persons = datacopy;
    
    updatelocalstorage();

      title.setAttribute("contenteditable", "false");
type.setAttribute("contenteditable", "false");
    description.setAttribute("contenteditable", "false");
       
     submitbutton.innerHTML = 'view more'
      submitbutton.setAttribute('data-bs-toggle',"modal")
    submitbutton.setAttribute('data-bs-target',"#view__more_personmodel")
    
     submitbutton.setAttribute("onclick", ` alternativeopen(${targetid})`)
   


}
