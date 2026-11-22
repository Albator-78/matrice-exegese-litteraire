#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const ExegeseMoteur = require("./src/ExegeseMoteur");

const args = process.argv.slice(2);
let texteAAnalyser = "";
let seuil = 3;

// Gestion simple des options (--seuil=4 ou fichier/texte direct)
args.forEach(arg => {
  if (arg.startsWith("--seuil=")) {
    seuil = parseFloat(arg.split("=")[1]) || 3;
  } else if (fs.existsSync(arg) && fs.lstatSync(arg).isFile()) {
    texteAAnalyser = fs.readFileSync(arg, "utf-8");
  } else {
    texteAAnalyser += (texteAAnalyser ? " " : "") + arg;
  }
});

// Texte de démonstration si aucun argument n'est fourni
if (!texteAAnalyser.trim()) {
  console.log("ℹ️  Aucun texte fourni. Lancement sur l'extrait de démonstration :\n");
  texteAAnalyser = `
    Jadis sous le verger où brillait le soleil,
    Nos cœurs goûtaient la paix d'un printemps éternel.
    Aujourd'hui le tombeau, la cendre et la poussière,
    Recouvrent de l'oubli notre ancienne lumière.
  `;
}

const moteur = new ExegeseMoteur({ seuilValidation: seuil });
const resultat = moteur.interpreter(texteAAnalyser);

console.log("=================================================================");
console.log(" 📜 EXÉGÈSE LITTÉRAIRE & TRADITIONNELLE");
console.log("=================================================================\n");
console.log(resultat.exegese);

if (resultat.matrice.prosodie && resultat.matrice.prosodie.estVersifie) {
  console.log("\n-----------------------------------------------------------------");
  console.log(" 🎼 ANALYSE MÉTRIQUE");
  console.log("-----------------------------------------------------------------");
  resultat.matrice.prosodie.details.forEach(v => {
    console.log(` [${v.syllabes} syll. | ${v.metre}] ${v.vers}`);
  });
}
console.log("\n=================================================================");
