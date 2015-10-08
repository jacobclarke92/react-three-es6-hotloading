import React, { Component } from 'react'
import { Object3D, Mesh } from 'react-three'
import THREE, { Vector3, Quaternion, MeshLambertMaterial, MeshPhongMaterial, BoxGeometry, SphereGeometry } from 'three'

export default class Box extends Component {

	constructor() {
		super();
		this.state = {
			position: new Vector3(0,0,0),
			quaternion: new Quaternion(),
		}
		this.sphere = new SphereGeometry(Math.random()*120, 15, 15);
	}

	render() {
		const sphereMaterial = new THREE.MeshBasicMaterial({
		    color: this.props.color,
		    transparent: true,
		    opacity: this.props.opacity,
		});
		return (
			<Object3D quaternion={this.state.quaternion} position={this.state.position || new Vector3(0,0,0)}>
				<Mesh position={this.props.position} geometry={this.sphere} material={sphereMaterial} scale={this.props.scale} />
			</Object3D>
		);
	}

}