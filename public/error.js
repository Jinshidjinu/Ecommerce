
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;




const email=document.getElementById('email')
const emaillabel=document.querySelector('.labemail')
email.onblur=()=>{
    if(!emailRegex.test(email.value)){
        emaillabel.innerHTML = 'please provide valid address'
        emaillabel.classList.add('redlabel')
    }else{
        emaillabel.innerHTML='Gmail'
        emaillabel.classList.remove('redlabel')
    }    

}
const password=document.getElementById('password')
const passwordlabel=document.querySelector('.passwordlabel')
password.onblur=()=>{
    if(!passwordRegex.test(password.value)){
        passwordlabel.innerHTML = 'please provide valid password'
        passwordlabel.classList.add('redpassword')
    }else{
        passwordlabel.innerHTML='password'
        passwordlabel.classList.remove('redpassword')

    }
}




