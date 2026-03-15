// Session tracking variables (matching Python code)
let session_active = true;
let query_count = 0;
let resolved_count = 0;
let escalated_count = 0;

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const queryCountEl = document.getElementById('queryCount');
const resolvedCountEl = document.getElementById('resolvedCount');
const escalatedCountEl = document.getElementById('escalatedCount');
const resolutionRateEl = document.getElementById('resolutionRate');

// Initialize chat
function initChat() {
    updateStats();
}

// Handle key press (Enter key)
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Send message function (matching Python logic)
function sendMessage() {
    const user_input = userInput.value.trim();
    if (user_input === '') {
        addBotMessage("Bot: Please type your question.");
        return;
    }
    
    // Add user message
    addUserMessage(user_input);
    
    // Clear input
    userInput.value = '';
    
    // Process the message
    setTimeout(() => {
        processQuery(user_input);
    }, 500);
}

// Send quick query
function sendQuickQuery(query) {
    userInput.value = query;
    sendMessage();
}

// Process user query (exact logic from Python code)
function processQuery(user_input) {
    // Convert to lowercase for matching
    const input = user_input.toLowerCase().trim();
    
    // Check for exit
    if (input === "exit" || input === "quit" || input === "bye") {
        // Show session summary
        const summary = `\nSESSION SUMMARY\n` +
                       `Total queries: ${query_count}\n` +
                       `Auto-resolved: ${resolved_count}\n` +
                       `Escalated: ${escalated_count}\n` +
                       `\nThank you. Goodbye!`;
        
        addBotMessage(summary);
        
        // Disable input after 2 seconds
        setTimeout(() => {
            userInput.disabled = true;
            document.querySelector('.send-btn').disabled = true;
        }, 2000);
        return;
    }
    
    // Track query
    query_count++;
    let matched = false;
    let response = "";
    
    // ===== PATTERN MATCHING RULES =====
    
    // 1. PASSWORD RESET RULE
    if ((input.includes("password") || input.includes("login") || input.includes("log in")) && 
        (input.includes("reset") || input.includes("forgot") || input.includes("change") || input.includes("issues") || input.includes("can't"))) {
        
        matched = true;
        resolved_count++;
        
        response = `PASSWORD RESET STEPS:\n\n` +
                  `1. Go to https://password.company.com\n` +
                  `2. Click 'Forgot Password'\n` +
                  `3. Enter your employee ID\n` +
                  `4. Check SMS/Email for verification code\n` +
                  `5. Create new password (minimum 8 characters)\n\n` +
                  `Password reset usually takes 2-3 minutes`;
    }
    
    // 2. NETWORK ISSUES RULE
    else if ((input.includes("wifi") || input.includes("internet") || input.includes("network")) && 
             (input.includes("not working") || input.includes("down") || input.includes("slow") || input.includes("issue") || input.includes("problem") || input.includes("connect"))) {
        
        matched = true;
        resolved_count++;
        
        response = `NETWORK TROUBLESHOOTING:\n` +
                  `1. Toggle WiFi OFF and ON\n` +
                  `2. Open Command Prompt and type: ipconfig /release\n` +
                  `3. Then type: ipconfig /renew\n` +
                  `4. Try: ping google.com to test connection\n` +
                  `5. Check if other devices are working\n\n` +
                  `Network Status: https://status.company.com`;
    }
    
    // 3. EMAIL ISSUES RULE
    else if ((input.includes("email") || input.includes("outlook") || input.includes("mail")) && 
             (input.includes("not sending") || input.includes("not receiving") || input.includes("error") || input.includes("problem") || input.includes("troubles"))) {
        
        matched = true;
        resolved_count++;
        
        response = `EMAIL TROUBLESHOOTING:\n` +
                  `1. Check if you're connected to the internet\n` +
                  `2. Verify your mailbox isn't full\n` +
                  `3. Restart Outlook/Email application\n` +
                  `4. Check email server status\n` +
                  `5. Try webmail: https://webmail.company.com\n\n` +
                  `Email services are usually restored within 15 minutes`;
    }
    
    // 4. SOFTWARE INSTALLATION RULE
    else if ((input.includes("install") || input.includes("update")) && 
             (input.includes("software") || input.includes("application") || input.includes("program"))) {
        
        matched = true;
        resolved_count++;
        
        response = `SOFTWARE INSTALLATION:\n` +
                  `1. Go to Company Software Portal: https://software.company.com\n` +
                  `2. Login with your company credentials\n` +
                  `3. Search for the software you need\n` +
                  `4. Click 'Request Installation'\n` +
                  `5. IT team will approve within 2-4 hours\n\n` +
                  `Approved software list is available on the portal`;
    }
    
    // 5. PRINTER ISSUES RULE
    else if ((input.includes("printer") || input.includes("print")) && 
             (input.includes("not working") || input.includes("error") || input.includes("jam") || input.includes("paper") || input.includes("support"))) {
        
        matched = true;
        resolved_count++;
        
        response = `PRINTER TROUBLESHOOTING:\n` +
                  `1. Check if printer has paper and toner\n` +
                  `2. Clear any paper jams\n` +
                  `3. Restart the printer (power off/on)\n` +
                  `4. Clear print queue on your computer\n` +
                  `5. Check printer connection:\n\n` +
                  `Printer support: ext. 1234 if issues persist`;
    }
    
    // 6. VPN ACCESS RULE
    else if ((input.includes("vpn") || input.includes("remote access")) && 
             (input.includes("connect") || input.includes("not working") || input.includes("not"))) {
        
        matched = true;
        resolved_count++;
        
        response = `VPN CONNECTION STEPS:\n` +
                  `1. Open Cisco AnyConnect/Company VPN client\n` +
                  `2. Enter: vpn.company.com as the server address\n` +
                  `3. Login with your company credentials\n` +
                  `4. Select 'Split Tunnel' or 'Full Tunnel' as needed\n` +
                  `5. If connection fails, try: vpn2.company.com\n\n` +
                  `Two-factor authentication may be required`;
    }
    
    // 7. ACCOUNT LOCKOUT RULE
    else if ((input.includes("account locked") || input.includes("locked out")) || 
             (input.includes("can't login") && input.includes("locked"))) {
        
        matched = true;
        resolved_count++;
        
        response = `ACCOUNT UNLOCK PROCESS:\n` +
                  `1. Account locks automatically after 5 failed attempts\n` +
                  `2. Wait 15 minutes for auto-unlock\n` +
                  `3. Or visit: https://account.company.com/unlock\n` +
                  `4. Contact IT Helpdesk at ext. 1234 for immediate unlock\n` +
                  `5. Change your password if you don't remember it`;
    }
    
    // 8. SLOW COMPUTER RULE
    else if ((input.includes("slow") || input.includes("lag")) && 
             (input.includes("computer") || input.includes("laptop") || input.includes("pc"))) {
        
        matched = true;
        resolved_count++;
        
        response = `PERFORMANCE TIPS:\n` +
                  `1. Close unnecessary browser tabs\n` +
                  `2. Restart your computer (fixes 80% of issues)\n` +
                  `3. Check disk space - need at least 10% free\n` +
                  `4. Run disk cleanup: cleanmgr.exe\n` +
                  `5. Check for Windows updates\n\n` +
                  `IT recommends restarting daily`;
    }
    
    // 9. NO MATCH - ESCALATE
    else {
        matched = false;
        escalated_count++;
        response = "I DO NOT UNDERSTAND!!";
    }
    
    // Add bot response
    addBotMessage(response);
    
    // Show ticket summary
    const summary = `------------------------------------------------------------\n` +
                   `Status: ${matched ? 'RESOLVED' : 'ESCALATED'}\n` +
                   `------------------------------------------------------------`;
    
    addBotMessage(summary, 'ticket-summary');
    
    // Update statistics
    updateStats();
}

