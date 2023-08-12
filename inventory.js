const sharedIventoryAdri = "https://api.guildwars2.com/v2/account/inventory?access_token=E05D5508-FEA5-114E-BC29-432055F1BDEC45B7E217-81E3-4880-BBEC-026A80976E37"
const sharedIventoryCha = "https://api.guildwars2.com/v2/account/inventory?access_token=037EBDF6-54FC-CD49-AD53-4F6024FF1AD2581C4B17-9CBF-4C1F-91FA-F84F8286379F";

const inputAdri = document.getElementById("adri");
inputAdri.addEventListener("click", (event) => {
    getSharedItems(sharedIventoryAdri);
});
const inputCha = document.getElementById("cha");
inputCha.addEventListener("click", (event) => {
    getSharedItems(sharedIventoryCha);
});

const section = document.getElementById("sharedInventory");

async function getSharedItems(idIventory){

    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }

    const requestURL = idIventory;
    const request = new Request(requestURL);
    const response = await fetch(request);
    const sharedInventory = await response.json();

    for (const [inventoryKey, inventoryValue] of Object.entries(sharedInventory)){
        //console.log(inventoryValue);     
        const div = document.createElement("div");
        div.classList.add("sharedItem");

        if(inventoryValue.id == 78599){
            const name = document.createElement("h2");
            name.textContent = "augmentation lvl 80";
            div.appendChild(name);

            const noImg = document.createElement("div");
            noImg.classList.add("noImg");
            div.appendChild(noImg);
        }

        for (const [keyId, keyValue] of Object.entries(inventoryValue)){
            //console.log(keyValue);
            if(keyId == "id"){
                const itemUrl = "https://api.guildwars2.com/v2/items?id=" + keyValue;
                
                async function getItemImg(){
                    const requestURL = itemUrl;
                    const request = new Request(requestURL);
                    const response = await fetch(request);
                    const itemLog = await response.json();
                    
                    //console.log(itemLog);
                    for (const [itemId, itemValue] of Object.entries(itemLog)){
                        //console.log(itemValue);
                        if(itemId == "icon"){
                            //console.log(itemValue);
                            const img = document.createElement("img");
                            img.src = itemValue;
                            div.appendChild(img)
                        }
                        if(itemId == "name"){
                            const name = document.createElement("h2");
                            name.textContent = itemValue;
                            div.appendChild(name);
                        }
                    }
                }
                getItemImg();
            }
            if(keyId == "count"){
                const count = document.createElement("h5");
                count.textContent = "x"+keyValue;
                div.appendChild(count);
            }
            section.appendChild(div);
        }
    }
}