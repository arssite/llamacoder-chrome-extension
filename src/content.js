// Example: Highlight code blocks on the page
document.addEventListener("click", (event) => {
  if (event.target.matches(".code-block")) {
    const code = event.target.innerText;
    chrome.runtime.sendMessage(
      { type: "queryLlamaCoder", codeSnippet: code },
      (response) => {
        console.log("LlamaCoder Suggestion:", response.suggestion);
        alert(`LlamaCoder Suggestion: ${response.suggestion}`);
      }
    );
  }
});
