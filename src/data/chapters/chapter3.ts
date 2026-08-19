import { ChapterConfig } from '../../types';

export const chapter3: ChapterConfig = {
  id: 'chapter-3',
  chapterNumber: 3,
  title: 'Sestavljanje dogodkov & Pogojna verjetnost',
  subtitle: 'Kombiniranje možnosti in posodabljanje verjetnosti ob novih namigih',
  description: 'Nauči se pravilno seštevati in množiti verjetnosti, odkrij Vennove diagrame ter razumi, kako nova informacija spremeni verjetnost dogodka.',
  iconName: 'GitBranch',
  color: '#8b5cf6',
  units: [
    {
      id: 'unit-3-1',
      unitNumber: '3.1',
      chapterId: 'chapter-3',
      title: 'Dogodka ALI in IN (Unija in Presek)',
      subtitle: 'Pravilo seštevanja in zakaj ne smemo dvakrat šteti preseka',
      leadParagraph: 'Kadar nas zanima verjetnost, da se zgodi dogodek A ALI dogodek B (npr. da vržemo sodo število ALI število večje od 4), njuni verjetnosti seštejemo. Če pa se dogodka lahko zgodita hkrati, moramo njuno prekrivanje enkrat odšteti, da ga ne štejemo dvakrat!',
      deepDive: 'To je temeljno pravilo vključitve in izključitve: P(A ∪ B) = P(A) + P(B) - P(A ∩ B). Če se dogodka izključujeta (npr. kovanec ne more biti hkrati cifra in grb), je presek enak 0 in verjetnosti preprosto seštejemo.',
      mnemonic: {
        eli5: 'Predstavljaj si dva kroga na tleh (Vennov diagram): če želiš prešteti vse ljudi v obeh krogih, moraš paziti, da tistih, ki stojijo z eno nogo v obeh krogih, ne prešteješ dvakrat.',
        anchor: 'ALI pomeni seštevanje (z odštetjem preseka); IN pomeni množenje.',
        fallacyWarning: {
          name: 'Dvojno štetje skupnih možnosti',
          description: 'Preprosto seštevanje verjetnosti dveh dogodkov, ki se deloma prekrivata.',
          example: 'Če je v razredu 60 % športnikov in 50 % glasbenikov, to ne pomeni 110 % ljudi – mnogi so namreč oboje hkrati!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Ko iščeš verjetnost za A ali B, preštej vse ugodne izide, vendar skupnih ne štej dvakrat.',
        simpleExplanation: 'Pri metanju kocke z 6 ploskvami: soda števila so {2, 4, 6} (3 možnosti), števila večja od 4 pa so {5, 6} (2 možnosti). Število 6 spada v obe skupini. Skupaj imamo torej {2, 4, 5, 6}, kar so 4 možnosti od 6 (66,7 %).',
        practicalInsight: 'To pravilo je osnova pri načrtovanju zanesljivosti sistemov (npr. letalo ima dva neodvisna motorja; da letalo strmoglavi, morata odpovedati motor 1 IN motor 2).',
        mathematicalTheory: 'Za poljubna dva dogodka velja adicijski izrek: P(A \\cup B) = P(A) + P(B) - P(A \\cap B).'
      },
      textbookWisdom: {
        simpleQuote: 'Ko iščeš verjetnost za A ali B, preštej vse ugodne izide, vendar skupnih ne štej dvakrat.',
        simpleExplanation: 'Pri metanju kocke z 6 ploskvami: soda števila so {2, 4, 6} (3 možnosti), števila večja od 4 pa so {5, 6} (2 možnosti). Število 6 spada v obe skupini. Skupaj imamo torej {2, 4, 5, 6}, kar so 4 možnosti od 6 (66,7 %).',
        practicalInsight: 'To pravilo je osnova pri načrtovanju zanesljivosti sistemov (npr. letalo ima dva neodvisna motorja; da letalo strmoglavi, morata odpovedati motor 1 IN motor 2).',
        mathematicalTheory: 'Za poljubna dva dogodka velja adicijski izrek: P(A \\cup B) = P(A) + P(B) - P(A \\cap B).'
      },
      cueBannerText: 'Premikajte kroga A in B na Vennovem diagramu ter opazujte samodejno odštevanje preseka.',
      poeQuiz: {
        question: 'Iz standardnega kupa 52 kart izvlečemo eno karto. Kolikšna je verjetnost, da je karta Srce ALI Kralj?',
        prompt: 'Pomisli, ali obstaja karta, ki je hkrati Srce in Kralj:',
        options: [
          {
            id: 'opt-1',
            text: '16/52 (približno 30,8 %), ker je v kupu 13 src in 4 kralji, a je Srčni kralj že med srci.',
            isCorrect: true,
            explanation: 'Odlično! 13/52 + 4/52 - 1/52 = 16/52. Brez odštevanja srčnega kralja bi napačno dobili 17/52.'
          },
          {
            id: 'opt-2',
            text: '17/52, ker seštejemo 13 src in 4 kralje.',
            isCorrect: false,
            explanation: 'Napačno. Srčni kralj bi bil v tem primeru šteti dvakrat.'
          },
          {
            id: 'opt-3',
            text: '4/52, ker gledamo le kralje.',
            isCorrect: false,
            explanation: 'Napačno. Vprašanje se glasi Srce ALI Kralj.'
          }
        ],
        insight: 'Pravilo seštevanja z odštevanjem preseka preprečuje napake dvojnega štetja!',
        followUpExperiment: 'Spreminjaj prekrivanje krogov na platnu in opazuj spremembo vsote.'
      },
      mathProof: {
        summaryLatex: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
        steps: [
          {
            title: '1. Razdelitev na disjunktne dele',
            latex: 'A \\cup B = (A \\setminus B) \\cup (A \\cap B) \\cup (B \\setminus A)',
            explanation: 'Vennov diagram razdelimo na tri ločena področja, ki se ne prekrivajo.'
          },
          {
            title: '2. Izpeljava seštevalnega pravila',
            latex: 'P(A \\cup B) = [P(A) - P(A \\cap B)] + P(A \\cap B) + [P(B) - P(A \\cap B)] = P(A) + P(B) - P(A \\cap B)',
            explanation: 'Seštevek vseh treh delov da natančno formulo unije dveh dogodkov.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Verjetnost unije kart (Srce ALI Kralj) v Pythonu',
        defaultCode: `karten = 52
srca = 13
kralji = 4
srcni_kralj = 1

# P(Srce ali Kralj) = P(Srce) + P(Kralj) - P(Srčni Kralj)
p_unija = (srca / karten) + (kralji / karten) - (srcni_kralj / karten)

print(f"P(Srce):        {srca/karten:.3f} (13/52)")
print(f"P(Kralj):       {kralji/karten:.3f} (4/52)")
print(f"P(Srčni kralj): {srcni_kralj/karten:.3f} (1/52)")
print(f"P(Srce ALI Kralj) = {p_unija:.3f} (16/52 = {p_unija:.1%})")
`,
        description: 'Izračunaj verjetnost s pravilom seštevanja.',
        runCode: () => {
          return {
            output: `[Python Simulacija]
P(Srce):        0.250 (13/52)
P(Kralj):       0.077 (4/52)
P(Srčni kralj): 0.019 (1/52)
P(Srce ALI Kralj) = 0.308 (16/52 = 30.8%)
Sklep: Odštevanje skupne karte da točen rezultat!`
          };
        }
      },
      initialParams: { pA: 0.4, pB: 0.35, overlap: 0.15 }
    },
    {
      id: 'unit-3-2',
      unitNumber: '3.2',
      chapterId: 'chapter-3',
      title: 'Pogojna verjetnost',
      subtitle: 'Kaj se zgodi z verjetnostjo, ko izvemo novo informacijo?',
      leadParagraph: 'Pogojna verjetnost meri možnost dogodka A ob vedenju, da se je dogodek B že zgodil. Zapisujemo jo kot P(A|B), kar preberemo: »verjetnost za A pod pogojem B«.',
      deepDive: 'Nova informacija zoži naš svet vseh možnih izidov (prostor dogodkov). Če vržeš kocko, je možnost za šestico 1/6. Če pa ti prijatelj namigne »padlo je sodo število«, se svet možnih izidov takoj skrči na {2, 4, 6}, verjetnost za šestico pa poskoči na 1/3 (33,3 %)!',
      mnemonic: {
        eli5: 'Predstavljaj si iskanje prijatelja v celi šoli: možnost, da je v določeni učilnici, je majhna. Če pa izveš, da je v drugem nadstropju, takoj odmisliš vsa ostala nadstropja in ga iščeš le še med tistimi učilnicami.',
        anchor: 'Pogoj skrči prostor možnosti le na tisto, kar že zanesljivo vemo.',
        fallacyWarning: {
          name: 'Zamenjava smeri pogoja P(A|B) ≠ P(B|A)',
          description: 'Zmotno prepričanje, da sta verjetnosti v obeh smereh enaki.',
          example: 'Skoraj vsi papeži so moški (P(Moški | Papež) ≈ 100 %), vendar skoraj noben moški ni papež (P(Papež | Moški) ≈ 0,0000001 %)!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Ko dobiš nov podatek, vedno posodobi svoj krog možnih izidov.',
        simpleExplanation: 'Pogojna verjetnost je preprosto razmerje: preštejemo primere, kjer sta se zgodila oba dogodka hkrati, in to delimo z vsemi primeri, kjer se je zgodil pogojni dogodek.',
        practicalInsight: 'Zdravniki jo uporabljajo pri branju laboratorijskih izvidov: kolikšna je verjetnost, da je pacient bolan, če je test pozitiven?',
        mathematicalTheory: 'Definicija pogojne verjetnosti: P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}, \\quad \\text{kjer je } P(B) > 0.'
      },
      textbookWisdom: {
        simpleQuote: 'Ko dobiš nov podatek, vedno posodobi svoj krog možnih izidov.',
        simpleExplanation: 'Pogojna verjetnost je preprosto razmerje: preštejemo primere, kjer sta se zgodila oba dogodka hkrati, in to delimo z vsemi primeri, kjer se je zgodil pogojni dogodek.',
        practicalInsight: 'Zdravniki jo uporabljajo pri branju laboratorijskih izvidov: kolikšna je verjetnost, da je pacient bolan, če je test pozitiven?',
        mathematicalTheory: 'Definicija pogojne verjetnosti: P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}, \\quad \\text{kjer je } P(B) > 0.'
      },
      cueBannerText: 'Izberite pogoj B na platnu in opazujte, kako se prostor izidov omeji na izbrano podmnožico.',
      poeQuiz: {
        question: 'Družina ima dva otroka. Izveš, da je vsaj eden od otrok fantek. Kolikšna je verjetnost, da sta OBA otroka fantka?',
        prompt: 'Zapiši vse 4 možne kombinacije spolov dveh otrok: (F,F), (F,D), (D,F), (D,D):',
        options: [
          {
            id: 'opt-1',
            text: '1/3 (približno 33,3 %), ker informacija izloči le možnost (D,D), ostanejo pa 3 možnosti: {(F,F), (F,D), (D,F)}.',
            isCorrect: true,
            explanation: 'Odlično! To je znamenita uganka: pogoj »vsaj eden je fantek« pusti 3 enako verjetne možnosti, le v eni od njih pa sta oba fantka.'
          },
          {
            id: 'opt-2',
            text: '1/2 (50 %), ker ima vsak otrok 50 % možnost.',
            isCorrect: false,
            explanation: 'Napačno. To bi veljalo le, če bi vedeli, da je starejši otrok fantek.'
          },
          {
            id: 'opt-3',
            text: '1/4 (25 %), ker so štiri možnosti.',
            isCorrect: false,
            explanation: 'Napačno. Možnost (D, D) je s pogojem že izključena.'
          }
        ],
        insight: 'Pogojna verjetnost pogosto preseneti našo prvo intuicijo, ker pravilno skrči prostor stanj!',
        followUpExperiment: 'Preveri razdelitev verjetnosti na interaktivnem drevesu na platnu.'
      },
      mathProof: {
        summaryLatex: 'P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}',
        steps: [
          {
            title: '1. Omejitev na pogoj B',
            latex: '\\Omega\' = B',
            explanation: 'Za novi univerzalni prostor vzamemo le izide, kjer velja pogoj B.'
          },
          {
            title: '2. Relativni delež ugodnih izidov',
            latex: 'P(A \\mid B) = \\frac{|A \\cap B|}{|B|} = \\frac{|A \\cap B|/|\\Omega|}{|B|/|\\Omega|} = \\frac{P(A \\cap B)}{P(B)}',
            explanation: 'Delež dogodka A znotraj pogoja B je natanko definicija pogojne verjetnosti.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Simulacija uganke o dveh otrocih v Pythonu',
        defaultCode: `import numpy as np

# Simuliramo 100.000 družin z dvema otrokoma (0 = Deklica, 1 = Fantek)
n = 100000
otrok1 = np.random.choice([0, 1], size=n)
otrok2 = np.random.choice([0, 1], size=n)

# Pogoj: vsaj eden je fantek
vsaj_eden_fantek = (otrok1 == 1) | (otrok2 == 1)
oba_fantka = (otrok1 == 1) & (otrok2 == 1)

pogojna_verjetnost = np.sum(oba_fantka) / np.sum(vsaj_eden_fantek)

print(f"Družin z vsaj enim fantkom: {np.sum(vsaj_eden_fantek)}")
print(f"Družin z obema fantkoma:     {np.sum(oba_fantka)}")
print(f"P(Oba fantka | Vsaj eden fantek) = {pogojna_verjetnost:.1%}")
print("Sklep: Rezultat je točno 1/3 (33.3 %)!")
`,
        description: 'Preveri pogojno verjetnost z računalniško simulacijo.',
        runCode: () => {
          return {
            output: `[Python Simulacija]
Družin z vsaj enim fantkom: 75120
Družin z obema fantkoma:     25040
P(Oba fantka | Vsaj eden fantek) = 33.3%
Sklep: Rezultat je točno 1/3 (33.3 %)!`
          };
        }
      },
      initialParams: { conditionActive: true }
    },
    {
      id: 'unit-3-3',
      unitNumber: '3.3',
      chapterId: 'chapter-3',
      title: 'Neodvisnost dogodkov',
      subtitle: 'Kdaj en dogodek nima prav nobenega vpliva na drugega?',
      leadParagraph: 'Dva dogodka sta neodvisna, če nastop prvega dogodka prav nič ne spremeni verjetnosti drugega dogodka. To pomeni, da je P(A|B) = P(A).',
      deepDive: 'Če sta dogodka neodvisna, je verjetnost, da se zgodita oba hkrati, enaka preprostemu zmnožku: P(A ∩ B) = P(A) × P(B). Če vržeš kovanec in kocko hkrati, je možnost za (Cifra IN 6) enaka 1/2 × 1/6 = 1/12.',
      mnemonic: {
        eli5: 'Neodvisnost je kot dva tujca na dveh različnih celinah: če eden odpre dežnik v Tokiu, to ne vpliva na to, ali bo drugi v Ljubljani naročil pico.',
        anchor: 'Neodvisna dogodka = znanje o enem ne spremeni verjetnosti drugega.',
        fallacyWarning: {
          name: 'Zamenjava neodvisnosti z nezdružljivostjo',
          description: 'Zmotno prepričanje, da dogodka, ki se ne moreta zgoditi hkrati, pomenita neodvisnost.',
          example: 'Če vržeš kovanec, se cifra in grb ne moreta zgoditi hkrati (sta disjunktna), vendar sta močno ODVISNA (če pade cifra, je možnost za grb takoj 0 %)!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Če informacija o prvem dogodku ne spremeni možnosti za drugega, sta dogodka neodvisna.',
        simpleExplanation: 'Pri neodvisnih dogodkih lahko verjetnosti preprosto zmnožimo. Če ima vsak korak 90 % zanesljivost, ima proces s tremi neodvisnimi koraki zanesljivost 0,9 × 0,9 × 0,9 = 72,9 %.',
        practicalInsight: 'V kibernetski varnosti dvofaktorska avtentikacija (2FA) deluje prav zato, ker sta geslo in telefon dva neodvisna varnostna kanala.',
        mathematicalTheory: 'Dogodka A in B sta neodvisna natanko tedaj, ko velja produktno pravilo: P(A \\cap B) = P(A) \\cdot P(B).'
      },
      textbookWisdom: {
        simpleQuote: 'Če informacija o prvem dogodku ne spremeni možnosti za drugega, sta dogodka neodvisna.',
        simpleExplanation: 'Pri neodvisnih dogodkih lahko verjetnosti preprosto zmnožimo. Če ima vsak korak 90 % zanesljivost, ima proces s tremi neodvisnimi koraki zanesljivost 0,9 × 0,9 × 0,9 = 72,9 %.',
        practicalInsight: 'V kibernetski varnosti dvofaktorska avtentikacija (2FA) deluje prav zato, ker sta geslo in telefon dva neodvisna varnostna kanala.',
        mathematicalTheory: 'Dogodka A in B sta neodvisna natanko tedaj, ko velja produktno pravilo: P(A \\cap B) = P(A) \\cdot P(B).'
      },
      cueBannerText: 'Preizkusite neodvisno sestavljanje kolesa sreče in kocke na platnu ter preverite zmnožek verjetnosti.',
      poeQuiz: {
        question: 'Varnostni sistem ima 3 neodvisne senzorje. Vsak senzor ima 90 % možnost (0.90), da zazna vlomilca. Kolikšna je verjetnost, da vlomilca zazna VSAJ EDEN senzor?',
        prompt: 'Namig: izračunaj nasprotni dogodek (da VSI TRIJE senzorji hkrati odpovejo):',
        options: [
          {
            id: 'opt-1',
            text: '99,9 % (skoraj 100 %), ker je možnost hkratne odpovedi vseh treh le 0.1 × 0.1 × 0.1 = 0.001 (0.1 %).',
            isCorrect: true,
            explanation: 'Odlično! P(vsaj eden) = 1 - P(vsi odpovejo) = 1 - 0.001 = 0.999 (99,9 %). To je moč neodvisnih varnostnih rezerv!'
          },
          {
            id: 'opt-2',
            text: '90 %, ker je to verjetnost posameznega senzorja.',
            isCorrect: false,
            explanation: 'Napačno. Trije neodvisni senzorji skupaj nudijo bistveno večjo zaščito.'
          },
          {
            id: 'opt-3',
            text: '270 %, ker seštejemo 90 % + 90 % + 90 %.',
            isCorrect: false,
            explanation: 'Napačno. Verjetnost nikoli ne more preseči 100 %!'
          }
        ],
        insight: 'Združevanje neodvisnih sistemov izjemno zmanjša tveganje skupne napake!',
        followUpExperiment: 'Spremeni zanesljivost senzorjev na platnu in opazuj krivuljo skupne zanesljivosti.'
      },
      mathProof: {
        summaryLatex: 'P(A \\cap B) = P(A) \\cdot P(B) \\iff P(A \\mid B) = P(A)',
        steps: [
          {
            title: '1. Povezava s pogojno verjetnostjo',
            latex: 'P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}',
            explanation: 'Uporabimo osnovno formulo pogojne verjetnosti.'
          },
          {
            title: '2. Izenačitev ob neodvisnosti',
            latex: '\\frac{P(A \\cap B)}{P(B)} = P(A) \\implies P(A \\cap B) = P(A) \\cdot P(B)',
            explanation: 'Če pogoj ne spremeni verjetnosti, dobimo pravilo zmnožka neodvisnih dogodkov.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Izračun zanesljivosti 3 neodvisnih senzorjev',
        defaultCode: `p_zaznava = 0.90
p_odpoved_enega = 1 - p_zaznava # 0.10

# Verjetnost, da vsi trije neodvisno odpovejo
p_vsi_odpovejo = p_odpoved_enega ** 3

# Verjetnost, da vsaj eden uspešno zazna
p_uspeh_sistema = 1 - p_vsi_odpovejo

print(f"Možnost odpovedi 1 senzorja:  {p_odpoved_enega:.1%}")
print(f"Možnost hkratne odpovedi vseh: {p_vsi_odpovejo:.3%}")
print(f"Skupna zanesljivost sistema:   {p_uspeh_sistema:.3%}")
`,
        description: 'Izračunaj skupno zanesljivost več neodvisnih enot.',
        runCode: () => {
          return {
            output: `[Python Simulacija]
Možnost odpovedi 1 senzorja:  10.0%
Možnost hkratne odpovedi vseh: 0.100%
Skupna zanesljivost sistema:   99.900%
Sklep: Trije neodvisni senzorji zmanjšajo možnost napake s 10 % na le 0.1 %!`
          };
        }
      },
      initialParams: { sensorsCount: 3 }
    }
  ]
};
