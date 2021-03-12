let url = "https://api.spacexdata.com/v4/launches/";
let list = document.querySelector(".list");
let page_nums = document.querySelector(".page-nums");

async function getData() {
  try {
    let res = await fetch(url, {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-type": "application/json",
      },
    });
    let data = await res.json();
    for (i = 0; i < data.length; i++) {
      let list_item = document.createElement("div");
      list_item.setAttribute("class", "list-item");
      list.append(list_item);
      let h3 = document.createElement("h3");
      h3.textContent = data[i].name;
      list_item.append(h3);
      let p = document.createElement("p");
      p.textContent = `Flight No. ${data[i].flight_number}`;
      list_item.append(p);
      let p1 = document.createElement("p");
      p1.textContent = ` ID - ${data[i].id}`;
      p.append(p1);
      let anchor = document.createElement("a");
      anchor.textContent = "Article";
      anchor.setAttribute("href", data[i].links.article);
      anchor.setAttribute("target", "_blank");
      list_item.lastElementChild.append(anchor);
      let p2 = document.createElement("p");
      let launchDate = new Date(data[i].date_utc);
      let day = launchDate.getDate();
      let month = launchDate.getMonth() + 1;
      let year = launchDate.getFullYear();
      let hours = launchDate.getHours();
      let mins = launchDate.getMinutes();
      if (day < 10) day = "0" + day;
      if (month < 10) month = "0" + month;
      if (hours < 10) hours = "0" + hours;
      if (mins < 10) mins = "0" + mins;
      p2.textContent = `Launched On - ${day}/${month}/${year} ${hours}:${mins}`;
      p1.append(p2);
      let p3 = document.createElement("p");
      if (data[i].success === true) {
        p3.innerHTML = `<b>Success</b> Yes`;
      } else {
        p3.innerHTML = `<b>Success</b> No`;
      }
      p2.append(p3);
    }
  } catch (err) {
    console.log(err);
  }
}
