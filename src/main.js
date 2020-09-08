import * as components from "./components"
import * as VueGL from "vue-gl"


const ImpVisThree={
  install(Vue){
    Object.keys(VueGL).forEach( name => { 
	    Vue.component(name,VueGL[name]);
    });
    for(const componentName in components){
      const component = components[componentName];
      Vue.component(component.name,component);
    }
  }
}
export default ImpVisThree;
if(typeof window !== 'undefined' && window.Vue){
  window.Vue.use(ImpVisThree);
}
