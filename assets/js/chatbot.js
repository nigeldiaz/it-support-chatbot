/* 
  Created by: Nigel Diaz
  Created on: July 12, 2022
  Last Updated on: July 23, 2022
*/

//declare global variables
let userName = "";
let tempName;
let tempIndex;
let askedForName = false;
let askedYesOrNoQuestion = false;
let askedToConfirmName = false;
let askedToEndChat = false;
let troubleshooting = false;
let date = new Date();
const chat = document.getElementById("chat");
const userMessageBox = document.getElementById("userMessageBox");
const btnSendMessage = document.getElementById("btnSendMessage");
const year = document.getElementById("year");
const userMessageHeaders = [];
let userMessageCount = 0;

const menu = "I can assist you with the following:\n"
  +"1) Blue/Black Computer Screen\n"
  +"2) Slow Applications\n"
  +"3) Frozen Application Window\n"
  +"4) Frozen Computer Screen\n"
  +"5) Mouse/Keyboard Stopped Working\n"
  +"6) Sound Cannot Be Heard\n"
  +"7) Application/Program Won't Open\n"
  +"8) Network Connection Issues\n"
  +"9) Too Many Notifications\n"
  +"10) Windows Update Won't Install";

const wordsToIgnore = ["ok", "alright", "all right", "sure"];

const instructionsToRunSFCScan = "Since that didn't work, I would suggest running a System File Checker scan.\n"
  +"This error could be caused by missing or corrupted system files, which can be detected and repaired "
  +"by running Windows' built-in SFC utility.\n\nTo run an SFC scan:\n"
  +"1) Type 'cmd' in the search box on the taskbar.\n"
  +"2) Open the command prompt as administrator by clicking 'Run as administrator'.\n"
  +"3) If a UAC prompt appears, click 'yes' for permission. In some cases, you might have to enter the admin password.\n"
  +"4) Next, you will run a DISM command by typing 'DISM /Online /Cleanup-Image /RestoreHealth' "
  +"in the command prompt window and then pressing enter.\n"
  +"5) After the scanning process is 100% complete, run the 'sfc /scannow' command. "
  +"This will start scanning your system for corrupted files and automatically replaces them with correct ones if any.\n"
  +"6) Restart your computer to apply changes once the scanning process completes to 100%.";

const menuOptions = [
  ["1", "black screen", "blue screen", "blank screen", "screen is black", "screen is blue", "screen is blank", 
  "black computer screen", "blue computer screen", "blank computer screen"],
  ["2", "slow app", "application is slow", "application is running slowly", "application is taking too long"],
  ["3", "frozen app", "application froze", "application is frozen", "application is stuck", "cannot close app", 
  "application would not close", "application will not close", "cannot close window", "window would not close", 
  "window will not close", "frozen window", "window is frozen", "unresponsive app", "application is unresponsive"], 
  ["4", "frozen computer", "computer froze", "frozen screen", "screen froze", "computer is frozen", "screen is frozen", 
  "unresponsive computer", "unresponsive screen", "computer is unresponsive", "screen is unresponsive", 
  "cannot click on the screen"],
  ["5", "mouse stopped working", "mouse does not work", "keyboard stopped working", "keyboard does not work", 
  "mouse will not work", "mouse would not work", "keyboard will not work", "keyboard would not work", 
  "mouse/keyboard stopped working"], 
  ["6", "cannot hear sound", "cannot hear any sound", "cannnot hear the sound", "no sound", "speakers stopped working",
  "speakers are not working", "speakers do not work", "speakers would not work", "speakers will not work", 
  "issue with speakers", "issue with sound", "sound cannot be heard"], 
  ["7", "program will not open", "application will not open", "program is not opening", "application is not opening", 
  "program is not running", "application is not running", "program will not run", "application will not run", 
  "program would not run", "application would not run", "program would not open", "application would not open"],
  ["8", "network connection issues", "issue connecting to network", "problem connecting to network", "issue with network", 
  "problem with network", "internet connection issues", "wifi connection issues", "internet issues", "wifi issues", 
  "issue connecting to wifi", "issue connecting to the internet", "problem connecting to wifi", "issue with wifi",
  "problem connecting to the internet", "issue with the internet", "problem with the internet", "problem with wifi", 
  "cannot connect to the internet", "cannot connect to network", "cannot connect to wifi"],
  ["9", "too many notifications", "so many notifications", "annoying notifications", "notifications are annoying", 
  "distracting notifications", "notifications are distracting", "turn off notifications", "switch off notifications", 
  "disable notifications"],
  ["ten", "update will not install", "update is stuck downloading", "update keeps downloading", "update would not install", 
  "trouble updating windows", "issue updating windows", "problem updating windows", "windows will not update", 
  "windows would not update"],
  wordsToIgnore
];

