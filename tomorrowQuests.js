// On récupère l'ID -> On cherche la quete associé a l'ID

const apiGw2UrlTomorrow = "https://api.guildwars2.com/v2/achievements/daily/tomorrow";

let idQuestsTomorrow = [];
let urlQuestsTomorrrow = [];

function recupQuestIdTomorrow(){
    let requete = new XMLHttpRequest();
    requete.open('GET', apiGw2UrlTomorrow);
    requete.responseType = 'json';
    requete.send();

    requete.onload = function(){
        if(requete.readyState === XMLHttpRequest.DONE){
            if(requete.status === 200){
                let reponse = requete.response;
                // let questResponse = reponse.pve[0].id;

                //Récupération de tous les ID de quetes                
                for (let index = 0; index < reponse.pve.length; index++) {
                    // console.log(reponse.pve[index].id);
                    idQuestsTomorrow.push(reponse.pve[index].id);
                }

                let urlListOfQuests = "https://api.guildwars2.com/v2/achievements?lang=fr&ids=";

                for (let index = 0; index < idQuests.length; index++) {
                    urlQuestsTomorrrow.push(urlListOfQuests + idQuestsTomorrow[index]);    
                    // console.log(urlQuests);              
                }
              
            }
            else('Oups il y a un problème...');
        }
        printQuestsTomorrow();
    }
}

function printQuestsTomorrow(){
    for (let index = 0; index < urlQuestsTomorrrow.length; index++) {       
        let requete = new XMLHttpRequest();
        requete.open('GET', urlQuestsTomorrrow[index]);
        requete.responseType = 'json';
        requete.send();

        requete.onload = function(){
            if(requete.readyState === XMLHttpRequest.DONE){
                if(requete.status === 200){

                    let reponse = requete.response;

                    let nameQuest = reponse[0].name;
                    console.log(nameQuest);
                    document.getElementById('tomorrow'+index).innerHTML = nameQuest;

                    let requirementQuest = reponse[0].requirement;
                    // console.log(requirementQuest);
                    document.getElementById("tomorrowResume"+index).innerHTML = requirementQuest;
                    
                }
                else('Oups il y a un problème...');
            }
        }
    }
}



function runAppTomorrow(){
    recupQuestIdTomorrow();
}    
runAppTomorrow();