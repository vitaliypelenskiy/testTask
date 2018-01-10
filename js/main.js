$(document).ready(function(){

   var fp = new Vue({
   el: "#constructor",
   data: {
   	// battonNext: 'Далле',
   	paintingValid: false,
   	frameValid:false,
   	titleValid:false,
   	colorValid: false,
   	paintingShow: true,
   	frameShow:false,
   	titleShow:false,
   	colorShow: false,
   	paintingElement: {
   		src:'',
   		name:'',
   		price:''
   	},
   	frameElement: {
   		src:'',
   		name:'',
   		price:''
   	},
   	titleElement: {
   		title: '',
   		name: '',
   		date: '',
   		font:'ariston'
   	},
   	colorElement: [],
   	nameColor: [],
   	priceEnd: 0,
   },
   methods: {
   	nextStep: function(e){
   		console.log(this.paintingValid + ' - ' + this.paintingShow );
   		if(this.paintingShow && this.paintingValid){
            this.paintingShow = false;
            this.frameShow    = true;
   		}
   		else if(this.frameShow && this.frameValid){
            this.frameShow = false;
            this.titleShow = true;
   		}
   		else if(this.titleShow){
            this.titleShow = false;
            this.colorShow = true;
   		}
   		else if(this.colorShow){
   			var dataPost = {
   				namePainting: this.paintingElement.name,
   				nameFrame: this.frameElement.name,
   				titleElement: {
   					title: this.titleElement.title,
   					name: this.titleElement.name,
   					date: this.titleElement.date
   				},
   				colorFinger: this.nameColor,
   				price: this.priceEnd
   			};
   			alert(JSON.stringify(dataPost));
   			axios.post('name_page', dataPost)
			  .then(function (response) {
			    console.log(response);
			  })
			  .catch(function (error) {
			    console.log(error);
		    });
	   	}
   		else{
   			return;
   		}
   	},
   	paintingClickElement: function(e){
        var nativeElement     = e.target;
        var parent            = nativeElement.parentNode;
        var allpictureElement = document.getElementsByClassName('cb-item-pic');
        [].forEach.call(allpictureElement, function(el) {
		    el.classList.remove("current");
		});
        parent.classList.add("current");

        this.paintingElement.src   = nativeElement.getAttribute('src');
        this.paintingElement.name  = nativeElement.getAttribute('title');
        this.paintingElement.price = nativeElement.getAttribute('price');
        
        if(this.paintingElement.src && this.paintingElement.name){
        	this.paintingValid = true;
        	console.log(this.paintingElement);
        }
           if(this.paintingElement.price){
        	this.priceEnd = this.paintingElement.price;
        }
   	},
   	frameClickElement: function(e){
       var nativeElement;
       var allpictureElement = document.getElementsByClassName('cb-item-border');
       [].forEach.call(allpictureElement, function(el) {
		    el.classList.remove("current");
		});
       if(e.target.tagName!='A'){
       	 if(e.target.tagName == 'DIV'){
            nativeElement = e.target.getElementsByTagName('IMG')[0];
       	 }
       	 if(e.target.tagName == 'IMG'){
   			nativeElement = e.target;
       	 }
       }
       else{
       	nativeElement = e.target.previousElementSibling;
       }
       var parent  = nativeElement.parentNode;
       parent.classList.add("current");

		this.frameElement.src   = nativeElement.getAttribute('src');
        this.frameElement.name  = nativeElement.getAttribute('title');
        this.frameElement.price = nativeElement.getAttribute('price');
        
        if(this.frameElement.src && this.frameElement.name){
        	this.frameValid = true;
        	console.log(this.frameElement);
        }
           if(this.frameElement.price){
        	this.priceEnd = +this.paintingElement.price + +this.frameElement.price;
        }


   	},
   	fontClickElement: function(e){
   		var nativeElement = e.target;
   		this.titleElement.font = nativeElement.getAttribute('id');
   		var allBtnFont = document.getElementsByClassName('btn-font');
   		[].forEach.call(allBtnFont, function(el) {
		    el.classList.remove("btn-font--active");
		});
		nativeElement.classList.add("btn-font--active");
   	},
   	colorClickElement: function(e){
   		this.nameColor = [];
   		 var checkedColor = document.getElementsByName("checked[]");
   		 for (var i = 0; i < checkedColor.length ; i++) {
   		 	if(checkedColor[i].checked){
   		 		this.nameColor.push(checkedColor[i].nextElementSibling.getAttribute('title'));
   		 	}
   		 }
   		 if(this.nameColor.length>2)
   		 {
        	this.priceEnd = +this.paintingElement.price + +this.frameElement.price + 30;
   		 }
   		 else{
        	this.priceEnd = +this.paintingElement.price + +this.frameElement.price;
   		 }
   	}
   },
   

});

   });