const instructionsFromChatbot = [
  ["It seems that your system crashed most likely due to issues with the hardware or one of the drivers.\n"
  +"This usually occurs when new drivers or new hardware components are installed.", 
  "Let's try rebooting or restarting your computer, which usually solves this issue.\n\n"
  +"To reboot your PC:\n1) Press the power button for 10 seconds to force shutdown your computer.\n"
  +"2) Then press the power button again to restart your computer.", 
  "alt", "An external issue may be causing this.\nDo you have any external hardware connected to your computer, "
  +"such as USB flash driver, external HDD or newly installed device such as a printer or scanner?", 
  "If so, please disconnect any unnecessary hardware and check if the problem goes away.", "alt", instructionsToRunSFCScan, "contd"],
  ["Try to close and reopen the application.", "alt", "Let's try to update the application.\n\n"
  +"To do this:\n1) Open your application\n2) Click the Help menu within the application window\n"+
  "3) Then look for an option to 'Check for Updates' and click it.\n\n"
  +"Note: If you don't find this option, another idea is to run an online search for application updates.", "contd"], 
  ["What I would recommend you to do is to force quit the application, which usually helps with this issue.\n\n"+ 
  "To force quit the application:\n1) Open the Task Manager by pressing and holding Ctrl+Alt+Delete "
  +"(the Control, Alt, and Delete keys) on your keyboard, and then select 'Task Manager'.\n"
  +"2) After, select the unresponsive application and click 'End task' to close it.", "alt", 
  "In this case, restart the computer so that all open apps would be closed.", "contd"],
  ["To fix a frozen computer screen, restart Windows Explorer.\n\nTo do this:\n1) Open the Task Manager by "
  +"pressing and holding Ctrl+Alt+Delete (the Control, Alt, and Delete keys) on your keyboard, "
  +"and then select 'Task Manager'.\n"+"2) Next, locate and select Windows Explorer from the Processes tab and click Restart.\n\n"
  +"Note: If you're using Windows 8, you may need to click More Details at the bottom of the window to see the Processes tab.", 
  "alt", "Press and hold the Power button for 5-10 seconds. This will force the computer to shut down.\n"+
  "When you open your computer, everything should be back to normal.", "alt", instructionsToRunSFCScan, "alt", "If the computer "
  +"won't shut down, you can unplug the power cable from the electrical outlet.\nIf you're using a laptop, you may be able to remove "
  +"the battery to force the computer to turn off.\n\n"
  +"Note: This solution should be your last resort after trying the other suggestions above.", "contd"],
  ["If you're using a wired mouse or keyboard, make sure it's correctly plugged in to the computer.\n"
  +"If you're using a wireless mouse or keyboard, make sure it is turned on and that its batteries are charged.", "contd"],
  ["Check the volume level. Click the audio button in the bottom-right corner of the screen to make sure "
  +"the sound is turned on and the volume is up.", "alt", "If you're watching a video or listening to music or a podcast, "
  +"check the media/audio player controls to make sure the sound is turned on and the volume is up.\n"
  +"Many audio and video players will have their own separate audio controls.", "alt", 
  "Check the cables. Make sure external speakers are plugged in, turned on, and connected to the correct audio port or a USB port.\n"
  +"If your computer has color-coded ports, the audio output port will usually be green.", "alt", 
  "Connect headphones to the computer to determine if you can hear sound from the headphones.", "contd"], 
  ["If the problem is with a Windows 10 app downloaded from the Microsoft Store, "
  +"then please ensure that it's updated so that it would operate properly.\n\nTo do this:\n"
  +"1) Open the Microsoft Store app. You can do this by pressing and holding the Windows key + S and type store to open it.\n"
  +"2) Find and click 'Library' in Microsoft Store, which will open a list of your installed applications.\n"
  +"3) Click on 'Get Updates' to check for updates and update any applications with available updates.", 
  "alt", "If updating your apps did not work, make sure Windows OS is up-to-date.\n\nTo do this:\n"
  +"1) Open Settings\n2) Go to 'Update & Security'\n3) Go to 'Windows Update' and click 'Check for updates'\n"
  +"4) Click 'Restart now' if prompted to finish installing the update.\n\n"
  +"Note: If no update is available, you will see a message that tells you Windows is up to date.", "alt", 
  "Restart your system if you haven't yet already.", "alt", instructionsToRunSFCScan, "contd"],
  ["I would recommend you to restart your modem and router.\n\nTo do this:\n"
  +"1) Press and hold the power button on your router for 30 seconds.\n"
  +"2) When it turns off completely, unplug all the cables and wait for at least 30 seconds.\n"
  +"3) Reconnect the power cord and the ethernet cables. Boot the router and modem.\n"
  +"4) Try to connect your device to the internet. If there's still an issue, it's likely an issue with your equipment or your ISP.", 
  "alt", "Let's try forgetting your Wi-Fi network, which would remove the Wi-Fi network profile from your PC.\n\n"
  +"To forget your network:\n1) Select the Wi-Fi network icon on the right side of the taskbar.\n"
  +"2) Click the 'Network and Internet settings'.\n3) Select 'Wi-Fi', then select 'manage know networks'.\n"
  +"4) Select the network you want to forget and then select 'Forget'.\n"
  +"5) Afterwards, select the Wi-Fi icon on the taskbar and try to reconnect it.", "contd"],
  ["I see that you want to turn off notifications.\n\nTo disable notifications:\n"
  +"1) Go to the Start menu and choose Settings\n2) Click on 'System', then choose 'Notifications & actions'\n"
  +"3) You can use the toggle switches to control how and when notifications appear, or if they appear at all.\n"
  +"As well as controlling system level notifications, you can set them on a per-app basis.", "contd"],
  ["Errors in downloading or installation may be caused by many updates getting pushed altogether.\n"
  +"The Windows Auto Update File most likely got corrupted.", "To fix this issue:\n"
  +"1) Press Win + R to open Run.\n2) Type 'C:\\Windows\\SoftwareDistribution\\Download' and then select OK.\n"
  +"3) Delete all the files contained in the folder, but not the folder itself.\n4) Restart your PC.\n\n"
  +"Note: If some files don't get deleted, just boot into safe mode and start the process.", "contd"],
  []
];

