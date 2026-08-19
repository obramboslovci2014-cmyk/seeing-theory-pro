import { ChapterConfig } from '../../types';

export const chapter2: ChapterConfig = {
  id: 'chapter-2',
  chapterNumber: 2,
  title: 'Verjetnost & Naključni dogodki',
  subtitle: 'Kaj je naključje, zakon velikih števil in zakaj kovanec nima spomina',
  description: 'Ko razumemo podatke, preidemo k negotovosti: odkrij zakone, ki vladajo naključnim procesom, spoznaj zakon velikih števil in prepoznaj najpogostejše miselne zablode pri igrah na srečo.',
  iconName: 'Coins',
  color: '#4f46e5',
  units: [
    {
      id: 'unit-2-1',
      unitNumber: '2.1',
      chapterId: 'chapter-2',
      title: 'Kaj je verjetnost? (Met kovanca)',
      subtitle: 'Zakaj pri 10 metih ne dobimo vedno točno 5 cifer?',
      leadParagraph: 'Ko vržemo pošten kovanec, imata cifra in grb povsem enaki možnosti – točno 50 % (ali 0,5). Vendar to ne pomeni, da bomo pri vsakih 10 metih dobili natanko 5 cifer. Verjetnost ne opisuje enega samega dogodka, ampak zakonitost, ki se izrazi šele pri mnogih ponovitvah.',
      deepDive: 'Pri majhnem številu poskusov (npr. 5 ali 10 metov) naključni šum prevladuje. Povsem običajno je, da dobimo 7 cifer ali le 3. Šele ko število metov naraste na stotine ali tisoče, se delež cifer izjemno natančno približa teoretični vrednosti 50 %.',
      mnemonic: {
        eli5: 'Verjetnost je kot vremenska napoved: 50 % verjetnost za dež ne pomeni, da bo deževalo točno pol dneva, temveč da v takšnih vremenskih razmerah dežuje v polovici vseh zgodovinsko zabeleženih dni.',
        anchor: 'Verjetnost meri dolgoročni delež ponovitev, ne pa izida enega posameznega poskusa.',
        fallacyWarning: {
          name: 'Pričakovanje takojšnjega ravnovesja',
          description: 'Napačno prepričanje, da se mora že majhen vzorec takoj ujemati s teoretičnim povprečjem (npr. pričakovanje, da bodo pri 4 metih zagotovo padle natanko 2 cifri).',
          example: 'Če pri 4 metih dobiš 4 cifre, kovanec ni nujno pokvarjen – to se naključno zgodi v približno 6 % vseh primerov.'
        }
      },
      explanationLevels: {
        simpleQuote: 'Naključje na kratek rok močno niha, na dolgi rok pa se vedno uredi v zanesljiv in predvidljiv vzorec.',
        simpleExplanation: 'Verjetnost nam omogoča, da merimo negotovost. Kadar ne moremo napovedati točnega posameznega izida, nam verjetnost pove, kateri izidi so bolj verjetni in kaj se bo zgodilo, ko poskus ponovimo velikokrat. To je temelj za razumevanje vseh tveganj in naključij v naravi.',
        practicalInsight: 'To je ključno v praksi: pri testiranju novih zdravil ali spletnih strani nikoli ne zaupamo le nekaj poskusom, saj bi nas naključje zlahka zavedlo. Potrebujemo dovolj ponovitev, da izločimo šum.',
        mathematicalTheory: 'Za poskus s končnim prostorom enako verjetnih izidov Ω je verjetnost dogodka A določena kot P(A) = |A| / |Ω|.'
      },
      textbookWisdom: {
        simpleQuote: 'Naključje na kratek rok močno niha, na dolgi rok pa se vedno uredi v zanesljiv in predvidljiv vzorec.',
        simpleExplanation: 'Verjetnost nam omogoča, da merimo negotovost. Kadar ne moremo napovedati točnega posameznega izida, nam verjetnost pove, kateri izidi so bolj verjetni in kaj se bo zgodilo, ko poskus ponovimo velikokrat. To je temelj za razumevanje vseh tveganj in naključij v naravi.',
        practicalInsight: 'To je ključno v praksi: pri testiranju novih zdravil ali spletnih strani nikoli ne zaupamo le nekaj poskusom, saj bi nas naključje zlahka zavedlo. Potrebujemo dovolj ponovitev, da izločimo šum.',
        mathematicalTheory: 'Za poskus s končnim prostorom enako verjetnih izidov Ω je verjetnost dogodka A določena kot P(A) = |A| / |Ω|.'
      },
      cueBannerText: 'Izberite gumb [Vrzi kovanec +1] ali [+10] in opazujte nihanje deleža cifer skozi poskuse.',
      poeQuiz: {
        question: 'Kovanec vržeš 10-krat in dobiš 7 cifer ter 3 grbe. Ali to pomeni, da je kovanec nepošten?',
        prompt: 'Pomisli na naravno nihanje pri majhnih vzorcih:',
        options: [
          {
            id: 'opt-1',
            text: 'Ne, pri majhnem vzorcu 10 metov je takšno nihanje povsem običajno in pričakovano.',
            isCorrect: true,
            explanation: 'Tako je! Pri le 10 metih je verjetnost za 7 ali več cifer okoli 17 %, kar je povsem običajen naključni dogodek.'
          },
          {
            id: 'opt-2',
            text: 'Da, kovanec je zagotovo prirejen, saj bi morali dobiti točno 5 cifer.',
            isCorrect: false,
            explanation: 'Napačno. Pri 10 metih le v približno 25 % primerov dobimo natanko 5 cifer.'
          },
          {
            id: 'opt-3',
            text: 'Da, naslednji met mora biti zagotovo grb, da se stanje popravi.',
            isCorrect: false,
            explanation: 'Napačno. Kovanec nima spomina (zmota hazarderja).'
          }
        ],
        insight: 'Pri majhnem številu poskusov naključni šum prevladuje nad pravim povprečjem!',
        followUpExperiment: 'Povečaj število metov na 100 in opazuj, kako se delež približa 0,50.'
      },
      mathProof: {
        summaryLatex: 'P(\\text{Cifra}) = \\lim_{N \\to \\infty} \\frac{\\text{Število cifer}}{N} = 0.5',
        steps: [
          {
            title: '1. Klasična Laplaceova verjetnost',
            latex: 'P(A) = \\frac{|A|}{|\\Omega|} = \\frac{1}{2} = 0.5',
            explanation: 'Kadar so vsi izidi enako verjetni, delimo število ugodnih izidov z vsemi možnimi izidi.'
          },
          {
            title: '2. Frekvenčna definicija verjetnosti',
            latex: 'f_n(A) = \\frac{k_n}{n} \\xrightarrow{n \\to \\infty} P(A)',
            explanation: 'Relativna frekvenca dogodka pri naraščanju števila poskusov konvergira k pravi verjetnosti.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Simulacija metanja kovanca v Pythonu',
        defaultCode: `import numpy as np

# Simulirajmo 10 metov kovanca (1 = Cifra, 0 = Grb)
meti_10 = np.random.choice(['Cifra', 'Grb'], size=10, p=[0.5, 0.5])
delez_10 = np.mean(meti_10 == 'Cifra')

# Simulirajmo 10.000 metov
meti_10k = np.random.choice(['Cifra', 'Grb'], size=10000, p=[0.5, 0.5])
delez_10k = np.mean(meti_10k == 'Cifra')

print(f"Delež cifer pri 10 metih:     {delez_10:.2f} (močno niha!)")
print(f"Delež cifer pri 10.000 metih: {delez_10k:.4f} (izjemno blizu 0.5000)")
`,
        description: 'Zaženi kodo in opazuj, kako večje število poskusov stabilizira rezultat.',
        runCode: () => {
          return {
            output: `[Python Simulacija]
Delež cifer pri 10 metih:     0.7000 (močno niha!)
Delež cifer pri 10.000 metih: 0.5012 (izjemno blizu 0.5000)
Sklep: Pri 10 metih je odstopanje veliko, pri 10.000 pa skoraj nično!`
          };
        }
      },
      initialParams: { p: 0.5 }
    },
    {
      id: 'unit-2-2',
      unitNumber: '2.2',
      chapterId: 'chapter-2',
      title: 'Zakon velikih števil',
      subtitle: 'Zakaj več poskusov prinese stabilen in predvidljiv rezultat',
      leadParagraph: 'Zakon velikih števil je temeljni zakon celotne verjetnosti in statistike: pojasnjuje, zakaj posamezni dogodki sicer ostajajo nepredvidljivi, povprečje velikega števila ponovitev pa postane skoraj popolnoma predvidljivo in stabilno.',
      deepDive: 'Če kovanec vržemo 10-krat, je lahko delež cifer 70 % ali le 20 %. Če pa ga vržemo 10.000-krat, bo delež skoraj zagotovo med 49,5 % in 50,5 %. Posamezna naključna odstopanja se v veliki množici podatkov medsebojno izničijo.',
      mnemonic: {
        eli5: 'Predstavljaj si štetje mimoidočih avtomobilov: če opazuješ le prve 3 avtomobile, so lahko po naključju vsi trije rdeči. Če pa opazuješ 10.000 avtomobilov, bo delež rdečih natanko takšen, kot je njihov delež v celotnem voznem parku države.',
        anchor: 'Več podatkov ko zberemo, manjša je vloga naključne sreče in natančnejša je naša ocena resnice.',
        fallacyWarning: {
          name: 'Zakon majhnih števil (Prehitro posploševanje)',
          description: 'Pogosta napaka, ko na podlagi dveh ali treh osebnih izkušenj sklepamo o splošnem pravilu (npr. »Dvakrat sem poskusil to storitev in je bila slaba, torej je podjetje zanič«). Dva poskusa sta premalo za veljaven sklep.',
          example: 'Če zdravilo preizkusimo le na 5 ljudeh in 4 ozdravijo, še ne vemo, ali zdravilo zares deluje ali pa je šlo le za naključje.'
        }
      },
      explanationLevels: {
        simpleQuote: 'Posamezen poskus je nepredvidljiv, povprečje tisočih poskusov pa je skoraj povsem določeno.',
        simpleExplanation: 'Zakon velikih števil pojasnjuje, zakaj igralnice, zavarovalnice in banke poslujejo z gotovostjo: posamezen igralec lahko zadene glavni dobitek, toda pri milijonih iger igralnica vedno zasluži natanko toliko, kot narekuje matematično povprečje.',
        practicalInsight: 'Zato raziskovalci v anketah javnega mnenja sprašujejo 1.000 ljudi in ne le 5 sosedov, znanstveniki pa zdravila testirajo na velikih skupinah pacientov.',
        mathematicalTheory: 'Ko število neodvisnih poskusov n raste proti neskončnosti, vzorčno povprečje z verjetnostjo 1 konvergira k pravi pričakovani vrednosti (krepki zakon velikih števil).'
      },
      textbookWisdom: {
        simpleQuote: 'Posamezen poskus je nepredvidljiv, povprečje tisočih poskusov pa je skoraj povsem določeno.',
        simpleExplanation: 'Zakon velikih števil pojasnjuje, zakaj igralnice, zavarovalnice in banke poslujejo z gotovostjo: posamezen igralec lahko zadene glavni dobitek, toda pri milijonih iger igralnica vedno zasluži natanko toliko, kot narekuje matematično povprečje.',
        practicalInsight: 'Zato raziskovalci v anketah javnega mnenja sprašujejo 1.000 ljudi in ne le 5 sosedov, znanstveniki pa zdravila testirajo na velikih skupinah pacientov.',
        mathematicalTheory: 'Ko število neodvisnih poskusov n raste proti neskončnosti, vzorčno povprečje z verjetnostjo 1 konvergira k pravi pričakovani vrednosti (krepki zakon velikih števil).'
      },
      cueBannerText: 'Dodajte +10 ali več vzorcev in opazujte, kako se empirična krivulja približuje teoretični vrednosti 0,50.',
      poeQuiz: {
        question: 'V mestu sta dve porodnišnici: v večji se vsak dan rodi približno 45 dojenčkov, v manjši pa približno 15 dojenčkov. Običajno je približno 50 % vseh rojenih otrok dečkov. Katera porodnišnica bo v celem letu zabeležila več dni, ko bo delež rojenih dečkov presegel 60 %?',
        prompt: 'Pomisli na vpliv velikosti vzorca na nihanje deleža:',
        options: [
          {
            id: 'opt-1',
            text: 'Manjša porodnišnica, saj manjši vzorci pogosteje doživljajo velika naključna odstopanja.',
            isCorrect: true,
            explanation: 'Odlično! To je slavni Kahnemanov problem. Pri manjšem vzorcu (15 rojstev) je veliko lažje dobiti ekstremni delež kot pri večjem vzorcu (45 rojstev).'
          },
          {
            id: 'opt-2',
            text: 'Večja porodnišnica, saj se tam rodi več otrok.',
            isCorrect: false,
            explanation: 'Napačno. Večje število rojstev stabilizira delež blizu 50 %.'
          },
          {
            id: 'opt-3',
            text: 'Obe porodnišnici bosta zabeležili enako število takšnih dni.',
            isCorrect: false,
            explanation: 'Napačno. Verjetnost za ekstremni odmik je močno odvisna od velikosti vzorca.'
          }
        ],
        insight: 'Manjši vzorci imajo vedno večje nihanje in pogosteje dosegajo ekstremne vrednosti!',
        followUpExperiment: 'Primerjaj krivuljo pri 10 poskusih in pri 500 poskusih na simulacijskem platnu.'
      },
      mathProof: {
        summaryLatex: 'P\\left( \\left| \\bar{X}_n - \\mu \\right| \\ge \\varepsilon \\right) \\le \\frac{\\sigma^2}{n \\varepsilon^2} \\xrightarrow{n \\to \\infty} 0',
        steps: [
          {
            title: '1. Čebiševa neenakost',
            latex: 'P(|X - \\mu| \\ge k\\sigma) \\le \\frac{1}{k^2}',
            explanation: 'Čebiševa neenakost postavlja zgornjo mejo za verjetnost, da se spremenljivka oddalji od povprečja.'
          },
          {
            title: '2. Šibki zakon velikih števil',
            latex: '\\lim_{n \\to \\infty} P(|\\bar{X}_n - \\mu| < \\varepsilon) = 1',
            explanation: 'Za poljubno majhno odstopanje ε gre verjetnost, da je povprečje blizu μ, proti 1.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Konvergenca povprečja k pravi vrednosti',
        defaultCode: `import numpy as np

# Simulacija 1.000 metov poštene kocke (pričakovana vrednost = 3.5)
meti = np.random.randint(1, 7, size=1000)
tekoca_povprecja = np.cumsum(meti) / np.arange(1, 1001)

print(f"Povprečje po 5 metih:   {tekoca_povprecja[4]:.2f}")
print(f"Povprečje po 50 metih:  {tekoca_povprecja[49]:.2f}")
print(f"Povprečje po 500 metih: {tekoca_povprecja[499]:.2f}")
print(f"Povprečje po 1000 metih: {tekoca_povprecja[999]:.2f} (cilj: 3.50)")
`,
        description: 'Preveri, kako se povprečje metov kocke umiri pri 3.50.',
        runCode: () => {
          return {
            output: `[Python Simulacija]
Povprečje po 5 metih:   4.20
Povprečje po 50 metih:  3.62
Povprečje po 500 metih: 3.51
Povprečje po 1000 metih: 3.501 (cilj: 3.50)
Sklep: Z večanjem števila poskusov se povprečje neizprosno približuje pričakovani vrednosti 3.50!`
          };
        }
      },
      initialParams: { numSamples: 100 }
    },
    {
      id: 'unit-2-3',
      unitNumber: '2.3',
      chapterId: 'chapter-2',
      title: 'Zmota hazarderja',
      subtitle: 'Ali ima kovanec spomin in ali nam je sreča »dolžna« dobitek?',
      leadParagraph: 'Če pri metanju poštenega kovanca petkrat zapored pade cifra, mnogi ljudje intuitivno začutijo, da je zdaj »na vrsti grb«. Toda kovanec nima spomina in ne ve, kaj je padlo prej – verjetnost za cifro pri naslednjem metu je še vedno natanko 50 %.',
      deepDive: 'Zmota hazarderja (Gambler\'s Fallacy) je ena najpogostejših miselnih pasti pri sprejemanju odločitev: ljudje zmotno pričakujemo, da mora narava sproti uravnavati kratkoročna zaporedja. Toda pretekli neodvisni dogodki nimajo prav nobenega vpliva na prihodnost.',
      mnemonic: {
        eli5: 'Kovanec nima možganov in ne beleži zgodovine. Za kovanec je vsak nov met natanko takšen, kot da je prvi met v celotni zgodovini vesolja.',
        anchor: 'Vsak nov met je popolnoma samostojna in neodvisna zgodba.',
        fallacyWarning: {
          name: 'Zmota hazarderja (Iskanje ravnotežja za nazaj)',
          description: 'Napačno prepričanje, da mora seriji enakih izidov nujno slediti nasprotni izid, da se »stvari izenačijo«.',
          example: 'Leta 1913 je v igralnici v Monte Carlu kroglica 26-krat zapored padla na črno. Igralci so izgubili na milijone, ko so vztrajno stavili na rdečo, prepričani, da rdeča »enostavno mora pasti«.'
        }
      },
      explanationLevels: {
        simpleQuote: 'Kovanec nima spomina. Preteklost nikoli ne spremeni verjetnosti prihodnjega neodvisnega dogodka.',
        simpleExplanation: 'Ko kovanec zleti v zrak, fizikalno nanj vplivata le sunek roke in zračni upor. Kovanec nima spomina na prejšnje mete. Zato je pri vsakem metu verjetnost za cifro natanko 1/2.',
        practicalInsight: 'To je ključno pri osebnih financah in vlaganju: padec delnice v zadnjih štirih dneh ne pomeni, da mora peti dan samodejno zrasti. Trg ni »dolžan« obrata.',
        mathematicalTheory: 'Za neodvisne dogodke A in B velja P(B | A) = P(B). Pogojna verjetnost je enaka nepogojni verjetnosti.'
      },
      textbookWisdom: {
        simpleQuote: 'Kovanec nima spomina. Preteklost nikoli ne spremeni verjetnosti prihodnjega neodvisnega dogodka.',
        simpleExplanation: 'Ko kovanec zleti v zrak, fizikalno nanj vplivata le sunek roke in zračni upor. Kovanec nima spomina na prejšnje mete. Zato je pri vsakem metu verjetnost za cifro natanko 1/2.',
        practicalInsight: 'To je ključno pri osebnih financah in vlaganju: padec delnice v zadnjih štirih dneh ne pomeni, da mora peti dan samodejno zrasti. Trg ni »dolžan« obrata.',
        mathematicalTheory: 'Za neodvisne dogodke A in B velja P(B | A) = P(B). Pogojna verjetnost je enaka nepogojni verjetnosti.'
      },
      cueBannerText: 'Nastavite poljubno zaporedje cifer in preverite verjetnost za naslednji met na platnu.',
      poeQuiz: {
        question: 'Ruleta se je 5-krat zapored ustavila na rdečem polju. Kakšna je verjetnost, da se bo pri 6. vrtljaju ustavila na črnem polju (ob predpostavki evropske rulete brez ničle)?',
        prompt: 'Razmisli, ali ima ruleta spomin na prejšnje vrtljaje:',
        options: [
          {
            id: 'opt-1',
            text: 'Točno 50 % (ali 1/2). Prejšnji vrtljaji nimajo nobenega vpliva.',
            isCorrect: true,
            explanation: 'Tako je! Vsak vrtljaj rulete je neodvisen dogodek. Ruleta ne »ve«, kaj je padlo prej.'
          },
          {
            id: 'opt-2',
            text: 'Veliko več kot 50 %, saj mora narava izravnati zaporedje.',
            isCorrect: false,
            explanation: 'Napačno. To je natanko definicija zmote hazarderja!'
          },
          {
            id: 'opt-3',
            text: 'Manj kot 50 %, ker je ruleta očitno »vroča« za rdečo barvo.',
            isCorrect: false,
            explanation: 'Napačno. Če je ruleta poštena, so verjetnosti vedno enake.'
          }
        ],
        insight: 'Pretekla naključja nimajo nobene moči nad prihodnjimi neodvisnimi dogodki!',
        followUpExperiment: 'Zaženi simulacijo dolgih serij in preveri verjetnost naslednjega meta.'
      },
      mathProof: {
        summaryLatex: 'P(A_{n+1} \\mid A_1 \\cap A_2 \\cap \\dots \\cap A_n) = P(A_{n+1}) = \\frac{1}{2}',
        steps: [
          {
            title: '1. Definicija stohastične neodvisnosti',
            latex: 'P(A \\cap B) = P(A) \\cdot P(B)',
            explanation: 'Dva dogodka sta neodvisna, če nastop enega ne vpliva na verjetnost drugega.'
          },
          {
            title: '2. Pogojna verjetnost neodvisnih dogodkov',
            latex: 'P(B \\mid A) = \\frac{P(A \\cap B)}{P(A)} = \\frac{P(A)P(B)}{P(A)} = P(B)',
            explanation: 'Pogojenost s preteklimi izidi ne spremeni verjetnosti naslednjega poskusa.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Preverjanje zmote hazarderja v Pythonu',
        defaultCode: `import numpy as np

# Simulirajmo 100.000 metov kovanca
n_metov = 100000
meti = np.random.choice([0, 1], size=n_metov) # 1 = Cifra, 0 = Grb

# Poiščimo vse primere, ko so padle 3 cifre zapored
tri_cifre_zapored = 0
naslednji_je_cifra = 0

for i in range(len(meti) - 3):
    if meti[i] == 1 and meti[i+1] == 1 and meti[i+2] == 1:
        tri_cifre_zapored += 1
        if meti[i+3] == 1:
            naslednji_je_cifra += 1

delez = naslednji_je_cifra / tri_cifre_zapored
print(f"Število serij s 3 zaporednimi ciframi: {tri_cifre_zapored}")
print(f"Delež cifer pri naslednjem (4.) metu: {delez:.4f} (točno 50 %!)")
`,
        description: 'Preveri, ali po 3 zaporednih cifrah karkoli vpliva na 4. met.',
        runCode: () => {
          return {
            output: `[Python Simulacija]
Število serij s 3 zaporednimi ciframi: 12518
Delež cifer pri naslednjem (4.) metu: 0.5008 (točno 50 %!)
Sklep: Tudi po dolgem nizu cifer je verjetnost za naslednji met še vedno točno 50 %!`
          };
        }
      },
      initialParams: { streakLength: 5 }
    }
  ]
};
