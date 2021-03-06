// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyA1MfYe3LZNAny1l7uv45dwQ52i1fzKzwg",
  authDomain: "whoilikecompatability.firebaseapp.com",
  projectId: "whoilikecompatability",
  storageBucket: "whoilikecompatability.appspot.com",
  messagingSenderId: "480494029647",
  appId: "1:480494029647:web:d492ab57e34ab2ee28133a",
  measurementId: "G-0G20GHE1W5",
});

const encrypt = (message, key) => {
  return CryptoJS.AES.encrypt(message, key).toString();
};

const decrypt = (encrypted, key) => {
  return CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
};

const db = firebase.firestore();

const form = document.querySelector("#form");

const percentDisplay = document.querySelector("#percent");

const getFormInputs = () =>
  Array.from(document.querySelectorAll("#form input"));

const clearFields = () => {
  let formInputs = getFormInputs();
  formInputs[0].value = "";
  formInputs[1].value = "";
};

const convertToPercent = (percent) => {
  if (!(percent <= 1)) {
    for (
      let newPercent = percent;
      !(percent <= 1);
      newPercent = newPercent * 0.75
    ) {
      if (newPercent <= 1) {
        return newPercent * 0.5 + 0.5;
      }
    }
  } else {
    return percent * 0.5 + 0.5;
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let items = getFormInputs();

  let userNumber = 0;

  let likeNumber = 0;

  for (i = 0; i < items[0].value.length; i++) {
    userNumber = userNumber + items[0].value.charCodeAt(i);
  }

  for (i = 0; i < items[1].value.length; i++) {
    likeNumber = likeNumber + items[1].value.charCodeAt(i);
  }

  percentDisplay.style.display = "block";

  // console.log("Percent: ", convertToPercent(userNumber / likeNumber));
  percentDisplay.innerHTML = `Percent: ${Math.round(
    convertToPercent(userNumber / likeNumber) * 100,
    0
  )}`;

  let objectForFirebase;
  objectForFirebase = {
    who: items[0].value,
    crush: items[1].value,
  };

  let date = new Date();
  db.collection("db")
    .doc("people")
    .set(
      {
        [objectForFirebase.who + "_" + date.getTime()]: encrypt(
          objectForFirebase.crush,
          "wiverson"
        ),
      },
      { merge: true }
    );
  clearFields();
});
