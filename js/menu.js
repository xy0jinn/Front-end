$(function(){
    let $data;
    $.ajax({
        url:"./menu/menu.json",
        cache:false,
        type:"GET",
        dataType:"JSON",
        success:function($data){
            $.fn.load($data);
        },
        error:function(){1
            console.log("통신오류");
        }
    });

    $.fn.load = function($data){
        //console.log($data);
        $("#big").append("\
        <ol class='bigleft' id='bigleft'></ol>\
        <ol class='bigright' id='bigright'></ol>");
        
        $.map($data,function($a,$b){

            if($b<6){
                $("#bigleft").append("<li>"+$a.menus+"</li>");
            }else if($b<9){
                $("#bigright").append("<li>"+$a.menus+"</li>");
            }

            if($data[$b].cate!=""){
                $("#bigleft>li").eq($b).append("<dl class='mini' id='mini"+$b+"'></dl>");
                $.map($data[$b].cate,function($a1,$b1){
                    $("#mini"+$b).append("<dd>"+$a1+"</dd>");
                });
            }

            $("#bigleft>li").bind({
                "mouseenter":function(){
                    var $no = $(this).index();
                    $("#bigleft>li:eq("+$no+")>dl").stop().slideDown(400);
                },
                "mouseleave":function(){
                    var $no = $(this).index();
                    $("#bigleft>li:eq("+$no+")>dl").stop().slideUp(300);
                }
            });

        });
    }
});