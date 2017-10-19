var color = '#fa7e5c';
var grosor = 4;
var interval;

$( document ).ready( function() {
	for ( i = 0; i < $('.tabs >li').length; i++) {
		tabTop = 30 + ( i * 110);
		$('.tabs >li')[i].style.top = tabTop + 'px' ;
		$('.tabs >li')[i].addEventListener( 'click', tabClicked, false );
	}
	
	var icons = $('.icon').children();
	
	for ( i = 0; i < icons.length; i++ ) {
		icons[i].firstElementChild.addEventListener( 'click', iconClicked, false );
	}
	
	var colorButton = $(".colors").children();
	
	for ( i = 0; i < colorButton.length; i++ ) {
		colorButton[i].addEventListener( 'click', colorClicked, false );
	}
	
	$('#sliderColor')[0].addEventListener( 'change', function(){ grosor = this.value }, false );
	
	for ( i = 0; i < $('.stop').length; i++ ) {
		$('.stop')[i].addEventListener( 'click', stopClicked, false );
	}
});

function hexToRgbA(hex){
var c;
if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
	c= hex.substring(1).split('');
	if(c.length== 3){
		c= [c[0], c[0], c[1], c[1], c[2], c[2]];
	}
	c= '0x'+c.join('');
	return [((c>>16)&255)/255, ((c>>8)&255)/255, (c&255)/255];
}
throw new Error('Bad Hex');
}

function closeTab(index) {
	$('#sidebar')[0].style.marginLeft = '-310px'; 
	$('.tabs > li').css('left', '-10px');
	$('.tab_content >li').eq( index ).hide();
	$(".tabs >li").removeClass('active');
	a = -1;
}
	
function openTab() {
	$('#sidebar')[0].style.marginLeft = '0px'; 
	$('.tabs > li').css('left', '300px');
}

function stopClicked() {
	closeTab(a);
};

function tabClicked() {
		
	var index = $(this).index();

	if ( a == -1 ) {
		
		$(this).addClass('active');
		
		$('.tab_content >li').eq(index).show();
		
		console.log(this);
		
		a = index;
		
		openTab();
		
	} else {
		
		if (index == a) {
			
			$(".tabs >li").removeClass('active');
			
			closeTab();
			
			a = -1;
			
			$('.tab_content >li').eq(index).hide();

		} else {
			
			$(".tabs >li").removeClass('active');

			$(this).addClass('active');
		
			$('.tab_content >li').eq(a).hide();

			$('.tab_content >li').eq(index).show();
			
			a = index;
		}
			
}};

function eraseLine( event ) {
	var index = $(event.target.parentElement).index();
			
	clearInterval( interval );

	$('.lines >li')[index].remove();
	
	group.remove(group.children[index]);
	
}

function hoverLine( event ) {
	if ( event.target.tagName === 'LI' ) {
	
		var index = $(event.target).index();
		
	} else if ( event.target.tagName === 'BUTTON' ) {
	
		var index = $(event.target.parentElement).index();
		
	}
	
	//~ group.children[index].material.visible = true;

	interval = setInterval( function() {
		if ( group.children[index].material.visible ) {
			console.log('true');
			
			group.children[index].material.visible = false;
			
		} else {
			console.log('false');
			
			group.children[index].material.visible = true;
		}
	}, 160);
	
	console.log( interval );
			
}

function unhoverLine( event ) {
	if ( event.target.tagName === 'LI' ) {
	
		var index = $(event.target).index();
		
	} else if ( event.target.tagName === 'BUTTON' ) {
	
		var index = $(event.target.parentElement).index();
		
	}
	
	clearInterval( interval );
	
	group.children[index].material.visible = true;
}
	
function colorClicked(){

	// Remove class from currently active button
	$(".colors > li").removeClass("active-color");

	// Add class active to clicked button
	$(this).addClass("active-color");

	// Get background color of clicked
	color = $(this).attr("data-color");
};	

$('#saveImg').on('click', function() {
	
	var canvas = renderer.domElement;
	
	var imgData = canvas.toDataURL('image/jpeg');
	
	var imgLink = document.createElement('a');
	
	document.body.appendChild(imgLink);
	
	imgLink.download = 'prueba.jpg';
	
	imgLink.href = imgData.replace('image/jpeg', 'image/octet-stream');
	
	imgLink.click();
	
	document.body.removeChild(imgLink);
	
});

function iconClicked() {
	
	$('.icon >li a').removeClass('active');
	
	$(this).addClass('active');
};
					

