var buttonColours = ['red', 'blue', 'green', 'yellow'] ;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false ;
var inlevel=0 ;

$(".btn").on("click", function(){
    var colorName = $(this).attr("id");
    playSound(colorName);
    animatePress(colorName);
    var userChosenColour = colorName;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    checkAnswer();
})

function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber] ;
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);

    //flash effect
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    //update level
    level+=1;
    $("#level-title").text("Level "+level);
}

function playSound(colourName){
    var audio = new Audio("sounds/"+colourName+".mp3") ;
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

$(document).on("keydown", function(){
    if (started===false){
        nextSequence();
        started=true;
    }
})


function checkAnswer(){
    if (gamePattern[inlevel]==userClickedPattern[inlevel]){
        console.log('success');
        inlevel+=1;
        if (inlevel==level){
            inlevel=0;
            setTimeout(nextSequence, 1000);
            userClickedPattern=[];
        }
    }else{
        restart();
    }
}

function restart(){
    $("#level-title").text("Game Over!!! Press any key to restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        playSound("wrong");
        gamePattern=[];
        userClickedPattern=[];
        level=0;
        inlevel=0;
        started=false;
}

