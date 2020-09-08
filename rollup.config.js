import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import vue from "rollup-plugin-vue";
import image from "@rollup/plugin-image";
import includePaths from "rollup-plugin-includepaths";
import {terser} from "rollup-plugin-terser"
const external = [
    'vue',
    '@impvis/components',
    'three'
]
const plugins = [
    includePaths({paths: ["./"] }),
    resolve(),
    commonjs(),
    image(),
    terser(),
    vue({css:true}) 
]

export default [{
    input:'src/main.js',
    external:external,
    output:{
        format:"esm",
        file:"./dist/impvis-components-threejs.ejs"
    },
    plugins:plugins
},{
    input:'src/main.js',
    external:external,
    output:{
        name:"impvis-components-threejs",
        format:"umd",
        file:'./dist/impvis-components-threejs.umd.js'
    },
    plugins:plugins
}]
