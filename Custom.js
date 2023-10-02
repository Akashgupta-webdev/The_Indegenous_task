const searchBar = document.querySelector(".searchbar");
const submitBtn = document.querySelector("#submit");
const webContent = document.querySelector(".web-content");

const addDataToHtml = (datas) => {
  webContent.innerHTML = "";
  webContent.innerHTML += `<h1 class="web-result">Web Results</h1>`;
  datas["data"].forEach(data => {
    webContent.innerHTML += `
      <div class="content">
        <h2 class="title">${data.title}</h2>
        <p class="paragraph">
          ${data.abstract.slice(0, 150)}....</p>
          <div class="more">
        <a href="${data.url}" class="link">Get Content</a>
        <div>
      </div>
    `
  })
}

// Function to get data from the API 
const getData = () => {
  let data = JSON.stringify({
    keyword: searchBar.value,
    limit: "10"
  });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.gyanibooks.com/search_publication/",
    headers: {
      "Content-Type": "application/json"
    },
    data: data
  };
  axios
    .request(config)
    .then((response) => {
      addDataToHtml(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

submitBtn.addEventListener("click", getData);
