//ELEMENTS
const photo = document.getElementById("header-photo");
const polygon = document.getElementById("profile-frame-border")

//ELEMENT INDEX VALUES
let image_index = 1;
let polygon_index = 1;

const polygon_properties = {
    1:"polygon(12% 7%, 85% 13%, 100% 72%, 0 98%)",
    2:"polygon(0 22%, 100% 0, 93% 93%, 12% 78%)",
    3:"polygon(10% 0, 96% 9%, 93% 93%, 6% 100%)"
}

function changePhoto(){
    photo.src = "resources/images/point" + image_index + ".png";
    image_index++;
    if(image_index == 4){image_index = 1;}
}

function changePolygon(){
    polygon.style.clipPath = polygon_properties[polygon_index];
    polygon_index++;
    if(polygon_index == 4){polygon_index = 1;}
}

function updateStyle() {
    changePhoto();
    changePolygon();
}

setInterval(updateStyle, 200);