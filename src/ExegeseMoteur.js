/**
 * Moteur unifié d'exégèse littéraire et traditionnelle.
 * Pure JS (Node.js / Browser / Worker), zéro dépendance DOM.
 */
class ExegeseMoteur {
  constructor(options = {}) {
    // Seuil minimal de points pondérés pour valider un thème ou un registre
    this.seuilValidation = options.seuilValidation || 3;

    // 1. TOPOÏ (Lieux communs rhétoriques - Curtius)
    this.topoi = {
      locusAmoenus: {
        titre: "Locus Amoenus (Le lieu idéal)",
        lexique: { verger: 3, source: 2, ombre: 1, brise: 2, prairie: 3, fleurs: 1, douceur: 1, bocage: 3 },
        glose: "Évocation d'un cadre naturel idyllique, refuge hors du temps propice à la contemplation."
      },
      vanitas: {
        titre: "Vanitas & Memento Mori (La fuite du temps)",
        lexique: { cendre: 3, poussière: 3, sablier: 3, faner: 2, tombeau: 3, éphémère: 3, automne: 1, ruine: 2 },
        glose: "Méditation sur la précarité de l'existence humaine et l'inéluctabilité du déclin."
      },
      ubiSunt: {
        titre: "Ubi Sunt (La nostalgie du passé)",
        lexique: { jadis: 3, autrefois: 3, naguère: 3, disparu: 2, souvenir: 1, mémoire: 1, oubli: 2 },
        glose: "Interrogation mélancolique sur la disparition des êtres et des grandeurs d'antan."
      },
      katabasis: {
        titre: "Katabasis (La descente aux enfers)",
        lexique: { abîme: 3, gouffre: 3, ténèbres: 3, labyrinthe: 3, souterrain: 2, nuit: 1, profondeur: 2 },
        glose: "Épreuve initiatique passant par la confrontation avec l'obscurité ou le deuil."
      }
    };

    // 2. REGISTRES LITTÉRAIRES
    this.registres = {
      tragique: {
        titre: "Tragique",
        lexique: { destin: 3, fatalité: 3, maudit: 3, châtiment: 3, fureur: 2, sang: 2, larmes: 1, dieux: 2 }
      },
      elegiaque: {
        titre: "Élégiaque",
        lexique: { plainte: 3, regret: 2, solitude: 2, absence: 2, pleurs: 2, soupir: 2, tristesse: 1, deuil: 3 }
      },
      epique: {
        titre: "Épique",
        lexique: { gloire: 3, héros: 3, bataille: 2, triomphe: 3, vaillance: 3, conquête: 2, immense: 1, honneur: 2 }
      },
      lyrique: {
        titre: "Lyrique",
        lexique: { extase: 3, ivresse: 2, passion: 2, âme: 2, cœur: 1, amour: 1, désir: 2, chant: 2 }
      }
    };

    // 3. QUATRE ÉLÉMENTS (Poétique matérielle - Bachelard)
    this.elements = {
      feu: { titre: "Feu", lexique: { brasier: 3, flamme: 2, étincelle: 2, ardeur: 2, soleil: 1, brûler: 2 } },
      eau: { titre: "Eau", lexique: { fleuve: 2, océan: 2, vague: 2, source: 2, flot: 2, mer: 1, pluie: 1, onde: 3 } },
      air: { titre: "Air", lexique: { tempête: 3, azur: 3, souffle: 2, brise: 2, envol: 2, vent: 1, ciel: 1, nuage: 1 } },
      terre: { titre: "Terre", lexique: { argile: 3, racine: 2, rocher: 2, montagne: 2, forêt: 2, pierre: 1, sable: 1 } }
    };

    // 4. FONCTIONS NARRATIVES (Morphologie du conte - Vladimir Propp)
    this.fonctionsPropp = {
      manque: {
        titre: "Le Manque ou Méfait initial",
        lexique: { exil: 3, privation: 3, volé: 2, perdu: 1, famine: 3, enlevé: 3, disparu: 2 },
        glose: "Rupture de l'équilibre originel rendant la quête nécessaire."
      },
      depart: {
        titre: "Le Départ du Héros",
        lexique: { errance: 3, seuil: 3, horizon: 2, voyage: 2, quitter: 1, route: 1, chemin: 1 },
        glose: "Franchissement de la frontière entre le monde familier et l'inconnu."
      },
      donateur: {
        titre: "L'Épreuve du Donateur",
        lexique: { oracle: 3, talisman: 3, énigme: 3, vieillard: 2, épée: 2, conseil: 1, clé: 2 },
        glose: "Rencontre initiatique permettant d'obtenir l'auxiliaire ou le savoir."
      },
      combat: {
        titre: "L'Affrontement (Le Combat)",
        lexique: { dragon: 3, duel: 3, monstre: 3, péril: 2, combat: 2, lutte: 2, blessure: 2 },
        glose: "Confrontation directe avec l'antagoniste ou l'épreuve majeure."
      },
      transfiguration: {
        titre: "La Transfiguration et le Retour",
        lexique: { renaissance: 3, couronne: 3, noces: 3, royaume: 2, victoire: 2, retour: 1, lumière: 1 },
        glose: "Rétablissement de l'ordre supérieur et accomplissement du héros."
      }
    };

    // 5. QUATRE SENS DE L'ÉCRITURE (Herméneutique médiévale)
    this.quatreSens = {
      litteral: {
        titre: "Sens Littéral (Historia)",
        lexique: { pain: 2, maison: 2, main: 1, corps: 1, marcher: 1, arbre: 1, pierre: 1 },
        glose: "Le plan des faits bruts et de la matérialité immédiate."
      },
      allegorique: {
        titre: "Sens Allégorique (Allegoria)",
        lexique: { allégorie: 3, mystère: 3, symbole: 3, miroir: 2, voile: 2, signe: 2, figure: 2 },
        glose: "Les réalités cachées derrière le voile des apparences."
      },
      tropologique: {
        titre: "Sens Tropologique / Moral (Moralis)",
        lexique: { vertu: 3, vice: 3, conscience: 3, faute: 2, devoir: 2, justice: 2, orgueil: 2, sagesse: 2 },
        glose: "L'enseignement éthique pour la conduite de l'âme."
      },
      anagogique: {
        titre: "Sens Anagogique (Anagogia)",
        lexique: { transcendance: 3, éternité: 3, divin: 3, sacré: 3, absolu: 3, infini: 2, ciel: 1, âme: 1 },
        glose: "La fin ultime et l'élévation spirituelle."
      }
    };
  }

