<script>
import {Raycaster,Vector2}from "three";

export default {  
  name:'iv-raycaster',
  inject: ['vglNamespace'],
  props: ['rendererId', 'camera', 'group'],
  data () {
      return {
          raycaster: new Raycaster(),
          mouse: new Vector2(),
          rendererWidth: null,
          rendererHeight: null,
          offsetLeft: null,
          offsetTop: null,
      }
  },
  computed: {
    cmr () {
        return this.vglNamespace.cameras.hash[this.camera]
    },
    grp () {
        return this.vglNamespace.object3ds.hash[this.group]
    }
  },
  methods: {
      calculateIntersects (e) {

          e.preventDefault();
          this.mouse.x = ( (e.clientX - this.offsetLeft) / this.rendererWidth ) * 2 - 1;
          this.mouse.y = - ( (e.clientY + this.offsetTop) / this.rendererHeight ) * 2 + 1;

          this.raycaster.setFromCamera( this.mouse, this.cmr );

          var intersects = this.raycaster.intersectObjects(this.grp.children, true );

          this.$parent.$parent.$emit('raychng', intersects);
      }
  },
  mounted () {
    this.raycaster.params.Line.threshold = 3;
    document.getElementById(this.rendererId).addEventListener('mousemove', this.calculateIntersects);

    this.rendererWidth = parseFloat(window.getComputedStyle(document.getElementById(this.rendererId)).width.slice(0,-2));
    this.rendererHeight = parseFloat(window.getComputedStyle(document.getElementById(this.rendererId)).height.slice(0,-2));

    this.offsetLeft = document.getElementById(this.rendererId).getBoundingClientRect().left;
    this.offsetTop = document.getElementById(this.rendererId).getBoundingClientRect().top;
  },
  render(h) {
    return h('div');
  }
};
</script>