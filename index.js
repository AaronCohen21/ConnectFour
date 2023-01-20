let settings = {
    fullscreen: true,
}
let two = new Two(settings).appendTo(document.body);

let circle = two.makeCircle(two.width/2, two.height/2, 100);
circle.fill = "rgb(255,0,0)";

two.update();

//this will eventually be for the UI, right now it should just be a red dot as a placeholder