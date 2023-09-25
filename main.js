song = "";
rightWristY = 0;
leftWristY = 0;
rightWristX = 0;
leftWristX = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(800, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(800, 500);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('Posenet is initiated');
}

function draw() {
    image(video, 0, 0, 800, 500);
    fill('#dd3300');
    stroke('#dd3300');

    if (scoreRightWrist > 0.2) {

        circle(rightWristX, rightWristY, 20);

        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        } else if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        } else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        } else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        } else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }


    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        volume = (InNumberleftWristY / 500).toFixed(2);
        console.log(volume);
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

    function gotPoses(results) {
        if (results.length > 0) {

            console.log(results);
            scoreLeftWrist = results[0].pose.keypoints[9].score;
            scoreRightWrist = results[0].pose.keypoints[10].score;
            console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);

            rightWristY = results[0].pose.rightWrist.y;
            leftWristY = results[0].pose.leftWrist.y;
            rightWristX = results[0].pose.rightWrist.x;
            leftWristX = results[0].pose.leftWrist.x;
            console.log("leftwristX = " + leftWristX + " leftwristY = " + leftWristY);
            console.log("rightwristX = " + rightWristX + " rightwristY = " + rightWristY);
        }
    }

    function play() {
        song.play();
    }

    function pause() {
        song.pause();
    }

    function stop() {
        song.stop();
    }