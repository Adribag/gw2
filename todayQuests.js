// On récupère l'ID -> On cherche la quete associé a l'ID

const apiGw2UrlDaily = "https://api.guildwars2.com/v2/achievements/daily";

let idQuests = [];
let urlQuests = [];

function recupQuestId(){
    let requete = new XMLHttpRequest();
    requete.open('GET', apiGw2UrlDaily);
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
                    idQuests.push(reponse.pve[index].id);
                }

                let urlListOfQuests = "https://api.guildwars2.com/v2/achievements?lang=fr&ids=";

                for (let index = 0; index < idQuests.length; index++) {
                    urlQuests.push(urlListOfQuests + idQuests[index]);    
                    // console.log(urlQuests);              
                }
                // let questOne = "https://api.guildwars2.com/v2/achievements?lang=fr&ids=" + questResponse;
                // console.log(questResponse);
                // console.log(questOne);
                // document.getElementById('#daily').innerHTML = questResponse;
            }
            else('Oups il y a un problème...');
        }
        printQuests();
    }
}

function printQuests(){
    for (let index = 0; index < urlQuests.length; index++) {       
        let requete = new XMLHttpRequest();
        requete.open('GET', urlQuests[index]);
        requete.responseType = 'json';
        requete.send();

        requete.onload = function(){
            if(requete.readyState === XMLHttpRequest.DONE){
                if(requete.status === 200){

                    let reponse = requete.response;

                    let nameQuest = reponse[0].name;
                    console.log(nameQuest);
                    document.getElementById('daily'+index).innerHTML = nameQuest;

                    let requirementQuest = reponse[0].requirement;
                    // console.log(requirementQuest);
                    document.getElementById("dailyResume"+index).innerHTML = requirementQuest;
                    
                }
                else('Oups il y a un problème...');
            }
        }
    }
}



function runAppDaily(){
    recupQuestId();
}    
runAppDaily();