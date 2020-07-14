/**
 * 
 * 
 * ## Deliverable

1. A website with a search bar and a button to create a keyword card

When the "create keyword" button is clicked, a card with:

- The keyword as the title
- 2 buttons:
    - One button to search for at most 12 movies that have that keyword in their title
    - One button to search for at most 12 gifs about that keyword

When either button is clicked, show the user the appropriate responsive content (should wrap) in cards with:

- An image (movie poster or gif)
- Movie or gif title

-upload it to git 


action plan:
1. html form: search bar at top;
            container for cards;
            section for results: movie or gif 
 * 
2. scripts: 
    addListner to searchbar
    addlistner to gif/movie button
    function to generate card: connect API(imdb/giphy)

3. styles

4. upload to git 

 */

//addListener to searchbar
document.getElementById("search_btn").addEventListener("click", (e) => {
  e.preventDefault();
  //read input value
  let searchKeywords = document.getElementById("search").value;
  //create div called card

  if (searchKeywords.length > 0) {
    let cards = document.createElement("div");
    cards.setAttribute("class", "card");
    //create card-body

    let card_body = document.createElement("div");
    card_body.setAttribute("class", "card-body");

    let title = document.createElement("h5");
    title.setAttribute("class", "card-title");
    title.innerHTML = searchKeywords;
    card_body.appendChild(title);

    let btn1 = document.createElement("a");
    btn1.setAttribute("class", "btn btn-primary");
    btn1.setAttribute("href", "#");
    btn1.innerHTML = "Movie";
    card_body.appendChild(btn1);
    btn1.addEventListener("click", (e) => {
      removeCard();

      fetch("https://www.omdbapi.com/?apikey=d4456abe&s=" + searchKeywords)
        .then((response) => response.json())
        .then((data) => returnMovie(data));
    });

    let btn2 = document.createElement("a");
    btn2.setAttribute("class", "btn btn-primary");
    btn2.setAttribute("href", "#");
    btn2.innerHTML = "GIF";
    card_body.appendChild(btn2);
    btn2.addEventListener("click", (e) => {
      removeCard();

      fetch(
        `https://api.giphy.com/v1/gifs/search?q=${searchKeywords}&api_key=yJeTQ6x4o0orV1k3I2gY48VsnE61Ujec&limit=12`
      )
        .then((response) => response.json())
        .then((data) => returnGIF(data));
    });

    cards.appendChild(card_body);
    document.getElementById("card_container").appendChild(cards);
  } else {
    alert("Please enter something, Moron!");
  }
});

//createMovie card
function returnMovie(movie) {
  if (movie.Response === "False") {
    document.getElementById("movieOrGif").innerHTML = "Movie not found!";
  } else {
    //create for loop
    let mydivs = [];
    let movieList = movie.Search;
    //TODO: we only need first 12!!
    for (let i = 0; i < movie.Search.length; i++) {
      mydivs[i] = document.createElement("div");
      mydivs[i].setAttribute("class", "card");
      mydivs[i].setAttribute("style", "width: 18rem;");

      let myImg = document.createElement("img");
      myImg.setAttribute("src", movieList[i].Poster);
      myImg.setAttribute("class", "card-img-top");
      myImg.setAttribute("alt", "...");
      mydivs[i].appendChild(myImg);

      let card_body = document.createElement("div");
      card_body.setAttribute("class", "card-body");

      let card_title = document.createElement("h5");
      card_title.setAttribute("class", "card-title");
      card_title.innerHTML = movieList[i].Title;

      card_body.appendChild(card_title);
      mydivs[i].appendChild(card_body);
      document.getElementById("movieOrGif").appendChild(mydivs[i]);
    }
  }
}

function returnGIF(gif) {
  if (gif.data.length < 1) {
    document.getElementById("movieOrGif").innerHTML = "GIF not found!";
  } else {
    //create for loop
    let mydivs = [];
    let gifList = gif.data;
    //TODO: we only need first 12!!
    for (let i = 0; i < 12; i++) {
      mydivs[i] = document.createElement("div");
      mydivs[i].setAttribute("class", "card");
      mydivs[i].setAttribute("style", "width: 18rem;");

      let myImg = document.createElement("img");
      myImg.setAttribute("src", gifList[i].images.downsized_large.url);
      myImg.setAttribute("class", "card-img-top");
      myImg.setAttribute("alt", "...");
      mydivs[i].appendChild(myImg);

      let card_body = document.createElement("div");
      card_body.setAttribute("class", "card-body");

      let card_title = document.createElement("h5");
      card_title.setAttribute("class", "card-title");
      card_title.innerHTML = gifList[i].title;

      card_body.appendChild(card_title);
      mydivs[i].appendChild(card_body);
      document.getElementById("movieOrGif").appendChild(mydivs[i]);
    }
  }
}

function removeCard() {
  let container = document.getElementById("movieOrGif");
  container.innerHTML = "";
}
