




export const loadCss = ()=>{
    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: "/css/.lesson1.css"
     }).appendTo("head");

}