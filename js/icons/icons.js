V3D.Icon = function(type, coords) {
	THREE.Group.call(this);
	this.type = type;
	this.coords = coords;
	console.log(coords.x);

    var spriteMap = new THREE.TextureLoader().load("images/iconos/" + type + ".png");
    var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
    var sprite = new THREE.Sprite( spriteMaterial);
    
    sprite.scale.set( 8, 8, 8 );
    
    this.add(sprite);
    
    var lineMaterial = new THREE.LineBasicMaterial({
		color: 0x000000,
		linewidth: 4
	});
	
	var geometry = new THREE.Geometry();
	
	geometry.vertices.push(
		new THREE.Vector3( 0, 0, 0 ),
		new THREE.Vector3( 0, 0, -10 )
	);
	
	var line = new THREE.Line( geometry, lineMaterial );
	
	this.add(line);
	this.position.set(coords.x, coords.y, coords.z + 10);
	
	var listElem = document.createElement('li');
	$(listElem).addClass('list-group-item');
	$(listElem).text(type);
	var closeButton = document.createElement('button');
	$(closeButton).text('x');
	closeButton.type = 'button';
	$(closeButton).addClass('close');
	$(listElem).append(closeButton);

	listElem.addEventListener('mouseover', this.hoverIcon.bind(this), false);
	listElem.addEventListener('mouseout', this.unhoverIcon.bind(this), false);
	closeButton.addEventListener('click', this.eraseIcon.bind(this), false);
	
	this.listElem = listElem;
	$('.icon_list').append(listElem);
	scene.add(this);
}

V3D.Icon.prototype = Object.create(THREE.Group.prototype);
V3D.Icon.prototype.constructor = V3D.Icons; 

V3D.Icon.prototype.hoverIcon = function() {
	this.scale.set(1.5,1.5,1.5);
}

V3D.Icon.prototype.unhoverIcon = function() {
	this.scale.set(1,1,1);
}

V3D.Icon.prototype.eraseIcon = function() {
	scene.remove(this);
	$(this.listElem).remove();
}
