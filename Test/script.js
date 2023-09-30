let activeUser = "Tous";
let userCount = 1;

function switchUser(user) {
    activeUser = user;
    let userTabs = document.querySelectorAll(".user-tabs li");
    userTabs.forEach(function(tab) {
        tab.classList.remove("active");
    });
    document.querySelector(".user-tabs li[data-user='" + user + "']").classList.add("active");

    userTabs.forEach(function(tab) {
        tab.classList.remove("active-user-button");
    });

    document.querySelector(".user-tabs li[data-user='" + user + "']").classList.add("active-user-button");

}

function createNewTab(user) {
    let userTabsList = document.getElementById("user-tabs-list");
    let newTab = document.createElement("li");
    newTab.innerText = "Utilisateur " + userCount;
    newTab.setAttribute("data-user", "user" + userCount);
    newTab.onclick = function() {
        switchUser("user" + userCount);
    };
    userTabsList.appendChild(newTab);
    userCount++;
}

function sendMessage() {
    let messageInput = document.getElementById("message-input");
    let message = messageInput.value;

    if (message.trim() !== "") {
        let chatMessages = document.getElementById("chat-messages");
        let messageElement = document.createElement("div");
        messageElement.innerText = "[" + activeUser + "] " + message;
        chatMessages.appendChild(messageElement);

        messageInput.value = "";
    }
}
