$(function(){
    let $n;
    $.ajax({
        url:"../shop1/newproduct/new_product.json",
        cache:false,
        type:"GET",
        dataType:"JSON",
        success:function($n){
            $.fn.newload($n);
        },
        error:function(){
            console.log("통신오류!");
        }
    });


    $.fn.newload = function($n){
        console.log($n.new_product)
        $(".newlist").append("<ul class='newul' id='newul'></ul>");
        
        $.map($n.new_product,function($a,$b){
            $("#newul").append("<li><ol class='newol' id='newol"+$b+"'></ol></li>");
            $("#newul>li").eq($b).append("<dl class='icon'><dd></dd><dd></dd></dl>")
            $.map($n.new_product[$b],function($aa,$bb){
                if($bb=="product_dc" && $a.product_dc!=""){
                    $("#newul>li").eq($b).append("<span>"+$aa+"</span>")
                }
            });
            $("#newol"+$b).append("\
            <li><img src="+$a.product_img+"></li>\
            <li>"+$a.product_nm+"</li>\
            <li>"+$a.product_info+"</li>\
            <li>"+Number($a.product_money).toLocaleString()+"원</li>\
            ");
            if($a.product_sales!=""){
                $("#newol"+$b+">li").eq(3).html("<s>"+Number($a.product_money).toLocaleString()+"원</s>");
                $("#newol"+$b).append("<li>"+Number($a.product_sales).toLocaleString()+"원</li>")
            }else{
                $("#newol"+$b+">li").eq(3).css("color","black");
            }

            $("#newul>li").bind({
                "mouseenter":function(){
                    var $no = $(this).index();
                    $("#newul>li:eq("+$no+")>dl").css("display","block");
                },"mouseleave":function(){
                    var $no = $(this).index();
                    $("#newul>li:eq("+$no+")>dl").css("display","");
                }
            });
        });
    }
});