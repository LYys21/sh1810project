
import scroll from "./scroll.js";  //ES6
import "./scss/add.scss";
import "./scss/swiper.css";

scroll.run();


const title = require("./title.js");  //nodeJS
title();



class SHANGHAI {
    study(){
        console.log("hello");
    }
}

new SHANGHAI().study();