// Add user message to chat
function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + 
                 now.getMinutes().toString().padStart(2, '0');
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <strong>👤 You:</strong>
            <pre class="user-output">${message}</pre>
        </div>
        <div class="message-time">${time}</div>
    `;
    
    chatMessages.appendChild(messageDiv);
    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add bot message to chat
function addBotMessage(message, className = '') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message bot-message`;
    
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + 
                 now.getMinutes().toString().padStart(2, '0');
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <strong>🤖 Bot:</strong>
            <pre class="bot-output ${className}">${message}</pre>
        </div>
        <div class="message-time">${time}</div>
    `;
    
    chatMessages.appendChild(messageDiv);
    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Update statistics panel
function updateStats() {
    queryCountEl.textContent = query_count;
    resolvedCountEl.textContent = resolved_count;
    escalatedCountEl.textContent = escalated_count;
    
    const resolutionRate = query_count > 0 ? Math.round((resolved_count / query_count) * 100) : 0;
    resolutionRateEl.textContent = resolutionRate + '%';
}

// Reset chat session
function resetChat() {
    // Reset counters
    query_count = 0;
    resolved_count = 0;
    escalated_count = 0;
    
    // Clear chat messages
    chatMessages.innerHTML = '';
    
    // Enable input
    userInput.disabled = false;
    document.querySelector('.send-btn').disabled = false;
    
    // Add welcome message
    const welcomeMsg = `I CAN HELP WITH:\n` +
                      `- Password issues\n` +
                      `- Network problems\n` +
                      `- Email troubles\n` +
                      `- Software installation\n` +
                      `- Printer support\n\n` +
                      `Type your question below (or 'exit' to quit)\n` +
                      `------------------------------------------------------------`;
    
    addBotMessage(welcomeMsg);
    
    // Update stats
    updateStats();
}

// Initialize on page load
window.onload = initChat;