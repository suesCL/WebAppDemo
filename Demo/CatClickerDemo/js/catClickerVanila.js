

	var model = {
		currentCat : null,
		cats : [
		  {catName: "cat_one", picSource: "images/cat1.jpg", num_clicks: 0},
		  {catName: "cat_two", picSource: "images/cat2.jpg", num_clicks: 0},
		  {catName: "cat_three", picSource: "images/cat3.jpg", num_clicks: 0},
		  {catName: "cat_four", picSource: "images/cat4.jpg", num_clicks: 0}
		]

	};


	var octopus = {
		init: function() {
		  //start the entire application
		  model.currentCat = model.cats[0];
		  catListView.init();
		  Catview.init();
		  adminView.init();
		},

		getCurrentCat: function(){
		  return model.currentCat;
		},
		
		setCurrentCat: function(cat, oldCatName){
			model.currentCat = cat;
		},


		getAllCats: function(){
		  return model.cats;
		},

		incrementClicks: function(){
		  model.currentCat.num_clicks ++;
		  Catview.render();
		}
	};


	var Catview = {
		init: function(){
			//add click listener at a cat image
			var currentCat = octopus.getCurrentCat();
			var catImage = document.getElementById('catimage');
			catImage.addEventListener("click", function() {
				//change text increment by one
				octopus.incrementClicks();
			});
			
			this.render();
		},

		render: function(){
			//Get current cat's data 
			var cat = octopus.getCurrentCat();
			var catName = cat.catName;
			var catSource = cat.picSource;
			var clicks = cat.num_clicks;

			//display the current cat image
			document.getElementById('catname').innerHTML = catName;
			document.getElementById('catimage').src = catSource;
			document.getElementById('numberOfClicks').innerHTML = clicks;	
		}
	};


	var catListView = {
		init: function(){
		  var cats = octopus.getAllCats();
		  this.render(cats);
		},

		render: function(cats){
			//render cat list buttons
			var catlist = document.getElementById('catlist');
			var i = 0;
			cats.forEach(function(cat) {
				//create button for each cats
				var button = document.createElement("button")
				var buttonText = document.createTextNode(cat.catName);
				catlist.appendChild(button);
				button.appendChild(buttonText);
				
				//add clicklistener on each button
				button.addEventListener("click", (function(cat_copy){
					return function(){
						octopus.setCurrentCat(cat_copy);
						Catview.render();
					}
				})(cat));
				i = i+1;
			});

		  }
		};

  
    var adminView = {

		init: function(){
			var adminButton = document.getElementById('admin')
			var form1 = document.getElementById("form1");
			//Hide the form 
			form1.style.display = "none";
			
			//add click listener on admin button
			adminButton.addEventListener("click", function(){
				if (form1.style.display == "none") {
					form1.style.display = "block";
				}
			});
		
			//add click listener at cancel button
			document.getElementById('cancelbutton').addEventListener("click", function() {
				form1.style.display = "none";
			});

			//add click listener at save button
			document.getElementById('savebutton').addEventListener("click", function() {
				var cat = {catName: form1.elements[0].value, picSource: form1.elements[1].value, num_clicks: form1.elements[2].value};
				oldCatName = document.getElementById("catname")
				octopus.setCurrentCat(cat);
				Catview.render();
				form1.style.display = "none";
				
			});
			
		},

	}; 

  octopus.init();

