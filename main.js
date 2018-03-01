// result variable will help us to make the text box empty after generating the result.
var resultFlag=false;
// resultArray is array to save the results to do some functionalities on it .
var  resultArray = [];

//users
var user1={name:"user1",numOfTry:1,numOfSuccess:1}
var user2={name:"user2",numOfTry:0,numOfSuccess:0}
var user3={name:"user3",numOfTry:0,numOfSuccess:0}
var user4={name:"user4",numOfTry:0,numOfSuccess:0}
var user5={name:"user5",numOfTry:0,numOfSuccess:0}

//users array
var users=[user1,user2,user3,user4,user5]

//factory function
function fact(name){
	return {
		name:name,
		numOfTry:0,
		numOfSuccess:0
	}
}


$(document).ready(function(){
	//default hide for game divs:
	$(".selectUser").hide();
	$(".top10").hide();

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
			if($("#gameMode").is(":checked")){
				var i=$("select").val()
				if((!(i>=0))||i===null){
					alert("Please select user");
					return 0
				}

				if($("#guessText").val()===""){
					alert("please guess the number");
					$("#guessText").css("background-color","red");
					return 0;
				}
				var user=users[i]
				user.numOfTry+=1;

				if($("#guessText").val()==result){
					user.numOfSuccess+=1;
				}
				$("#userInfo").html("Name: "+user.name + "<br>Number of tries: "+user.numOfTry+"<br>Number of Success: "+user.numOfSuccess+ "<br>Score: "+Math.round((user.numOfSuccess/user.numOfTry*100))+"%");

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
		$("#guessText").css("background-color","");
		$("#guessText").val("");
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
	$("#clearResultArr").on("click",function(){
		resultArray = [];
		$("#resultarray").text("");
	})

	//adding game mode
	//
	$("#gameMode").on("change",function(){
		var guess=$('<input type="text" name="text" id="guessText" placeholder="Guess the number">')
		if (this.checked) {
			$(this).after(guess);
			$(".selectUser").show();
			$(".top10").show();
		} else {
			$("#guessText").remove();
			$(".selectUser").hide();
			$(".top10").hide();
		}
	});

	// fill users select:
		for (var i = 0; i < users.length; i++) {
			var user=users[i].name;
			var option=$('<option value='+i+'>'+user+'</option>');
			$("select").append(option);
		}

	$("select").on("change",function(){
		var user=users[$("select").val()];
		$("#userInfo").html("Name: "+user.name + "<br>Number of tries: "+user.numOfTry+"<br>Number of Success: "+user.numOfSuccess+ "<br>Score: "+Math.round((user.numOfSuccess/user.numOfTry*100))+"%");
	});

	
	$("#addUser").on("click",function(){
		if($("#newUser").val()===""){
			alert("Please add the user name");
			return 0;
		}
		var i = users.push(fact($("#newUser").val()));
		var option=$('<option value='+(i-1)+'>'+$("#newUser").val()+'</option>');
		$("select").append(option);
		$("#newUser").val("");
		alert("User Added successfully");

	});

})
