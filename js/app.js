
let objects = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'],

    
    $container = $('.container'),
    $scorePanel = $('.score-panel'),
    $rating = $('.fa-star'),
    $moves = $('.moves'),
    $timer = $('.timer'),
    $restart = $('.restart'),
    $deck = $('.deck'),

    
    nowTime,
    allOpen = [],
    match = 0,
    second = 0,
    moves = 0,
    wait = 420,
    totalCard = objects.length / 2,

    
    stars3 = 14,
    stars2 = 16,
    star1 = 20;

 
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


function init() {

    
    let allCards = shuffle(objects);
    $deck.empty();

    
    match = 0;
    moves = 0;
    $moves.text('0');

    
    for (let i = 0; i < allCards.length; i++) {
        $deck.append($('<li class="card"><i class="fa fa-' + allCards[i] + '"></i></li>'))
    }
    addCardListener();

    
    resetTimer(nowTime);
    second = 0;
    $timer.text(`${second}`)
    initTime();
}


function rating(moves) {
    let rating = 3;
    if (moves > stars3 && moves < stars2) {
        $rating.eq(3).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > stars2 && moves < star1) {
        $rating.eq(2).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > star1) {
        $rating.eq(1).removeClass('fa-star').addClass('fa-star-o');
        rating = 1;
    }
    return { score: rating };
}


function gameOver(moves, score) {
    $('#winnerText').text(`Süre= ${second} , Hamle= ${moves} , Puan= ${score}   TEBRİKLER!`);
    $('#winnerModal').modal('toggle');
}


$restart.bind('click', function (confirmed) {
    if (confirmed) {
        $rating.removeClass('fa-star-o').addClass('fa-star');
        init();
    }
});

let addCardListener = function () {

    
    $deck.find('.card').bind('click', function () {
        let $this = $(this);

        if ($this.hasClass('show') || $this.hasClass('match')) { return true; }

        let card = $this.context.innerHTML;
        $this.addClass('open show');
        allOpen.push(card);

        
        if (allOpen.length > 1) {
            if (card === allOpen[0]) {
                $deck.find('.open').addClass('match');
                setTimeout(function () {
                    $deck.find('open').removeClass('open show');
                }, wait);
                match++;

                
            } else {
                $deck.find('.open').addClass('notmatch');
                setTimeout(function () {
                    $deck.find('.open').removeClass('open show');
                }, wait / 1.5);
            }

            
            allOpen = [];

            
            moves++;

            
            rating(moves);

            
            $moves.html(moves);
        }

        
        if (totalCard === match) {
            rating(moves);
            let score = rating(moves).score;
            setTimeout(function () {
                gameOver(moves, score);
            }, 500);
        }
    });
}


function initTime() {
    nowTime = setInterval(function () {
        $timer.text(`${second}`)
        second = second + 1
    }, 1000);
     var saniye = 0, dakika = 0, saat = 0;
  function bak()
  {
    if(saniye < 59) {
       
        saniye = saniye + 1;
    }
    else
    {
      saniye = 0; 
      if(dakika < 59) {
       
        dakika = dakika + 1;
    }
      else{

        dakika = 0; 
        saat = saat + 1;}
    }
    $timer.html(saat + " : " + dakika + " : " + saniye);
  }
  $(document).ready(function(){
    $timer.html("0 : 0 : 0");
    setInterval(bak, 1000);
  });
}


function resetTimer(timer) {
    if (timer) {
        clearInterval(timer);
    }
}

init();