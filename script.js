window.onload = function() {
    var placeholder = document.querySelector('.placeholder'),
        small = placeholder.querySelector('.img-small')

    // 1: load small image and show it
    var img = new Image();
    img.src = small.src;
    img.onload = function () {
        small.classList.add('loaded');
    };

    // 2: load large image 
    var imgLarge = new Image();
    imgLarge.alt = 'Forest in Tīnūži';
    imgLarge.src = placeholder.dataset.large; 
    imgLarge.onload = function () {
        imgLarge.id = 'img-large';
        imgLarge.classList.add('loaded');
    };
    placeholder.appendChild(imgLarge);
}

shiftDone = false;

function formDisplay() {
    if(!shiftDone){
        shiftDone = true;
        // retain button arrow on the right, fade to green
        document.getElementById('button').classList.add('force');
        document.getElementById('button').style.animation = "0.7s ease-out 0s 1 fadeToGreen";
        setTimeout(function(){ document.getElementById('button').style.backgroundColor = "#131715"; }, 700);
        // show form and push it in from the right
        document.getElementById('form').style.display = "block";
        document.getElementById('form').style.animation = "0.7s ease-out 0s 1 formShift";
        setTimeout(function(){ document.getElementById('form').style.transform = "translate(0%, 0%)"; }, 700);
        // push logo and button to the left
        document.getElementById('content').style.animation = "0.7s ease-out 0s 1 itemShift";
        setTimeout(function(){ document.getElementById('content').style.transform = "translate(-25%, -59%)"; }, 700);
    }else{
        shiftDone = false;
        // allow button arrow to move back, fade to amber
        document.getElementById('button').classList.remove('force');
        document.getElementById('button').style.animation = "0.7s ease-out 0s 1 fadeToAmber";
        setTimeout(function(){ document.getElementById('button').style.backgroundColor = "#CB7109"; }, 700);
        // show form and push it in from the right
        document.getElementById('form').style.animation = "0.7s ease-out 0s 1 formShiftBack";
        setTimeout(function(){ document.getElementById('form').style.transform = "translate(100%, 0%)"; document.getElementById('form').style.display = "none"; }, 700);
        // push logo and button to the left
        document.getElementById('content').style.animation = "0.7s ease-out 0s 1 itemShiftBack";
        setTimeout(function(){ document.getElementById('content').style.transform = "translate(0%, -59%)"; }, 700);
    }
}

function validate() {
    var valid = true;
    var x = document.forms["contact-form"]["name"].value;
    var y = document.forms["contact-form"]["email"].value;
    var z = document.forms["contact-form"]["message"].value;
    document.getElementById('namelabel').style.color = "white";
    document.getElementById('name').style.borderColor = "#3c8a62";
    document.getElementById('emaillabel').style.color = "white";
    document.getElementById('email').style.borderColor = "#3c8a62";
    document.getElementById('messagelabel').style.color = "white";
    document.getElementById('message').style.borderColor = "#3c8a62";
    if (x == "") {
        document.getElementById('namelabel').style.color = "#b34651";
        document.getElementById('name').style.borderColor = "#b34651";
        valid=false;
    }
    if (/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(y)==false) {
        document.getElementById('emaillabel').style.color = "#b34651";
        document.getElementById('email').style.borderColor = "#b34651";
        valid=false;
    }
    if (z == "") {
        document.getElementById('messagelabel').style.color = "#b34651";
        document.getElementById('message').style.borderColor = "#b34651";
        valid=false;
    }
    if(valid){
        document.getElementById('contact-form').submit();
    }
}