// alert("hello")
// var userObj;
var alertBox = document.getElementById("alertBox")

function onSignUp() {
    ////GET ALL INPUT FLIED IN SIGN UP PAGE///
    var fullName = document.getElementById("fullName")
    var email = document.getElementById("email")
    var password = document.getElementById("password")
    var phone = document.getElementById("phone")
    var address = document.getElementById("address")

    var fullNameError = document.getElementById("fullNameError")
    var emailError = document.getElementById("emailError")
    var passwordError = document.getElementById("passwordError")
    var phoneError = document.getElementById("phoneError")
    var addressError = document.getElementById("addressError")



    ////SIGN UP FORM VALIDATION START //////
      var email_valid = /^[A-Za-z0-9._]{3,}[@]{1}[a-z]{1,}[.]{1}[a-z]{1,}$/

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
function onLogin() {

    var email = document.getElementById("email")
    var password = document.getElementById("password")

    var userObj = {
        userEmail: email.value,
        userPassword: password.value
    }

    /////sara data ly kr ajaye gaw local storage sy
    var user = JSON.parse(localStorage.getItem("users")) || []
    

    ////user ka email or pass match hoga tou pura array ly kr ajye gaw
    var checkUser = user.find(storeValue => {
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


function onLogOut() {

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
function profile() {
    var profileBox = document.getElementsByClassName("profileBox")
    profileBox[0].classList.add("add")
}
function removeProfileBox() {
    var profileBox = document.getElementsByClassName("profileBox")
    profileBox[0].classList.remove("add")

}



//// LOCAL STORAGE SY CURRENT USER KA DATA LY KR ANA OR UI PR SHOW
function getCurrentUser() {
    var proName = document.getElementById("proName")
    var proEmail = document.getElementById("proEmail")
    var proPassword = document.getElementById("proPassword")
    var proPhone = document.getElementById("proPhone")
    var proAddress = document.getElementById("proAddress")

    var getUser = JSON.parse(localStorage.getItem("currentUser"))
    console.log(getUser)
    proName.innerHTML = "<i class='fas fa-user-circle'></i>" + getUser.userName
    proEmail.innerHTML = "<i class='fas fa-envelope'></i>" + getUser.userEmail
    proPassword.innerHTML = "<i class='fas fa-lock'></i>" + getUser.userPassword
    proPhone.innerHTML = "<i class='fas fa-phone'></i>" + getUser.userPhone
    proAddress.innerHTML = "<i class='fas fa-building'></i>" + getUser.userAddress


}
////PROFILE WALY CONTAINER KI FUNCTIONAILTY END///



//////post submit in local storage /////

function postSubmit() {
    var postTitle = document.getElementById("postTitle")
    var postDes = document.getElementById("postDes")
    var cardBox = document.getElementsByClassName("cardBox")
    

    /////current user data use name in post//
    var getUser = JSON.parse(localStorage.getItem("currentUser"))
    ///CREATE DATE USING IN POST///
    var now = new Date().toDateString()
     

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
function showAllPost(){
    var getPost = JSON.parse(localStorage.getItem("posts"))
    var cardBox = document.getElementsByClassName("cardBox")
    
    
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