const userReplies = [
  ["thank you", "thanks", "i am thankful", "i am grateful", "i appreciate", "much appreciated", "much obliged"], 
  ["how are you", "how is life", "how are things", "how have you been", "how is it going", "how is everything"], 
  ["what is up", "what is new", "what is cooking", "what is happening", "what is going on", "what are you doing"], 
  ["sorry", "i apologize", "my apologies", "my mistake", "my bad", "oops", "whoops"], 
  ["give me a moment", "just a moment", "wait a moment", "hold on a moment", "hang on a moment", "bear with me", 
  "wait", "hold on", "hang on", "let me think", "let me see", "let me try", "be right back", "i will get back to you", 
  "i will check", "i will do", "i will try", "i will see", "will do"],
  ["i am disappointed", "i am frustrated", "i am stressed", "disappointing", "frustrating", "not helpful", "did not help", 
  "stressful", "i deserve better", "bad customer service", "terrible customer service", "awful customer service", 
  "you are useless", "i hate you", "customer service is bad", "customer service is terrible", "customer service is awful",
  "i dislike you", "i do not like you"],
  ["hi", "hello", "hey", "howdy"],
  ["bye", "goodbye", "take care", "laters", "see ya", "end chat", "end conversation", "leave chat", "leave conversation"],
  ["are you there", "are you still there", "are you here", "are you still here", "are you with me", "are you still with me", 
  "still there", "still here", "still with me"],
  ["who are you", "who do you think you are", "what is your name", "who is this", "who am i chatting"],
  ["you are useful", "you were useful", "you are helpful", "you were helpful", "you just made my day", "you made my day", 
  "i love you", "i like you", "you are the best", "you are amazing", "what a relief", "i could not have done it without you", 
  "what would i do without you", "i do not know what i would do without you", "you are doing great", "you did great", 
  "problem solved"],
  ["live agent", "live human agent", "human agent", "live chat"],
  ["menu", "how can you help", "what can you solve", "what can you do", "how can you assist"], 
  wordsToIgnore
];

