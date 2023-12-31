


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxMynw8ZuwWrt4LMfpB_sV8YAp5qv9Uxc",
  authDomain: "unit5-cw-b30-auto-part-website.firebaseapp.com",
  projectId: "unit5-cw-b30-auto-part-website",
  storageBucket: "unit5-cw-b30-auto-part-website.appspot.com",
  messagingSenderId: "524054928125",
  appId: "1:524054928125:web:1b57f1e20e3d68cf93bc94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");


signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

let accessToken = localStorage.getItem("accessToken") || null;

document.getElementById("signUp_action").addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("clicked on sign up")

    let email = document.querySelector("#up_email").value;
    let name = document.querySelector("#up_name").value;
    let password = document.querySelector("#up_pass").value;
    localStorage.setItem("userName", name);


    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            goleft()

            showtost("Registration Succesful !!")
            window.location.href="index.html";

            localStorage.setItem("accessToken", user.accessToken);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorMessage);
            showtost(errorMessage);
        });
});

//login part*********************************************************************

document.getElementById("signIn_action").addEventListener("submit", (e) => {

    e.preventDefault();
    console.log("clicked on log in")
    let email = document.querySelector("#in_email").value;
    let password = document.querySelector("#in_pass").value;

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 

            const user = userCredential.user;
            console.log("login Succesful")
            showtost("login Succesful");
            window.location.href = "index.html";
            
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Error code: ${errorCode}`);
            console.error(`Error message: ${errorMessage}`);
            showtost(errorMessage)
        });


})

//*************************************************************************google login */
const googleElements = document.querySelectorAll("#google");

// Define the click event handler function
function handleGoogleClick(e) {
    e.preventDefault();

    const provider = new GoogleAuthProvider(app);
    const auth = getAuth();

    signInWithPopup(auth, provider)
        .then((result) => {
            // Handle the sign-in success
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            window.location.href = "/index.html"
            // ...
        })
        .catch((error) => {
            // Handle sign-in errors
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}

// Attach the same click event handler to all "google" elements
googleElements.forEach((element) => {
    element.addEventListener("click", handleGoogleClick);
});



var tostBox = document.getElementById("tostBox");

function showtost(cre) {
    var tost = document.createElement("div");
    tost.classList.add("tost");
    tost.innerHTML = "<i class='bx bxs-x-circle'></i>" + cre;
    if (cre.includes('Succesful')) {
        tost.classList.add("sucess");
        tost.innerHTML = "<i class='bx bx-check-circle'></i>" + cre;
    }
    if (cre.includes('invalid')) {
        // tost.classList.add("sucess");
        tost.innerHTML = "<i class='bx bxs-x-circle'></i>" + "Invalid email";
    }
    if (cre.includes('already')) {
        // tost.classList.add("sucess");
        tost.innerHTML = "<i class='bx bxs-x-circle'></i>" + "Email already registered";
    }
    if (cre.includes('least')) {
        // tost.classList.add("sucess");
        tost.innerHTML = "<i class='bx bxs-x-circle'></i>" + "Password should be least 6 character";
    }

    tostBox.appendChild(tost);
    setTimeout(() => {
        tost.remove();
    }, 1500);

}
function goleft() {
    container.classList.remove("right-panel-active");
}