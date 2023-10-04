const API_URL = "https://crudcrud.com/api/a2e6e884eaa54f39808ed86c645a7294";
window.onload = ()=>{
    
    axios.get(API_URL+"/addToBill")
    .then(res=>{
        console.log(res);
        for(const e of res.data){
        showOnUserScreen(e);
        }
    }).catch(err=>console.log(err));
   
}

function addToBill(event) {
    event.preventDefault();

    let price = event.target.price.value;
    let dish = event.target.dish.value;
    // let table = event.target.table.value;
    let table = document.getElementById('table');
    let value = table.value;
    var text = table.options[table.selectedIndex].text;
    

    let obj = {
        Price: price,
        Dish: dish,
        Table: text,
        Value:value
    
    }

    axios.post(API_URL+"/addToBill", obj)
    .then(res=> {
        showOnUserScreen(obj);
       
    })
    .catch(err=>console.log(err));

    event.target.reset();

}

function showOnUserScreen(obj) {
    let parentELement = '';
    if(obj.Value == 1){

         parentELement = document.getElementById('listOfItem');
    }
    if(obj.Value == 2){
         parentELement = document.getElementById('listOfItem1');
        
    }if(obj.Value == 3){
         parentELement = document.getElementById('listOfItem2');

    }
    let childElement = document.createElement('li');
    childElement.textContent = obj.Price + '- ' + obj.Dish + '- ' + obj.Table;
    parentELement.appendChild(childElement);

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete Order';
    childElement.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', function () {
        removeList(childElement);
            const id = obj._id;

            axios.delete(API_URL+`/addToBill/${id}`)
            .then(res=>{
                console.log(res);
            }).catch(err=>console.log(err));
           
        
    });
   
 }



function removeList(listItem) {
    let parentList = listItem.parentElement;
    parentList.removeChild(listItem);
}


