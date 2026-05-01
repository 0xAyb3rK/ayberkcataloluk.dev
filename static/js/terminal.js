/**
 * Fake Interactive Terminal
 * 100% Client-Side. 100% Safe.
 */

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("interactive-terminal-container");
    if (!container) return; // Only run on the terminal page

    // Fake File System
    const fileSystem = {
        ".flag.txt": { type: "file", permissions: "-rw-------", owner: "root", size: "64", date: "May 01 07:26", content: "aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==" },
        "whoami.md": { type: "file", permissions: "-rw-r--r--", owner: "ayb3rk", size: "581", date: "May 01 04:00", content: "# [~] $ whoami\n\nHello, I am Ayberk Cataloluk 21-year-old Computer Engineering student at Erciyes University.\nI started my cybersecurity journey with the Siber Vatan program.\nAfter learning the fundamentals, I realized I had a deeper passion for Malware Analysis and Reverse Engineering.\nCurrently, I am focusing on Assembly, C, and Windows Internals to understand how systems work at a low level.\n\nMy goal is to document my learning process.\n\nBtw I am a big fan of Fenerbahce and I love playing chess." },
        "projects": { type: "dir", permissions: "drwxr-xr-x", owner: "ayb3rk", size: "4096", date: "May 01 00:00", content: {} },
        "posts": { type: "dir", permissions: "drwxr-xr-x", owner: "ayb3rk", size: "4096", date: "May 01 00:00", content: {} }
    };

    let currentUser = "www-data";
    let currentInput = "";
    let isAwaitingPassword = false;
    let sudoWarningShown = false;
    const commandHistory = [];
    let historyIndex = -1;

    // Build UI
    const wrapper = document.createElement("div");
    wrapper.className = "terminal-window interactive-terminal";
    wrapper.style.minHeight = "60vh";
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    
    const header = document.createElement("div");
    header.className = "terminal-header";
    header.innerHTML = `<div class="terminal-title">0xAyb3rK@linux: ~</div>`;
    
    const contentBox = document.createElement("div");
    contentBox.className = "terminal-content";
    contentBox.style.flexGrow = "1";
    contentBox.style.overflowY = "auto";
    contentBox.style.paddingBottom = "40px"; // Space for input

    const outputArea = document.createElement("div");
    outputArea.className = "terminal-output";

    const inputArea = document.createElement("div");
    inputArea.className = "terminal-input-line";
    
    // Function to generate the P10k prompt HTML
    const getPromptHTML = () => {
        const now = new Date();
        const timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                        now.getMinutes().toString().padStart(2, '0') + ':' + 
                        now.getSeconds().toString().padStart(2, '0');
        return `
            <div class="p10k-line-1">
              <div class="p10k-left">
                <div class="p10k-segment p10k-os">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.2em" height="1.2em" fill="currentColor" style="vertical-align: -0.125em;"><path d="M12.778 5.943s-1.97-.13-5.327.92c-3.42 1.07-5.36 2.587-5.36 2.587s5.098-2.847 10.852-3.008zm7.351 3.095l.257-.017s-1.468-1.78-4.278-2.648c1.58.642 2.954 1.493 4.021 2.665zm.42.74c.039-.068.166.217.263.337.004.024.01.039-.045.027-.005-.025-.013-.032-.013-.032s-.135-.08-.177-.137c-.041-.057-.049-.157-.028-.195zm3.448 8.479s.312-3.578-5.31-4.403a18.277 18.277 0 0 0-2.524-.187c-4.506.06-4.67-5.197-1.275-5.462 1.407-.116 3.087.643 4.73 1.408-.007.204.002.385.136.552.134.168.648.35.813.445.164.094.691.43 1.014.85.07-.131.654-.512.654-.512s-.14.003-.465-.119c-.326-.122-.713-.49-.722-.511-.01-.022-.015-.055.06-.07.059-.049-.072-.207-.13-.265-.058-.058-.445-.716-.454-.73-.009-.016-.012-.031-.04-.05-.085-.027-.46.04-.46.04s-.575-.283-.774-.893c.003.107-.099.224 0 .469-.3-.127-.558-.344-.762-.88-.12.305 0 .499 0 .499s-.707-.198-.82-.85c-.124.293 0 .469 0 .469s-1.153-.602-3.069-.61c-1.283-.118-1.55-2.374-1.43-2.754 0 0-1.85-.975-5.493-1.406-3.642-.43-6.628-.065-6.628-.065s6.45-.31 11.617 1.783c.176.785.704 2.094.989 2.723-.815.563-1.733 1.092-1.876 2.97-.143 1.878 1.472 3.53 3.474 3.58 1.9.102 3.214.116 4.806.942 1.52.84 2.766 3.4 2.89 5.703.132-1.709-.509-5.383-3.5-6.498 4.181.732 4.549 3.832 4.549 3.832zM12.68 5.663l-.15-.485s-2.484-.441-5.822-.204C3.37 5.211 0 6.38 0 6.38s6.896-1.735 12.68-.717Z"/></svg>
                </div>
                <div class="p10k-arrow p10k-os-to-dir"><svg viewBox="0 0 10 24" width="0.6em" height="100%" preserveAspectRatio="none" fill="currentColor" style="display:block;"><path d="M0 0l10 12L0 24z"/></svg></div>
                <div class="p10k-segment p10k-dir">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="1em" height="1em" fill="currentColor" style="vertical-align: -0.125em;"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg> ~
                </div>
                <div class="p10k-arrow p10k-dir-to-bg"><svg viewBox="0 0 10 24" width="0.6em" height="100%" preserveAspectRatio="none" fill="currentColor" style="display:block;"><path d="M0 0l10 12L0 24z"/></svg></div>
              </div>
              <div class="p10k-connector"></div>
              <div class="p10k-right">
                <div class="p10k-arrow p10k-bg-to-time"><svg viewBox="0 0 10 24" width="0.6em" height="100%" preserveAspectRatio="none" fill="currentColor" style="display:block;"><path d="M10 0L0 12l10 12z"/></svg></div>
                <div class="p10k-segment p10k-time">
                  at ${timeStr} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="0.8em" height="0.8em" fill="currentColor" style="vertical-align: middle;"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/></svg>
                </div>
              </div>
            </div>`;
    };

    const getPromptArrowHTML = () => {
        if (currentUser === "root") {
            return `<span class="p10k-prompt-arrow" style="color: #ef2929;">#</span>`;
        }
        return `<span class="p10k-prompt-arrow">❯</span>`;
    };

    const setupInputArea = () => {
        inputArea.innerHTML = `
            <div id="dynamic-prompt">${getPromptHTML()}</div>
            <div class="p10k-line-2" style="margin-bottom: 0;">
                <span id="dynamic-arrow">${getPromptArrowHTML()}</span>
                <input type="text" id="terminal-cmd-input" autocomplete="off" spellcheck="false" style="background:transparent; border:none; color:#eeeeec; font-family:var(--rev-mono-font); font-size:0.9rem; flex-grow:1; outline:none; caret-color:var(--theme);" autofocus>
            </div>
        `;
    };

    const updatePromptTime = () => {
        const promptDiv = document.getElementById("dynamic-prompt");
        if (promptDiv) promptDiv.innerHTML = getPromptHTML();
        const arrowSpan = document.getElementById("dynamic-arrow");
        if (arrowSpan) arrowSpan.innerHTML = getPromptArrowHTML();
    };

    const printOutput = (html) => {
        const out = document.createElement("div");
        out.className = "terminal-body";
        out.style.marginBottom = "15px";
        out.style.marginTop = "5px";
        out.innerHTML = html;
        outputArea.appendChild(out);
    };

    const processCommand = (cmdStr) => {
        if (isAwaitingPassword) {
            // Echo nothing for the password in history, just a blank line
            const historyItem = document.createElement("div");
            historyItem.className = "p10k-prompt-advanced";
            historyItem.innerHTML = `<div class="p10k-line-2" style="margin-bottom: 0;"><span style="color:#eeeeec">Password:</span></div>`;
            outputArea.appendChild(historyItem);

            // The real password is "FL4G{TH3_D4RK_S1D3_0F_TH3_M00N}"
            if (cmdStr === "FL4G{TH3_D4RK_S1D3_0F_TH3_M00N}") {
                currentUser = "root";
                // Reset input area to normal
                isAwaitingPassword = false;
                setupInputArea();
                bindInputListener();
            } else {
                printOutput("su: Authentication failure");
                isAwaitingPassword = false;
                setupInputArea();
                bindInputListener();
            }
            return;
        }

        const cmdHtml = `
            ${getPromptHTML()}
            <div class="p10k-line-2" style="margin-bottom: 0;">
                ${getPromptArrowHTML()}
                <span class="p10k-command">${cmdStr}</span>
            </div>
        `;
        
        const historyItem = document.createElement("div");
        historyItem.className = "p10k-prompt-advanced";
        historyItem.innerHTML = cmdHtml;
        outputArea.appendChild(historyItem);

        const args = cmdStr.trim().split(/\s+/);
        const cmd = args[0].toLowerCase();

        if (!cmd) return;

        switch (cmd) {
            case "help":
                printOutput(`Available commands: ls, cat, cd, echo, whoami, su, sudo, clear, help`);
                break;
            case "clear":
                outputArea.innerHTML = "";
                break;
            case "whoami":
                printOutput(currentUser);
                break;
            case "su":
            case "sudo":
                if (args.includes("root") || args.includes("su") || args[0] === "su" || args[0] === "sudo") {
                    if (args[0] === "sudo" || args[0] === "su") {
                        if (!sudoWarningShown) {
                            printOutput(`
We trust you have received the usual lecture from the local System
Administrator. It usually boils down to these three things:

    #1) Respect the privacy of others.
    #2) Think before you type.
    #3) With great power comes great responsibility.

This incident will be reported.`);
                            sudoWarningShown = true;
                        }
                    }
                    isAwaitingPassword = true;
                    // Change input to password type
                    inputArea.innerHTML = `
                        <div class="p10k-line-2" style="margin-bottom: 0;">
                            <span style="color:#eeeeec; margin-right: 10px;">Password:</span>
                            <input type="password" id="terminal-cmd-input" autocomplete="off" spellcheck="false" style="background:transparent; border:none; color:#eeeeec; font-family:var(--rev-mono-font); font-size:0.9rem; flex-grow:1; outline:none; caret-color:var(--theme);" autofocus>
                        </div>
                    `;
                    // Re-bind listener for the new password input
                    bindInputListener();
                } else {
                    printOutput(`${cmd}: usage: su root`);
                }
                break;
            case "echo":
                const textToEcho = args.slice(1).join(" ");
                const safeEcho = textToEcho.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                printOutput(`<div style="font-family:var(--rev-mono-font);">${safeEcho}</div>`);
                break;
            case "cd":
                if (args.length < 2 || args[1] === "~" || args[1] === "/") {
                    window.location.href = "/";
                } else if (args[1].includes("projects")) {
                    window.location.href = "/projects";
                } else if (args[1].includes("posts")) {
                    window.location.href = "/posts";
                } else if (args[1].includes("whoami")) {
                    window.location.href = "/whoami";
                } else {
                    printOutput(`cd: ${args[1]}: No such file or directory`);
                }
                break;
            case "ls":
                let showHidden = false;
                let showLong = false;
                
                if (args.includes("-a") || args.includes("-al") || args.includes("-la")) showHidden = true;
                if (args.includes("-l") || args.includes("-al") || args.includes("-la")) showLong = true;

                let output = "";
                for (const [name, info] of Object.entries(fileSystem)) {
                    if (name.startsWith(".") && !showHidden) continue;
                    
                    let color = info.type === "dir" ? "#7aa2f7" : "#eeeeec";
                    if (showLong) {
                        output += `<div style="display:flex; gap:15px; font-family:var(--rev-mono-font);">
                            <span>${info.permissions}</span>
                            <span>1</span>
                            <span>${info.owner}</span>
                            <span>${info.owner}</span>
                            <span style="width:40px; text-align:right;">${info.size}</span>
                            <span>${info.date}</span>
                            <span style="color:${color}; font-weight: ${info.type === 'dir' ? 'bold' : 'normal'};">${name}</span>
                        </div>`;
                    } else {
                        output += `<span style="color:${color}; font-weight: ${info.type === 'dir' ? 'bold' : 'normal'}; margin-right: 15px;">${name}</span>`;
                    }
                }
                printOutput(output);
                break;
            case "cat":
                if (args.length < 2) {
                    printOutput("cat: missing operand");
                    break;
                }
                const filename = args[1];
                if (!fileSystem[filename]) {
                    printOutput(`cat: ${filename}: No such file or directory`);
                } else if (fileSystem[filename].type === "dir") {
                    printOutput(`cat: ${filename}: Is a directory`);
                } else {
                    const fileInfo = fileSystem[filename];
                    // Permission check
                    if (fileInfo.permissions.startsWith("-rw-------") && currentUser !== fileInfo.owner) {
                        printOutput(`cat: ${filename}: Permission denied`);
                    } else {
                        const content = fileInfo.content;
                        // Replace literal \n with <br> for display
                        const safeContent = content.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\\n/g, "<br>");
                        printOutput(`<div style="white-space:pre-wrap; font-family:var(--rev-mono-font);">${safeContent}</div>`);
                    }
                }
                break;
            default:
                printOutput(`zsh: command not found: ${cmd}`);
        }
    };

    wrapper.appendChild(header);
    contentBox.appendChild(outputArea);
    contentBox.appendChild(inputArea);
    wrapper.appendChild(contentBox);
    container.appendChild(wrapper);

    setupInputArea();
    
    const bindInputListener = () => {
        const inputField = document.getElementById("terminal-cmd-input");
        if (!inputField) return;
        
        wrapper.addEventListener("click", () => inputField.focus());

        inputField.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const val = inputField.value;
                if (val.trim() || isAwaitingPassword) {
                    if (!isAwaitingPassword) {
                        commandHistory.push(val);
                        historyIndex = commandHistory.length;
                    }
                    processCommand(val);
                } else {
                    // Just print empty prompt if enter pressed with no command
                    const emptyPrompt = document.createElement("div");
                    emptyPrompt.className = "p10k-prompt-advanced";
                    emptyPrompt.innerHTML = `
                        ${getPromptHTML()}
                        <div class="p10k-line-2" style="margin-bottom: 0;">
                            ${getPromptArrowHTML()}
                        </div>
                    `;
                    outputArea.appendChild(emptyPrompt);
                }
                
                // Re-fetch the input field in case it was destroyed and recreated (like switching to password mode)
                const currentInputField = document.getElementById("terminal-cmd-input");
                if (currentInputField) {
                    currentInputField.value = "";
                    if (!isAwaitingPassword) {
                        updatePromptTime();
                    }
                }
                
                // Scroll to bottom
                contentBox.scrollTop = contentBox.scrollHeight;
            } else if (e.key === "ArrowUp" && !isAwaitingPassword) {
                if (historyIndex > 0) {
                    historyIndex--;
                    inputField.value = commandHistory[historyIndex];
                }
                e.preventDefault();
            } else if (e.key === "ArrowDown" && !isAwaitingPassword) {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    inputField.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    inputField.value = "";
                }
                e.preventDefault();
            }
        });
    };
    
    bindInputListener();
    
    // Output initial welcome
    printOutput("Welcome to the interactive terminal. Type 'help' for commands.");
});
