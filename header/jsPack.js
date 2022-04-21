// Dynamically loading dependancies
let resources = document.getElementById("loader").getAttribute("resources");
let resourcesArr = resources.split(";");
// console.log(resourcesArr);

let listJS = {
  // JS Resources List
  firebasejs: {
    url: "https://www.gstatic.com/firebasejs/4.3.1/firebase.js",
    type: "text/javascript",
    location: "body",
  },
  firebaseInit: {
    url: "./js/firebase_init.js",
    type: "text/javascript",
    location: "body",
  },
  firebaseRef: {
    url: "./js/firebase_ref.js",
    type: "text/javascript",
    location: "body",
  },
  jQuery: {
    url: "./js/jquery-3.2.1.js",
    type: "text/javascript",
    location: "body",
  },
  bootStrap: {
    url: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js",
    type: "text/javascript",
    location: "head",
  },
};

resourcesArr.forEach((resourcesName) => {
  let resource = listJS[resourcesName];
  let script = document.createElement("script");
  script.src = resource.url;
  script.async = false;
  script.type = resource.type;
  script.onload = console.log(resource.url);
  if (resource.location == "head") document.head.apend(script);
  else document.body.append(script);
});
