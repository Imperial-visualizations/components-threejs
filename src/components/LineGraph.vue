<template>
  <div id="lineGraph">
    <vgl-renderer camera="camera0" scene="scene0" id="vgl-canvas">
      <vgl-mesh-lambert-material name="mat" color="rgb(0, 150, 130)"/>
      <vgl-line-basic-material name="gridmat"  color="#2e2e2e"/>
      <vgl-sphere-geometry width-segments="24" height-segments="18" name="sphere"></vgl-sphere-geometry>
      <vgl-geometry name="gridverts" :position-attribute="gridPoints"></vgl-geometry>
      <vgl-geometry 
      name="axisverts" 
      position-attribute="-10, 0, 0, 10, 0, 0, 0, -10, 0, 0, 10, 0, 0, 0, -10, 0, 0, 10" 
      :color-attribute="[0.878, 0.682, 0.671, 0.878, 0.682, 0.671, 0.671, 0.753, 0.878,  0.671, 0.753, 0.878, 0.671, 0.878, 0.702, 0.671, 0.878, 0.702]"/>
      <vgl-line-basic-material name="axismat" :vertex-colors="true"/>
      <vgl-scene name="scene0">
        <vgl-mesh :position="spherePos" geometry="sphere" material="mat"></vgl-mesh>
        <vgl-directional-light name="light" position="10 10 10"/>
        <vgl-line-segments name="grid" geometry="gridverts" material="gridmat"></vgl-line-segments>
        <vgl-object-3d name="rayParent">
          <vgl-line-segments name="axes" geometry="axisverts" material="axismat"></vgl-line-segments>
        </vgl-object-3d>
      </vgl-scene>
      <vgl-perspective-camera name="camera0" orbit-position="10 10 0"></vgl-perspective-camera>
      <orbit-controls camera="camera0" ></orbit-controls>
      <iv-raycaster rendererId="vgl-canvas" camera="camera0" group="rayParent" />
    </vgl-renderer>
  </div>
</template>

<script>
import {Vector3,Vector2,Raycaster} from "three";
import OrbitControls from "./OrbitControls.vue";
import IVRaycaster from "./Raycaster.vue";
import {VglRenderer,VglMeshLambertMaterial,VglSphereGeometry,VglGeometry,VglLineBasicMaterial,VglScene,VglMesh,VglObject3d,VglPerspectiveCamera,VglLineSegments,VglDirectionalLight} from "vue-gl";

export default {
  name: 'iv-3d-line-graph',
  data () {
    return {
      spherePos: new Vector3(0,0,0),
      sphereVel: new Vector3(0.1,0.1,0.1),
      raycaster: new Raycaster(),
      mouse: new Vector2(),
      intersects: [],
    }
  },
  computed: {
    gridPoints () {
       var xyygridpoint1, xyygridpoint2, xyxgridpoint1, xyxgridpoint2, yzygridpoint1, yzygridpoint2, 
      yzzgridpoint1, yzzgridpoint2, zxxgridpoint1, zxxgridpoint2, zxzgridpoint1, zxzgridpoint2;
      var gridpoints= "";
      for (var i=-10; i<11; i++) {
        if (i != 0) {
          if (i === -10 ){
            xyygridpoint1 = String(i).concat(", -10, 0");
            xyygridpoint2 = ", ".concat(String(i), ", 10, 0");
          } else {
            xyygridpoint1 = ", ".concat(String(i), ", -10, 0");
            xyygridpoint2 = ", ".concat(String(i), ", 10, 0");
          }

          xyxgridpoint1 = ", -10, ".concat(String(i), ", 0");
          xyxgridpoint2 = ", 10, ".concat(String(i), ", 0");

          yzygridpoint1 = ", 0, -10, ".concat(String(i));
          yzygridpoint2 = ", 0, 10, ".concat(String(i));

          yzzgridpoint1 = ", 0, ".concat(String(i), ", -10");
          yzzgridpoint2 = ", 0, ".concat(String(i), ", 10");

          zxxgridpoint1 = ", -10, 0, ".concat(String(i));
          zxxgridpoint2 = ", 10, 0, ".concat(String(i));

          zxzgridpoint1 = ", ".concat(String(i), ", 0, -10");
          zxzgridpoint2 = ", ".concat(String(i), ", 0, 10");

          gridpoints = gridpoints.concat(xyygridpoint1, xyygridpoint2, xyxgridpoint1, xyxgridpoint2, yzygridpoint1,
          yzygridpoint2, yzzgridpoint1, yzzgridpoint2, zxxgridpoint1, zxxgridpoint2, zxzgridpoint1, zxzgridpoint2)
        }
      }
      return gridpoints;
    }
  },
  methods: {
    setup () {
    },
    updateIntersects (intersects) {
      this.intersects = intersects;
    },
    animate () {
      // this.spherePos = this.spherePos.add(this.sphereVel).clone();

      if (this.intersects.length > 0) {
        this.spherePos.x = this.intersects[0].point.x
        this.spherePos.y = this.intersects[0].point.y
        this.spherePos.z = this.intersects[0].point.z

        this.spherePos = this.spherePos.clone()
      }
      requestAnimationFrame( this.animate.bind(this) );
    }
  },
  components: {
    OrbitControls,
    'iv-raycaster':IVRaycaster,
    VglRenderer,
    VglMeshLambertMaterial,
    VglSphereGeometry,
    VglGeometry,
    VglLineBasicMaterial,
    VglScene,
    VglMesh,
    VglObject3d,
    VglPerspectiveCamera,
    VglLineSegments,
    VglDirectionalLight
  },
  mounted () {
    this.setup();
    this.animate();
    this.$on('raychng', this.updateIntersects);
  },
};
</script>

<style>

#app:focus{
  border:0;
}

#vgl-canvas{
  width: 800px;
  height: 600px;
}
</style>