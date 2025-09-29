// script.js
const timeDisplay = document.getElementById("timeDisplay");
const questionTitleEl = document.getElementById("question-title");
const questionBoxEl = document.getElementById("question-box");
const explanationEl = document.getElementById("explanation");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const explainBtn = document.getElementById("explainBtn");

const questions = [
  {
    id: 1,
    title: "Question-01: ~ GATE 2024 Set 1 [Numerical]",
    questionText: `Consider the entries shown below in the forwarding table of an IP router. Each entry consists of an IP prefix and the corresponding next hop router for packets whose destination IP address matches the prefix. The notation “/N” in a prefix indicates a subnet mask with the most significant N bits set to 1.<br><br>
<pre>
Prefix              Next Hop Router
10.1.1.0/24         R1
10.1.1.128/25       R2
10.1.1.64/26        R3
10.1.1.192/26       R4
</pre>
This router forwards 20 packets each to 5 hosts. The IP addresses of the hosts are <b>10.1.1.16, 10.1.1.72, 10.1.1.132, 10.1.1.191, and 10.1.1.205</b>.<br><br>
<strong>Question:</strong> The number of packets forwarded via the next hop router R2 is _______`,
    type: "numerical",
    correctAnswer: 40,
    explanation: `R2 matches destination 10.1.1.132. Each host gets 20 packets → R2 gets 1 × 20 = <strong>40 packets</strong>.`
  },
  {
    id: 2,
    title: "Question-02: ~ GATE 2024 Set 1 [Numerical]",
    questionText: `Consider sending an IP datagram of size <b>1420 bytes</b> (including 20 bytes of IP header) from a sender to a receiver over a path of two links with a router between them.<br>
The first link (sender to router) has an MTU (Maximum Transmission Unit) size of 542 bytes, while the second link (router to receiver) has an MTU size of 360 bytes.<br><br>
<strong>Question:</strong> The number of fragments that would be delivered at the receiver is _______`,
    type: "numerical",
    correctAnswer: 6,
    explanation: `Data size = 1420 - 20 = 1400 bytes. Fragments created for first link (MTU 542 → data per fragment 522 due to 20-byte IP header and 8-byte multiple of 8 rule) result in fragments which later may be further split by the next link's MTU. Final delivered fragments count = <strong>6 fragments</strong>.`
  },
  {
    id: 3,
    title: "Question-03: ~ GATE 2024 Set 2 [MSQ]",
    questionText: `Node X has a TCP connection open to node Y. The packets from X to Y go through an intermediate IP router R. Ethernet switch S is the first switch on the network path between X and R. Consider a packet sent from X to Y over this connection.<br><br>
<strong>Which of the following statements is/are TRUE about the destination IP and MAC addresses on this packet at the time it leaves X?</strong>`,
    type: "msq",
    options: [
      { id: "opt1", text: "(A) The destination IP address is the IP address of R" },
      { id: "opt2", text: "(B) The destination IP address is the IP address of Y" },
      { id: "opt3", text: "(C) The destination MAC address is the MAC address of S" },
      { id: "opt4", text: "(D) The destination MAC address is the MAC address of Y" }
    ],
    correct: ["opt2"],
    explanation: `✔ (B) True: Destination IP is Y (IP is end-to-end).<br>
❌ Others are incorrect because MAC is for the next hop (router R or switch forwarding) and destination MAC is not switch S or Y directly in this context.`
  },
  {
    id: 4,
    title: "Question-04: ~ GATE 2024 Set 2 [MSQ]",
    questionText: `Which of the following statements about IPv4 fragmentation are TRUE?`,
    type: "msq",
    options: [
      { id: "opt1", text: "(A) Fragmentation is done only at the source." },
      { id: "opt2", text: "(B) Fragmentation is done at routers if needed." },
      { id: "opt3", text: "(C) Reassembly is done only at the destination." },
      { id: "opt4", text: "(D) Reassembly is done at intermediate routers too." }
    ],
    correct: ["opt2", "opt3"],
    explanation: `✔ (B) True: Routers fragment datagrams if MTU is too small.<br>
✔ (C) True: Reassembly is always done at the final destination.<br>
❌ (A) & (D) are incorrect.`
  },
  {
  id: 5,
  title: "Question-05: ~ GATE 2024 Set 2 [MSQ]",
  questionText: `Which of the following fields of an IP header is/are always modified by any router
  before it forwards the IP packet?`,
  type: "msq",
  options: [
    { id: "opt1", text: "(A) Source IP Address" },
    { id: "opt2", text: "(B) Protocol" },
    { id: "opt3", text: "(C) Time to Live (TTL)" },
    { id: "opt4", text: "(D) Header Checksum" }
  ],
  correct: ["opt3", "opt4"],
  explanation: `✔ (C) <strong>Time to Live (TTL)</strong>: TTL is decreased by 1 by each router to avoid infinite looping of packets in the network.<br>
✔ (D) <strong>Header Checksum</strong>: Since TTL changes, the checksum must be recalculated by the router to reflect the updated header.<br>
❌ (A) Source IP and ❌ (B) Protocol are set by the sender and remain unchanged during routing.`
}

];

let currentIndex = 0;
let questionTimer = null;
let counter = 0;

