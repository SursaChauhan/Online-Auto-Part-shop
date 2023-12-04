var paymentprice = parseInt(localStorage.getItem('paymentprice'));

var totalmrp =document.getElementById('totalmrp');
totalmrp.innerText = paymentprice;

var totalamt= document.getElementById('totalamt');
totalamt.innerText = paymentprice;

var totaldisc =document.getElementById('totaldisc');
totaldisc.innerText = paymentprice/2;

var options = {
            "key": "rzp_test_xkkA99Z3D9jiWf", // Replace with your Razorpay API key
            "amount": `${paymentprice}00`, // Replace with your desired amount (in paise)
            "currency": "INR",
            "name": "Auto Parts",
            "description": "Test Payment",
            "image": "./Images/Black logo - no background.png",
            "handler": function (response){
                window.location.href = "./checkout.html";
            }
        };
      
        var rzp1 = new Razorpay(options);

        document.getElementById('payment_btn').onclick = function(e){
            rzp1.open();
            e.preventDefault();
        }


//payment

    document.addEventListener("DOMContentLoaded", function() {
    const addressForm = document.querySelector("form");
    const postalCodeInput = document.getElementById("pin");
    const cityInput = document.getElementById("city");
    const stateInput = document.getElementById("state");
    const countryInput = document.getElementById("Country");
    const makeDefaultCheckbox = document.getElementById("makeDefault");
    const errorContainer = document.getElementById("errorContainer");

       // Static data for postal code to city, state, and country mapping
       const postalCodeData = {
        "110001": { city: "New Delhi", state: "Delhi", country: "India" },
        "400001": { city: "Mumbai", state: "Maharashtra", country: "India" },
        "700001": { city: "Kolkata", state: "West Bengal", country: "India" },
        "600001": { city: "Chennai", state: "Tamil Nadu", country: "India" },
        "380001": { city: "Ahmedabad", state: "Gujarat", country: "India" },
        "500001": { city: "Hyderabad", state: "Telangana", country: "India" },
        "560001": { city: "Bengaluru", state: "Karnataka", country: "India" },
        "110002": { city: "Connaught Place", state: "Delhi", country: "India" },
        "600002": { city: "Mount Road", state: "Tamil Nadu", country: "India" },
        "682001": { city: "Kochi", state: "Kerala", country: "India" },
        "226001": { city: "Lucknow", state: "Uttar Pradesh", country: "India" },
        "302001": { city: "Jaipur", state: "Rajasthan", country: "India" },
        "700032": { city: "Howrah", state: "West Bengal", country: "India" },
        "695014": { city: "Thiruvananthapuram", state: "Kerala", country: "India" },
        "110003": { city: "Karol Bagh", state: "Delhi", country: "India" },
        "380013": { city: "Navrangpura", state: "Gujarat", country: "India" },
        "600003": { city: "Parrys Corner", state: "Tamil Nadu", country: "India" },
        "400012": { city: "Parel", state: "Maharashtra", country: "India" },
        "390001": { city: "Rajmahal Road", state: "Gujarat", country: "India" },
        "281001": { city: "Mathura", state: "Uttar Pradesh", country: "India" },
        "560002": { city: "Bangalore", state: "Karnataka", country: "India" },
        "201301": { city: "Noida", state: "Uttar Pradesh", country: "India" },
        "273001": { city: "Gorakhpur", state: "Uttar Pradesh", country: "India" },
        "273003": { city: "Gorakhpur", state: "Uttar Pradesh", country: "India" },
        "411047": { city: "Pune", state: "Maharashtra", country: "India" },
        // Add more postal code data here...
    };

    // Function to fill city, state, and country fields based on postal code
    function fillAddressDetails(postalCode) {
        const data = postalCodeData[postalCode];
        if (data) {
            cityInput.value = data.city;
            stateInput.value = data.state;
            countryInput.value = data.country;
        }
    }

    // Event listener for postal code input changes
    postalCodeInput.addEventListener("change", function() {
        const postalCode = postalCodeInput.value;
        fillAddressDetails(postalCode);
    });

       // Event listener for form submission
       addressForm.addEventListener("submit", function(event) {
        event.preventDefault();
        errorContainer.innerHTML = "";

        // Validate form inputs
        const name = document.getElementById("name").value;
        let number = document.getElementById("number").value;
        const address = document.getElementById("address").value;
        const pin = postalCodeInput.value;
        const city = cityInput.value;
        const state = stateInput.value;
        const country = countryInput.value;

        if (!name || !number || !address || !pin || !city || !state || !country) {
            displayError("Please fill in all the required fields.");
            return;
        }

        // Remove non-digit characters from the mobile number
        number = number.replace(/\D/g, '');

        if (number.length !== 10) {
            displayError("Mobile number must contain exactly 10 digits.");
            return;
        }

        const addressData = {
            name,
            number,
            address,
            pin,
            city,
            state,
            country
        };

        // Check if "Make this my default address" is checked
        if (makeDefaultCheckbox.checked) {
            // Save the address data to local storage
            const defaultAddress = JSON.stringify(addressData);
            localStorage.setItem("defaultAddress", defaultAddress);
        }

        // You can do further processing with this data or send it to your server as needed.
        console.log("Address Information:");
        console.log(defaultAddress);

    });
 const savingaddress =document.getElementById("addAddressButton");

 savingaddress.addEventListener("click",()=>{
    saveAddress();
 })
            // After processing the form, navigate to the payment page
            function saveAddress() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }
  const notify =document.getElementById("closeModal");

  notify.addEventListener("click",()=>{
   closeModal();
})
            function closeModal() {
    var modal = document.getElementById("myModal");
    const addressForm =document.getElementById("form");
    modal.style.display = "none";
addressForm.reset()
  }
    
    // Check if there's a default address in local storage and fill the form if available
    const defaultAddress = localStorage.getItem("defaultAddress");
    if (defaultAddress) {
        const addressData = JSON.parse(defaultAddress);
        document.getElementById("name").value = addressData.name;
        document.getElementById("number").value = addressData.number;
        document.getElementById("address").value = addressData.address;
        postalCodeInput.value = addressData.pin;
        fillAddressDetails(addressData.pin);
    }

    // Function to display error messages
    function displayError(message) {
        const errorElement = document.createElement("div");
        errorElement.className = "error-message";
        errorElement.textContent = message;
        errorContainer.appendChild(errorElement);
    }

});
