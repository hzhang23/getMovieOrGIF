/*

HTML
1. 2 input fields (job desc, location)
2. 3 check boxes (full time, part time, remote)
3. 1 search button

SCRIPT
1. Event listener for search button
2. Create card 
    1. logo pic
    2. job title
    3. job desc (less than 100 char)
    4. how to apply info
    5. button to view job details

CSS
1. Add bootstrap
2. Margins, etc

Github
create new repo
upload 
test

CORS work-around:https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
https://github.com/Rob--W/cors-anywhere/



*/

document.getElementById("searchButton").addEventListener("click", (e) => {
  e.preventDefault();

  // read input value
  let jobKeyword = document.getElementById("jobDesc").value;

  let locationKeyword = document.getElementById("location").value;

  removeCards();

  let proxyUrl = "https://cors-anywhere.herokuapp.com/";
  let targetUrl = `https://jobs.github.com/positions.json?description=${jobKeyword}&location=${locationKeyword}`;

  fetch(proxyUrl + targetUrl)
    .then((response) => response.json())
    .then((data) => returnJob(data));
});

function removeCards() {
  let results = document.getElementById("results");
  results.innerHTML = "";
}

function returnJob(job) {
  if (job.length > 0) {
    let jobDivs = [];

    for (let i = 0; i < job.length; i++) {
      jobDivs[i] = document.createElement("div");
      jobDivs[i].setAttribute("class", "card");
      jobDivs[i].setAttribute("style", "width: 18rem;");

      let image = document.createElement("img");
      image.setAttribute("class", "card-img-top");
      image.setAttribute("src", job[i].company_logo);
      image.setAttribute("alt", job[i].company);

      jobDivs[i].appendChild(image);

      let cardBody = document.createElement("div");
      cardBody.setAttribute("class", "card-body");

      let cardTitle = document.createElement("h5");
      cardTitle.setAttribute("class", "card-title");
      cardTitle.innerHTML = job[i].title;

      let jobDescription = document.createElement("p");
      jobDescription.setAttribute("class", "card-text");

      jobDescription.innerHTML = job[i].description.substring(0, 99);

      /**
 * let howApply = document.createElement("a");
      howApply.setAttribute("class", "card-link");
      howApply.setAttribute("target", "_blank");
      let linkHead = job[i].how_to_apply.indexOf('"') + 1;
      let linkTail = job[i].how_to_apply.lastIndexOf('"');
      howApply.setAttribute(
        "href",
        job[i].how_to_apply.substring(linkHead, linkTail)
      );
      howApply.innerHTML = "How to apply";
 */

      let howApply = document.createElement("button");
      howApply.setAttribute("class", "btn btn-link");
      howApply.setAttribute("type", "button");
      howApply.setAttribute("data-toggle", "collapse");
      howApply.setAttribute("data-target", "#collapseExample");
      howApply.setAttribute("aria-expanded", "false");
      howApply.setAttribute("aria-controls", "collapseExample");
      howApply.innerHTML = "Apply here";

      let howApplyDiv = document.createElement("div");
      howApplyDiv.setAttribute("class", "collapse");
      howApplyDiv.setAttribute("id", "collapseExample");

      let howApplyDivInner = document.createElement("div");
      howApplyDivInner.setAttribute("class", "card card-body");
      howApplyDivInner.innerHTML = job[i].how_to_apply;

      howApplyDiv.appendChild(howApplyDivInner);

      cardBody.appendChild(howApplyDiv);

      let jobDetails = document.createElement("a");
      jobDetails.setAttribute("class", "card-link");
      jobDetails.setAttribute("href", job[i].url);
      jobDetails.setAttribute("target", "_blank");
      jobDetails.innerHTML = "Job Details";

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(jobDescription);
      cardBody.appendChild(howApply);
      cardBody.appendChild(jobDetails);

      jobDivs[i].appendChild(cardBody);
      document.getElementById("results").appendChild(jobDivs[i]);
    }
  } else {
    alert("we cannot find any matches jobs");
  }
}
