// console.log(3+8)

// var age=35;
// console.log(age,"ageの箱");

$("h1").css("color","blue");
$("h1").css("text-align","center");
$("h2").css("font-size","20px");
$("h2").css("font-weight","300");
$("p").css("font-size","50px")


///
$(document).ready(function() {
    $(".janken").click(function() {
        const userChoice = $(this).data("choice");
        const computerChoice = generateComputerChoice();
        const result = judge(userChoice, computerChoice);
        $("#result").text(result);
        
    });
});

function generateComputerChoice() {
    const choices = ["rock", "scissors", "paper"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function judge(userChoice, computerChoice) {
    if (userChoice === computerChoice) return "引き分け！";

    if (userChoice === "rock" && computerChoice === "scissors") return "勝ち！";
    if (userChoice === "scissors" && computerChoice === "paper") return "勝ち！";
    if (userChoice === "paper" && computerChoice === "rock") return "勝ち！";

    return "負け...";
}

// 
function audio() {
  document.getElementById('btn_audio').currentTime = 0; //連続クリックに対応//
  document.getElementById('btn_audio').play(); //クリックしたら音を再生できる
}

function audio(){

}


//////////////////////アコーディオン
$('.faq-list-item').click(function() {
    var $answer = $(this).find('.answer');
    if($answer.hasClass('open')) { 
      $answer.removeClass('open');
      $answer.slideUp();
    $(this).find('span').text('+');
      
    } else {
      $answer.addClass('open'); 

      $answer.slideDown();
      $(this).find("span").text("-");
    }
  });
  
///////////////////// 以下、料金ページ

console.clear();

const cardsContainer = document.querySelector(".cards");
const cardsContainerInner = document.querySelector(".cards__inner");
const cards = Array.from(document.querySelectorAll(".card"));
const overlay = document.querySelector(".overlay");

const applyOverlayMask = (e) => {
  const overlayEl = e.currentTarget;
  const x = e.pageX - cardsContainer.offsetLeft;
  const y = e.pageY - cardsContainer.offsetTop;

  overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
};

const createOverlayCta = (overlayCard, ctaEl) => {
  const overlayCta = document.createElement("div");
  overlayCta.classList.add("cta");
  overlayCta.textContent = ctaEl.textContent;
  overlayCta.setAttribute("aria-hidden", true);
  overlayCard.append(overlayCta);
};

const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const cardIndex = cards.indexOf(entry.target);
    let width = entry.borderBoxSize[0].inlineSize;
    let height = entry.borderBoxSize[0].blockSize;

    if (cardIndex >= 0) {
      overlay.children[cardIndex].style.width = `${width}px`;
      overlay.children[cardIndex].style.height = `${height}px`;
    }
  });
});

const initOverlayCard = (cardEl) => {
  const overlayCard = document.createElement("div");
  overlayCard.classList.add("card");
  createOverlayCta(overlayCard, cardEl.lastElementChild);
  overlay.append(overlayCard);
  observer.observe(cardEl);
};

cards.forEach(initOverlayCard);
document.body.addEventListener("pointermove", applyOverlayMask);
