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
    <h5 class="card-title">${title} <span class="badge bg-primary rounded-pill">${type}</span></h5>
    
    <p  class="card-text">${description.substr(1, 50)}</p>
  </div>

  <div class="card-body d-flex align-items-center justify-content-between">
  
    <a href="#" class="card-link btn btn-dark " data-bs-toggle="modal" data-bs-target="#view__more_personmodel" id=${id}>view more</a>
    <div class="edit d-flex align-items-center edit-delete ">
<a href="#" name=${id}><i class="fa-solid fa-pen-to-square" name=${id}></i> Edit</a>
<a href="#" name=${id} class="text-danger"><i name=${id} class="fa-solid fa-trash"></i> Delete</a>
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
