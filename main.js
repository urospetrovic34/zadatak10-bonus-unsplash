const main = document.querySelector("main");
const loader = document.querySelector(".loader");
const loaderContainer = document.querySelector(".loader-container");
const buttonToggler = document.querySelector(".button-toggler");
const closeModal = document.querySelector(".close-modal");
const modalTwo = document.querySelector(".upper-modal");
var arrayOne = [];

const loadModal = (value) => {
  document.querySelector(".modal").classList.add("modal-visible");
  document.querySelector("body").classList.remove("body-scroll");
  document.querySelector(
    ".modal-image"
  ).style.backgroundImage = `url(${value.urls.regular})`;
  document.querySelector(".user-avatar-name").querySelector("img").src =
    value.user.profile_image.large;
  document.querySelector(".user-name").innerHTML = value.user.name;
  document.querySelector(".image-link").innerHTML =
    value.links.html === null ? "Not Available" : value.links.html;
  document.querySelector(".image-link").href =
    value.links.html === null ? "#" : value.links.html;
  document.querySelector(".likes-count").innerHTML = value.likes;
  document.querySelector(".downloads-count").innerHTML = value.downloads;
  document.querySelector(".user-portfolio-link").innerHTML =
    value.user.portfolio_url === null
      ? "Not Available"
      : value.user.portfolio_url;
  document.querySelector(".user-portfolio-link").href =
    value.user.portfolio_url === null ? "#" : value.user.portfolio_url;
  document.querySelector(".user-twitter-link").innerHTML =
    value.user.twitter_username === null
      ? "Not Available"
      : `https://twitter.com/${value.user.twitter_username}`;
  document.querySelector(".user-twitter-link").href =
    value.user.twitter_username === null
      ? "#"
      : `https://twitter.com/${value.user.twitter_username}`;
  document.querySelector(".user-instagram-link").innerHTML =
    value.user.instagram_username === null
      ? "Not Available"
      : `https://www.instagram.com/${value.user.instagram_username}`;
  document.querySelector(".user-instagram-link").href =
    value.user.instagram_username === null
      ? "#"
      : `https://www.instagram.com/${value.user.instagram_username}`;
};

const loadPictures = () => {
  fetch(
    "https://api.unsplash.com/photos/random?count=15&client_id=dmNNrFLOHcE0gUJ3hbzWM0k_XzRZklHQVTkDedpaNbE"
  )
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      data.forEach((x) => arrayOne.push(x));
      data.forEach(
        (x) =>
          (main.innerHTML += `<div class="picture-name-container"><img src=${
            x.urls.small
          } alt=${
            x.alt_description === null ? "Picture" : x.alt_description
          } /><p class="picture-name">${x.user.name}</p></div>`)
      );
      let pictureNameContainer = document.querySelectorAll(
        ".picture-name-container"
      );
      return pictureNameContainer;
    })
    .then(function (data) {
      let counter = 0;
      data.forEach((x) =>
        x.addEventListener("click", () => {
          let match = "";
          arrayOne.forEach((y) =>
            y.urls.small === x.querySelector("img").src ? (match = y) : null
          );
          loadModal(match);
        })
      );
      data.forEach((x) => {
        x.querySelector("img").onload = function () {
          if (x.querySelector("img").complete) {
            counter += 1;
          }
          if (counter === 15) {
            document.querySelector("body").classList.add("body-scroll");
            loader.classList.add("hidden");
            loaderContainer.classList.add("hidden");
            loaderContainer.classList.remove("loader-transparent");
          }
        };
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

window.addEventListener("load", loadPictures());
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
    document.querySelector("body").classList.remove("body-scroll");
    loader.classList.remove("hidden");
    loaderContainer.classList.add("loader-transparent");
    loaderContainer.classList.remove("hidden");
    loadPictures();
  }
});

buttonToggler.addEventListener("click", () => {
  buttonToggler.classList.toggle("grid-text");
  document.querySelector("main").classList.toggle("list");
});

closeModal.addEventListener("click", () => {
  document.querySelector(".modal-image").style.backgroundImage = "";
  document.querySelector(".user-avatar-name").querySelector("img").src = "";
  document.querySelector(".modal").classList.remove("modal-visible");
  document.querySelector("body").classList.add("body-scroll");
});

document.querySelector(".modal-image").addEventListener("click", () => {
  modalTwo.querySelector("img").src = document
    .querySelector(".modal-image")
    .style.backgroundImage.replace(/^url\(["']?/, "")
    .replace(/["']?\)$/, "");
  modalTwo.classList.add("modal-visible");
  document.querySelector("body").classList.remove("body-scroll");
});

modalTwo.addEventListener("click", () => {
  modalTwo.classList.remove("modal-visible");
  document.querySelector("body").classList.add("body-scroll");
});
