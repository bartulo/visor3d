var V3D = {};

V3D.labels = [];

V3D.label = function(coords, text) {
	THREE.Group.call(this);
	var elem = document.createElement('div');
	$(elem).addClass('label');
	$(elem).text(text);
	$('.label_container')[0].append(elem);
	
	var queryMarker = new THREE.Mesh(new THREE.SphereGeometry(.5),
				new THREE.MeshBasicMaterial({
						color: 0x990000
				}));
	queryMarker.scale.set(2,2,2);
	queryMarker.position.set( coords[0], coords[1], coords[2] );
	this.add(queryMarker);
	
	var geomConn = new THREE.Geometry();
	var pto1 = new THREE.Vector3( coords[0], coords[1], coords[2] );
	var pto2 = new THREE.Vector3( coords[0], coords[1], coords[2] + 10 );
	geomConn.vertices.push(pto1, pto2);
	matConn = new THREE.LineBasicMaterial();
	conn = new THREE.Line(geomConn, matConn);
	this.add(conn);
	scene.add(this);
	
	this.coords = coords;
	this.elem = elem;
	V3D.labels.push(this);
}

V3D.label.prototype = Object.create(THREE.Group.prototype);
V3D.label.prototype.constructor = V3D.label;
	
V3D.label.prototype.update = function() {
		
	var v = new THREE.Vector3( this.coords[0], this.coords[1], this.coords[2] + 10 ) ;
	var x, y, e;
	v.project(camera);
	x = (v.x * window.innerWidth/2) + window.innerWidth/2;
	y = -(v.y * window.innerHeight/2) + window.innerHeight/2;
	e = this.elem;
	e.style.display = "block";
	e.style.left = ( x  - ( e.offsetWidth /2 )) + "px";
	e.style.top = (y - (e.offsetHeight / 2)) + "px";
	var minFontSize = 16;
	dist = camera.position.distanceTo(v);
	if (dist < 10) dist = 10;
	fontSize = Math.max(Math.round(1000 / dist), minFontSize);
	e.style.fontSize = fontSize + "px";
}
