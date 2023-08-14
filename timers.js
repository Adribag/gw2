function currentTime() {
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds(); 
  
     hh = (hh < 10) ? "0" + hh : hh;
     mm = (mm < 10) ? "0" + mm : mm;
     ss = (ss < 10) ? "0" + ss : ss;
      
     let time = hh + ":" + mm + ":" + ss;
  
    document.getElementById("clock").innerText = time; 
    var t = setTimeout(function(){ currentTime() }, 1000); 
  }
  
  const ul = document.getElementById("worldBoss");
  const wbUrl = "https://api.guildwars2.com/v2/worldbosses";
  
  async function getWbInfos(){
      const requestURL = wbUrl;
      const request = new Request(requestURL);
      const response = await fetch(request);
      const wbName = await response.json();
      
      for (const [itemKey, itemVal] of Object.entries(wbName)){
          const li = document.createElement("li");
          li.textContent = itemVal;
          ul.appendChild(li);
        }
    }
getWbInfos()
currentTime();