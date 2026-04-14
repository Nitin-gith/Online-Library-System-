const signupbtn = document.querySelector('.signupbtn');
let nameField = document.querySelector('.namefield');
let title = document.querySelector('h1');
let underline = document.querySelector('.underline');
let text = document.querySelector('.text');
const email = document.getElementById('email');
const password = document.getElementById('password');

signupbtn.addEventListener('click', ()=>{
    nameField.style.maxHeight = '60px';
    title.innerHTML = 'Sign Up';
    text.innerHTML = 'Password Suggestions';
    signup.classList.remove('disable');
    signin.classList.add('disable');
    underline.style.transform = 'translateX(0)';
});

// Function to make button glow
function checkInputs() {
    if (email.value.trim() !== "" && password.value.trim() !== "") {
        signupbtn.style.background = 'linear-gradient(90deg, #00ff00, #009900)';
        signupbtn.style.boxShadow = '0 0 10px #00ff00';
    } else {
        signupbtn.style.background = '#555';
        signupbtn.style.boxShadow = 'none';
    }
}

// Check whenever user types
email.addEventListener('input', checkInputs);
password.addEventListener('input', checkInputs);


signupbtn.addEventListener('click',()=>{
    if (email.value.trim() !== "" && password.value.trim() !== "") {

        //store data
        sessionStorage.setItem("userEmail",email.value.trim());

        //dashboard redirect
        window.location.href="dashboard.html";
    } else {
        alert("Please fill all fields!")
    }
});