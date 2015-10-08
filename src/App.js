import React, { Component, Children } from 'react'
import update from 'react/lib/update';
import THREE, { Vector3, Quaternion, Euler } from 'three'
import { Scene, PerspectiveCamera, PointLight, AmbientLight, HemisphereLight } from 'react-three'
import Cupcake from './Cupcake'
import Box from './Box'

let n = 0;

export default class App extends Component {

	constructor() {
		super();
		this.state = {
			width: window.innerWidth,
			height: window.innerHeight,
			rotationangle: 0,
			cupcakedata: {
				position: new Vector3(0,0,0), 
				quaternion: new Quaternion(),
			}
		}
		this.boxes = [];
		this.boxProps = [];
	}

	componentDidMount() {
		this.doAnimation();
	}

	doAnimation() {

		n += 0.01;

		const cupcakedata = this.state.cupcakedata;
		const rotationangle = n * 0.8;
		cupcakedata.quaternion.setFromEuler(new Euler(rotationangle, rotationangle*3, 0));
		cupcakedata.position.x = 300 * Math.sin(rotationangle);
		cupcakedata.position.y = 300 * Math.cos(rotationangle);

		this.setState({
			rotationangle,
			cupcakedata,
		});

		if(this.boxes.length < 100) {
			const position = new Vector3(
				Math.random()*this.state.width - this.state.width/2,
				Math.random()*this.state.height - this.state.height/2,
				Math.random()*-800 + 200
			);
			const aimPosition = new Vector3(position.x, position.y ,position.z);
			this.boxes.push(<Box />);
			this.boxProps.push({
				position,
				aimPosition,
				opacity: 0,
				aimOpacity: Math.random()*0.6 + 0.2,
				scale: 0,
				aimScale: Math.random()*1.5 + 0.2,
				color: Math.random()*0xFFFFFF,
			});
		}

		this.boxProps.map((box) => {

			if(Math.random() < 0.1) {
				box.aimPosition.set(
					box.aimPosition.x + Math.random()*50 - 25,
					box.aimPosition.y + Math.random()*50 - 25,
					box.aimPosition.z + Math.random()*50 - 25
				);
			}

			if(box.opacity < box.aimOpacity) box.opacity += 0.05;
			if(box.scale < box.aimScale) box.scale += 0.01;

			box.position.x += (box.aimPosition.x - box.position.x)/50;
			box.position.y += (box.aimPosition.y - box.position.y)/50;
			box.position.z += (box.aimPosition.z - box.position.z)/50;

			return box;
		});

		requestAnimationFrame(::this.doAnimation);
	}
	
	render() {
		const aspectratio = this.state.width / this.state.height;
		const cameraprops = {
			fov: 80 + Math.cos(n)*50, 
			aspect: aspectratio, 
			near: 1, 
			far: 5000,
    		position: new Vector3(Math.cos(n)*500,Math.sin(n)*500, 800 + Math.cos(n)*-1000), 
    		lookat: new Vector3(0,0,0),
    	};

    	return (
    		<Scene width={this.state.width} height={this.state.height} camera="maincamera" background={0xDCC3D2} >
    			<AmbientLight color={0x111111} />
    			<PerspectiveCamera name="maincamera" {...cameraprops} />
    			{/*<Cupcake {...this.state.cupcakedata} />*/}
    			{Children.map(this.boxes, (box, i) => 
					React.cloneElement(box, this.boxProps[i])
				)}
    			
	    	</Scene>
	    );

	}

}