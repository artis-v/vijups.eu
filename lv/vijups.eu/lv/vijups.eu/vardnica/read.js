function whatColor(category){
    switch(category){
        case 'Šūnas un organisma darbība': return '#f6c2d9';
        case 'Šūnu vairošanās': return '#fff69b';
        case 'Pazīmju iedzimšana': return '#bcdfc9';
        case 'Organisma imunitāte': return '#a1c8e9';
        case 'DNS noslēpumi': return '#e4dae2';
    }
}

const LIST = Vue.createApp({
    data() {
        return {
            items: [],
            all: []
        }
    },
    methods: {
        clear() {
            this.items = [];
        },
        showAllCategories() {
            this.clear();
            this.all.forEach(element => {
                this.items.push(element);
            });
        },
        showCategory(category) {
            this.clear();
            this.all.forEach(element => {
                if(element.category == category){ 
                    this.items.push(element);
                }
            });
        }
    }
}).mount('#defs');

$.getJSON('definitions.json', function(data) {
    var counter = 0;   
    data['definitions.csv'].forEach(element => {
        counter++;
        LIST.all.push({"id": counter, "name": element[0], "category": element[1], "definition": element[2], "color": whatColor(element[1])});
    });
    LIST.showAllCategories();
});

playing = false;

function playSound() {
    if(playing)return;
    playing = true;
    document.getElementById('sound-bttn').innerHTML = `<i class="fa-solid fa-spinner"></i>`;
    title = document.getElementById('box-title').textContent;
    def = document.getElementById('box-def').textContent;
    url = "https://runa.tilde.lv/client/say/?text=" + title + ". " + def + "&voice=sandra4";
    console.log(url);
    var sound = new Howl({
        src: [url],
        format: ['mp3'],
        onplay: function() {
            document.getElementById('sound-bttn').innerHTML = `<i class="fa-solid fa-ear-listen"></i>`;
        },
        onend: function() {
            document.getElementById('sound-bttn').innerHTML = `<i class="fa-solid fa-volume-high"></i> Atskaņot definīciju`;
            playing = false;
        }
    });
    sound.play();
}

var saved;

function expand(id){
    saved = $(window).scrollTop();
    var set;
    LIST.items.forEach(element => {
        var el = document.getElementById(String(element.id));
        el.className = "def hidden";
        if(element.id == id){
            set = element;
        }
    });
    document.getElementById('dd').className = "dropdown hidden";
    document.getElementById('cont').className = "row";
    document.getElementById('box-img').src = "img/" + id + ".jpg";
    document.getElementById('box-html').style = "background-color: "+set["color"];
    document.getElementById('box-cat').textContent = set["category"];
    document.getElementById('box-title').textContent = set["name"];
    document.getElementById('box-def').textContent = set["definition"];
}

function show(){
    LIST.items.forEach(element => {
        var el = document.getElementById(String(element.id));
        el.className = "def";
    });
    document.getElementById('dd').className = "dropdown";
    document.getElementById('cont').className = "row hidden";
    $(window).scrollTop(saved);
}