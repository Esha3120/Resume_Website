function toggleChat() {
  const chatbox = document.getElementById('chatbox');
  const dot = document.getElementById('notification-dot');
  const chatlog = document.getElementById('chatlog');
  const openSound = document.getElementById('openSound');

  if (chatbox.style.display === 'none' || chatbox.style.display === '') {
    chatbox.style.display = 'flex';
    dot.style.display = 'none';
    openSound.play();

    // Add welcome message if not already present
    if (!document.querySelector('.welcome-message')) {
      showTypingIndicator();

      setTimeout(() => {
        hideTypingIndicator();

        const welcomeMessages = [
          "✨ Hello amazing visitor! Ready to explore?",
          "🎯 How can I assist you today, champ?",
          "🚀 Welcome to my portfolio! Need help?",
          "🌟 Hi there! Curious about my skills?",
          "👩‍💻 Hey! Want to see my latest projects?",
          "📚 Ready to dive into my certifications?"
        ];
        const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
        const welcomeText = welcomeMessages[randomIndex];

        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-assistant welcome-message';
        messageDiv.innerHTML = `
          <img class='chat-avatar' src='https://cdn-icons-png.flaticon.com/512/4712/4712100.png' alt='Bot'>
          <b>Assistant:</b> ${welcomeText}
        `;
        chatlog.insertBefore(messageDiv, document.getElementById('options'));

        chatlog.scrollTop = chatlog.scrollHeight;

        // Show options after welcome
        showOptions(["skills", "projects", "experience", "certifications", "resume", "contact"]);
      }, 800); // Typing delay
    }

  } else {
    chatbox.style.display = 'none';
  }
}

function sendOption(option) {
  const chatlog = document.getElementById('chatlog');
  const optionsDiv = document.getElementById('options');
  const sendSound = document.getElementById('sendSound');

  chatlog.innerHTML += `<div class='chat-user'><b>You:</b> ${formatOption(option)}</div>`;
  optionsDiv.innerHTML = "";
  chatlog.scrollTop = chatlog.scrollHeight;
  sendSound.play();

  showTypingIndicator();
  
  setTimeout(() => {
    hideTypingIndicator();
    const response = getBotResponse(option);
    const replySound = document.getElementById('replySound');
    replySound.play();
    chatlog.innerHTML += `<div class='chat-assistant'>
      <img class='chat-avatar' src='https://cdn-icons-png.flaticon.com/512/4712/4712100.png' alt='Bot'> 
      <b>Assistant:</b> ${response}
    </div>`;
    chatlog.scrollTop = chatlog.scrollHeight;
    suggestNextOptions(option);
  }, 1000);
}

function sendUserMessage() {
  const inputBox = document.getElementById('userInput');
  const userMessage = inputBox.value.trim();
  if (userMessage === "") return;

  const chatlog = document.getElementById('chatlog');
  const sendSound = document.getElementById('sendSound');
  
  chatlog.innerHTML += `<div class='chat-user'><b>You:</b> ${userMessage}</div>`;
  chatlog.scrollTop = chatlog.scrollHeight;
  inputBox.value = "";
  sendSound.play();

  showTypingIndicator();

  setTimeout(() => {
    hideTypingIndicator();
    let response = "😅 I'm still learning! Try asking about skills or projects!";
    if (userMessage.toLowerCase().includes("skills")) {
      response = "👩‍💻 Great choice! My skills include Python, Deep Learning, Machine Learning, Power BI, Tableau, and SQL.";
    } else if (userMessage.toLowerCase().includes("project")) {
      response = "🛠️ Awesome! Let me show you my top projects!";
    } else if (userMessage.toLowerCase().includes("certification")) {
      response = "📜 I have certifications from HackerRank (SQL), Scaler (Python), and Google (Mobile Web Specialist).";
    }
    const replySound = document.getElementById('replySound');
    replySound.play();
    chatlog.innerHTML += `<div class='chat-assistant'>
      <img class='chat-avatar' src='https://cdn-icons-png.flaticon.com/512/4712/4712100.png' alt='Bot'> 
      <b>Assistant:</b> ${response}
    </div>`;
    chatlog.scrollTop = chatlog.scrollHeight;

    showOptions(["skills", "projects", "experience", "certifications", "resume", "contact"]);
  }, 1000);
}

function showOptions(optionList) {
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = "";
  optionList.forEach(option => {
    const button = document.createElement("button");
    button.className = "chat-option";
    button.innerText = formatOption(option);
    button.onclick = function() { sendOption(option); };
    optionsDiv.appendChild(button);
  });
}

function suggestNextOptions(lastOption) {
  switch (lastOption) {
    case "skills":
    case "projects":
    case "experience":
      showOptions(["certifications", "resume", "contact"]);
      break;
    case "certifications":
      showOptions(["resume", "contact"]);
      break;
    case "resume":
      showOptions(["contact"]);
      break;
    case "contact":
      showOptions(["skills", "projects", "experience"]);
      break;
    default:
      showOptions(["skills", "projects", "experience", "certifications", "resume", "contact"]);
  }
}

function formatOption(option) {
  const options = {
    skills: "View Skills",
    projects: "See Projects",
    experience: "Work Experience",
    certifications: "View Certifications",
    resume: "Download Resume",
    contact: "Contact Info"
  };
  return options[option] || "Option";
}

function getBotResponse(option) {
  switch(option) {
    case "skills":
      return "👩‍💻 Here are my key skills: Python, Deep Learning, ML, Power BI, Tableau, SQL.";
    case "projects":
      return "🛠️ Check out my cool projects like White Blood Cell Classification, Store Analysis, Dashboards!";
    case "experience":
      return "🎓 I have strong practical experience in Data Science projects.";
    case "certifications":
      return "📜 Certified in SQL (Hackerrank), Python (Scaler), and Mobile Web (Google).";
    case "resume":
      return "📄 <a href='assets/Resume.pdf' target='_blank' style='color:#bd5d38;'>Download Resume</a>";
    case "contact":
      return "📬 Email: <a href='mailto:eshabodhani1@gmail.com' style='color:#bd5d38;'>eshabodhani1@gmail.com</a><br>🔗 GitHub: <a href='https://github.com/Esha3120' target='_blank' style='color:#bd5d38;'>GitHub Profile</a><br>🔗 LinkedIn: <a href='https://www.linkedin.com/in/esha-bodhani-730186287/' target='_blank' style='color:#bd5d38;'>LinkedIn Profile</a>";
    default:
      return "😅 Sorry, I'm still learning!";
  }
}

function showTypingIndicator() {
  const chatlog = document.getElementById('chatlog');
  chatlog.innerHTML += `
    <div id='typing'>
      <span style="--i:1;">•</span>
      <span style="--i:2;">•</span>
      <span style="--i:3;">•</span>
    </div>`;
  chatlog.scrollTop = chatlog.scrollHeight;
}

function hideTypingIndicator() {
  const typing = document.getElementById('typing');
  if (typing) typing.remove();
}
