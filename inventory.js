const sharedIventoryAdri = "https://api.guildwars2.com/v2/account/inventory?access_token=E05D5508-FEA5-114E-BC29-432055F1BDEC45B7E217-81E3-4880-BBEC-026A80976E37";
const sharedIventoryCha = "https://api.guildwars2.com/v2/account/inventory?access_token=037EBDF6-54FC-CD49-AD53-4F6024FF1AD2581C4B17-9CBF-4C1F-91FA-F84F8286379F";

const inputAdri = document.getElementById("adri");
inputAdri.addEventListener("click", (event) => {
    getSharedItems(sharedIventoryAdri);
    getCharacters(charactersAdri, AdriToken);
});
const inputCha = document.getElementById("cha");
inputCha.addEventListener("click", (event) => {
    getSharedItems(sharedIventoryCha);
    getCharacters(charactersCha, ChaToken);
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

const charactersAdri = "https://api.guildwars2.com/v2/characters?access_token=E05D5508-FEA5-114E-BC29-432055F1BDEC45B7E217-81E3-4880-BBEC-026A80976E37";
const AdriToken = "E05D5508-FEA5-114E-BC29-432055F1BDEC45B7E217-81E3-4880-BBEC-026A80976E37";
const charactersCha = "https://api.guildwars2.com/v2/characters?access_token=037EBDF6-54FC-CD49-AD53-4F6024FF1AD2581C4B17-9CBF-4C1F-91FA-F84F8286379F";
const ChaToken = "037EBDF6-54FC-CD49-AD53-4F6024FF1AD2581C4B17-9CBF-4C1F-91FA-F84F8286379F";

const characters = document.getElementById("characters");

async function getCharacters(charactersIds, token){
    while (characters.firstChild) {
        characters.removeChild(characters.firstChild);
    }

    const requestURL = charactersIds;
    const request = new Request(requestURL);
    const response = await fetch(request);
    const charactersJson = await response.json();

    const ul = document.getElementById("characNav");

    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    for (const [charKey, charValue] of Object.entries(charactersJson)){
        const li = document.createElement("li");
        const a = document.createElement("a");
        const link = document.createTextNode(charValue);
        a.appendChild(link);
        a.setAttribute("href", "#"+charValue);
        li.appendChild(a);
        ul.appendChild(li);

        //console.log(charKey+"::"+charValue);
        const div = document.createElement("div");
        div.classList.add("character");
        div.setAttribute("id", charValue);

        const name = document.createElement("h2");
        name.textContent = charValue;
        div.appendChild(name);

        const button = document.createElement("button");
        button.textContent = "Inventaire";
        button.setAttribute("id",charValue + " button");
        div.appendChild(button);
        
        const showItems = document.createElement("div");
        showItems.setAttribute("id",charValue + " Inventory");
        showItems.classList.add("inventory");
        div.appendChild(showItems);

        characters.appendChild(div);
        
        document.getElementById(charValue + " button").onclick = function(){ getInventories(charValue); };
    }  
    async function getInventories(id){
        const inventory = "https://api.guildwars2.com/v2/characters/"+id+"/inventory?access_token="+token;

        const requestURL = inventory;
        const request = new Request(requestURL);
        const response = await fetch(request);
        const inventoryJson = await response.json();
        
        const itemList = document.getElementById(id + " Inventory");
        
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }

        for (const [invKey, invValue] of Object.entries(inventoryJson)){
            //console.log(invKey+"::"+invValue);
            for (const [bagKey, bagValue] of Object.entries(invValue)){
                //console.log(bagKey+"::"+bagValue);
                if(bagKey == null || bagValue == null){
                    continue;
                }
                for (const [itemKey, itemValue] of Object.entries(bagValue)){
                    //console.log(itemKey+"::"+itemValue);
                    if(itemKey == "inventory"){
                        for (const [contentKey, contentValue] of Object.entries(itemValue)){
                            if(contentValue == null){
                                continue;
                            }
                            //console.log(contentKey+"::"+contentValue);
                            const item = document.createElement("div");
                            item.classList.add("item");
                            
                            for (const [contentItemKey, contentItemValue] of Object.entries(contentValue)){
                                //console.log(contentItemKey+"::"+contentItemValue);
                                if(contentItemKey == "id"){
                                    const itemUrl = "https://api.guildwars2.com/v2/items?id=" + contentItemValue;
                                    
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
                                                item.appendChild(img)
                                            }
                                            if(itemId == "name"){
                                                const name = document.createElement("h2");
                                                name.textContent = itemValue;
                                                item.appendChild(name);
                                            }
                                            if(itemId == "rarity"){
                                                item.classList.add(itemValue);
                                            }
                                        }
                                    }
                                    getItemImg();
                                }
                                if(contentItemKey == "count"){
                                    const countItem = contentItemValue;
                                    const count = document.createElement("h5");
                                    count.textContent = "x"+countItem;
                                    item.appendChild(count);
                                }
                                itemList.appendChild(item);
                            }
                        }
                    }
                }
            }
        }
    }  
}