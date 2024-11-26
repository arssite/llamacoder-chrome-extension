document.getElementById("saveApiKey").addEventListener("click", () => {
  const apiKey = document.getElementById("apiKey").value;
  if (apiKey) {
    chrome.storage.sync.set({ apiKey }, () => {
      alert("API Key saved successfully!");
    });
  } else {
    alert("Please enter a valid API Key.");
  }
});

const codeInput = document.getElementById("codeInput");
codeInput.addEventListener("input", () => {
  Prism.highlightElement(codeInput);
});

document.getElementById("getSuggestion").addEventListener("click", () => {
  const codeSnippet = codeInput.innerText;

  chrome.storage.sync.get("apiKey", (data) => {
    const apiKey = data.apiKey;
    if (!apiKey) {
      alert("Please set your API Key first.");
      return;
    }

    chrome.runtime.sendMessage(
      { type: "queryLlamaCoder", codeSnippet, apiKey },
      (response) => {
        document.getElementById("output").innerText =
          response.suggestion || "No suggestion available.";
      }
    );
  });
});
