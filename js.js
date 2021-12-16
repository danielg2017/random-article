var searchText = document.getElementById("text");
var searchBtn = document.getElementById("searchbutton");
var result = document.getElementById("result");
var wikitext = "";

searchText.addEventListener("keypress", function(event){
        if (event.keyCode === 13) {
          event.preventDefault();
          var txt = searchText.value;
          executeSearch(txt);
         }
      });
 
searchBtn.addEventListener("click", function(){
  var txt = searchText.value;
  executeSearch(txt);
});

function executeSearch(txt){
  var link = "https://es.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=" + txt + "&limit=10";
  var xhr = new XMLHttpRequest(); 
  xhr.open('GET', link);
  xhr.onload = function() {
    if (xhr.status === 200) {
      wikitext = JSON.parse(xhr.responseText);
      showScreen(wikitext);  
    }
    else {
      console.log('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send();  
}

function showScreen(wikitext){
  //console.log(wikitext);
  var searchOutput = "";
	for (var i=0; i<wikitext[1].length; i++) {
	  searchOutput = searchOutput + "<a href='"+ wikitext[3][i] +"' target='_blank'><div class='entry'><span class='title'>" + wikitext[1][i] + "</span><br/><span class='snippet'>" + wikitext[2][i] + "</span></div></a>";
  };
  result.innerHTML = searchOutput;
};