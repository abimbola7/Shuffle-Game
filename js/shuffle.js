cont.addEventListener("click",userName)
let str;
let str1;
let username;
let a;
let usernameArr = []
let missedScores = []


// saves thr User's name
function userName() {
    username = users.value;
    if (username == "" || username.length < 4) {
        nameConf.innerHTML = "Input field can't be less than 3 characters"
    }else{
        first1.style.display = "none"
        first2.style.display = "block"
        usernameArr.push(username)
        main1(username)
        localStorage.setItem("usernames",JSON.stringify(usernameArr))
        users.value = ""
    }
}    


getItems = localStorage.getItem("usernames")
function storage() {
    if (getItems) {
        usernameArr =JSON.parse(getItems);
    }
}

storage()

function main1(a) {
    userFirst.innerHTML = `Player Name: ${a}`;
}

btn1.addEventListener("click",start)
let numbArr = []



// main event, picks an index, scrambles it and displays it
function Continue() {
    str = ["table","swordfish","perspective","brooklyn","systematic","cardboard","malacia","synchronous","terrestial","eulogy","termination","terrain","whistle","obfuscate","obstinate","paediatric","parricade","plymouth","readjust","animation","consolidation","sparked","experiment","employees","spineless","antony","alienate","independent","accelerate","diverse","opponent"]
    console.log(str.length);
    a = Math.floor(Math.random() * str.length)
    let f = numbArr.find(
        function(ele) {
            return ele == a
        }
    )
    console.log(str[a]);
    if (typeof f == "number") {        
        Continue()
    } else if (typeof f !== "number") {
        numbArr.push(a)
        strArr = str[a].split("")
        strArr.sort(shuffleWord)
        function shuffleWord() {
            return .5 - Math.random();
        }
        str1 = strArr.join("")
        shuffled.value = str1;
        }   
}




// confirms if the user gets the scrabbled word correct
btn2.addEventListener("click",conf)
function conf() {
    if (real1.value == "") {
        noWord.innerHTML = "Type a guess first"
    } else{
        if (real1.value == str[a]) {
            modals1.classList.add("modalss")
            clearTimeout(timess)
            add()
            real1.value = ""
            Continue()
        } else{
            missedScores.push({
                scrambled: shuffled.value,
                realW : str[a]
            })
            clearTimeout(timess)
            modals.style.display = "block"
            correct1.innerHTML = `The correct word was ${str[a]}`
            real1.value = ""
        }
        noWord.innerHTML = ""
    }
}


// moves to the next scrabbled word if missed
function Nextt() {
    modals.style.display = "none";
    aa()
    Continue()
    if (numbArr.length > 15) {
        clearTimeout(timess)
        clock1.innerHTML = `00:00`
        defaultModal.style.display = "flex"
        isTimeUp.style.display = "none"
        yourScore.innerHTML = `You scored ${prog}%! ${prog<50?"You can do better":"Nice job!"}`
        if (missedScores.length > 0) {
            miss.innerHTML = "Your missed words were: "
            missedScores.forEach(element => {
            missedWord.innerHTML += `<li>${element.scrambled} : ${element.realW}</li>`
        });
        } else{
            miss.innerHTML = ""
        }
        yourScore.innerHTML = `You scored ${prog}%! ${prog<50?"You can do better":"Nice job!"}`       
    }
}


function Next1() {
    modals1.classList.remove("modalss")
    aa()
    if (numbArr.length > 15) {
        clearTimeout(timess)
        defaultModal.style.display = "flex"
        isTimeUp.style.display = "none"
        yourScore.innerHTML = `You scored ${prog}%! ${prog<50?"You can do better":"Nice job!"}`
        if (missedScores.length > 0) {
            miss.innerHTML = "Your missed words were: "
            missedScores.forEach(element => {
            missedWord.innerHTML += `<li>${element.scrambled} : ${element.realW}</li>`
        });
        } else{
            miss.innerHTML = ""
        }
        yourScore.innerHTML = `You scored ${prog}%! ${prog<50?"You can do better":"Nice job!"}`       
    }
}



