

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
    let s = (Math.floor(th)>0 ? Math.floor(th)+":":"") + (Math.floor(tm)+":") + (ts)
    return s;
}

function timestamp2time(timestamp){
    let sp = timestamp.split(":").reverse();
    let th = 0;
    let tm = 0;
    let ts = 0;
    switch(sp.length-1){
        case 2:
            th = Number(sp[2])
        case 1:
            tm = Number(sp[1])
        case 0:
            ts = Number(sp[0])
            break;
        default:
    }
    let t = th*3600.0 + tm*60.0 + ts;
    return t;
}

document.querySelector("#add_button").addEventListener("click", e => {
    let t = video.currentTime;
    let timestamp = time2timestamp(t);

    let tr = document.createElement("tr");
    tr.dataset.t = t;
    
    let td1 = document.createElement("td");
    td1.innerHTML = "hoge";
    td1.setAttribute("contenteditable", "true");
    tr.appendChild(td1);
    
    let td2 = document.createElement("td");
    td2.innerHTML = time2timestamp(t);
    td2.classList.add("timestamp")
    td2.setAttribute("contenteditable", "true");
    td2.addEventListener("input", e => {
        let timestamp_input = String(td2.innerHTML);
        let timestamp_input_t = "N/A"
        try {
            timestamp_input_t = timestamp2time(timestamp_input);
        } catch (error) {
            timestamp_input_t = "N/A";
        }
        td3.parentElement.dataset.t = timestamp_input_t;
        td3.parentElement.querySelector(".time").innerHTML = timestamp_input_t;
    });
    tr.appendChild(td2);
    
    let td3 = document.createElement("td");
    td3.innerHTML = t;
    td3.setAttribute("contenteditable", "true");
    td3.classList.add("time");
    td3.addEventListener("input", e => {
        let t_input = Number(td3.innerHTML);
        let t_input_timestamp = "N/A"
        try {
            t_input_timestamp = time2timestamp(t_input);
        } catch (error) {
            t_input_timestamp = "N/A";
        }
        td3.parentElement.dataset.t = t_input;
        td3.parentElement.querySelector(".timestamp").innerHTML = t_input_timestamp;
    });
    tr.appendChild(td3);
    
    let td4 = document.createElement("td");
    tr.appendChild(td4);
    let jump_button = document.createElement("button");
    // jump_button.onclick = (t=>{return () => video.currentTime = t})(t);
    jump_button.onclick = e => {
        console.log(e.target.parentNode.parentNode.dataset.t)
        video.currentTime = Number(e.target.parentNode.parentNode.dataset.t);
    };
    jump_button.innerHTML = "Jump"
    jump_button.classList.add("jump_button");
    td4.appendChild(jump_button);
    
    document.querySelector("#chapter_table").appendChild(tr);
});

document.querySelector("#add_button").addEventListener("click", e => {
    return;
    console.log("add_button")
    let t = video.currentTime;
    let timestamp = time2timestamp(t);

    let jump_button = document.createElement("button");
    jump_button.onclick = (t=>{return () => video.currentTime = t})(t);
    jump_button.innerHTML = "Jump"
    jump_button.classList.add("jump_button");


    let tbl = $('#chapter_table').DataTable();
    tbl.row.add([
        "hoge",
        t,
        timestamp,
        jump_button
    ]).draw(false);
});


document.querySelector("#save_button").addEventListener("click", e => {
    let chapter_table = document.querySelector("#chapter_table");
    
});

$("#chapter_table").treetable({ expandable: true });

// Highlight selected row
$("#chapter_table tbody").on("mousedown", "tr", function () {
    $(".selected").not(this).removeClass("selected");
    $(this).toggleClass("selected");
});

// Drag & Drop Example Code
$("#chapter_table .file, #chapter_table .folder").draggable({
    helper: "clone",
    opacity: .75,
    refreshPositions: true,
    revert: "invalid",
    revertDuration: 300,
    scroll: true
});

$("#chapter_table .folder").each(function () {
    $(this).parents("#chapter_table tr").droppable({
        accept: ".file, .folder",
        drop: function (e, ui) {
            var droppedEl = ui.draggable.parents("tr");
            $("#chapter_table").treetable("move", droppedEl.data("ttId"), $(this).data("ttId"));
        },
        hoverClass: "accept",
        over: function (e, ui) {
            var droppedEl = ui.draggable.parents("tr");
            if (this != droppedEl[0] && !$(this).is(".expanded")) {
                $("#chapter_table").treetable("expandNode", $(this).data("ttId"));
            }
        }
    });
});
