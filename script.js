document.addEventListener("DOMContentLoaded", () => {
  const quoteEl = document.getElementById("quote");
  const btn = document.getElementById("new-quote");

  const fallbackQuotes = [
    { text: "Hope is the only thing stronger than fear.", author: "Unknown" },
    { text: "You are stronger than you know.", author: "Unknown" },
    { text: "The human spirit is stronger than anything that can happen to it.", author: "C.C. Scott" },
    { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "Keep going — your story isn't over yet.", author: "HopeCare" }
  ];

 
  function showQuote(text, author) {
    quoteEl.style.opacity = 0;
    setTimeout(() => {
      quoteEl.textContent = `"${text}" — ${author || "Unknown"}`;
      quoteEl.style.opacity = 1;
    }, 200);
  }

  async function fetchAndShowQuote() {
    btn.disabled = true;
    showQuote("Fetching a new quote...", "");
    try {
     
      const res = await fetch("https://type.fit/api/quotes", { cache: "no-store" });
      if (!res.ok) throw new Error("Network response not ok: " + res.status);
      const data = await res.json();
     
      const random = data[Math.floor(Math.random() * data.length)];
      showQuote(random.text, random.author);
    } catch (err) {
      console.warn("Quote fetch failed, using local fallback. Error:", err);
      
      const r = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      showQuote(r.text, r.author);
    } finally {
      
      setTimeout(() => btn.disabled = false, 350);
    }
  }


  fetchAndShowQuote();

 
  btn.addEventListener("click", fetchAndShowQuote);
});
