import React, { Component, Children } from 'react'
import update from 'react/lib/update';
import THREE, { Vector3, Quaternion, Euler } from 'three'
import { Scene, PerspectiveCamera, PointLight, AmbientLight, HemisphereLight } from 'react-three'
import Cupcake from './Cupcake'
import Box from './Box'

export default class App extends Component {

	constructor() {
		super();
		this.state = {
			width: 1024,
			height: 768,
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
		this.spincupcake(0);
	}

	spincupcake(t) {

		const cupcakedata = this.state.cupcakedata;
		const rotationangle = t * 0.0005;
		cupcakedata.quaternion.setFromEuler(new Euler(rotationangle, rotationangle*3, 0));
		cupcakedata.position.x = 300 * Math.sin(rotationangle);
		cupcakedata.position.y = 300 * Math.cos(rotationangle);

		this.setState({
			rotationangle,
			cupcakedata,
		})

		if(this.boxes.length < 100) {
			const position = new Vector3(Math.random()*1000 - 500,Math.random()*800 - 400,Math.random()*-800 + 200)
			this.boxes.push(<Box position={position} />);
			this.boxProps.push({
				position,
				aimPosition: position,
				opacity: 0,
				aimOpacity: Math.random()*0.6 + 0.2,
				color: Math.random()*0xFFFFFF,
			});
		}

		for(let i=0; i< this.boxes.length; i ++) {
			if(Math.random() < 0.1) {
				this.boxProps[i].aimPosition = new Vector3(
					this.boxProps[i].aimPosition.x + Math.random()*100 - 50,
					this.boxProps[i].aimPosition.y + Math.random()*100 - 50,
					this.boxProps[i].aimPosition.z + Math.random()*100 - 50
				);
			}

			if(this.boxProps[i].opacity < this.boxProps[i].aimOpacity) this.boxProps[i].opacity += 0.05;

			this.boxProps[i].position.x += (this.boxProps[i].aimPosition.x - this.boxProps[i].position.x)/50;
			this.boxProps[i].position.y += (this.boxProps[i].aimPosition.y - this.boxProps[i].position.y)/50;
			this.boxProps[i].position.z += (this.boxProps[i].aimPosition.z - this.boxProps[i].position.z)/50;
		}

		requestAnimationFrame(::this.spincupcake);
	}
	
	render() {
		const aspectratio = this.state.width / this.state.height;
		const cameraprops = {
			fov: 75, 
			aspect: aspectratio, 
			near: 1, 
			far: 5000,
    		position: new Vector3(0,0,600), 
    		lookat: new Vector3(0,0,0),
    	};

    	return (
    		<Scene width={this.state.width} height={this.state.height} camera="maincamera" background={0xDCC3D2} >
    			<AmbientLight color={0x111111} />
    			<PerspectiveCamera name="maincamera" {...cameraprops} />
    			<Cupcake {...this.state.cupcakedata} />
    			{Children.map(this.boxes, (box, i) => 
					React.cloneElement(box, this.boxProps[i])
				)}
    			
	    	</Scene>
	    );

	}

}