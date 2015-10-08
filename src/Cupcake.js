import React, { Component } from 'react'
import THREE, { ImageUtils, Vector3, Quaternion, BoxGeometry, MeshBasicMaterial } from 'three'
import { Object3D, Mesh } from 'react-three'

const assetpath = (filename) => './assets/' + filename;

const boxgeometry = new BoxGeometry(200,200,200);
const boxgeometry2 = new BoxGeometry(150,200,150);

const cupcaketexture = ImageUtils.loadTexture( assetpath('cupCake.png') );
const cupcakematerial = new MeshBasicMaterial( { map: cupcaketexture } );

const creamtexture = ImageUtils.loadTexture( assetpath('creamPink.png') );
const creammaterial = new MeshBasicMaterial( { map: creamtexture } );

export default class Cupcake extends Component {

	static propTypes = {
		position: React.PropTypes.instanceOf(Vector3),
    	quaternion: React.PropTypes.instanceOf(Quaternion).isRequired
	}

	render() {
		return (
			<Object3D quaternion={this.props.quaternion} position={this.props.position || new Vector3(0,0,0)}>
				<Mesh position={new Vector3(0,-100,0)} geometry={boxgeometry2} material={cupcakematerial} />
				<Mesh position={new Vector3(0,100,0)}  geometry={boxgeometry} material={creammaterial} />
			</Object3D>
		);
	}

}