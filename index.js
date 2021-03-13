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

    let current_page = 5;
    let rows = 12;

    function displayList(items, wrapper, rowsperpage, page) {
      wrapper.innerHTML = "";
      page--;

      let start = rowsperpage * page;
      let end = start + rowsperpage;
      let paginatedItems = items.slice(start, end);

      for (i = 0; i < paginatedItems.length; i++) {
        let item = paginatedItems[i];

        let list_item = document.createElement("div");
        list_item.setAttribute("class", "list-item");
        list.append(list_item);
        let h3 = document.createElement("h3");
        h3.textContent = item.name;
        list_item.append(h3);
        let p = document.createElement("p");
        p.textContent = `Flight No. ${item.flight_number}`;
        list_item.append(p);
        let p1 = document.createElement("p");
        p1.textContent = ` ID - ${item.id}`;
        p.append(p1);
        let anchor = document.createElement("a");
        anchor.textContent = "Article";
        anchor.setAttribute("href", item.links.article);
        anchor.setAttribute("target", "_blank");
        list_item.lastElementChild.append(anchor);
        let p2 = document.createElement("p");
        let launchDate = new Date(item.date_utc);
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
        if (item.success === true) {
          p3.innerHTML = `<b>Success</b> Yes`;
        } else {
          p3.innerHTML = `<b>Success</b> No`;
        }
        p2.append(p3);
      }
    }

    function setPagination(items, wrapper, rowsperpage) {
      wrapper.innerHTML = "";
      let page_count = Math.ceil(items.length / rowsperpage);
      for (i = 1; i <= page_count; i++) {
        var btn = paginationButton(i);
        page_nums.append(btn);
      }
      var prev_btn = prevBtn();
      page_nums.insertAdjacentElement("afterbegin", prev_btn);

      var next_btn = nextBtn();
      page_nums.insertAdjacentElement("beforeend", next_btn);
    }

    function prevBtn() {
      let button = document.createElement("button");
      button.innerText = "Prev";
      button.addEventListener("click", () => {
        current_page = current_page - 1;
        if (current_page > 0) {
          displayList(data, list, rows, current_page);
          let current_btn = document.querySelector("button.active");
          current_btn.removeAttribute("class", "active");
          let prev_btn = current_btn.previousSibling;
          prev_btn.setAttribute("class", "active");
        }
      });
      return button;
    }

    function nextBtn() {
      let button = document.createElement("button");
      button.innerText = "Next";
      button.addEventListener("click", () => {
        current_page = current_page + 1;
        if (current_page <= button.previousSibling.innerText) {
          displayList(data, list, rows, current_page);
          let current_btn = document.querySelector("button.active");
          current_btn.removeAttribute("class", "active");
          let next_btn = current_btn.nextSibling;
          next_btn.setAttribute("class", "active");
        }
      });
      return button;
    }

    function paginationButton(page) {
      let button = document.createElement("button");
      button.innerText = page;
      if (current_page === page) button.setAttribute("class", "active");

      button.addEventListener("click", () => {
        current_page = page;
        displayList(data, list, rows, page);
        let current_btn = document.querySelector("button.active");
        current_btn.removeAttribute("class", "active");
        button.setAttribute("class", "active");
      });
      return button;
    }

    displayList(data, list, rows, current_page);
    setPagination(data, page_nums, rows);
  } catch (err) {
    console.log(err);
  }
}
