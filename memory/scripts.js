//make data
const images = [
    {
        1:'<img src="/images/animal-1.jpg" alt="1">',
        2:'<img src="/images/animal-2.jpg" alt="2">',
        3:'<img src="/images/animal-3.jpg" alt="3">',
        4:'<img src="/images/animal-4.jpg" alt="4">',
        5:'<img src="/images/animal-5.jpg" alt="5">',
        6:'<img src="/images/animal-6.jpg" alt="6">',
    }
];

let scoreText = document.querySelector('.score');

let points = 0;

let tabOfFree = [];
for(let i=0; i<12; i++){
    tabOfFree[i] = 0;
}

//support function
function containsTwice(tab, a){
    let result = 0;
    for(let i=0; i<12; i++){
        if(tab[i] === a){
            result++;
        }
    }
    if(result===2){
        return 1;
    }
    return 0;
}

//make a board
for(let i=0; i<12; i++){
    while(tabOfFree[i]===0){
        let x = Math.floor(Math.random()*6+1);
        if(containsTwice(tabOfFree, x)===0){
            tabOfFree[i] = x;
            i++;
        }
    }
}
console.log(tabOfFree);

//generate HTML
let html = '';
for(let i=0; i<12; i++){
    html += `<button onclick="compare(${i});" class="card card-${i}">
    <img class="def-img def-img-${i}" src="/images/default.jpg">
    ${images[0][tabOfFree[i]]}
    </button>`;
}
document.querySelector('.content').innerHTML = html;

//compare function 
let clicked = [];
function compare(i){
    clicked.push(i);
    console.log(clicked);
    document.querySelector(`.def-img-${i}`).classList.add('def-img-peeked');
    if(clicked.length===2){
        let first = clicked[0];
        let second = clicked[1];
        if(tabOfFree[first] === tabOfFree[second] && first!==second){
            points++;
            console.log(points);
            console.log("win");
            document.querySelector(`.card-${first}`).classList.add('checked-card');
            document.querySelector(`.card-${second}`).classList.add('checked-card');
            tabOfFree[first] = -1;
            tabOfFree[second] = -1;
            clicked.pop();
            clicked.pop();
            if(isOver(tabOfFree)===1){
                scoreText.innerHTML = `YOU WON ${points} POINTS!`;
                document.querySelector('.btn-reset').classList.add('btn-reset-show');
                console.log("over");
            }
        }else{
            points--;
            console.log(points);
            setTimeout(() => {
                document.querySelector(`.def-img-${first}`).classList.remove('def-img-peeked');
                document.querySelector(`.def-img-${second}`).classList.remove('def-img-peeked');
              }, 500);
            clicked.pop();
            clicked.pop();
        }
    }
}

//check if done
function isOver(tab){
    for(let i=0; i<12; i++){
        if(tab[i] !== -1){
            return 0;
        }
    }
    return 1;
}

//start game function
function start(){
    document.querySelector('.btn-reset').classList.remove('btn-reset-show');
    scoreText.innerHTML = '';

    tabOfFree = [];

    for(let i=0; i<12; i++){
        tabOfFree[i] = 0;
    }

    for(let i=0; i<12; i++){
        while(tabOfFree[i]===0){
            let x = Math.floor(Math.random()*6+1);
            if(containsTwice(tabOfFree, x)===0){
                tabOfFree[i] = x;
                i++;
            }
        }
    }

    html = '';
    for(let i=0; i<12; i++){
    html += `<button onclick="compare(${i});" class="card card-${i}">
    <img class="def-img def-img-${i}" src="/images/default.jpg">
    ${images[0][tabOfFree[i]]}
    </button>`;
    }
    document.querySelector('.content').innerHTML = html;

    clicked = [];
    compare(i);
}