const chatbotReplies = [
  ["You're welcome!", "You're very welcome!", "No problem!", "Not a problem!", "No worries!", "It was my pleasure.", 
  "Happy to help!", "Glad to help!", "Glad that I could be of assistance."], 
  ["Thanks for asking. I'm doing well.", "I'm good. Thanks for asking.", "I'm fine. How about you?", "I'm doing okay.", 
  "I am high-quality.", "Not too bad. How about you?", "Very well, thanks.", "So far, so good!"], 
  ["Nothing much.", "Not much."], 
  ["It's okay.", "That's okay.", "It's alright.", "It's fine.", "Nothing to worry about.", "Don't worry about it."], 
  ["Sure! Take as much time as you need.", "No problem. Take all the time you need.", "Alright, take your time.", 
  "Ok, it's no rush.", "Okay, there's no need to hurry."], 
  ["I'm so sorry to hear that.", "I'm truly sorry, and I'm going to do my very best to help you.", 
  "I would like to sincerely apologize for the inconvenience."], 
  ["Hi!", "Hello!", "Yes?"],
  ["Bye.", "Goodbye.", "Take care.", "Have a good one!"], 
  ["Yeah, I'm still here.", "Yes, I am still with you.", "Of course! We're still connected."],
  ["That's irrelevant.", "I am your IT Support chatbot, at your service!"],
  [":)", ";)", "I'm glad to hear that!", "Happy to know!", "That's great! Thanks.", "Don't mention it."],
  ["I would like to connect you with a live agent, but none are available as of now.\nPlease try again later.", 
  "I'm truly sorry.\nThere are no live agents online at the moment.", 
  "Our live agents are not available right now.\nSorry for the inconvenience this may cause you."],
  [menu],
  [],
  ["Please let me know if it worked for you once you've tried it.", "Did it work for you? Please let me know once you've tried it.", 
  "Once you've tried it, please let me know if it fixed the issue.", "Was this helpful? Please let me know after you've tried it.", 
  "Please let me know if this was helpful for you after trying it.", "Did this solve this issue? Please let me know after you've tried it."],
  ["I did not get that.", "Sorry, I don't understand.", "I'm sorry, I didn't catch that.", 
  "I'm having trouble understanding.", "Can you please rephrase that? I understand simple sentences best!"],
  ["I can definitely help you with that!", "I would be happy to help you with that!", "I see.", 
  "I believe I can assist you with this issue."],
  ["I'm glad that's fixed!", "Great! Problem solved!", "I'm happy we solved this together!", 
  "It's great that everything's working fine again!"]
];

