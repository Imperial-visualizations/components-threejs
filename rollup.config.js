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

export default {
    input:'src/main.js',
    external:external,
    output:{
        format:"esm",
        dir:'dist'
    },
    plugins:[
        includePaths({paths: ["./"] }),
        resolve(),
        commonjs(),
        image(),
        terser(),
        vue({css:true})        
    ]
}