  /**
   * Prépare le texte en préservant la ponctuation pour l'analyse syntaxique/prosodique.
   */
  preparerTexte(texte) {
    const lignes = texte.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const phrases = texte.split(/[.!?]+/).map(p => p.trim()).filter(Boolean);
    const mots = texte
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()«»"’']/g, " ")
      .split(/\s+/)
      .filter(m => m.length > 2);

    return { lignes, phrases, mots };
  }

  /**
   * Évalue une grille avec calcul de score pondéré, densité et filtrage par seuil.
   */
  evaluerGrillePonderee(mots, dictionnaire, seuilOverride = null) {
    const seuil = seuilOverride !== null ? seuilOverride : this.seuilValidation;
    const totalMots = Math.max(mots.length, 1);
    const resultats = [];

    for (const [cle, entree] of Object.entries(dictionnaire)) {
      let scoreBrut = 0;
      const occurrences = new Map();

      for (const mot of mots) {
        for (const [racine, poids] of Object.entries(entree.lexique)) {
          // Correspondance exacte ou préfixe pour gérer les pluriels/conjugaisons simples
          if (mot === racine || (racine.length >= 4 && mot.startsWith(racine))) {
            scoreBrut += poids;
            occurrences.set(mot, (occurrences.get(mot) || 0) + 1);
            break;
          }
        }
      }

      // Bonus de diversité lexicale : plusieurs mots différents valent plus qu'un mot répété
      const motsUniques = occurrences.size;
      const scorePondere = scoreBrut + (motsUniques > 1 ? motsUniques * 0.5 : 0);

      if (scorePondere >= seuil) {
        resultats.push({
          id: cle,
          titre: entree.titre,
          scorePondere: Number(scorePondere.toFixed(1)),
          densitePourcent: Number(((motsUniques / totalMots) * 100).toFixed(1)),
          termesReleves: Array.from(occurrences.keys()),
          ...(entree.glose && { glose: entree.glose })
        });
      }
    }

    // Trie par pertinence décroissante
    return resultats.sort((a, b) => b.scorePondere - a.scorePondere);
  }

  /**
   * Analyse rhétorique (Anaphores, Comparaisons, Antithèses basiques).
   */
  analyserRhetorique(phrases) {
    const figures = [];

    // 1. Anaphore
    for (let i = 0; i < phrases.length - 1; i++) {
      const m1 = phrases[i].split(/\s+/)[0]?.toLowerCase();
      const m2 = phrases[i + 1].split(/\s+/)[0]?.toLowerCase();
      if (m1 && m1 === m2 && m1.length > 2) {
        figures.push({
          figure: "Anaphore",
          extrait: `« ${phrases[i]}... / ${phrases[i + 1]}... »`,
          effet: "Insistance rythmique propre à l'éloquence classique."
        });
      }
    }

    // 2. Comparaison explicite
    const regexComp = /\b(comme|tel|telle|tels|telles|semblable à|pareil à)\b/i;
    for (const phrase of phrases) {
      if (regexComp.test(phrase)) {
        figures.push({
          figure: "Comparaison",
          extrait: `« ${phrase} »`,
          effet: "Rapprochement analogique éclairant l'idée par l'image."
        });
      }
    }

    return figures;
  }

