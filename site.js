[...document.getElementById("install").getElementsByTagName("code")].forEach(x => x.tabIndex = 0);
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('pre > code').forEach((codeBlock) => {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4 a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(codeBlock.innerText);
                button.classList.add('copied');
                // button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4 a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
                button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 24 24" width="14" fill="currentColor"><path d="M9 16.2l-3.5-3.5L4 14.2l5 5 12-12-1.4-1.4z"/></svg>';
                setTimeout(() => {
                    button.classList.remove('copied');
                    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4 a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
                }, 1500);
            } catch {
                button.textContent = 'Error';
            }
        });

        const pre = codeBlock.parentNode;
        pre.style.position = 'relative';
        pre.appendChild(button);
    });
});