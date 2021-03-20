window.onload = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var lang;
    if(urlParams.has('lang')){
        lang = urlParams.get('lang');
    }else{
        if(navigator.languages.includes('lv')){
            lang = 'lv';
        }else if(navigator.languages.includes('ru')){
            lang = 'ru';
        }else{
            lang = 'en';
        }
    }
    applyTranslations(lang);
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

var J = JSON.parse(`{
    "thanks": {
        "en": "Thank you! Your message has been sent.",
        "lv": "Paldies! Jūsu ziņa ir nosūtīta.",
        "ru": "Спасибо! Ваше сообщение отправлено."
    },
    "copy": {
        "en": "A copy of the message has been sent to the e-mail address you provided.",
        "lv": "Ziņas kopija ir nosūtīta uz Jūsu norādīto e-pasta adresi.",
        "ru": "Копия сообщения была отправлена на указанный вами е-мейл."
    },
    "back": {
        "en": "Go back",
        "lv": "Atgriezties",
        "ru": "Возвращаться"
    }
}`);

function applyTranslations(lang) {
    if(lang=='en'){
        document.getElementById('EN').classList = ['selected'];
        document.getElementById('LV').classList = ['not'];
        document.getElementById('RU').classList = ['not'];
    }else if(lang=='lv'){
        document.getElementById('EN').classList = ['not'];
        document.getElementById('LV').classList = ['selected'];
        document.getElementById('RU').classList = ['not'];
    }else{
        document.getElementById('EN').classList = ['not'];
        document.getElementById('LV').classList = ['not'];
        document.getElementById('RU').classList = ['selected'];
    }
    document.getElementById('thanks').innerHTML = J['thanks'][lang];
    document.getElementById('copy').innerHTML = J['copy'][lang];
    document.getElementById('back').innerHTML = J['back'][lang];
    document.getElementById('button').href = "https://vijups.eu/?lang="+lang;
}