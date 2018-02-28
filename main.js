// result variable will help us to make the text box empty after generating the result.
var resultFlag=false;
// resultArray is array to save the results to do some functionalities on it .
var  resultArray = [];
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
			var result =eval($("#text").val());
			if(resultFlag===true || result===undefined){
				return 0;
			}
			$("#text").val(result);
			resultFlag=true;
			resultArray.push(result);
			console.log(resultArray)
			$("#resultarray").text("Result Array: ["+resultArray+"]");

		} catch(e) {
			alert(e.message);
			$("#text").css("background-color","red");
		}
	});

	//This is the clear button event
	$("#cls").on("click",function(){
		$("#text").val("");
		$("#text").css("background-color","");
	});

	//This is the clear the latest change on the text box
	$("#undo").on("click",function(){
		// if (resultFlag=true){
		// 	return 0;
		// }
		var text=$("#text").val();
		$("#text").val(text.slice(0,text.length-1));
	});

	//this is the allOdd that check the resultArray if all the elements are odd
	$("#allOdd").on("click" , function(){
		if(resultArray.length === 0 ){
			$("#text").val("Result Array is empty");
		}else{
			var result = resultArray.reduce(function(acc , elem){
				if(elem % 2 !== 0){
					return acc && true;
				} else{
					return acc && false;
				}
			},true);
		$("#text").val("All is odd: "+result);
	}
	resultFlag=true;
	});

	//this is the allEven that check the resultArray it all the elements are even
	$("#allEven").on("click" , function(){
		if(resultArray.length === 0 ){
			$("#text").val("Result Array is empty");
		}else{
			var result = resultArray.reduce(function(acc , elem){
				if(elem % 2 === 0){
					return acc && true;
				} else{
					return acc && false;
				}
			},true);
		$("#text").val("All is Even: "+result);
	}
	resultFlag=true;
	});

	//this is the anyOdd that check the resultArray if there is any odd elements
	$("#anyOdd").on("click" , function(){
		if(resultArray.length === 0 ){
			$("#text").val("Result Array is empty");
		}else{
			var result = resultArray.reduce(function(acc , elem){
				if(elem % 2 !== 0){
					return acc || true;
				} else{
					return acc || false;
				}
			},false);
		$("#text").val("Any Odd: "+result);
	}
	resultFlag=true;
	});

	//this is the anyOdd that check the resultArray if there is any Even elements
	$("#anyEven").on("click" , function(){
		if(resultArray.length === 0 ){
			$("#text").val("Result Array is empty");
		}else{
			var result = resultArray.reduce(function(acc , elem){
				if(elem % 2 === 0){
					return acc || true;
				} else{
					return acc || false;
				}
			},false);
		$("#text").val("Any Even: "+result);
	}
	resultFlag=true;
	});
})
