/**
 * Custom JS for Reverse Engineering Aesthetic
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Decoding Title Effect
    // Target the logo text (usually in .logo class in hello-4s3ti)
    const logoElement = document.querySelector('.logo__text');
    if (logoElement) {
        const originalText = logoElement.innerText;
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
        let iterations = 0;
        
        logoElement.classList.add('decoding');
        
        const interval = setInterval(() => {
            logoElement.innerText = originalText.split("")
                .map((letter, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return letters[Math.floor(Math.random() * letters.length)];
                })
                .join("");
                
            if (iterations >= originalText.length) {
                clearInterval(interval);
                logoElement.classList.remove('decoding');
            }
            iterations += 1 / 3; // Controls speed of decoding
        }, 30);
    }

    // 2. Terminal Window Effect for Whoami Page
    // Check if we are on the whoami page by checking URL or a specific header
    const isWhoami = window.location.pathname.includes('/whoami');
    if (isWhoami) {
        const contentDiv = document.querySelector('.post-content');
        if (contentDiv) {
            // Create terminal wrapper
            const terminalWrapper = document.createElement('div');
            terminalWrapper.className = 'terminal-window';
            
            // Create terminal header (Linux style)
            const terminalHeader = document.createElement('div');
            terminalHeader.className = 'terminal-header';
            terminalHeader.innerHTML = `
                <div class="terminal-title">0xAyb3rK@linux: ~</div>
            `;
            
            // Create terminal content container
            const terminalInnerContent = document.createElement('div');
            terminalInnerContent.className = 'terminal-content';
            
            // Create powerlevel10k style prompt
            const p10kPrompt = document.createElement('div');
            p10kPrompt.className = 'p10k-prompt-advanced';
            
            // Get current time
            const now = new Date();
            const timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                            now.getMinutes().toString().padStart(2, '0') + ':' + 
                            now.getSeconds().toString().padStart(2, '0');

            p10kPrompt.innerHTML = `
                <div class="p10k-line-1">
                  <div class="p10k-left">
                    <div class="p10k-segment p10k-os">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.2em" height="1.2em" fill="currentColor" style="vertical-align: -0.125em;"><path d="M12.778 5.943s-1.97-.13-5.327.92c-3.42 1.07-5.36 2.587-5.36 2.587s5.098-2.847 10.852-3.008zm7.351 3.095l.257-.017s-1.468-1.78-4.278-2.648c1.58.642 2.954 1.493 4.021 2.665zm.42.74c.039-.068.166.217.263.337.004.024.01.039-.045.027-.005-.025-.013-.032-.013-.032s-.135-.08-.177-.137c-.041-.057-.049-.157-.028-.195zm3.448 8.479s.312-3.578-5.31-4.403a18.277 18.277 0 0 0-2.524-.187c-4.506.06-4.67-5.197-1.275-5.462 1.407-.116 3.087.643 4.73 1.408-.007.204.002.385.136.552.134.168.648.35.813.445.164.094.691.43 1.014.85.07-.131.654-.512.654-.512s-.14.003-.465-.119c-.326-.122-.713-.49-.722-.511-.01-.022-.015-.055.06-.07.059-.049-.072-.207-.13-.265-.058-.058-.445-.716-.454-.73-.009-.016-.012-.031-.04-.05-.085-.027-.46.04-.46.04s-.575-.283-.774-.893c.003.107-.099.224 0 .469-.3-.127-.558-.344-.762-.88-.12.305 0 .499 0 .499s-.707-.198-.82-.85c-.124.293 0 .469 0 .469s-1.153-.602-3.069-.61c-1.283-.118-1.55-2.374-1.43-2.754 0 0-1.85-.975-5.493-1.406-3.642-.43-6.628-.065-6.628-.065s6.45-.31 11.617 1.783c.176.785.704 2.094.989 2.723-.815.563-1.733 1.092-1.876 2.97-.143 1.878 1.472 3.53 3.474 3.58 1.9.102 3.214.116 4.806.942 1.52.84 2.766 3.4 2.89 5.703.132-1.709-.509-5.383-3.5-6.498 4.181.732 4.549 3.832 4.549 3.832zM12.68 5.663l-.15-.485s-2.484-.441-5.822-.204C3.37 5.211 0 6.38 0 6.38s6.896-1.735 12.68-.717Z"/></svg>
                    </div>
                    <div class="p10k-arrow p10k-os-to-dir">
                      <svg viewBox="0 0 10 24" width="0.6em" height="100%" preserveAspectRatio="none" fill="currentColor" style="display:block;"><path d="M0 0l10 12L0 24z"/></svg>
                    </div>
                    <div class="p10k-segment p10k-dir">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="1em" height="1em" fill="currentColor" style="vertical-align: -0.125em;"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg> ~
                    </div>
                    <div class="p10k-arrow p10k-dir-to-bg">
                      <svg viewBox="0 0 10 24" width="0.6em" height="100%" preserveAspectRatio="none" fill="currentColor" style="display:block;"><path d="M0 0l10 12L0 24z"/></svg>
                    </div>
                  </div>
                  <div class="p10k-connector"></div>
                  <div class="p10k-right">
                    <div class="p10k-arrow p10k-bg-to-time">
                      <svg viewBox="0 0 10 24" width="0.6em" height="100%" preserveAspectRatio="none" fill="currentColor" style="display:block;"><path d="M10 0L0 12l10 12z"/></svg>
                    </div>
                    <div class="p10k-segment p10k-time">
                      at ${timeStr} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="0.8em" height="0.8em" fill="currentColor" style="vertical-align: middle;"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/></svg>
                    </div>
                  </div>
                </div>
                <div class="p10k-line-2">
                  <span class="p10k-prompt-arrow">❯</span>
                  <span class="p10k-command">cat whoami.md</span>
                </div>
            `;
            terminalInnerContent.appendChild(p10kPrompt);
            
            // Move original content into the terminal content container
            const contentBody = document.createElement('div');
            contentBody.className = 'terminal-body';
            while (contentDiv.firstChild) {
                contentBody.appendChild(contentDiv.firstChild);
            }
            terminalInnerContent.appendChild(contentBody);
            
            // Assemble
            terminalWrapper.appendChild(terminalHeader);
            terminalWrapper.appendChild(terminalInnerContent);
            contentDiv.appendChild(terminalWrapper);
        }
    }
});
