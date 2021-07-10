// alert("hello")
// var userObj;
let alertBox = document.getElementById("alertBox")

let onSignUp = ()=> {
    ////GET ALL INPUT FLIED IN SIGN UP PAGE///
    let fullName = document.getElementById("fullName")
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    let phone = document.getElementById("phone")
    let address = document.getElementById("address")

    let fullNameError = document.getElementById("fullNameError")
    let emailError = document.getElementById("emailError")
    let passwordError = document.getElementById("passwordError")
    let phoneError = document.getElementById("phoneError")
    let addressError = document.getElementById("addressError")



    ////SIGN UP FORM VALIDATION START //////
      let email_valid = /^[A-Za-z0-9._]{3,}[@]{1}[a-z]{1,}[.]{1}[a-z]{1,}$/

        if(fullName.value.length != ""){
            if(fullName.value.length >= 3){
                fullNameError.innerHTML = ""
                fullName.style.borderBottom = "2px solid green"
            }
            else{
                fullNameError.innerHTML = "Enter Correct Name..."
                fullName.style.borderBottom = "2px solid maroon"

            }
        }
        else{
            fullName.style.borderBottom = "2px solid maroon"
            fullNameError.innerHTML = "Please Enter your Name..."
        }


        if(email.value.length != ""){
            if(email.value.match(email_valid)){
                emailError.innerHTML = ""
                email.style.borderBottom = "2px solid green"
            }
            else{
                emailError.innerHTML = "Enter Correct Email..."
                email.style.borderBottom = "2px solid maroon"

            }
        }
        else{
            email.style.borderBottom = "2px solid maroon"
            emailError.innerHTML = "Please Enter Email..."
        }


        if(password.value.length != ""){
            if(password.value.length >= 8){
                passwordError.innerHTML = ""
                password.style.borderBottom = "2px solid green"
            }
            else{
                passwordError.innerHTML = "Atleast 8 Character Pass..."
                password.style.borderBottom = "2px solid maroon"

            }
        }
        else{
            password.style.borderBottom = "2px solid maroon"
            passwordError.innerHTML = "Please Enter password..."
        }
        if(phone.value.length != ""){
            if(phone.value.length == 11){
                phoneError.innerHTML = ""
                phone.style.borderBottom = "2px solid green"
            }
            else{
                phoneError.innerHTML = "Enter Correct Num..."
                phone.style.borderBottom = "2px solid maroon"

            }
        }
        else{
            phone.style.borderBottom = "2px solid maroon"
            phoneError.innerHTML = "Please Enter phone..."
        }
        if(address.value.length != ""){
            if(address.value.length >=3){
                addressError.innerHTML = ""
                address.style.borderBottom = "2px solid green"
            }
            else{
                addressError.innerHTML = "Enter Correct Num..."
                address.style.borderBottom = "2px solid maroon"

            }
        }
        else{
            address.style.borderBottom = "2px solid maroon"
            addressError.innerHTML = "Please Enter address..."
        }
    //////SIGN UP FORM VALIDATION END //////


    ////JO KAM HOGA IS CONDITION MAIN HOGA////

    if (fullNameError.innerHTML == "" && emailError.innerHTML == "" && passwordError.innerHTML == "" && phoneError.innerHTML == ""
        && addressError.innerHTML == "") {

        ////USER INFO CONVERT INTO OBJECT///
        var userObj = {
            userName: fullName.value,
            userEmail: email.value,
            userPassword: password.value,
            userPhone: phone.value,
            userAddress: address.value,
        }

        console.log("chal raha hai")

        //////SET MULTIPLY DATA IN LOCAL STORAGE///
        var user = JSON.parse(localStorage.getItem("users")) || [];

        ///user ka data match kr rhy hai already local storage main store tou nahi hai///
        var userIndex = user.findIndex(indexNumber => {
            return indexNumber.userEmail === userObj.userEmail
        });
        // console.log(userIndex)
        
        //////condition check userIndex main agar -1 aya tou data nahi hai or koi number tou data add hai
        if (userIndex === -1) {
            ///ARRAY MAIN DATA PUSH
            user.push(userObj)
            ///LOCAL STORAGE MAIN ARRAY SAVE////
            localStorage.setItem("users", JSON.stringify(user))
            // console.log("add nahi tha bhai yeh")
            
            ///ALERT BOX///
            alertBox.classList.add("add")

            ////SET TIMEOUT FUNCTION REMOVE ALERT MSG///
            setTimeout(function () {
                alertBox.classList.remove("add")
                window.location.replace("login.html")
            }, 3000)

        }

        else {

            alertBox.firstChild.nextSibling.innerHTML = userObj.userEmail + " use in Another Account"
            alertBox.classList.add("add")

        }


    }

}


