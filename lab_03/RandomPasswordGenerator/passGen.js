

const minLength = document.getElementById("minlength")
const maxLength = document.getElementById("maxlength")
const bigLetters = document.getElementById("bigLetters")
const specialSigns = document.getElementById("specialSigns")

function GenRandPass(){
    const passLength = Math.floor(Math.random() * (parseInt(maxLength.value) - parseInt(minLength.value))) + parseInt(minLength.value);
    let Chars = "qwertyuiopasdfghjklzxcvbnm1234567890";
    const bigLettersChars = "QWERTYUIOPASDFGHJKLZXCVBNM";
    const specialSignsChars = "!@#$%^&*()_+-=";
    let password = "";
    if(bigLetters.checked){
        Chars += bigLettersChars;
    }
    if(specialSigns.checked){
        Chars += specialSignsChars;
    }

    for(let i=0; i < passLength; i++){
        const randomIndex = Math.floor(Math.random() * Chars.length);
        password += Chars[randomIndex];
    }
    alert(password)
}

document.getElementById("submitBtn").addEventListener("click", GenRandPass);
