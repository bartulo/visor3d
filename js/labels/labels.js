var labels = new THREE.Object3D();

var lab = $('.label');

function renderLabels() {
	console.log(lab);
	//~ for ( i = 0; i < lab.length; i++ ) {
		//~ var label = new THREE.Object3D();
		//~ var coords = $(lab[i]).data('coords');
	
		//~ var queryMarker = new THREE.Mesh(new THREE.SphereGeometry(.5),
					//~ new THREE.MeshBasicMaterial({
							//~ color: 0x990000
					//~ }));
		//~ queryMarker.scale.set(2,2,2);
		//~ queryMarker.position.set( coords[0], coords[1], coords[2] );
		//~ label.add(queryMarker);
		
		//~ // CONNECTOR
		
		//~ var geomConn = new THREE.Geometry();
		//~ var pto1 = new THREE.Vector3( coords[0], coords[1], coords[2] );
		//~ var pto2 = new THREE.Vector3( coords[0], coords[1], coords[2] + 10 );
		//~ geomConn.vertices.push(pto1, pto2);
		//~ matConn = new THREE.LineBasicMaterial();
		//~ conn = new THREE.Line(geomConn, matConn);
		//~ label.add(conn);
		//~ labels.add(label);
		//~ console.log(labels);
	//~ }
}

function updateLabel() {
	for ( i = 0; i < lab.length; i++ ) {
		var coords = $(lab[i]).data('coords');
	
		var v = new THREE.Vector3( coords[0], coords[1], coords[2] + 10 ) ;
		var x, y, e;
		v.project(camera);
		x = (v.x * window.innerWidth/2) + window.innerWidth/2;
		y = -(v.y * window.innerHeight/2) + window.innerHeight/2;
		e = lab[i]
		e.style.display = "block";
		e.style.left = ( x  - ( e.offsetWidth /2 )) + "px";
		e.style.top = (y - (e.offsetHeight / 2)) + "px";
		var minFontSize = 16;
		dist = camera.position.distanceTo(v);
		if (dist < 10) dist = 10;
		fontSize = Math.max(Math.round(1000 / dist), minFontSize);
		e.style.fontSize = fontSize + "px";
	}
}
