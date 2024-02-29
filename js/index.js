//phones API call 

const phoneDAta=async(searchText='oppo',isShowAll)=>{
    const res= await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data= await res.json();

    const phonesData=data.data

    dataDisplay(phonesData,isShowAll);
}

//phones data show web page


const dataDisplay=(phones,isShowAll)=>{

    const cardContainer=document.getElementById('cards');


    const showBtn=document.getElementById('show-all-btn');
    if(phones.length > 10 && !isShowAll){
      showBtn.classList.remove('hidden');
    }else{
      showBtn.classList.add('hidden');
    }

    cardContainer.innerText='';

    console.log(phones.length);

    if(!isShowAll){

      phones=phones.slice(0,6);

    }

  phones.forEach(phone => {
    console.log(phone);
    const cardDiv=document.createElement('div');
    cardDiv.classList='card bg-base-100 shadow-xl border border-gray-200';
    cardDiv.innerHTML=`
    <figure class="px-10 pt-10">
                          <img src="${phone.image}" class="rounded-xl" />
                        </figure>
                        <div class="card-body items-center text-center">
                          <h2 class="card-title">${phone.phone_name}</h2>
                          <p>If a dog chews shoes whose shoes does he choose?</p>
                          <div class="card-actions">
                            <button onClick='handleShowDaitls("${phone.slug}")' class="btn btn-primary">Show Details</button>
                          </div>
                        </div>
    
    `
    cardContainer.appendChild(cardDiv);
    
  });

  //hidden toggle spinner

  toggleSpiner(false);

}

//srarch handle 

const searchFild=document.getElementById('searchfild');
  const handleSearch=(isShowAll)=>{
    const searchText=searchFild.value;
    toggleSpiner(true);
    phoneDAta(searchText,isShowAll);

};

const toggleSpiner=(isloading)=>{
  const loadingSpiner= document.getElementById('loading-sliner');

     if(isloading){
      loadingSpiner.classList.remove('hidden');
     }else{
      loadingSpiner.classList.add('hidden');
     }
}

//handle show all 
const handleShowAll=()=>{

  handleSearch(true);

}

//handle show details

const handleShowDaitls= async(id)=>{

  const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)

  const data=await res.json();

  const singleData=data.data;

  handleModel(singleData)


}

const handleModel=(data)=>{

  //console.log(data);

  const modelContainer=document.getElementById('my_modal_5');

  const detailsArea=document.createElement('div');
  detailsArea.classList='modal-box';
  detailsArea.innerHTML=` <h3 class="font-bold text-lg">${data.name}</h3>
  <p class="py-4">${data.brand}</p>
  <img src="${data.image}" class="rounded-xl mx-auto block" />
  <h3>Storage : ${data.mainFeatures.storage}</h3>
  <h3>Display Size : ${data.mainFeatures.displaySize}</h3>
  <h3>Memory : ${data.mainFeatures.memory}</h3>
  <div class="modal-action">
  <form method="dialog">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
  </form>
  </div>`

  modelContainer.appendChild(detailsArea);



  my_modal_5.showModal()
}

phoneDAta();