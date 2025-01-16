// Balkendiagramm-Daten
const data = [
    { name: "Jan", value: 30 },
    { name: "Feb", value: 80 },
    { name: "Mar", value: 45 },
    { name: "Apr", value: 60 },
    { name: "May", value: 20 },
    { name: "Jun", value: 90 },
];

// SVG-Element
const svg = document.querySelector(".chart");
const width = 600;
const height = 400;
const barWidth = 80;
const maxBarHeight = 300;

// Maximalwert
const maxValue = Math.max(...data.map(d => d.value));

// Balkendiagramm generieren
data.forEach((d, index) => {
    const x = index * (barWidth + 10) + 50;
    const barHeight = (d.value / maxValue) * maxBarHeight;

    // Balken
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", height - barHeight - 50);
    rect.setAttribute("width", barWidth);
    rect.setAttribute("height", barHeight);
    rect.setAttribute("class", "bar");
    svg.appendChild(rect);

    // Beschriftung
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", x + barWidth / 2);
    label.setAttribute("y", height - 30);
    label.setAttribute("class", "label");
    label.setAttribute("text-anchor", "middle");
    label.textContent = d.name;
    svg.appendChild(label);

    // Wertanzeige
    const valueText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    valueText.setAttribute("x", x + barWidth / 2);
    valueText.setAttribute("y", height - barHeight - 60);
    valueText.setAttribute("class", "label");
    valueText.setAttribute("text-anchor", "middle");
    valueText.textContent = d.value;
    svg.appendChild(valueText);
});
