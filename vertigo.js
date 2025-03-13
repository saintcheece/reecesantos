let nthElement = 0; //EACH DICTATED NEW SQUARE

function vertigo(shape) {
    // let max = window.getComputedStyle(document.getElementById("container")).width.replace("vw", "");
    let size = 0;
    let id = null;

    var container = document.getElementById("container");
    var square = document.getElementById(shape);

    id = setInterval(frame, 30); //EXETCUTE frame() ITERATIVELY (THE NUMBER IS THE TIC SPEED)

    function frame() {
        if (size + 1 == 100) {
            //STOP THE SQUARE FROM EXPANDING
            clearInterval(id);
            if(nthElement > 10){
                document.getElementById("sq"+(nthElement-10)).remove(); //DELETE nth ELEMENT FOR PERFORMANCE REASONS
            }
        } else if (size == 25) { //CHANGE THE CONDITION VALUE TO INCREASE NUMBER OF SQUARES
            //CREATE A NEW SQUARE
            nthElement++;
            var newSquare = document.createElement("div");
            newSquare.id = "sq" + nthElement;
            newSquare.className = "square"; // Add a class for styling

            newSquare.style.width = "0%";
            newSquare.style.height = "0%";
            newSquare.style.backgroundColor = nthElement % 2 == 0 ? "#30211C" : "#EA5B0C";
            newSquare.style.zIndex = nthElement;

            container.appendChild(newSquare);
            vertigo("sq" + nthElement);  //STARTS NEW ITERATION1
        }

        size++;
        square.style.width = size + "%";
        square.style.height = size + "%";
        square.style.top = 50-(size/2) + "%";
        square.style.left = 50-(size/2) + "%";
    }
}