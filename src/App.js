import React, { Component } from 'react'
import update from 'react/lib/update';
import THREE, { Vector3, Quaternion, Euler } from 'three'
import { Scene, PerspectiveCamera } from 'react-three'
import Cupcake from './Cupcake'

export default class App extends Component {

	constructor() {
		super();
		this.state = {
			width: 640,
			height: 480,
			rotationangle: 0,
			cupcakedata: {
				position: new Vector3(0,0,0), 
				quaternion: new Quaternion(),
			}
		}
	}

	componentDidMount() {
		this.spincupcake(0);
	}

	spincupcake(t) {
		const cupcakedata = this.state.cupcakedata;
		const rotationangle = t * 0.001;
		cupcakedata.quaternion.setFromEuler(new Euler(rotationangle, rotationangle*3, 0));
		cupcakedata.position.x = 300  * Math.sin(rotationangle);
		this.setState({
			rotationangle,
			cupcakedata,
		})

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
    		<Scene width={this.state.width} height={this.state.height} camera="maincamera">
    			<PerspectiveCamera name="maincamera" {...cameraprops} />
    			<Cupcake {...this.state.cupcakedata} />
	    	</Scene>
	    );

	}

}