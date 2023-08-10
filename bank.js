//Récupération des Ids des objets en banque
const bankAdri = "https://api.guildwars2.com/v2/account/bank?access_token=E05D5508-FEA5-114E-BC29-432055F1BDEC45B7E217-81E3-4880-BBEC-026A80976E37";
const bankCha = "https://api.guildwars2.com/v2/account/bank?access_token=037EBDF6-54FC-CD49-AD53-4F6024FF1AD2581C4B17-9CBF-4C1F-91FA-F84F8286379F";

const inputAdri = document.getElementById("adri");
inputAdri.addEventListener("click", (event) => {
    getBankItems(bankAdri);
});
const inputCha = document.getElementById("cha");
inputCha.addEventListener("click", (event) => {
    getBankItems(bankCha);
});

    // var multiTask = new Array();
    const section = document.getElementById("bank");
    const numberItems = document.getElementById("numberItems");
    async function getBankItems(idBank){
        while (section.firstChild) {
            section.removeChild(section.firstChild);
        }

        const requestURL = idBank;

        const request = new Request(requestURL);

        const response = await fetch(request);
        const bankItems = await response.json();

        //console.log(bankItems);

        let arrayBank = [];

        for (let i = 0; i < bankItems.length; i++) {
            if(bankItems[i] == null){
                continue;
            }
            
            let  objItems = {};
            for (const [itemKey, itemValue] of Object.entries(bankItems[i])) {
                //console.log(itemValue);
                if(itemKey == "id"){
                    objItems.id = itemValue;
                }
                if(itemKey == "count"){
                    objItems.count = itemValue;
                }
                //objItems.id = bankItems[i].id;
                //objItems.count = bankItems[i].count;
        
                arrayBank.push(objItems);        

            }
        }
        //console.log(arrayBank);
        for (const [keys, value] of Object.entries(bankItems)) {
            if(value == null){
                continue;
            }
            //var itemObject = new Object();
            //     let n = 0;
            //     while (n < 1) {
                //     console.log(value);
                //     n++;
                //    }
                
                //console.log(value);
                
            //for (let i = 0; i < bankItems.length; i++) {
                // let objId = "id:"+i;
                // let objCount = "count:"+i;
                
                //objItems = {objId : value.id, i: value.count} 
            //}
            //console.log(arrayBank);
            
            
            
            for (const [key, val] of Object.entries(value)) {
                //console.log(key, val);
                // if(key == 'id' || key == 'count'){
                // while(key){
                //     multiTask[key] = val; 
                // }
                


                //RECUP NOMBRE ITEM
                // if (key == "count") {
                //     const divCount = document.createElement("div");
                //     divCount.classList.add("countItem");
                //     const countNumber = document.createElement("div");
                //     countNumber.textContent = "x "+val;
                //     numberItems.appendChild(countNumber);
                // }
                if(key == "id"){
                    //////////////////////////////////
                    //console.log(val);
                    const itemUrl = "https://api.guildwars2.com/v2/items?ids=" + val;
                    //console.log(itemUrl);
                    
                    async function getItemInfos(){
                        const requestURL = itemUrl;
                        const request = new Request(requestURL);
                        const response = await fetch(request);
                        const itemInfos = await response.json();

                        //console.log(itemInfos);
                        for (const [itemKey, itemVal] of Object.entries(itemInfos)) {
                            if(response.status === 404){
                                continue;
                            }
                            //console.log(itemVal);
                            const div = document.createElement("div");
                            div.classList.add("item")
                            // if(key == "count"){
                            //     const count = document.createElement("h6");
                            //     count.textContent = val;
                            //     div.appendChild(count);
                            // }
                            const arrayCount = [];
                            const count = document.createElement("h6");
                            for (let i = 0; i < arrayBank.length; i++) {
                                if (val == arrayBank[i].id) {
                                    const pushCount = arrayCount.push("x"+arrayBank[i].count);
                                    const unique = Array.from(new Set(arrayCount));
                                    count.textContent = unique;
                                    div.appendChild(count);                                       
                                }
                                        
                            }
                            
                            for (const [itemOpt, itemDesc] of Object.entries(itemVal)){
                                // console.log(itemOpt);
                                // if (itemOpt == "id"){
                                //     var count = sessionStorage.getItem(itemDesc);
                                //     const countObj = document.createElement("h6");
                                //     countObj.textContent = count;
                                //     div.appendChild(countObj);
                                // }
                                
                                //console.log(arrayBank[1]);
                             
                                    // const element = array[i];
                                    // if((itemOpt == "id") == (arrayBank[i].id)){
                                    //     console.log(arrayBank[i].count);
                                    //     const count = document.createElement("h1");
                                    //     count.textContent = arrayBank[i].count;
                                    //     div.appendChild(count);
                                    // }



                                // AFFICHER LES COUNT DES OBJETS



                                
                                if(itemOpt == "name"){
                                    //console.log(itemDesc);
                                    const txt = document.createElement("h3");
                                    txt.textContent = itemDesc;
                                    div.appendChild(txt);
                                }
                                if(itemOpt == "icon"){
                                    const img = document.createElement("img");
                                    //console.log(itemDesc);
                                    img.src = itemDesc;
                                    div.appendChild(img);
                                }
                                if(itemOpt == "description" && ((itemOpt == "description") != "")){
                                    const desc = document.createElement("h5");
                                    desc.textContent = itemDesc;
                                    div.appendChild(desc);
                                }else{
                                    for (const [itemDetail, itemDetails] of Object.entries(itemDesc)){
                                        //console.log(itemDetail + " : " + itemDetails);
                                        if(itemDetail == "description"){
                                            const det = document.createElement("h5");
                                            det.textContent = itemDetails;
                                            div.appendChild(det);
                                        }
                                    }
                                }
                                
                                section.appendChild(div);
                            }
                        }     
                    }
                    getItemInfos();               
                }        
            }
        }
    }
    