// progress bar
let y = 0
let prog = 0
let limit = 0
function add() {
    if (y < 200) {
        y+=13
        bars.style.width = `${y}px`        
    }
    limit+=6.66
    let lim = setInterval(() => {
        if (prog < limit) {
            prog++
            progress1.innerHTML = `${prog}%`;
        } else{
            clearInterval(lim)
        }
        if (prog >= 50) {
            progress1.style.color = 'black'
        }
    }, 50);
}

//plays the game again
function Close() {
    while (missedScores.length > 0) {
        missedScores.pop()
    }
    numbArr.splice(0, numbArr.length)
    
    missedWord.innerHTML = ""
    z = 1000;
    limit = 0;
    y = 0;
    btn1.disabled = false;
    btn1.style.backgroundColor = "#1E3A8A";
    btn2.disabled = true;
    btn2.style.backgroundColor = "#EF4444"
    progress1.style.color = 'white';
    bars.style.width = `${0}px`
    defaultModal.style.display = "none";
    progress1.innerHTML = "0%";
    prog = 0;
    shuffled.value = "";
    real1.value = "";
    count1 = 0;
    count2 = 6;
    clock1.innerHTML = `${count2 < 10 ? "0" + count2 : count2}:${count1 < 10 ? "0" + count1 : count1}`
}

// countdown timer
let count1 = 1
let count2 = 6
let timess;
let z = 1000
function aa() {
    count1--;
    clock1.innerHTML = `${count2 < 10 ? "0" + count2 : count2}:${count1 < 10 ? "0" + count1 : count1}`    
    if (prog >= 70) {
        z = 400
    }
        if (count1 >= 0) {
            timess = setTimeout(() => {
               aa()
            }, z);
        }else if (count1 <= 0) {
            count1 = 60;
            count2--
            aa()
            if (count2 < 0) {
                clearTimeout(timess)
                clock1.innerHTML = `00:00`
                defaultModal.style.display = "flex"
                yourScore.innerHTML = `You scored ${prog}%! ${prog<50?"You can do better":"Nice job!"}`
                if (missedScores.length > 0) {
                    miss.innerHTML = "Your missed words were: "
                    missedScores.forEach(element => {
                        missedWord.innerHTML += `<li>${element.scrambled} : ${element.realW}</li>`
                    });
                }
            }
        }
    }

// ends the game and goes back to the name page
function End() {
    while (missedScores.length > 0) {
        missedScores.pop()
    }
    numbArr.splice(0, numbArr.length)    
    missedWord.innerHTML = ""
    z = 1000;
    y = 0;
    prog = 0;
    limit = 0;
    progress1.style.color = 'white';
    bars.style.width = `${0}px`;
    first1.style.display = "block";
    first2.style.display = "none";
    btn1.disabled = false;
    btn1.style.backgroundColor = "#1E3A8A";
    btn2.disabled = true;
    btn2.style.backgroundColor = "#EF4444";
    defaultModal.style.display = "none";
    progress1.innerHTML = "0%";
    shuffled.value = "";
    real1.value = "";
    count1 = 0;
    count2 = 6;
    clock1.innerHTML = `${count2 < 10 ? "0" + count2 : count2}:${count1 < 10 ? "0" + count1 : count1}`
}


// starts the game i.e, the countdown timer, enables and disabled the required buttons and input tags
function start() {
    aa()
    prog = 0
    shuffled.value = ""
    real1.value = ""
    Continue()
    real1.readOnly = false;
    btn1.disabled = true;
    btn1.style.backgroundColor = "#a7a7ee";
    btn2.disabled = false;
    btn2.style.backgroundColor = "#7F1D1D"
}


let words = require("an-array-of-english-words")
console.log(words);