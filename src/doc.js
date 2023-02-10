

let left_frame = document.querySelector("#left_frame");

left_frame.addEventListener("mouseover", e => {

});


let dragbox = document.querySelector(".dragbox");
console.log(dragbox)

var dragging = false;


dragbox.addEventListener("mousedown", e => {
    console.log("mousedown")
    e.preventDefault();
    dragging = true;
});

window.addEventListener("mousemove", e => {
    console.log("mousemove")
    if (dragging) {
        console.log(e.clientX)
        left_frame.style.width = e.clientX + "px"
    }
});

window.addEventListener("mouseup", e => {
    dragging = false;
})

var video_hidden = false;
document.querySelector("#hide_video").addEventListener("click", e => {
    document.querySelector("#right_frame").style.display = "hidden";
    video_hidden = true;
});
dragbox.addEventListener("dblclick", e => {
    console.log("dblclick")
    e.preventDefault();
    video_hidden = !video_hidden;
    if(video_hidden){
        document.querySelector("#left_frame").style.width= "100%";
    }
    else{
        document.querySelector("#right_frame").style.display = "block";
    }
});

setInterval(() => {
    let now = new Date()
    document.querySelector("#date_now").innerHTML = now;
}, 950);

var video = document.querySelector("video");

video.addEventListener("timeupdate", e => {
    // document.querySelector("#video_current_time").innerHTML = `(${video.currentTime})`;
    
    let t = video.currentTime;
    let th = t / 3600.0;
    let tm = (t - Math.floor(th)*3600.0) / 60.0;
    let ts = (t - Math.floor(th)*3600.0 - Math.floor(tm)*60.0)
    ts = Math.floor(ts);
    let hh = video.currentTime
    let s = (th>0 ? Math.floor(th)+":":"") + (Math.floor(tm)+":") + (ts)
    document.querySelector("#video_current_time_hhmmss").innerHTML = s;

    
})

function time2timestamp(t){
    let th = t / 3600.0;
    let tm = (t - Math.floor(th)*3600.0) / 60.0;
    let ts = (t - Math.floor(th)*3600.0 - Math.floor(tm)*60.0)
    ts = Math.floor(ts);
    let hh = video.currentTime
    let s = (th>0 ? Math.floor(th)+":":"") + (Math.floor(tm)+":") + (ts)
    return s;
}

document.querySelector("#add_button").addEventListener("click", e => {
    let t = video.currentTime;
    let timestamp = time2timestamp(t);

    let tr = document.createElement("tr");
    
    let td1 = document.createElement("td");
    td1.innerHTML = "hoge";
    tr.appendChild(td1);
    
    let td2 = document.createElement("td");
    td2.innerHTML = time2timestamp(t);
    tr.appendChild(td2);
    
    let td3 = document.createElement("td");
    td3.innerHTML = t;
    tr.appendChild(td3);
    
    let td4 = document.createElement("td");
    tr.appendChild(td4);
    let jump_button = document.createElement("button");
    jump_button.onclick = (t=>{return () => video.currentTime = t})(t);
    jump_button.innerHTML = "Jump"
    jump_button.classList.add("jump_button");
    td4.appendChild(jump_button);
    
    document.querySelector("#chapter_table").appendChild(tr);
});

$("#example-advanced").treetable({ expandable: true });

// Highlight selected row
$("#example-advanced tbody").on("mousedown", "tr", function () {
    $(".selected").not(this).removeClass("selected");
    $(this).toggleClass("selected");
});

// Drag & Drop Example Code
$("#example-advanced .file, #example-advanced .folder").draggable({
    helper: "clone",
    opacity: .75,
    refreshPositions: true,
    revert: "invalid",
    revertDuration: 300,
    scroll: true
});

$("#example-advanced .folder").each(function () {
    $(this).parents("#example-advanced tr").droppable({
        accept: ".file, .folder",
        drop: function (e, ui) {
            var droppedEl = ui.draggable.parents("tr");
            $("#example-advanced").treetable("move", droppedEl.data("ttId"), $(this).data("ttId"));
        },
        hoverClass: "accept",
        over: function (e, ui) {
            var droppedEl = ui.draggable.parents("tr");
            if (this != droppedEl[0] && !$(this).is(".expanded")) {
                $("#example-advanced").treetable("expandNode", $(this).data("ttId"));
            }
        }
    });
});
