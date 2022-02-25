$(function(){
    var $no = 0;
    var $count = 3; // 룰렛게임 카운터
    var $width = $(window).width();
    var $height = $("#roule_bk>img").height();
    $("#outline").css("height",$height+"px");

    let $data = ["500포인트","5,000포인트","꽝! 다음기회에","3,000포인트","2,000포인트","1,000포인트"]
    let $r = 0; // 오브젝트 최초위치

    $.fn.ck = function(){
        $("#gamebtn").click(function(){
            $no++;
            if($no>$count){
                alert("하루에 3회만 참여 가능합니다.");
            }
            else{
                $(this).unbind("click");
               var $random = Math.ceil(Math.random()*360);
               $r = $r + 1800;  
               var $msg = $.fn.rotate($r,$random);
    
               setTimeout(function(){
                   $.fn.ck();
                   $("#msg1").stop().fadeIn(600);
                   $("#msg2").append($data[$msg]);
                },5500);
    
               $("#msg1").stop().fadeOut(500);
               $("#msg2").text("");
            }
        });
        
    }
    $.fn.ck();
    
   $("#close").click(function(){
        $("#msg1").stop().fadeOut(500);
    });



    $.fn.rotate = function($r,$random){
        var $node = 0;  
        if($random >=10 && $random <= 50){
            $node = 0;
        }
        else if($random >= 60 && $random <=82){
            $node = 1;
        }
        else if($random >= 181 && $random <= 230){
            $node = 3;
        }
        else if($random >= 240 && $random <= 290){
            $node = 4;
        }
        else if($random >= 310 && $random <= 355){
            $node =5;
        }else{
            $node = 2;
            $random = 168;
        }

        var $rotate = $r + $random;
        $("#gameboard").css("transform","rotate("+$rotate+"deg)");
        return $node;
    }
});