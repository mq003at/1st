// Dynamically loading dependancies
let resources = document.getElementById("loader").getAttribute("resources");
let resourcesArr = resources.split(";");

let listJS = {
  // JS Resources List
  firebasejs: {
    url: "https://www.gstatic.com/firebasejs/4.3.1/firebase.js",
    type: "text/javascript",
    location: "body",
  },
  firebaseInit: {
    url: "/js/firebase_init.js",
    type: "text/javascript",
    location: "body",
  },
  firebaseRef: {
    url: "/js/firebase_ref.js",
    type: "text/javascript",
    location: "body",
  },
  jQuery: {
    url: "/js/jquery-3.2.1.js",
    type: "text/javascript",
    location: "head",
  },
  bootStrap: {
    url: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js",
    type: "text/javascript",
    location: "head",
  },

  // External JS files
  management: {
    url: "/js/management.js",
    type: "text/javascript",
    location: "body",
  },

  dateStamp: {
    url: "/js/dateStamp.js",
    type: "text/javascript",
    location: "body",
  },

  pinPage: {
    url: "/js/pinPage.js",
    type: "text/javascript",
    location: "body",
  },
};

resourcesArr.forEach((resourcesName) => {
  let resource = listJS[resourcesName];
  let script = document.createElement("script");
  script.src = resource.url;
  script.async = false;
  script.type = resource.type;
  if (resource.location == "head") {document.head.append(script)}
  else document.body.append(script);
  console.log(listJS[resourcesName])
});


