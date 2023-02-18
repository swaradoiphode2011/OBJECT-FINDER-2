video = "";
objects=[];
img = "";
status = "";


function setup()
{
    canvas = createCanvas(370, 370);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(370,370);
    video.hide();
}


function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="Status : Detecting Object";
}


function draw()
{
    image(video, 0, 0, 370, 370);

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);

      objectDetector.detect(video, gotresults);
      for(i = 0; i < objects.length; i++)
      {
        document.getElementById("status").innerHTML="Status : Objects Detected";
        document.getElementById("object_found").innerHTML="Number of objects detected are : "+objects.length;

        fill("r,g,b");

        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%" , objects[i].x , objects[i].y);

        noFill();
        stroke("r,g,b");

        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        var synth = window.speechSynthesis;
          speak_data = objects[i].label;
      }
    }
}

function modelloaded()
    {
        console.log('modelloaded');

        status = true;
    }

function gotresults(error,results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);

    objects = results;
}


