window.onload = function () {
  console.log("we are loaded");
  // Craeting variables for the HTML elements
  const buttonCall = document.querySelector("#search");
  const responseA = document.querySelector("#responseA");
//   });//click
// Get data from JSON file
  function getJSONFromServerUsingFetch(fileNameLink) {
    // use ES6 fetch API, which return a promise
    return fetch(fileNameLink).
    then(function(r) 
    { 
      //return a promise
      return r.json()
    })
  }
// Create the interaction that will display the results
  buttonCall.addEventListener("click", function () {
    console.log("clicked");
    let returnedSearch = checkAuth_A(
      document.querySelector("#user-string-A").value
    );
    changeString_A(returnedSearch);
    });
   
// Return the data from the art category
function checkAuth_A(userString) {
  setTimeout(() => {
    let answer = "";
if(userString === "art"){

      getJSONFromServerUsingFetch(`http://localhost:4200/sendSearch?${new URLSearchParams({label:"art"})}`)
      .then(
        function (resultFromFetchA) {
          console.log(resultFromFetchA);
          let sResA =  resultFromFetchA;
          // Art thumbnail images array
          const imgA = [
            'images/pop.jpg',
            'images/private.png',
            'images/123go.jpg',
            'images/private.png',
            'images/deleted.jpg'
                    ];
          for(let i=0; i<sResA.length;i++){
            var srcA = document.getElementById("responseA"); 
                          const img = document.createElement('img');
                          img.src = imgA[i];
                    
                          srcA.appendChild(img);
                    // Append videos link, title, and description to their assigned thumbnail
              var linkA = document.createElement('p');  
              // Set the link
              linkA.innerHTML = sResA[i].link;  
              srcA.appendChild(linkA); 

               var YTtitleA = document.createElement('p');  
               // Set the title 
               YTtitleA.innerHTML = sResA[i].title;  
               srcA.appendChild(YTtitleA);   
               
               
               var YTdescriptionA = document.createElement('p');  
               // Set the description 
               YTdescriptionA.innerHTML = sResA[i].description;  
               srcA.appendChild(YTdescriptionA);   
          
            

    }
  })
 }
 // Return the data from the history category
  else if(userString === "history"){
   
      getJSONFromServerUsingFetch(`http://localhost:4200/sendSearch?${new URLSearchParams({label:"history"})}`)
      .then(
        function (resultFromFetchB) {
          console.log(resultFromFetchB);
          let sResB =  resultFromFetchB;
          for(let i=0; i<sResB.length;i++){
            var srcB = document.getElementById("responseA"); 
     var imgB = document.createElement("img"); 
          imgB.src = "images/deleted.jpg"; 
          var srcB = document.getElementById("responseA"); 
          srcB.appendChild(imgB);
                    // Append videos link, title, and description to their assigned thumbnail
              var linkB = document.createElement('p');  
              // Set the link 
              linkB.innerHTML = sResB[i].link;  
              srcB.appendChild(linkB);   

               var YTtitleB = document.createElement('p');  
               // Set the title 
               YTtitleB.innerHTML = sResB[i].title;  
               srcB.appendChild(YTtitleB);   
               
               
               var YTdescriptionB = document.createElement('p');  
               // Set the description
               YTdescriptionB.innerHTML = sResB[i].description;  
               srcB.appendChild(YTdescriptionB);   

    }}) }
    // Return the data from the food category
    else if(userString === "food"){

      getJSONFromServerUsingFetch(`http://localhost:4200/sendSearch?${new URLSearchParams({label:"food"})}`)
      .then(
        function (resultFromFetchC) {
          console.log(resultFromFetchC);
          let sResC =  resultFromFetchC;
          // Food thumbnail images array
          const imgC = [
            'images/deleted.jpg',
            'images/mealworms.jpg',
            'images/deleted.jpg'
                    ];
             
          for(let i=0; i<sResC.length;i++){
            var srcC = document.getElementById("responseA"); 
                          const img = document.createElement('img');
                          img.src = imgC[i];
                          srcC.appendChild(img);
                            // Append videos link, title, and description to their assigned thumbnail
              var linkC = document.createElement('p');  
              // Set the link 
              linkC.innerHTML = sResC[i].link;  
              srcC.appendChild(linkC); 

               var YTtitleC = document.createElement('p');  
               // Set the title 
               YTtitleC.innerHTML = sResC[i].title;  
               srcC.appendChild(YTtitleC);   
               
               
               var YTdescriptionC = document.createElement('p');  
               // Set the description
               YTdescriptionC.innerHTML = sResC[i].description;  
               srcC.appendChild(YTdescriptionC);   
           
          
            

    }}) }
    // Return the data from the travel category
    else if(userString === "travel"){
      getJSONFromServerUsingFetch(`http://localhost:4200/sendSearch?${new URLSearchParams({label:"travel"})}`)
      .then(
        function (resultFromFetchD) {
          console.log(resultFromFetchD);
          let sResD =  resultFromFetchD;
          // Travel thumbnail images array
          const imgD = [
            'images/purulia.jpg',
            'images/alaska.jpg',
            'images/200.jpg'
                    ];
          for(let i=0; i<sResD.length;i++){
            var srcD = document.getElementById("responseA"); 
               
                          const img = document.createElement('img');
                          img.src = imgD[i];
                          srcD.appendChild(img);
                          //  // Create anchor element. 
        
  // Append videos link, title, and description to their assigned thumbnail
              var linkD = document.createElement('p');  
              // Set the link
              linkD.innerHTML = sResD[i].link;  
              srcD.appendChild(linkD); 

               var YTtitleD = document.createElement('p');  
               // Set the title 
               YTtitleD.innerHTML = sResD[i].title;  
               srcD.appendChild(YTtitleD);   
               
               
               var YTdescriptionD = document.createElement('p');  
               // Set the description
               YTdescriptionD.innerHTML = sResD[i].description;  
               srcD.appendChild(YTdescriptionD);   
             
              

    }}) }
    // Return error message if any other word was send 
    else {
      answer = "Error, try again (you need to type the words without caps)";
    let wrongAnswer = answer;
    responseA.innerHTML = wrongAnswer;
    }
    console.log("time-out one-a complete " + answer);
    return answer;
  }, 2000); // let 5 secs go past then send back
}

function changeString_A(searchString) {
  //console.log(userString);
  setTimeout(() => {
    let userSearch = searchString.split("").join("*");
    console.log("time-out two-a complete " + searchString);
    return answer;
  }, 2000); // let 5 secs go past then send back
}
}

