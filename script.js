let chats = {};
let current = null;
let count = 1;

// Create Chat
$("#newChat").click(function(){
    let name = "Chat " + count++;
    chats[name] = [];
    current = name;

    $("#history").append(`<li>${name}</li>`);
    load(name);
});

// Load Chat
function load(name){
    current = name;
    $("#messages").html("");

    if(chats[name].length === 0){
        $("#welcome").show();
    } else {
        $("#welcome").hide();
    }

    chats[name].forEach(m => addUI(m));
}

// Add Message
function addMessage(text, sender){
    let time = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    let msg = {text, sender, time};
    chats[current].push(msg);
    addUI(msg);
}

// UI Message
function addUI(msg){
    let html = `
    <div class="msg ${msg.sender}">
        ${msg.sender === "bot" ? '<div class="avatar"></div>' : ''}
        <div class="msg-content">
            ${msg.text}
            <div class="time">${msg.time}</div>
        </div>
    </div>`;

    $("#messages").append(html);
    $("#chatArea").scrollTop($("#chatArea")[0].scrollHeight);
}

// Send Message
$("#send").click(sendMessage);

$("#input").on("input", function(){
    $("#send").prop("disabled", !this.value.trim());

    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
});

$("#input").keypress(function(e){
    if(e.key === "Enter" && !e.shiftKey){
        e.preventDefault();
        sendMessage();
    }
});

function sendMessage(){
    let msg = $("#input").val().trim();
    if(!msg) return;

    $("#welcome").hide();
    addMessage(msg, "user");

    $("#input").val("").height("auto");
    $("#send").prop("disabled", true);

    $("#typing").show();

    setTimeout(()=>{
        $("#typing").hide();

        let replies = [
            "Nice ",
            "Got it ",
            "Cool ",
            "Understood "
        ];

        let reply = replies[Math.floor(Math.random()*replies.length)];
        addMessage(reply, "bot");

    }, 1200);
}

// Click chat history
$(document).on("click", "#history li", function(){
    load($(this).text());
});

// Init
$("#newChat").click();