///////LOGIN PAGE JS///
let onLogin = ()=> {

    let email = document.getElementById("email")
    let password = document.getElementById("password")

    let userObj = {
        userEmail: email.value,
        userPassword: password.value
    }

    /////sara data ly kr ajaye gaw local storage sy
    let user = JSON.parse(localStorage.getItem("users")) || []
    

    ////user ka email or pass match hoga tou pura array ly kr ajye gaw
    let checkUser = user.find(storeValue => {
        return storeValue.userEmail === userObj.userEmail && storeValue.userPassword === userObj.userPassword
    })
    // console.log(checkUser)


    ////condition match ho kr next page or jo CURRENT USER HAI oska pura array ek or propertie main 
    // add hojaye gaw dashboard pr infomation show krne ky liye///
    if (checkUser) {
        ////current user ka pura array local main add
        localStorage.setItem("currentUser", JSON.stringify(checkUser))
        alertBox.classList.remove("add")
        alertBox.innerHTML = ""
        window.location.replace("index.html")
    }
    else {
        alertBox.classList.add("add")
        alertBox.innerHTML = "Invalid credentials"
    }


}


let onLogOut = ()=> {

    ///current user remove in local storage
    localStorage.removeItem("currentUser")
    alertBox.innerHTML = "LOGOUT..."
    alertBox.classList.add("add")
    setTimeout(() => {
        alertBox.innerHTML = ""
        alertBox.classList.remove("add")
        window.location.replace("login.html")
    }, 3000)

}



////PROFILE WALY CONTAINER KI FUNCTIONAILTY START///
let profile = ()=> {
    let profileBox = document.getElementsByClassName("profileBox")
    profileBox[0].classList.add("add")
}
let removeProfileBox = ()=> {
    var profileBox = document.getElementsByClassName("profileBox")
    profileBox[0].classList.remove("add")

}



//// LOCAL STORAGE SY CURRENT USER KA DATA LY KR ANA OR UI PR SHOW
let getCurrentUser = ()=> {
    var proName = document.getElementById("proName")
    var proEmail = document.getElementById("proEmail")
    var proPassword = document.getElementById("proPassword")
    var proPhone = document.getElementById("proPhone")
    var proAddress = document.getElementById("proAddress")

    var getUser = JSON.parse(localStorage.getItem("currentUser"))
    let {userName , userEmail , userPassword , userPhone , userAddress } = getUser
    console.log(getUser)
    proName.innerHTML = `<i class='fas fa-user-circle'></i> ${userName}`
    proEmail.innerHTML = `<i class='fas fa-envelope'></i> ${userEmail}`
    proPassword.innerHTML = `<i class='fas fa-lock'></i> ${userPassword}`
    proPhone.innerHTML = `<i class='fas fa-phone'></i> ${userPhone}`
    proAddress.innerHTML = `<i class='fas fa-building'></i> ${userAddress}`


}
////PROFILE WALY CONTAINER KI FUNCTIONAILTY END///



//////post submit in local storage /////

let postSubmit = ()=> {
    let postTitle = document.getElementById("postTitle")
    let postDes = document.getElementById("postDes")
    let cardBox = document.getElementsByClassName("cardBox")
    

    /////current user data use name in post//
    let getUser = JSON.parse(localStorage.getItem("currentUser"))
    ///CREATE DATE USING IN POST///
    let now = new Date().toDateString()
     

    if (postTitle.value.length > 1 && postDes.value.length > 3) {
        console.log("done hai ")

        var postObj = {
            title: postTitle.value,
            desp: postDes.value,
            postUserName : getUser.userName,
            postDate : now
        }

        var getPost = JSON.parse(localStorage.getItem("posts")) || []
        getPost.push(postObj)
        localStorage.setItem("posts", JSON.stringify(getPost))
        console.log(getPost)
        window.location.href = "index.html"

        ////PRINT ALL POST IN UI USING LOOP////
        // for(var i = 0 ; i<getPost.length;i++){

        //     cardBox[0].innerHTML += `<li>    <div class="cardImage">
        //     <img src="img/blood.jpg" width="100%" alt="">
        // </div>
        //         <div class="cardDes">
        //                 <h2>${getPost[i].title}</h2>
        //                 <p>${getPost[i].desp}</p>
        //         </div>
        // </li>`
        // }


    }
    else {
        alertBox.innerHTML = "Enter Correct Post"
        alertBox.classList.add("add")
        setTimeout(function () {
            alertBox.innerHTML = ""
            alertBox.classList.remove("add")

        }, 3000)
    }
    postTitle.innerHTML =""
    postDes .innerHTML =""
}



    /////show all post in ui before post ///
let showAllPost = () =>{
    let getPost = JSON.parse(localStorage.getItem("posts"))
    let cardBox = document.getElementsByClassName("cardBox")
    
    
    console.log(getPost)

    ////PRINT ALL POST IN UI USING LOOP////
    for(var i = getPost.length-1 ; i>=0;i--){
        
        cardBox[0].innerHTML += ` <li class="postLi">

        <div class="cardImage">
            <img src="img/blood.jpg" width="100%" height="100%" alt="">
        </div>

        <div class="cardDes">

            <div class="postName">
                <h1 id="postUserName">${getPost[i].postUserName}</h1>
                <h4 id="postDate">${getPost[i].postDate}</h4>

            </div>
            <div class="postDes">

                
                <h2>${getPost[i].title}</h2>
                <p>${getPost[i].desp}</p>
            </div>

        </div>
    </li>`
    }
    

}
