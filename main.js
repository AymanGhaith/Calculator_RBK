// result variable will help us to make the text box empty after generating the result.
var resultFlag=false;

$(document).ready(function(){

	//This is the event of numbers
	//
	$("button.number, button.operation").on("click",function(){
		if (resultFlag){
			$("#cls").trigger("click");
			resultFlag=false;
		}
		$("#text").val($("#text").val()+$(this).text())
	});

	//This is the event of equal sign
	$("#equal").on("click",function(){
		try {
			resultFlag=true;
			$("#text").val(eval($("#text").val()));
		} catch(e) {
			alert(e.message);
			$("#text").css("background-color","red")
		}
	});

	//This is the clear button event
	$("#cls").on("click",function(){
		$("#text").val("");
		$("#text").css("background-color","")
	});

	//This is the clear the latest change on the text box
	$("#undo").on("click",function(){
		var text=$("#text").val()
		$("#text").val(text.slice(0,text.length-1))
	});
})