import * as THREE from 'three'
import greenscreen from '../shaders/greenscreen.frag'
import vert from '../shaders/default.vert'

export default class Section extends THREE.Group {

    constructor( opts = { timeline, section } ) {

        super()
        Object.assign( this, opts )

        if( this.section === 'intro' ) this.createIntroSection()
        else if( this.section === 'end' ) this.createEndSection()
        else if( this.section === 'contact' ) this.createContactSection()
        else this.create()

    }

    create() {

        let textGeom = new THREE.TextGeometry( this.timeline.months[ this.section ].name, {
            font: this.timeline.assets.fonts['Schnyder L'],
            size: 200,
            height: 0,
            curveSegments: 10
        } ).center()

        let monthName = new THREE.Mesh( textGeom, this.timeline.textMat )
        monthName.position.set( 0, 0, 0 )
        this.add( monthName )

    }

    createIntroSection() {

        let sansTextGeom = new THREE.TextGeometry( 'YEAR IN REVIEW', {
            font: this.timeline.assets.fonts['SuisseIntl-Bold'],
            size: 50,
            height: 0,
            curveSegments: 4
        } ).center()

        let sansText = new THREE.Mesh( sansTextGeom, this.timeline.textMat )
        this.add( sansText )

        let serifTextGeom = new THREE.TextGeometry( '2018', {
            font: this.timeline.assets.fonts['Schnyder_Edit Outline'],
            size: 490,
            height: 0,
            curveSegments: 15
        } ).center()

        let serifText = new THREE.Mesh( serifTextGeom, this.timeline.textOutlineMat )
        serifText.position.set( 0, 0, -500 )
        this.add( serifText )

        let material = new THREE.MeshBasicMaterial( { map: this.timeline.assets.textures['intro']['ok.png'], transparent: true } )
        let geom = new THREE.PlaneGeometry( 1, 1 )
        let hand = new THREE.Mesh( geom, material )
        hand.scale.set( 1000, 1000, 1 )
        hand.position.set( 0, 0, -250 )
        this.add( hand )

        this.addIntroBadge()

    }

    addIntroBadge() {

        this.badge = new THREE.Group()

        let texture = new THREE.TextureLoader().load( 'images/highlights.png' )
        let material = new THREE.MeshBasicMaterial( { map: texture, transparent: true } )
        let geom = new THREE.PlaneGeometry( 1, 1 )
        this.circle = new THREE.Mesh( geom, material )
        this.circle.scale.set( 200, 200, 1 )
        this.badge.add( this.circle )

        let serifTextGeom = new THREE.TextGeometry( '2018-19', {
            font: this.timeline.assets.fonts['Schnyder L'],
            size: 26,
            height: 0,
            curveSegments: 6
        } )

        serifTextGeom.center()

        let serifText = new THREE.Mesh( serifTextGeom, this.timeline.textMat )
        serifText.position.set( 0, 0, 1 )
        this.badge.add( serifText )

        this.badge.position.set( 0, -this.timeline.c.size.h / 2 + 90, 50 )

        this.add( this.badge )

    }

    createEndSection() {

        let sansTextGeom = new THREE.TextGeometry( 'SEE YOU NEXT TIME', {
            font: this.timeline.assets.fonts['SuisseIntl-Bold'],
            size: 50,
            height: 0,
            curveSegments: 4
        } ).center()

        let sansText = new THREE.Mesh( sansTextGeom, this.timeline.textMat )
        this.add( sansText )

        let serifTextGeom = new THREE.TextGeometry( 'END', {
            font: this.timeline.assets.fonts['Schnyder_Edit Outline'],
            size: 400,
            height: 0,
            curveSegments: 15
        } ).center()

        let serifText = new THREE.Mesh( serifTextGeom, this.timeline.textOutlineMat )
        serifText.position.set( 0, 0, -300 )
        this.add( serifText )

        let geometry = new THREE.PlaneGeometry( 1, 1 )
        let material = new THREE.ShaderMaterial({
            uniforms: {
                fogColor: { type: "c", value: this.timeline.scene.fog.color },
                fogNear: { type: "f", value: this.timeline.scene.fog.near },
                fogFar: { type: "f", value: this.timeline.scene.fog.far },
                texture: { type: 't', value: this.timeline.assets.textures['end'][ 'glit.mp4' ] }
            },
            fragmentShader: greenscreen,
            vertexShader: vert,
            fog: true,
            transparent: true
        })

        let mesh = new THREE.Mesh( geometry, material )
        mesh.scale.set( 700, 700, 1 )
        mesh.position.set( 0, 0, -200 )

        // this.assets.textures['end'][ 'end/glit.mp4' ].image.play() // TODO: play when enters camera

        this.add( mesh )

    }

    createContactSection() {

        this.position.set( 0, 2000, 0 )
        this.visible = false

        let sansTextGeom = new THREE.TextGeometry( 'SEE YOU NEXT TIME', {
            font: this.timeline.assets.fonts['SuisseIntl-Bold'],
            size: 10,
            height: 0,
            curveSegments: 4
        } ).center()

        let sansText = new THREE.Mesh( sansTextGeom, this.timeline.textMat )
        sansText.position.set( 0, 60, 0 )
        this.add( sansText )

        let lineOneGeom = new THREE.TextGeometry( "We're looking for new talents and exciting projects", {
            font: this.timeline.assets.fonts['Schnyder L'],
            size: 30,
            height: 0,
            curveSegments: 6
        } ).center()

        let lineOne = new THREE.Mesh( lineOneGeom, new THREE.MeshBasicMaterial({ color: 0xFFFFFF }) )
        lineOne.position.set( 0, 0, 0 )
        this.add( lineOne )

        let lineTwoGeom = new THREE.TextGeometry( "to make 2019 a memorable one.", {
            font: this.timeline.assets.fonts['Schnyder L'],
            size: 30,
            height: 0,
            curveSegments: 6
        } ).center()

        let lineTwo = new THREE.Mesh( lineTwoGeom, new THREE.MeshBasicMaterial({ color: 0xFFFFFF }) )
        lineTwo.position.set( 0, -45, 0 )
        this.add( lineTwo )

        let emailGeom = new THREE.TextGeometry( "hello@craftedbygc.com", {
            font: this.timeline.assets.fonts['Schnyder L'],
            size: 36,
            height: 0,
            curveSegments: 6
        } ).center()

        let email = new THREE.Mesh( emailGeom, this.timeline.textMat )
        email.position.set( 0, -140, 0 )
        this.add( email )

        let emailUnderline = new THREE.Mesh(
            new THREE.PlaneBufferGeometry( 467, 1 ),
            this.linkUnderlineMat
        )
        emailUnderline.position.set( 0, -172, 0 )
        this.add( emailUnderline )

        // for raycasting so it doesn't just pick up on letters
        this.linkBox = new THREE.Mesh(
            new THREE.PlaneBufferGeometry( 490, 60 ),
            new THREE.MeshBasicMaterial( { alphaTest: 0, visible: false } )
        )
        this.linkBox.position.set( 0, -140, 1 )
        this.linkBox.onClick = () => {
            window.open( 'mailto:hello@craftedbygc.com', '_blank' )
        }
        this.add( this.linkBox )

    }

}