function startTimer() {
  counter = 0;
  if (questionTimer !== null) clearInterval(questionTimer);
  questionTimer = setInterval(() => {
    counter++;
    let hrs = Math.floor(counter / 3600);
    let mins = Math.floor((counter % 3600) / 60);
    let secs = counter % 60;
    let timeStr = `Time: ${hrs > 0 ? hrs + " hr " : ""}${mins > 0 ? mins + " min " : ""}${secs} sec`;
    timeDisplay.textContent = timeStr;
  }, 1000);
}

function renderQuestion() {
  const q = questions[currentIndex];
  questionTitleEl.textContent = q.title;
  let html = `<p class="lead font-weight-bold">${q.questionText}</p>`;

  // Clear any previous feedback/explanation
  explanationEl.classList.add("d-none");
  explanationEl.innerHTML = `<strong>Explanation:</strong><br>${q.explanation}`;

  if (q.type === "msq") {
    q.options.forEach(opt => {
      html += `
        <div class="form-check mb-2">
          <input class="form-check-input" type="checkbox" id="${opt.id}">
          <label class="form-check-label" for="${opt.id}">${opt.text}</label>
        </div>
      `;
    });
    html += `<div class="text-center mt-4">
      <button class="btn btn-primary btn-lg" id="submitBtn">Submit</button>
    </div>
    <p id="feedback" class="feedback mt-4 text-center"></p>
    <p id="timeTaken" class="text-center font-italic text-muted"></p>`;
  } else if (q.type === "numerical") {
    html += `
      <div class="text-center">
        <input id="numericAnswer" class="form-control numeric-input mb-3" type="number" placeholder="Enter numeric answer" />
      </div>
      <div class="text-center mt-2">
        <button class="btn btn-primary btn-lg" id="submitBtn">Submit</button>
      </div>
      <p id="feedback" class="feedback mt-4 text-center"></p>
      <p id="timeTaken" class="text-center font-italic text-muted"></p>
    `;
  }

  questionBoxEl.innerHTML = html;

  // attach submit listener
  const submitBtn = document.getElementById("submitBtn");
  if (submitBtn) {
    submitBtn.addEventListener("click", checkAnswer);
  }

  // reset classes for MSQ highlight if coming back
  if (q.type === "msq") {
    // ensure no lingering highlight
    q.options.forEach(opt => {
      const el = document.getElementById(opt.id);
      if (el) {
        const container = el.closest(".form-check");
        if (container) {
          container.classList.remove("option-correct", "option-wrong");
        }
      }
    });
  }

  startTimer();
}

function stopTimerAndShowTime() {
  if (questionTimer !== null) clearInterval(questionTimer);
  const timeTakenEl = document.getElementById("timeTaken");
  if (timeTakenEl) {
    timeTakenEl.textContent = `You took ${timeDisplay.textContent} to solve this question.`;
  }
}

function checkAnswer() {
  const q = questions[currentIndex];
  const feedbackEl = document.getElementById("feedback");

  if (q.type === "msq") {
    const checked = q.options
      .filter(opt => document.getElementById(opt.id).checked)
      .map(opt => opt.id);

    if (checked.length === 0) {
      alert("Please select at least one option before submitting.");
      return;
    }

    const isCorrect = (checked.length === q.correct.length) &&
      checked.every(id => q.correct.includes(id));

    feedbackEl.textContent = isCorrect ? "✔ Correct" : "✘ Wrong";
    feedbackEl.style.color = isCorrect ? "green" : "red";

    stopTimerAndShowTime();

    // highlight options
    q.options.forEach(opt => {
      const checkboxEl = document.getElementById(opt.id);
      const container = checkboxEl.closest(".form-check");
      container.classList.remove("option-correct", "option-wrong");
      if (q.correct.includes(opt.id)) {
        container.classList.add("option-correct");
      } else if (checkboxEl.checked && !q.correct.includes(opt.id)) {
        container.classList.add("option-wrong");
      }
    });

  } else if (q.type === "numerical") {
    const inputEl = document.getElementById("numericAnswer");
    if (!inputEl) return;
    const raw = inputEl.value;
    if (raw === null || raw.toString().trim() === "") {
      alert("Please enter your numeric answer before submitting.");
      return;
    }

    // Compare numeric values (allow integer compare)
    const userVal = Number(raw);
    const correctVal = Number(q.correctAnswer);

    const isCorrect = (!isNaN(userVal) && userVal === correctVal);

    feedbackEl.textContent = isCorrect ? "✔ Correct" : "✘ Wrong";
    feedbackEl.style.color = isCorrect ? "green" : "red";

    stopTimerAndShowTime();

    // Optionally, show correct answer when wrong
    if (!isCorrect) {
      const reveal = document.createElement("p");
      reveal.className = "text-center mt-2";
      reveal.innerHTML = `Correct answer: <strong>${q.correctAnswer}</strong>`;
      // avoid duplicate reveal
      const already = document.querySelector("#question-box .reveal-correct");
      if (!already) {
        reveal.classList.add("reveal-correct");
        questionBoxEl.appendChild(reveal);
      }
    }
  }
}

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
  } else {
    alert("You're at the first question.");
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    alert("You're at the last question.");
  }
});

explainBtn.addEventListener("click", () => {
  explanationEl.classList.remove("d-none");
});

// initial render
renderQuestion();
