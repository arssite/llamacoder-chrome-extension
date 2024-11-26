chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === "queryLlamaCoder") {
    const { codeSnippet, apiKey } = request;

    try {
      const response = await fetch("https://api.llamacoder.example.com/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ codeSnippet }),
      });

      const result = await response.json();
      sendResponse({ suggestion: result.suggestion });
    } catch (error) {
      console.error("Error querying LlamaCoder:", error);
      sendResponse({ suggestion: "Failed to fetch suggestion." });
    }
  }
  return true; // Ensures asynchronous response
});
