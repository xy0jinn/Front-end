let data;
function wck(){
    if(window.XMLHttpRequest){
        return new XMLHttpRequest();
    }
}

function list(){
    if(data.readyState == XMLHttpRequest.DONE && data.status==200){
        hash_load(this.response);
    }
}

data = wck();
data.onreadystatechange = list;
data.open("GET","../shop1/product/hash.json",true);
data.send();



function hash_load(data){
    var  hash = JSON.parse(data);
    var d = document.createElement("dl");
    document.getElementById("hashtag").appendChild(d)
    d.className="prodl";
    var f,g;
    for (f in hash){
        var dd = document.createElement("dd");
        d.appendChild(dd);
        dd.innerHTML = "#"+hash[f].hash_title;
    }
}

$(function(){
    let $list;
    $.ajax({
        url:"../shop1/product/product.json",
        cache:false,
        type:"GET",
        dataType:"JSON",
        success:function($list){
            $.fn.prdlist($list);
        },
        error:function(){
            console.log("통신오류");
        }
    });

    $.fn.prdlist = function($list){

        $("#newpro").append("<ol class='prool' id='prool'></ol>");
        $.map($list.flat_product,function($a,$b){

            $("#prool").append("<li><img src="+$a.product_img+"><ul class='mover' id='mover"+$b+"'></ul></li>");
            $.map($list.flat_product[$b],function($aa,$bb){

                if($bb!="product_img" ){
                    $("#mover"+$b).append("<li>"+$aa+"</li>");
                    if($a.product_dc!=""){
                        $("#mover"+$b+">li").eq(2).html("<s>"+Number($a.product_money).toLocaleString()+"원"+"</s>")
                        $("#mover"+$b+">li").eq(3).html(Number($a.product_dc).toLocaleString()+"원")
                    }else{
                        $("#mover"+$b+">li").eq(2).html(Number($a.product_money).toLocaleString()+"원")

                    }
                }

            });
        });
        $("#prool>li").bind({
            "mouseenter":function(){
                var $l = $(this).index();
                $("#mover"+$l).css("opacity","1");
            },
            "mouseleave":function(){
                var $l = $(this).index();
                $("#mover"+$l).css("opacity","");
            }
        });
    }

});