//set event listeners
function setDefaultEventListeners() {
  btnSendMessage.onclick = sendUserMessage;
  userMessageBox.addEventListener("keypress", function(event) {
    if(event.key === "Enter"){
      event.preventDefault();
      if(askedForName) {
        setUserName();
      }
      else if(askedYesOrNoQuestion || troubleshooting) {
        getUserReply();
      }
      else {
        sendUserMessage();
      }      
    }
  });
}
//displays message in chat
function displayMessage(message, isUser) {
    const div = document.createElement("div");
    const table = document.createElement("table");
    const tableRow = document.createElement("tr");
    const tableData1 = document.createElement("td");
    const tableData2 = document.createElement("td");
    const image = document.createElement("img");
    const p = document.createElement("p");
    const em1 = document.createElement("em");
    const em2 = document.createElement("em");

    let messageDate = new Date();
    let currentTime = document.createTextNode(messageDate.getHours()+":"+messageDate.getMinutes()+":"+messageDate.getSeconds());
    image.setAttribute("src", "assets/img/profile-pic.jpg");     
    
    if(isUser) {
      div.setAttribute("id", "userMessage");
      tableData1.setAttribute("id", "message");
      tableData2.setAttribute("id", "userProfilePic");
      userMessageCount++;
      em2.setAttribute("id", "userName"+userMessageCount);
      userMessageHeaders.push("userName"+userMessageCount);

      const text = document.createTextNode(message);

      if(userName !== ""){
        const name = document.createTextNode(" | "+userName);
        em2.appendChild(name);
      }
      else {
        const name = document.createTextNode(" | User");
        em2.appendChild(name);
      }

      em1.appendChild(currentTime);
      em1.appendChild(em2);
      p.appendChild(em1);
      p.appendChild(document.createElement("br"));
      p.appendChild(text);
      tableData1.appendChild(p);
      tableData2.appendChild(image);
    }
    else {
      div.setAttribute("id", "chatbotMessage");
      tableData1.setAttribute("id", "userProfilePic");
      tableData2.setAttribute("id", "message");

      const name = document.createTextNode("Chatbot | ");

      em1.appendChild(name);
      em1.appendChild(currentTime);
      p.appendChild(em1);
      p.appendChild(document.createElement("br"));

      if(message.includes("\n")) {
        const splitMessage = message.split("\n");

        for (var part = 0; part < splitMessage.length; part++) {
          const text = document.createTextNode(splitMessage[part]);
          p.appendChild(text);
          p.appendChild(document.createElement("br"));
        }
      }
      else {
        const text = document.createTextNode(message);
        p.appendChild(text);
      }
      
      tableData1.appendChild(image);
      tableData2.appendChild(p);  
    }  

    tableRow.appendChild(tableData1);
    tableRow.appendChild(tableData2);
    table.appendChild(tableRow);
    div.appendChild(table);
    chat.appendChild(div);      

    chat.scrollTop = chat.scrollHeight;
}
//sends user's message
function sendUserMessage() {
  if(userMessageBox.value !== "" && userMessageBox.value.trim().length > 0) {
    displayMessage(userMessageBox.value, true);
    userMessageBox.value = "";
  }
}
//chat starts with chatbot welcoming user
function startChat() {
  let greeting;
  if(date.getHours() < 12) {
    greeting = "Good Morning.";
  }
  else if (date.getHours() >= 12 && date.getHours() < 18) {
    greeting = "Good Afternoon.";
  }
  else if (date.getHours() >= 18 && date.getHours() < 21){
    greeting = "Good Evening.";
  }
  else {
    greeting = "Hi there.";
  }

  setTimeout(function(){
    displayMessage(greeting+"\nWelcome to the IT Support chat!\nI would be happy to help you with any "+
    "questions or technical issues you may have regarding your Windows system."
    +"\nBut first, I will ask you a few questions.", false);  
  }, 500);
  getUserName();
}
//ask user for their name
function getUserName() {
  displayMessageWithTimeout("What is your first name?");
  btnSendMessage.onclick = setUserName;
  askedForName = true;
}
//sets the user's username if name is correct and in correct format
function setUserName() {
  if (userMessageBox.value !== "" && userMessageBox.value.trim().length > 0) {
    if (!userMessageBox.value.includes(" ")) {   
      askedForName = false; 
      tempName = userMessageBox.value;
      sendUserMessage(); 
      displayMessageWithTimeout("Your name is "+tempName+".\nIs that correct?");
      btnSendMessage.onclick = getUserReply;
      askedYesOrNoQuestion = true;    
      askedToConfirmName = true;
    }  
    else {
      sendUserMessage();     
      displayMessageWithTimeout("Please only enter your first name.");
      getUserName();
    }
  }  
}
//displays and handles user's message
function getUserReply() {
  let reply = userMessageBox.value;

  if (reply !== "" && reply.trim().length > 0) {
    reply = simplifyMessage(reply);
    sendUserMessage();
    let chatbotReplied = false;

    for (var userReplyList = 0; userReplyList < userReplies.length; userReplyList++) {
      for (var userReply = 0; userReply < userReplies[userReplyList].length; userReply++) {
        if(reply.includes(userReplies[userReplyList][userReply])) {
          displayMessageWithTimeout(chatbotReplies[userReplyList][Math.floor(Math.random() * chatbotReplies[userReplyList].length)]);
          chatbotReplied = true;

          if (userReplies[userReplyList] === userReplies[userReplies.length-7]) {
            displayMessageWithTimeout("Are you sure you want to end the chat?");
            askedYesOrNoQuestion = true;
            troubleshooting = false;
            askedToEndChat = true;
          }

          break;
        }
      }
    }

    if (askedYesOrNoQuestion) {
      if (reply.includes("yes") || reply.includes("yeah") || reply.includes("yep") || reply.includes("yup") ||
        reply.includes("right") && !reply.includes("not") && !reply.includes("alright") && !reply.includes("all right") || 
        reply.includes("correct") && !reply.includes("not") && !reply.includes("incorrect") || 
        reply.includes("work") && !reply.includes("not") || reply.includes("fix") && !reply.includes("not") || 
        reply.includes("help") && !reply.includes("not") || reply.includes("solve") && !reply.includes("not")) {
        askedYesOrNoQuestion = false;
        if(askedToConfirmName) {
          askedToConfirmName = false;
          btnSendMessage.onclick = sendUserMessage;
          userName = tempName;
          for (var header = 0; header < userMessageHeaders.length; header++) {
            let name = document.getElementById(userMessageHeaders[header]);
            name.innerHTML = " | "+userName;
          }
          displayMessageWithTimeout("How may I help you, "+userName+"?");
          btnSendMessage.onclick = getUserReply;
          troubleshooting = true;
        }
        else if (troubleshooting) {
          tempIndex[1] = instructionsFromChatbot[tempIndex[0]].indexOf("contd")+1; 
          displayMessageWithTimeout(chatbotReplies[chatbotReplies.length-1][Math.floor(Math.random() * chatbotReplies[chatbotReplies.length-1].length)]);
          displayMessageWithTimeout("Is there anything else I can help you with today?");
          continueChat();
        }
        else if (askedToEndChat) {
          userMessageBox.disabled = true;
          btnSendMessage.disabled = true;
        }
      }
      else if (reply.includes("no") || reply.includes("not") || reply.includes("nope") || reply.includes("mistake") ||
        reply.includes("incorrect") || reply.includes("wrong") || reply.includes("nothing") || reply.includes("fail")){
        askedYesOrNoQuestion = false;
        sendUserMessage();
        if(askedToConfirmName) {
          getUserName();
        }
        else if (troubleshooting) {
          if (instructionsFromChatbot[tempIndex[0]].includes("alt")) {
            tempIndex[1] = instructionsFromChatbot[tempIndex[0]].indexOf("alt")+1;
            instructionsFromChatbot[tempIndex[0]][tempIndex[1]-1] = "";
          }
          else {
            displayMessageWithTimeout("I'm very sorry that I could not help you solve your issue, "+userName+"."
            +"\n\nHere's a list of external websites you can visit for technical support:\n"
            +"1) Bleeping Computer Forums - https://www.bleepingcomputer.com/forums/\n"
            +"2) Computer Hope Forums - https://www.computerhope.com/forum/\n"
            +"3) Linux.com - https://forum.linuxfoundation.org/\n"
            +"4) Apple Support Community - https://discussions.apple.com/welcome\n"
            +"5) Microsoft Community - https://answers.microsoft.com/en-us\n\n"
            +"You can go to these sites by manually visiting them via search engine or "
            +"by copying the corresponding link and pasting it on your browser.");
            tempIndex[1] = instructionsFromChatbot[tempIndex[0]].indexOf("contd")+1;
          }          
          continueChat();
        }
        else if (askedToEndChat) {
          troubleshooting = true;
          askedToEndChat = false;
          askedYesOrNoQuestion = false;
        }
      }
      else if(!chatbotReplied) {
        sendUserMessage();
        if(askedToConfirmName) {
          displayMessageWithTimeout(chatbotReplies[chatbotReplies.length-3][Math.floor(Math.random() * chatbotReplies[chatbotReplies.length-3].length)]
            +"\nPlease answer with a 'yes' or 'no'."); 
        }
        else if (troubleshooting) {
          displayMessageWithTimeout(chatbotReplies[chatbotReplies.length-3][Math.floor(Math.random() * chatbotReplies[chatbotReplies.length-3].length)]
            +"\nPlease reply with 'it worked' or 'it didn't work'."); 
        }   
      }
    } 
    else if(troubleshooting) {
      let chatbotCanHelp = false;
      for(var menuOptionsList = 0; menuOptionsList < menuOptions.length; menuOptionsList++) {
        for(var option = 0; option < menuOptions[menuOptionsList].length; option++) {
          if (reply.includes(menuOptions[menuOptionsList][option]) && menuOptions[menuOptionsList] !== menuOptions[menuOptions.length-1]) {
            displayMessageWithTimeout(chatbotReplies[chatbotReplies.length-2][Math.floor(Math.random() * chatbotReplies[chatbotReplies.length-2].length)]);
            tempIndex = [menuOptionsList, 0];
            chatbotCanHelp = true;
            continueChat();
          }
        } 
      }
      if (!chatbotCanHelp && !chatbotReplied) {
        displayMessageWithTimeout(chatbotReplies[chatbotReplies.length-3][Math.floor(Math.random() * chatbotReplies[chatbotReplies.length-3].length)]+"\n\n"+menu);
      }
    }
  }  
}
//simplifies user's message to make it easy to understand
function simplifyMessage(message) {
  message = message.toLowerCase();
  return message
  .replace(/i'm/g, "i am")
  .replace(/i'll/g, "i will")
  .replace(/what's/g, "what is")
  .replace(/whatcha/g, "what are you")
  .replace(/sup/g, "what is up?")
  .replace(/who're/g, "who are")
  .replace(/who r u/g, "who are you")
  .replace(/how's/g, "how is")
  .replace(/how've/g, "how have")
  .replace(/how r u/g, "how are you")
  .replace(/how are u/g, "how are you")
  .replace(/are u/g, "are you")
  .replace(/wasn't/g, "was not")
  .replace(/don't/g, "do not")
  .replace(/doesn't/g, "does not")
  .replace(/didn't/g, "did not")
  .replace(/won't/g, "will not")
  .replace(/aren't/g, "are not")
  .replace(/wouldn't/g, "would not")
  .replace(/couldn't/g, "could not")
  .replace(/can't/g, "cannot")
  .replace(/ can not /g, " cannot ")
  .replace(/hasn't/g, "has not")
  .replace(/think u r/g, "think you are")
  .replace(/do u think/g, "do you think")
  .replace(/you're/g, "you are")
  .replace(/ur /g, "you are")
  .replace(/bare with me/g, "bear with me")
  .replace(/love u/g, "i love you")
  .replace(/love you/g, "i love you")
  .replace(/thank u/g, "thank you")
  .replace(/thankyou/g, "thank you")
  .replace(/thx/g, "thanks")
  .replace(/tks/g, "thanks")
  .replace(/sry/g, "sorry")
  .replace(/srry/g, "sorry")
  .replace(/brb/g, "be right back")
  .replace(/give me a sec/g, "give me a moment")
  .replace(/give me a min/g, "give me a moment")
  .replace(/hold on a sec/g, "hold on a moment")
  .replace(/hold on a min/g, "hold on a moment")
  .replace(/hang on a sec/g, "hang on a moment")
  .replace(/hang on a min/g, "hang on a moment")
  .replace(/just a sec/g, "just a moment")
  .replace(/just a min/g, "just a moment")
  .replace(/wait a sec/g, "wait a moment")
  .replace(/wait a min/g, "wait a moment")
  .replace(/app /g, "application ")
  .replace(/has been/g, "is")
  .replace(/ has /g, " ")
  .replace(/was/g, "is")
  .replace(/not responsive/g, "unresponsive")
  .replace(/freezed/g, "froze")
  .replace(/functioning/g, "working")
  .replace(/ function /g, " work")
  .replace(/wi-fi/g, "wifi")
  .replace(/notifs/g, "notifications")
  .replace(/10/g, "ten")
  .replace(/ very /g, " ")
  .replace(/ so /g, " ")
  .replace(/ really /g, " ")
  .replace(/ beyond /g, " ")
  .replace(/ being /g, " ")
  .replace(/ please /g, " ")
  .replace(/please/g, "")
  .replace(/ pls /g, " ")
  .replace(/pls/g, "")
  .replace(/ for /g, " ");
}
//displays chatbot's message with 1 second delay
function displayMessageWithTimeout(message) {
  setTimeout(function(){
    displayMessage(message, false);
  }, 1000);
}
//continues chat after user replies
function continueChat() {
  for(var chatbotReply = tempIndex[1]; chatbotReply < instructionsFromChatbot[tempIndex[0]].length; chatbotReply++) {
    if (instructionsFromChatbot[tempIndex[0]][chatbotReply] !== "" && 
      instructionsFromChatbot[tempIndex[0]][chatbotReply] !== "alt" && 
      instructionsFromChatbot[tempIndex[0]][chatbotReply] !== "contd" && !askedYesOrNoQuestion) {
      displayMessageWithTimeout(instructionsFromChatbot[tempIndex[0]][chatbotReply]);
    }
    else {
      tempIndex = [tempIndex[0], chatbotReply+1];
      askedYesOrNoQuestion = true;
      displayMessageWithTimeout(chatbotReplies[chatbotReplies.length-4][Math.floor(Math.random() * chatbotReplies[chatbotReplies.length-4].length)]);
      break;
    }
  }
}

//set up page
year.innerHTML = date.getFullYear();
setDefaultEventListeners();
startChat();