  /**
   * Prosodie et métrique française classique.
   */
  analyserProsodie(lignes) {
    if (lignes.length < 2) return null; // Pas d'analyse métrique sur un bloc de prose unique

    const metresCanoniques = {
      6: "Hexasyllabe",
      7: "Heptasyllabe",
      8: "Octosyllabe",
      10: "Décasyllabe",
      12: "Alexandrin"
    };

    const details = lignes.map(vers => {
      let propre = vers.toLowerCase().trim().replace(/[.,;:!?«»"’']/g, "");
      propre = propre.replace(/e(s|nt)?$/, "");
      propre = propre.replace(/e(?=\s+[aeiouyàâäéèêëîïôöùûü])/g, "");
      const voyelles = propre.match(/[aeiouyàâäéèêëîïôöùûü]+/g);
      const syllabes = voyelles ? voyelles.length : 0;

      return {
        vers,
        syllabes,
        metre: metresCanoniques[syllabes] || `Mètre libre (${syllabes} syllabes)`
      };
    });

    const nbAlexandrins = details.filter(d => d.syllabes === 12).length;
    const nbOctosyllabes = details.filter(d => d.syllabes === 8).length;

    return {
      estVersifie: (nbAlexandrins + nbOctosyllabes) >= lignes.length * 0.5,
      dominante: nbAlexandrins > nbOctosyllabes ? "Alexandrin" : (nbOctosyllabes > 0 ? "Octosyllabe" : "Vers libre / Prose"),
      details
    };
  }

  /**
   * Génère une synthèse littéraire structurée et hiérarchisée par les scores.
   */
  redigerExegese(analyse) {
    const paragraphes = [];

    // 1. Tonalité & Registres
    if (analyse.registres.length > 0) {
      const principal = analyse.registres[0];
      const secondaire = analyse.registres[1];
      let texteReg = `**Tonalité :** Le texte est dominé par le registre **${principal.titre.toLowerCase()}** (indice ${principal.scorePondere}, porté par *${principal.termesReleves.join(", ")}*)`;
      if (secondaire) {
        texteReg += `, nuancé par une coloration **${secondaire.titre.toLowerCase()}**`;
      }
      paragraphes.push(texteReg + ".");
    }

    // 2. Topoï (Lieux communs)
    if (analyse.topoi.length > 0) {
      const topoiTxt = analyse.topoi.map(t => `- **${t.titre}** *(score : ${t.scorePondere})* : ${t.glose}`).join("\n");
      paragraphes.push(`**Survivances topiques :**\n${topoiTxt}`);
    }

    // 3. Strates herméneutiques (Quatre sens)
    if (analyse.quatreSens.length > 0) {
      const sensTxt = analyse.quatreSens.map(s => `- **${s.titre}** : ${s.glose} *(indices : ${s.termesReleves.join(", ")})*`).join("\n");
      paragraphes.push(`**Niveaux de lecture (Herméneutique) :**\n${sensTxt}`);
    }

    // 4. Architecture narrative (Propp)
    if (analyse.propp.length > 0) {
      const parcours = analyse.propp.map(p => `**${p.titre}**`).join(" → ");
      paragraphes.push(`**Séquence mythique (Propp) :** Le récit mobilise les fonctions suivantes : ${parcours}.`);
    }

    // 5. Élément dominant & Prosodie
    const notesStyle = [];
    if (analyse.elements.length > 0) {
      notesStyle.push(`l'imaginaire matériel est gouverné par l'élément **${analyse.elements[0].titre}**`);
    }
    if (analyse.prosodie && analyse.prosodie.estVersifie) {
      notesStyle.push(`la forme s'appuie sur la cadence classique de l'**${analyse.prosodie.dominante}**`);
    }
    if (analyse.rhetorique.length > 0) {
      const figs = [...new Set(analyse.rhetorique.map(f => f.figure))].join(", ");
      notesStyle.push(`le discours est structuré par des figures identifiables (${figs})`);
    }

    if (notesStyle.length > 0) {
      paragraphes.push(`**Poétique et forme :** Sur le plan formel, ${notesStyle.join(" ; ")}.`);
    }

    if (paragraphes.length === 0) {
      return "Le texte présente une écriture blanche ou neutre : aucun archétype traditionnel ne franchit le seuil de résonance établi.";
    }

    return paragraphes.join("\n\n");
  }

  /**
   * Point d'entrée unique.
   */
  interpreter(texte) {
    const { lignes, phrases, mots } = this.preparerTexte(texte);

    const analyse = {
      metriques: {
        motsSignificatifs: mots.length,
        phrases: phrases.length,
        lignes: lignes.length
      },
      registres: this.evaluerGrillePonderee(mots, this.registres),
      topoi: this.evaluerGrillePonderee(mots, this.topoi),
      elements: this.evaluerGrillePonderee(mots, this.elements, 2.5),
      propp: this.evaluerGrillePonderee(mots, this.fonctionsPropp),
      quatreSens: this.evaluerGrillePonderee(mots, this.quatreSens),
      rhetorique: this.analyserRhetorique(phrases),
      prosodie: this.analyserProsodie(lignes)
    };

    return {
      exegese: this.redigerExegese(analyse),
      matrice: analyse
    };
  }
}

// Export universel
if (typeof module !== "undefined" && module.exports) {
  module.exports = ExegeseMoteur;
}
