// Text aus der Aufgabe
const text = `
Plagiatsresolution und -maßnahmen
Resolution zum akademischen Ethos und zu den akademischen Standards

In guter Tradition und anlässlich der öffentlichen Diskussion zum Plagiatsthema sieht sich die Hochschule Bonn-Rhein-Sieg in der Pflicht, ihre Position klar und eindeutig zu bekunden und hochschulweit Maßnahmen einzuleiten.

1. Die Hochschule Bonn-Rhein-Sieg bekennt sich mit dieser Resolution öffentlich zum akademischen Ethos und den akademischen Standards.

2. Die Hochschule Bonn-Rhein-Sieg sieht sich verpflichtet, alle Studierende frühzeitig im Studium sowohl über den wissenschaftlichen Auftrag und den akademischen Ethos als auch über die Konsequenzen seiner Missachtung aufzuklären. In allen Studiengängen wird intensiv in die wissenschaftliche Arbeits- und Denkweise eingeführt und über den akademischen Ethos und die akademischen Standards klar und eindeutig aufgeklärt.

3. In einer Selbstverpflichtungserklärung zum akademischen Ethos geben alle Studierende der Hochschule Bonn-Rhein-Sieg spätestens gegen Ende des ersten Studienjahres zum Ausdruck, dass sie sich von den Dozentinnen und Dozenten der Hochschule Bonn-Rhein-Sieg hinreichend über den akademischen Ethos und die akademischen Standards aufgeklärt sind und diese beachten werden.

Der Senat befürwortete in seiner Sitzung am 03.05.2012 die Resolution in der o.g. Fassung.

Eckpunkte zur Plagiatsprüfung

Der Senat empfiehlt:

1. Die Aufklärung und das Bekenntnis zum akademischen Ethos und den akademischen Standards muss fester Bestandteil aller Curricula aller Studiengänge im ersten Studienjahr sein. Alle Curricula aller Studiengänge werden darauf hin geprüft und ggfs. ergänzt.

2. Alle Abschlussarbeiten werden auf Plagiate geprüft.

3. Alle Abschlussarbeiten mit Plagiaten werden grundsätzlich als Fehlversuch gewertet.

4. Die Entscheidung, ob die Arbeit Plagiate enthält, liegt zuerst bei den Gutachterinnen und Gutachtern. Der Nachweis in einem Gutachten reicht.

5. Alle Abschlussarbeiten werden grundsätzlich auch in elektronischer Form (PDF-Format und Originalformat wie Word, OpenOffice, ...) eingereicht.

6. Alle Abschlussarbeiten ohne Sperrvermerk werden einem vom Fachbereich definierten Kreis zur Einsicht zur Verfügung gestellt. Alle Abschlussarbeiten sollten nach Möglichkeit grundsätzlich zur Veröffentlichung freigegeben werden. Wissenschaft zielt auf Veröffentlichung ab. Nichtveröffentlichung sollte nur in begründeten und durch den Prüfungsausschuss genehmigten Ausnahmefällen geschehen.

7. Im Bereich von Seminar-, Hausarbeiten und Praktikumsberichten behält sich die Hochschule stichprobenartige Plagiatsprüfungen vor.

Selbstverpflichtungserklärung der Studierenden:

Eine akademische Arbeit stellt eine individuelle Leistung dar, die eigenständig und allein auf Basis der im Literaturverzeichnis angegebenen Quellen erstellt wurde und in der alle Zitate als solche gekennzeichnet sind.

"Ich erkläre hiermit, dass ich den akademischen Ehrencodex kenne und über die Folgen einer Missachtung oder Verletzung aufgeklärt worden bin."
`;

// Beispiel-Stoppwortliste
const stopWords = [
    "und", "die", "der", "in", "den", "das", "auf", "zu", "mit", "im", "es",
    "eine", "ein", "als", "von", "sie", "ist", "für", "dass", "wird", "nicht",
    "sich", "auch", "an", "über", "allen", "sind", "werden", "alle"
];

// 1. Text in Wörter aufteilen und HTML-Tags entfernen
const cleanWords = text
    .toLowerCase() // In Kleinbuchstaben umwandeln
    .replace(/<\/?[^>]+(>|$)/g, "") // HTML-Tags entfernen
    .replace(/[^a-zäöüß0-9\s\-]/g, "") // Sonderzeichen entfernen
    .split(/\s+/); // In Wörter aufteilen

// 2. Stoppwörter filtern
const filteredWords = cleanWords.filter(word => !stopWords.includes(word) && word.length > 1);

// 3. Häufigkeiten der Wörter berechnen
const wordFrequencies = filteredWords.reduce((freq, word) => {
    freq[word] = (freq[word] || 0) + 1;
    return freq;
}, {});

// 4. Sortieren und die 3 häufigsten Wörter finden
const topWords = Object.entries(wordFrequencies)
    .sort(([, a], [, b]) => b - a) // Nach Häufigkeit absteigend sortieren
    .slice(0, 3) // Top 3 Begriffe auswählen
    .map(([word, count]) => ({ word, count })); // Ergebnisse in ein lesbares Format bringen

// Ergebnis ausgeben
console.log("---Top 3 häufigste Begriffe---");
console.log(topWords);
