document.addEventListener('DOMContentLoaded', () => {
    const newGame = document.querySelector(".newGame"),
          endGame = document.querySelector(".endGame"),
          endRound = document.querySelector(".endRound"),
          start = document.querySelector(".start"),
          timer = document.querySelector("#timer"),
          answer = document.querySelectorAll(".buttonAnswer"),
          players = document.querySelectorAll(".player"),
          names = document.querySelectorAll('.name');
let arr = answer;
let intervalId = 0;
let seconds = timer.querySelector("span");
 const getScore = (item) => {
                const bool = confirm("Does it right answer?");
                        if(bool){
                            item.target.removeEventListener('click', getScore.bind(item))
                            // alert("hey! It`s right answer");
                            clearInterval(intervalId);
                            let player = item.target.closest(".player");
                            player.querySelector("#count").innerHTML = +player.querySelector("#count").innerHTML + 1;
                            answer.forEach(item => item.disabled = true)
                            
                        } else{                          
                            
                                // alert("No!");
                            let btn = item.target.closest(".buttonAnswer");
                            btn.disabled = true;
                            seconds.innerHTML = 20;
                            
                            if(arr[0].disabled == true && arr[1].disabled == true){
                                alert("game over");
                                clearInterval(intervalId);
                                answer.forEach(item => item.disabled = false)


                            }
                        }
            }
    const setTimer = () => {
        start.disabled = true;
        answer.forEach(item => item.disabled = false)

        intervalId =  setInterval(()=>{
           
            if(seconds.innerHTML > 0){
                seconds.innerHTML = +seconds.innerHTML - 1;
                
            }
            else{
                alert("game over");
                clearInterval(intervalId)
                answer.forEach(item => item.disabled = true)
            } 
        }, 1000)

       
    }
    const secondsBack = () => {
        seconds.innerHTML = 60;
    }
    answer.forEach(item => item.addEventListener('click', getScore.bind(item)));
    start.addEventListener('click', setTimer);
    endRound.addEventListener('click',() => {
        secondsBack();
        start.disabled = false;
        clearInterval(intervalId)

    });
    newGame.addEventListener('click', ()=> {
        secondsBack();
        start.disabled = false;
        answer.forEach(item => item.disabled = true);
        players.forEach(item => item.querySelector("#count").innerHTML = 0)
    });
    endGame.addEventListener('click', ()=> {
        secondsBack();
        start.disabled = false;
        clearInterval(intervalId)
        answer.forEach(item => item.disabled = true);
        players.forEach(item => item.querySelector("#count").innerHTML = 0)

    })

    names.forEach(item => {
        item.addEventListener('dblclick', () => {
            item.style.display="none";
            const textarea =  item.parentNode.querySelector('#textarea')
            textarea.style.display="flex";
            textarea.value = item.innerHTML;
            textarea.addEventListener('blur', ()=>{
                item.style.display="flex";
                textarea.style.display="none";
                item.innerHTML = textarea.value;

            })
        })
    })
});
