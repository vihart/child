	var c = 1/5; //scale factor

	var renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setClearColor( 0x000000, 1 );
	/*
	Append the canvas element created by the renderer to document body element.
	*/
	document.body.appendChild( renderer.domElement );
	/*
	Create a three.js scene
	*/
	var scene = new THREE.Scene();
	/*
	Create a three.js camera
	*/
	var camera = new THREE.PerspectiveCamera( 110, window.innerWidth / window.innerHeight, .01, 1000 );
	/*
	Apply VR headset positional data to camera.
	*/
	var controls = new THREE.VRControls( camera );
	/*
	Apply VR stereo rendering to renderer
	*/
	var effect = new THREE.VREffect( renderer );
	effect.setSize( window.innerWidth, window.innerHeight );

	var everything = new THREE.Object3D();

	var t = 0;
	var snowFloor = -40;
	var foundLight = 0;
	var lightPlace = new THREE.Vector3(Math.r)
	var music = document.querySelector('#music');
		var music2 = document.querySelector('#music2');
		var child3 = document.querySelector('#child3');
	//child3.volume = 1;
		var teeth = document.querySelector('#teeth');
		var bing = document.querySelector('#bing');
		var fishNoise = document.querySelector('#fishNoise');
		var cubeSfx = [
			document.querySelector('#cube1'),
			document.querySelector('#cube2'),
			document.querySelector('#cube3'),
			document.querySelector('#cube4'),
			document.querySelector('#cube5'),
			document.querySelector('#cube6'),
			document.querySelector('#cube7'),
			document.querySelector('#cube8'),
			document.querySelector('#cube9'),
			document.querySelector('#cube10'),
			document.querySelector('#cube11'),
			document.querySelector('#cube12'),
			document.querySelector('#cubeUp1'),
			document.querySelector('#cubeUp2'),
			document.querySelector('#cubeUp3'),
			document.querySelector('#cubeUp4'),
			document.querySelector('#cubeUp5'),
			document.querySelector('#cubeUp6'),
			document.querySelector('#cubeUp7'),
			document.querySelector('#cubeUp8'),
			document.querySelector('#cubeUp9'),
			document.querySelector('#cubeUp10'),
			document.querySelector('#cubeUp11'),
			document.querySelector('#cubeUp12'),]

		var wanderTime = 0;
		var newPos = new THREE.Vector3(0,0,0);
		var boing = 0;
		var fishy = 1;

	camera.position.y = -30;
		music2.volume = 0;

	//make particles
	var particles = new THREE.Geometry();
	var partCount = 1500;

	for (var p = 0; p<partCount; p++){
		var part = new THREE.Vector3(
	      	120*Math.random() - 80,
	      	95*Math.random() + snowFloor,
	      	120*Math.random() - 80
			);
		part.velocity = new THREE.Vector3(
			Math.random()/10,
			-Math.random()*0.2,
			Math.random()*.09);
		particles.vertices.push(part);
	}

	var partMat = new THREE.PointCloudMaterial({
			color: 0xffffff,
			size: 1.5*c,
			map: THREE.ImageUtils.loadTexture("media/starflake.png"),
			blending: THREE.AdditiveBlending,
			transparent: true
			});
	var particleSystem = new THREE.PointCloud(particles, partMat);

	particleSystem.sortParticles = true;
	everything.add(particleSystem);

	//dodecahedra

	//special dodecahome
	var dodecahome = new THREE.Mesh(
		new THREE.DodecahedronGeometry(14),
		new THREE.MeshLambertMaterial());
	dodecahome.position.y = camera.position.y;
	while (dodecahome.position.distanceTo(camera.position) < (20*c)){
		dodecahome.position.set(
				Math.random()*100 -50,
				camera.position.y,
				Math.random()*100 -50);
	}
	dodecahome.material.side = THREE.DoubleSide;
	everything.add(dodecahome);

	//make dodecahome particles
	var particles2 = new THREE.Geometry();
	var partCount2 = 20;

	for (var p = 0; p<partCount2; p++){
		var part = new THREE.Vector3(
	      	7*Math.random() - 3.5,
	      	camera.position.y + Math.random()*4 - 3,
	      	7*Math.random() - 3.5
			);
		part.velocity = new THREE.Vector3(
			0,
			-Math.random()*0.2,
			0);
		particles2.vertices.push(part);
	}

	var partMat2 = new THREE.PointCloudMaterial({
			color: 0xffffff,
			size: 10*c,
			map: THREE.ImageUtils.loadTexture("media/tallParticle.png"),
			blending: THREE.AdditiveBlending,
			transparent: true
			});
	var particleSystem2 = new THREE.PointCloud(particles2, partMat2);


	particleSystem2.sortParticles = true;
	everything.add(particleSystem2);

	particleSystem2.position.x = dodecahome.position.x;
	particleSystem2.position.z = dodecahome.position.z;

	//other dodecahedra
	var dodecArray = [];
	var dodecCount = 140;
	var dodecGeom = new THREE.DodecahedronGeometry(1);
	var dodecMat = new THREE.MeshLambertMaterial();
	var size = 0;

	for (var p = 0; p<dodecCount; p++){
		dodecArray[p] = new THREE.Mesh(dodecGeom, dodecMat);
		dodecArray[p].position.set(
			Math.random()*100 -50,
			Math.random()*18 -44,
			Math.random()*100 -50);
		if (dodecArray[p].position.distanceTo(camera.position) < 10 || dodecArray[p].position.distanceTo(dodecahome.position) < 9){
			dodecArray[p].position.z += 20;
		}
		size = Math.random()*8;
		dodecArray[p].scale.set(size, size, size);
		everything.add(dodecArray[p]);
	}


	//sign

	var infoText = THREE.ImageUtils.loadTexture( "media/arrows-sound.png" );
	var signMat = new THREE.MeshLambertMaterial({map: infoText, color: 0xffffff});
	var sign = new THREE.Mesh(dodecGeom, signMat);

	sign.position.set(-0.5, -31, -4);
	sign.rotation.y = 2;
	everything.add(sign);

	//icosahedra

	var icosArray = [];
	var icosCount = 30;
	var icosGeom = new THREE.IcosahedronGeometry(1);
	var icosMat = new THREE.MeshLambertMaterial({wireframe:true});

	for (var p = 0; p<icosCount; p++){
		icosArray[p] = new THREE.Mesh(icosGeom, icosMat);
		icosArray[p].position.set(
			Math.random()*120 -60,
			Math.random()*10 -30,
			Math.random()*120 -60);
		size = Math.random()*20;
		icosArray[p].scale.set(size, size, size);
		everything.add(icosArray[p]);
	}

	//cubes
	var cubeSpot = new THREE.Vector3();
	while (cubeSpot.distanceTo(camera.position) < 50 || cubeSpot.distanceTo(dodecahome.position) < 25){
		cubeSpot = new THREE.Vector3(
		Math.random()*120 - 60,
		camera.position.y,
		Math.random()*120 - 60);
	}

	var cubeArray = [];
	var cubeCount = 12;

	for (var p = 0; p<cubeCount; p++){
		cubeArray[p] = new THREE.Mesh(
			new THREE.BoxGeometry(4,4,4,4,6+Math.floor(Math.random()*90),4),
			new THREE.MeshLambertMaterial({wireframe:true}));
		cubeArray[p].material.color.setRGB(Math.random()+.5, Math.random()/2 + .2, Math.random()+.3);
		cubeArray[p].position.y = cubeSpot.y;
		cubeArray[p].position.x = cubeSpot.x + 4*Math.floor(Math.random()*4);
		cubeArray[p].position.z = cubeSpot.z + 4*Math.floor(Math.random()*4);
		if (Math.random() < .16){
			cubeArray[p].position.x *= -1;
			cubeArray[p].position.z *= -1;
		}
		everything.add(cubeArray[p]);
	}

	//tetrahedron
	var tet = new THREE.Mesh(
		new THREE.TetrahedronGeometry(1),
		new THREE.MeshLambertMaterial({color: 0xff0000})
		);
	tet.position.y = camera.position.y;
	while (tet.position.distanceTo(camera.position) < 10 || tet.position.distanceTo(cubeSpot)<10 || tet.position.distanceTo(dodecahome.position) < 15){
		tet.position.set(
			Math.random()*80 - 40,
			-30,
			Math.random()*80 - 40);
	}
	everything.add(tet);

	//flocktahedra
	var octFlock = new THREE.Object3D();
	var octArray = [];
	var octCount = 8;
	var octVelocity = [];

	for (var i = 0; i<octCount; i++){
		octArray[i] = new THREE.Mesh(
			new THREE.OctahedronGeometry(Math.random()),
			new THREE.MeshLambertMaterial({wireframe: true, wireframeLinewidth: (10*Math.random())})
			);
		octArray[i].material.color.setRGB(0, Math.random(), Math.random());
		octArray[i].position.set(
			Math.random()*2 - 1,
			Math.random()*2 - 1,
			Math.random()*2 - 1);
		octVelocity[i] = Math.random();
		octFlock.add(octArray[i]);
		}
	octFlock.position.set(
		50*Math.random(),
		camera.position.y,
		-50*Math.random()
		);
	everything.add(octFlock);


	//special winning icosahedron

	var win = new THREE.Object3D();

	var icosign = new THREE.Mesh(
		new THREE.IcosahedronGeometry(1),
		new THREE.MeshLambertMaterial({wireframe:true, wireframeLinewidth: 2})
		);
	win.add(icosign);

	//special icosahedron vertices

	var icosignVertex = [];

	for (var i = 0; i<12; i++){
		icosignVertex[i] = new THREE.Mesh(
			new THREE.BoxGeometry(.01, .01, .01),
			new THREE.MeshLambertMaterial({color: cubeArray[i].material.color})
			);
		icosignVertex[i].position.set(
			icosign.geometry.vertices[i].x,
			icosign.geometry.vertices[i].y,
			icosign.geometry.vertices[i].z
			);
		win.add(icosignVertex[i]);
	}

	var icosignFace = [];

	for (var i = 0; i<20; i++){
		icosignFace[i] = new THREE.Mesh(
			new THREE.TetrahedronGeometry(.1),
			new THREE.MeshLambertMaterial({color: 0xff3333})
			);
		icosignFace[i].geometry.vertices[3].set(
			(icosign.geometry.vertices[icosign.geometry.faces[i].a].x
			+ icosign.geometry.vertices[icosign.geometry.faces[i].b].x
			+ icosign.geometry.vertices[icosign.geometry.faces[i].c].x)/3
			+icosign.geometry.faces[i].normal.x/3,

			(icosign.geometry.vertices[icosign.geometry.faces[i].a].y
			+ icosign.geometry.vertices[icosign.geometry.faces[i].b].y
			+ icosign.geometry.vertices[icosign.geometry.faces[i].c].y)/3
			+icosign.geometry.faces[i].normal.y/3,

			(icosign.geometry.vertices[icosign.geometry.faces[i].a].z
			+ icosign.geometry.vertices[icosign.geometry.faces[i].b].z
			+ icosign.geometry.vertices[icosign.geometry.faces[i].c].z)/3
			+icosign.geometry.faces[i].normal.z/3
			);
		icosignFace[i].geometry.vertices[0].set(
			((icosign.geometry.vertices[icosign.geometry.faces[i].a].x
			+ icosign.geometry.vertices[icosign.geometry.faces[i].b].x)/2
			+ icosign.geometry.vertices[icosign.geometry.faces[i].c].x)/2,

			((icosign.geometry.vertices[icosign.geometry.faces[i].a].y
			+ icosign.geometry.vertices[icosign.geometry.faces[i].b].y)/2
			+ icosign.geometry.vertices[icosign.geometry.faces[i].c].y)/2,

			((icosign.geometry.vertices[icosign.geometry.faces[i].a].z
			+ icosign.geometry.vertices[icosign.geometry.faces[i].b].z)/2
			+ icosign.geometry.vertices[icosign.geometry.faces[i].c].z)/2
			);
		icosignFace[i].geometry.vertices[1].set(
			((icosign.geometry.vertices[icosign.geometry.faces[i].b].x
			+ icosign.geometry.vertices[icosign.geometry.faces[i].c].x)/2
			+ icosign.geometry.vertices[icosign.geometry.faces[i].a].x)/2,

			((icosign.geometry.vertices[icosign.geometry.faces[i].b].y
			+ icosign.geometry.vertices[icosign.geometry.faces[i].c].y)/2
			+ icosign.geometry.vertices[icosign.geometry.faces[i].a].y)/2,

			((icosign.geometry.vertices[icosign.geometry.faces[i].b].z
			+ icosign.geometry.vertices[icosign.geometry.faces[i].c].z)/2
			+ icosign.geometry.vertices[icosign.geometry.faces[i].a].z)/2
			);
		icosignFace[i].geometry.vertices[2].set(
			((icosign.geometry.vertices[icosign.geometry.faces[i].a].x
			+ icosign.geometry.vertices[icosign.geometry.faces[i].c].x)/2
			+ icosign.geometry.vertices[icosign.geometry.faces[i].b].x)/2,

			((icosign.geometry.vertices[icosign.geometry.faces[i].a].y
			+ icosign.geometry.vertices[icosign.geometry.faces[i].c].y)/2
			+ icosign.geometry.vertices[icosign.geometry.faces[i].b].y)/2,

			((icosign.geometry.vertices[icosign.geometry.faces[i].a].z
			+ icosign.geometry.vertices[icosign.geometry.faces[i].c].z)/2
			+ icosign.geometry.vertices[icosign.geometry.faces[i].b].z)/2
			);
		icosignFace[i].material.visible = false;
		icosignFace[i].frustumCulled = false;
		win.add(icosignFace[i]);
	}

	win.position.set(-3, camera.position.y, -3);
	everything.add(win);

	//create light
	var light = new THREE.SpotLight( 0xffffff, .8, 800*c);
	light.position.set( -50,20,.1);
	light.castShadow = true;
	everything.add( light );

	var light2 = new THREE.SpotLight( 0xffffff, .4, 600*c);
	light2.position.set( 30,10,40);
	light2.castShadow = true;
	everything.add( light2 );

	var light3 = new THREE.SpotLight( 0xffffff, .2, 500*c);
	light3.position.set( -10,15,20);
	light3.castShadow = true;
	everything.add( light3 );

	var fishLight =new THREE.PointLight( 0x88ffff, .8, 5*c);
	everything.add(fishLight);

	var cubeLight =new THREE.PointLight( 0xffaaee, .9, 35*c);
	cubeLight.position.x = cubeSpot.x + 12;
	cubeLight.position.y = cubeSpot.y;
	cubeLight.position.z = cubeSpot.z + 12;
	everything.add(cubeLight);

	var boingLight =new THREE.PointLight( 0xff4400, .6, 10*c);
	boingLight.position.set(tet.position.x,tet.position.y,tet.position.z);
	everything.add(boingLight);

	var dodecLight =new THREE.PointLight( 0x0000ff, .25, 15*c);
	dodecLight.position.set(dodecahome.position.x, dodecahome.position.y+2, dodecahome.position.z-2);
	dodecLight.castShadow = true;
	everything.add(dodecLight);

	var dodecLight2 =new THREE.PointLight( 0xff0000, .3, 15*c);
	dodecLight2.position.set(dodecahome.position.x, dodecahome.position.y-2, dodecahome.position.z+2);
	dodecLight2.castShadow = true;
	everything.add(dodecLight2);

	var goldLight = new THREE.PointLight( 0xffdd00, .6, 10*c);
	goldLight.position.y = camera.position.y;
	while (goldLight.position.distanceTo(camera.position) < 15 || goldLight.position.distanceTo(tet.position) < 10 || goldLight.position.distanceTo(cubeSpot) < 10 || goldLight.position.distanceTo(dodecahome.position) < 14){
		goldLight.position.set(
		Math.random()*100 -50,
		Math.random()*18 -44,
		Math.random()*100 -50);
	}
	goldLight.castShadow = false;
	everything.add( goldLight );

	var winLight = new THREE.PointLight( 0xffffdd, .5, 25*c);
	winLight.position.set(win.position.x, win.position.y, win.position.z);
	everything.add(winLight);

	scene.add(everything);
	everything.scale.set(0.2,0.2,0.2);
	everything.position.set(0,7,0);

	var sled = new THREE.Object3D();

	// var sledCenter = new THREE.Mesh(
	// 	new THREE.TetrahedronGeometry(),
	// 	new THREE.MeshLambertMaterial({color: 0xffff00})
	// 	);
	// sledCenter.scale.set(0.1,0.1,0.1);
	// sled.add(sledCenter);

	var sledFront = new THREE.Mesh(
		new THREE.TetrahedronGeometry(),
		new THREE.MeshLambertMaterial({color: 0x550000})
		);
	sledFront.position.z = 0.5;
	sledFront.scale.set(0.1,0.1,0.1);
	sled.add(sledFront);

	var slat = new THREE.Mesh(
		new THREE.BoxGeometry(0.5,0.05,1),
		new THREE.MeshLambertMaterial({color: 0x330000})
		);
	sled.add(slat);

	scene.add(sled);

	// var headProjection = new THREE.Mesh(
	// 	new THREE.IcosahedronGeometry(),
	// 	new THREE.MeshLambertMaterial({color: 0x0000ff})
	// );
	// headProjection.scale.set(0.1,0.1,0.1);
	// scene.add(headProjection);


	var partVector = new THREE.Vector3;
	var boingVector = new THREE.Vector3;

	var fishyWin1 = false;
	var fishyWin2 = false;
	var cubeWin = 0;
	var lightWin = false;
	var dodecWin = false;
	var boingWin = false;
	var winAll = false;
	var winTimer = 0;
	var theEnd = false;

	var pos = new THREE.Vector2;
	var moveVector = new THREE.Vector2;
	var crouchHeight = 1.2;
	var sledDistance = 0.8;
	var speed = 0.1;
	var zSpot = 0.05;
	var xSpot = 0.05;

	var relativeTet = new THREE.Vector3;
	var relativeDodecahome = new THREE.Vector2;
	var relativeOctoflock = new THREE.Vector2;
	var relativeLight = new THREE.Vector2;
	var relativeWin = new THREE.Vector2;
	var relativeCube = new THREE.Vector2;

	function animate() {

		pos.set(camera.position.x, camera.position.z);
		// headProjection.position.x = pos.x;
		// headProjection.position.z = pos.y;
		relativeWin.set(pos.x + win.position.x*c, pos.y + win.position.z*c);
		relativeTet.set(pos.x + tet.position.x*c, tet.position.y*c, pos.y + tet.position.z*c);
		relativeDodecahome.set(pos.x + dodecahome.position.x*c, pos.y + dodecahome.position.z*c);
		relativeLight.set(pos.x + goldLight.position.x*c, pos.y + goldLight.position.z*c);
		relativeOctoflock.set(pos.x + octFlock.position.x*c, pos.y + octFlock.position.z*c);

		sled.rotation.y = Math.atan2(pos.x,pos.y);

		if ((pos.distanceTo(sled.position) < sledDistance) && (camera.position.y < crouchHeight) ){
			slat.material.color.set(0xff0000);
			moveVector.set(-pos.x, -pos.y);
			moveVector.multiplyScalar(speed);
			everything.position.x += moveVector.x;
			everything.position.z += moveVector.y;
		} else {
			slat.material.color.set(0x330000);
		};





		win.rotation.y += .002;
		//win states
		if (fishyWin1){//find fish
			icosign.material.wireframeLinewidth = 5;
			icosign.material.color.set(0x88ccff);
		}
		if (fishyWin2){//get fishy=1
		icosign.material.wireframeLinewidth = 10;
		icosign.material.color.set(0x0055ff);
		}
		if (boingWin == true){ //one spikey face per boing
			for (var i = 0; i < 20; i++){
				icosignFace[i].material.visible = true;
			}
		}
		if (dodecWin && !winAll){
			win.scale.set(5, 5, 5);
			winLight.distance = 35;
		}
		if (lightWin == false && foundLight == 1){//while winning, stops when won
			if (foundLight = 2){
				lightWin = true;
			}
		}
		if (fishyWin2 == true && boingWin == true && dodecWin == true && lightWin == true && cubeWin > 11 ){
			winAll = true;
		}
		if (winAll == true && pos.distanceTo(relativeWin)<(2*c)){
			theEnd = true;
		}
		if(theEnd == true && winTimer < 6){
			winTimer += .0005;
			win.scale.set(2*winTimer+5, 2*winTimer+5, 2*winTimer+5);
			win.position.y += winTimer/500;
			light.distance += 2;
			light2.distance += 2;
			light3.distance += 2;
			winLight.position.set(win.position.x, win.position.y, win.position.z);
			var dimmer = Math.max(.2, 1 - winTimer*8)
			particleSystem.material.color.setRGB(dimmer,dimmer,dimmer);
			light3.intensity = dimmer;
			light2.intensity = dimmer;
			light.intensity = dimmer;
			teeth.play();
			music.muted = true;
			music2.muted = true;
			child3.muted = true;
			fishNoise.muted = true;
			bing.muted = true;
		}
		if(theEnd == true){
			for (var i = 0; i<dodecArray.length; i++){
				dodecArray[i].position.x += dodecArray[i].position.x * .00015;
				dodecArray[i].position.z += dodecArray[i].position.z * .00015;
			}
			for (var i=0; i<icosArray.length; i++){
				icosArray[i].position.x += icosArray[i].position.x * .0002;
				icosArray[i].position.z += icosArray[i].position.z * .0002;
				icosArray[i].position.y += icosArray[i].position.y * .0002;
			}
			sign.position.y -= .003;
		}


		//cube stretch stuff
		for (var i = 0; i<cubeCount; i++){
			relativeCube.set((everything.position.x + cubeArray[i].position.x*c), (everything.position.z + cubeArray[i].position.z*c));
			if ( pos.distanceTo(relativeCube) < (2*c)){
				if ( cubeArray[i].geometry.heightSegments/4 > cubeArray[i].scale.y){
					cubeSfx[i+cubeCount].play();
					cubeArray[i].scale.y += .05;
					if (icosignVertex[i].scale.x = .01){
						icosignVertex[i].scale.set(10,10,10);
						cubeWin += 1;
					}
				}
			} else {
				if ( cubeArray[i].scale.y > 1){
					cubeSfx[i].volume = Math.min(1, 2/(relativeCube.distanceTo(pos)*c));
					cubeSfx[i].play();
					cubeArray[i].scale.y -= .004;
				}
			}
		}

		//octoFlock
		for (var i = 0; i<octCount; i++){
			octArray[i].position.y += Math.sin(t*5*octVelocity[i])/50;
			octArray[i].position.x += Math.sin(t*10*octVelocity[i])/100;
			octArray[i].position.z += Math.cos(t*10*octVelocity[i])/100;
		}
		octFlock.position.x += Math.sin(t)/16;
		octFlock.position.z += Math.cos(t)/16 + Math.sin(t/3)/18;
		fishLight.position.set(octFlock.position.x,octFlock.position.y,octFlock.position.z);

		if(pos.distanceTo(relativeOctoflock)<(20*c) && !winAll){ //octfish react
			fishy = Math.max(0, fishy - .001); //fishy starts at 1 and goes to 0
			particleSystem.material.color.setRGB(fishy,fishy,1);
			fishNoise.play();
			fishyWin1 = !fishyWin2;
			if (fishy < .4){
				fishyWin2 = true;
			}
		} else if (fishy < 1) { //go back to normal once out of range
			fishy += .004;
			particleSystem.material.color.setRGB(fishy,fishy,1);
		}
		if (octFlock.position.distanceTo(dodecahome.position)<14.5){
				octFlock.position.x += 12;
				octFlock.position.z += 12;
		}

		//boinging tetrahedron
		tet.rotation.y += .005;

		if(camera.position.distanceTo(relativeTet)<(1.5*c)){ //boing if close
			bing.play();
			boing = 3;
			boingWin =true;
		}
		if (boing>0){ //boing tetrahedron away
			var boingVector = new THREE.Vector3(0,0,-1).applyQuaternion(camera.quaternion);
			var boingness = boingVector.multiplyScalar(.1*c);
			tet.position.add(boingness);
			boingLight.distance = (boing*10 + 4)*c
			boing -= .05;
		}

		t += .01;

		light.position.x += Math.sin(t); //roving white lights
		light.position.z += Math.cos(t);
		light2.position.x += Math.sin(t)*1.5;
		light2.position.z += Math.cos(t)*1.5;
		light3.position.x += Math.sin(t)*2.5;
		light3.position.z += Math.cos(t)*2.5;

		//light gamification
		if ( foundLight == 0){ //haven't found the gold light
			goldLight.intensity += Math.sin(t)/200;
			goldLight.distance += .001*c;
			music2.volume = (99*music2.volume + .00001)/100;
			music.volume = (99*music.volume + .999)/100;
			if ( relativeLight.distanceTo(pos) < goldLight.distance
				&& !winAll){
				foundLight = 1;
			}
		} else if (foundLight == 1){ //found the light, make it glow
			music.volume = (99*music.volume + .000001)/100;
			music2.volume = (99*music2.volume + .999)/100;
			particleSystem.material.color.setRGB(1,1,1.6-goldLight.intensity);
			goldLight.intensity += .005;
			goldLight.distance += .7*c;
			if (goldLight.intensity > 2.5){
				goldLight.distance = c*(19 * goldLight.distance + 12) / 20;
				if (goldLight.intensity > 4){
					newPos.set(
						Math.random()*100 -50,
						Math.random()*18 -44,
						Math.random()*100 -50);
					foundLight = 2;
				}
			}
		} else if (foundLight == 2){ //light starts wandering
			goldLight.distance = 12*c;
			goldLight.position.x += Math.sin(t/2)*Math.random()/4;
			goldLight.position.z += Math.cos(t/2)*Math.random()/4;
			music2.volume = Math.min(1, 10/(relativeLight.distanceTo(pos)*c));
			particleSystem.material.color.setRGB(1,1,1-music2.volume);
			wanderTime += .01
			if (wanderTime > 8){//light settles into new random place
				goldLight.position.x = (199*goldLight.position.x + newPos.x)/200;
				goldLight.position.z = (199*goldLight.position.z + newPos.z)/200;
				goldLight.distance -= .005*c;
				goldLight.intensity -= .004;
			}
			if (wanderTime > 12){//reset light
				particleSystem.material.color.setRGB(1,1,1);
				goldLight.distance = 10*c;
				goldLight.intensity = .6;
				foundLight = 0;
				wanderTime = 0;
			}
		}

		if (camera.position.y < -25){
			snowFloor = camera.position.y - 10;
		} else {
			snowFloor = -35;
		}

		//animate snow particles
		for (var p = 0; p<partCount; p++) {
		    // check if we need to reset particles
		    if (particles.vertices[p].y < snowFloor) {
		      particles.vertices[p].set(
		      	120*Math.random() - 80,
		      	snowFloor + 95,
		      	120*Math.random() - 80);
		      particles.vertices[p].velocity.y = -Math.random();
		    }

		    if (foundLight == 0 ){
	       		particles.vertices[p].velocity.x = Math.random()/10;
	       		particles.vertices[p].velocity.y = -Math.random()*.2;
	       		particles.vertices[p].velocity.z = Math.random()/10;
	    	}

	       	if (boing>0 && particles.vertices[p].distanceTo(tet.position) < 20){ //boing back
	       		partVector = new THREE.Vector3(
	       				particles.vertices[p].x,
	       				particles.vertices[p].y,
	       				particles.vertices[p].z);
				particles.vertices[p].x += boing*partVector.sub(tet.position).x/400;
				particles.vertices[p].y += boing*partVector.sub(tet.position).y/400;
				particles.vertices[p].z += boing*partVector.sub(tet.position).z/400;
			}

			if (fishy < 1){
				particles.vertices[p].x += Math.sin(particles.vertices[p].z/10)/(15*fishy+2);
				particles.vertices[p].z += Math.cos(particles.vertices[p].x/10)/(15*fishy+2);
			}

			if (particles.vertices[p].distanceTo(dodecahome.position)<14.5){//avoid dodecahome
				particles.vertices[p].velocity.y = 0;
				particles.vertices[p].y += .2;
			}

			if (lightWin){
				if (particles.vertices[p].distanceTo(win.position) < (2*win.scale.x - 1)){
					particles.vertices[p].x = (9*particles.vertices[p].x + win.position.x )/10 + Math.sin(particles.vertices[p].x/20)/(20) - .05;
					particles.vertices[p].y = (9*particles.vertices[p].y + win.position.y + 1) / 10;
					particles.vertices[p].z = (9*particles.vertices[p].z + win.position.z -	.4) / 10;
				}
			}

		    particles.vertices[p].y += particles.vertices[p].velocity.y;
		    particles.vertices[p].z += particles.vertices[p].velocity.z;
		    particles.vertices[p].x += particles.vertices[p].velocity.x;
	 	 }

		//dodecahome particles
	 	particleSystem2.rotation.y += .005;
	 	 for (var p = 0; p<partCount2; p++) {
		    particles2.vertices[p].y +=  Math.sin(2*t+10*particles2.vertices[p].velocity.y)/23;
		    particles2.vertices[p].z += Math.sin(2*t+40*particles2.vertices[p].velocity.y)/33;
		    particles2.vertices[p].x += Math.cos(2*t+40*particles2.vertices[p].velocity.y)/33;
	 	 }

	 	if ( pos.distanceTo(relativeDodecahome) < (16*c)) {
	 		music.volume = (9*music.volume + .000001)/10;
	 		// child3.play();
	 		if (pos.distanceTo(relativeDodecahome) < (12*c)){
	 			dodecWin = true;
	 		}
	 	}
	 	if (!winAll){
		 	child3.volume = Math.min(1, 1/(pos.distanceTo(relativeDodecahome)*c));
		 }


		if (controls.phoneVR.orientationIsAvailable()) {//do phone interface if phone
			tapMovement(0.8);//.8 scaled for this thing
		}
		
		controls.update();
		effect.render( scene, camera );
		requestAnimationFrame( animate );
	}


	animate();

	document.body.addEventListener( 'dblclick', function() {
			effect.setFullScreen( true );
	});

	
	document.body.addEventListener( 'click', function() {
		if (controls.phoneVR.orientationIsAvailable()) { //do phone interface if phone
			effect.setFullScreen( true );
			if (music.paused){
		  			music.play();
		  			music2.play();
		  			child3.play();
		  	}
		};
	});



	function onkey(event) {
	    event.preventDefault();

	    if (event.keyCode == 90) { // z
	    	controls.zeroSensor(); //zero rotation
	    } else if (event.keyCode == 70 || event.keyCode == 13) { //f or enter
	    	effect.setFullScreen(true) //fullscreen else if (event.keyCode == 80) {//p

	  	} else if (event.keyCode == 32 || event.keyCode == 80) { //space or p
	  		if (music.paused){
		  			music.play();
		  			music2.play();
		  			teeth.muted = false;
	  			if (!theEnd){
		  			child3.muted = false;
		  			bing.muted = false;
		  			cubeUp1.muted = false;
		  			fishNoise.muted = false;
		  			for (var i=0; i<cubeSfx.length; i++){
		  				cubeSfx[i].muted = false;
		  			}
		  		}
	  		} else{
	  			music.pause();
	  			music2.pause();
	  			child3.muted = true;
	  			bing.muted = true;
	  			cubeUp1.muted = true;
	  			fishNoise.muted = true;
	  			teeth.muted = true;
	  			for (var i=0; i<cubeSfx.length; i++){
	  				cubeSfx[i].muted = true;
	  			}
	  		}
	  	}

  	};

    window.addEventListener("keydown", onkey, true);

	document.addEventListener('keydown', function(event) { key(event, 1); }, false);
	document.addEventListener('keyup', function(event) { key(event, -1); }, false);

	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		effect.setSize( window.innerWidth, window.innerHeight );
	}
	window.addEventListener( 'resize', onWindowResize, false );
