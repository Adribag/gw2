// On récupère l'ID -> On cherche la quete associé a l'ID

const apiGw2UrlItem = "https://api.guildwars2.com/v2/items?ids=19976";
const apiGw2UrlPriceItem = "https://api.guildwars2.com/v2/commerce/prices?ids=19976";
// let idQuests = [];
// let urlQuests = [];

function recupItemId(){
    let requete = new XMLHttpRequest();
    requete.open('GET', apiGw2UrlItem);
    requete.responseType = 'json';
    requete.send();

    requete.onload = function(){
        if(requete.readyState === XMLHttpRequest.DONE){
            if(requete.status === 200){
                let reponse = requete.response;
                // let questResponse = reponse.pve[0].id;
                let nameItem = reponse[0].name;
                let imageItem = reponse[0].icon;
                console.log(nameItem);
                console.log(imageItem);
                document.getElementById("itemName").innerText = nameItem;
                document.getElementById("imgItem").src = imageItem;
            }
            else('Oups il y a un problème...');
        }
        // printQuests();
    }
}


function recupItemPrice(){
    let requete = new XMLHttpRequest();
    requete.open('GET', apiGw2UrlPriceItem);
    requete.responseType = 'json';
    requete.send();

    requete.onload = function(){
        if(requete.readyState === XMLHttpRequest.DONE){
            if(requete.status === 200){
                let reponse = requete.response;

               let buyPrice = reponse[0].buys.unit_price
               document.getElementById("itemBuy").innerText = buyPrice;

               let sellPrice = reponse[0].sells.unit_price
               document.getElementById("itemSell").innerText = sellPrice;
            }
            else('Oups il y a un problème...');
        }
        // printQuests();
    }
}



function runAppItem(){
    recupItemId();
    recupItemPrice();
}    
runAppItem();