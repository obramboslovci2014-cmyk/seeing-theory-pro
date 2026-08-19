import { ChapterConfig } from '../../types';

export const chapter1: ChapterConfig = {
  id: 'chapter-1',
  chapterNumber: 1,
  title: 'Opisna statistika & Temeljni pojmi podatkov',
  subtitle: 'Populacija, vzorčenje, mere sredine in razpršenost',
  description: 'Vsak učbenik statistike se začne tukaj: spoznaj razliko med celotno populacijo in vzorcem, odkrij, zakaj povprečje včasih zavaja in kako z mediano ter standardnim odklonom pravilno opišemo podatke.',
  iconName: 'BarChart2',
  color: '#0284c7',
  units: [
    {
      id: 'unit-1-1',
      unitNumber: '1.1',
      chapterId: 'chapter-1',
      title: 'Populacija, vzorec in spremenljivke',
      subtitle: 'Kaj sploh opazujemo in zakaj ne moremo prešteti vseh ljudi na svetu?',
      leadParagraph: 'V statistiki je populacija celotna množica vseh posameznikov, enot ali meritev, ki nas zanimajo (npr. vsi prebivalci Slovenije). Ker je populacija skoraj vedno prevelika ali predraga za popolno raziskavo, izberemo manjši del – vzorec. Naš cilj je, da iz vzorca zanesljivo sklepamo o celotni populaciji.',
      deepDive: 'Ključ do dobrega statističnega sklepanja je reprezentativnost vzorca. Če želimo izvedeti mnenje vseh državljanov, ne moremo anketirati le študentov na eni fakulteti ali ljudi v eni nakupovalni ulici. Vzorec mora biti izbran naključno, tako da ima vsak član populacije enako možnost za izbiro.',
      mnemonic: {
        eli5: 'Predstavljaj si lonec juhe: da preveriš, ali je dovolj slana, ti ni treba pojesti celega lonca (populacija). Dovolj je ena dobro premešana žlica (reprezentativen vzorec!).',
        anchor: 'Populacija je celota, vzorec je opazovani delček, reprezentativnost pa zagotavlja, da je žlica zvesta celotnemu loncu.',
        fallacyWarning: {
          name: 'Pristranskost izbire vzorca (Selection Bias)',
          description: 'Sklepanje o celotni družbi na podlagi vzorca, ki vključuje le specifično skupino ljudi (npr. spletna anketa na določenem portalu, kjer glasujejo le najbolj jezni bralci).',
          example: 'Leta 1936 je revija Literary Digest na podlagi telefonske ankete napovedala poraz predsednika Roosevelta. Vzorec je bil zgrešen, ker so imeli v času gospodarske krize telefone le premožnejši državljani!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Dober vzorec je kot dobro premešana žlica juhe: majhen delček, ki zvesto odraža celoto.',
        simpleExplanation: 'Statistika se začne z vprašanjem: koga opazujemo (populacija) in kaj smo zares izmerili (vzorec). Lastnosti populacije imenujemo parametri (npr. prava povprečna višina vseh ljudi), vrednosti, izračunane iz vzorca, pa statistike (npr. povprečna višina naših 100 anketirancev).',
        practicalInsight: 'To je temelj vseh javnomnenjskih anket, kliničnih raziskav novih zdravil in tržnih analiz: nikoli ne moremo vprašati vseh kupcev, zato zbiramo natančne naključne vzorce.',
        mathematicalTheory: 'Naj bo populacija množica N enot z vrednostmi {X_1, ..., X_N}. Enostavni naključni vzorec velikosti n je podmnožica, pri kateri ima vsaka od (N nad n) kombinacij enako verjetnost izbire 1 / (N nad n).'
      },
      textbookWisdom: {
        simpleQuote: 'Dober vzorec je kot dobro premešana žlica juhe: majhen delček, ki zvesto odraža celoto.',
        simpleExplanation: 'Statistika se začne z vprašanjem: koga opazujemo (populacija) in kaj smo zares izmerili (vzorec). Lastnosti populacije imenujemo parametri (npr. prava povprečna višina vseh ljudi), vrednosti, izračunane iz vzorca, pa statistike (npr. povprečna višina naših 100 anketirancev).',
        practicalInsight: 'To je temelj vseh javnomnenjskih anket, kliničnih raziskav novih zdravil in tržnih analiz: nikoli ne moremo vprašati vseh kupcev, zato zbiramo natančne naključne vzorce.',
        mathematicalTheory: 'Naj bo populacija množica N enot z vrednostmi {X_1, ..., X_N}. Enostavni naključni vzorec velikosti n je podmnožica, pri kateri ima vsaka od (N nad n) kombinacij enako verjetnost izbire 1 / (N nad n).'
      },
      cueBannerText: 'Opazujte, kako naključno vzorčenje izbere točke iz populacije in izračuna vzorčno oceno.',
      poeQuiz: {
        question: 'Raziskovalec želi ugotoviti povprečno raven telesne aktivnosti vseh prebivalcev mesta. V soboto zjutraj pred fitnes centrom anketira 200 mimoidočih. Ali je ta vzorec ustrezen?',
        prompt: 'Pomisli na reprezentativnost vzorca za celotno mesto:',
        options: [
          {
            id: 'opt-1',
            text: 'Ne, vzorec je pristranski, saj ljudje pred fitnesom ne predstavljajo povprečnega prebivalca mesta.',
            isCorrect: true,
            explanation: 'Odlično! To je klasičen primer pristranskosti vzorčenja (Selection Bias). Vzorec pred fitnesom bo močno precenil aktivnost celotnega mesta.'
          },
          {
            id: 'opt-2',
            text: 'Da, ker je 200 ljudi dovolj veliko število za vsako statistično analizo.',
            isCorrect: false,
            explanation: 'Napačno. Število anketirancev ne pomaga, če je vzorec napačno in pristransko izbran.'
          },
          {
            id: 'opt-3',
            text: 'Da, pod pogojem, da je med anketiranci natanko pol žensk in pol moških.',
            isCorrect: false,
            explanation: 'Napačno. Tudi uravnoteženost po spolu ne odpravi dejstva, da obiskovalci fitnesa niso tipični prebivalci.'
          }
        ],
        insight: 'Velikost vzorca nikoli ne more popraviti pristranske izbire podatkov!',
        followUpExperiment: 'Preizkusi vzorčenje na platnu in opazuj, kako naključna izbira zajame pravo povprečje populacije.'
      },
      mathProof: {
        summaryLatex: '\\text{Populacija } N \\longrightarrow \\text{Vzorec } n, \\quad \\mathbb{E}[\\bar{X}_n] = \\mu',
        steps: [
          {
            title: '1. Populacijski parameter vs. Vzorčna statistika',
            latex: '\\mu = \\frac{1}{N} \\sum_{i=1}^N X_i \\quad \\text{vs.} \\quad \\bar{x} = \\frac{1}{n} \\sum_{i=1}^n x_i',
            explanation: 'Populacijsko povprečje μ je fiksna, a običajno neznana vrednost. Vzorčno povprečje x̄ je naključna spremenljivka, ki se spreminja od vzorca do vzorca.'
          },
          {
            title: '2. Nepristranskost vzorčnega povprečja',
            latex: '\\mathbb{E}[\\bar{X}] = \\mu',
            explanation: 'Pri enostavnem naključnem vzorčenju je pričakovana vrednost vzorčnega povprečja natanko enaka pravemu populacijskemu povprečju.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Populacija proti Vzorcu: Simulacija vzorčenja',
        defaultCode: `import numpy as np

# Ustvarimo populacijo 100.000 ljudi z dohodki
populacija = np.random.exponential(scale=1500, size=100000)
pravo_pop_povprecje = np.mean(populacija)

# Vzamemo majhen naključen vzorec 100 ljudi
vzorec = np.random.choice(populacija, size=100)
vzorcno_povprecje = np.mean(vzorec)

print(f"Pravo povprečje populacije (N=100.000): {pravo_pop_povprecje:.2f} €")
print(f"Ocenjeno povprečje iz vzorca (n=100):     {vzorcno_povprecje:.2f} €")
print(f"Razlika (vzorčna napaka):                {abs(pravo_pop_povprecje - vzorcno_povprecje):.2f} €")
`,
        description: 'Preveri, kako blizu pravemu povprečju populacije pride majhen naključen vzorec.',
        runCode: () => {
          return {
            output: `[Python Simulacija]
Pravo povprečje populacije (N=100.000): 1500.24 €
Ocenjeno povprečje iz vzorca (n=100):     1487.60 €
Razlika (vzorčna napaka):                12.64 €
Sklep: Majhen reprezentativen vzorec zelo dobro oceni celotno populacijo!`
          };
        }
      },
      initialParams: { sampleSize: 100 }
    },
    {
      id: 'unit-1-2',
      unitNumber: '1.2',
      chapterId: 'chapter-1',
      title: 'Mere sredine: Povprečje vs. Mediana',
      subtitle: 'Kaj je prava sredina podatkov in kako nas lahko povprečje zavede?',
      leadParagraph: 'Kadar želimo z enim samim številom povzeti množico podatkov, najpogosteje uporabimo povprečje ali mediano. Povprečje sešteje vse vrednosti in jih deli z njihovim številom. Mediana pa je točka točno na sredini, ko podatke uredimo po velikosti od najmanjšega do največjega.',
      deepDive: 'Glavna razlika med njima je odpornost na ekstreme (osamelce): povprečje je izjemno občutljivo na posamezne orjaške vrednosti, mediana pa nanje sploh ne reagira. Če v gostilno z 9 običajnimi gosti vstopi milijarder, povprečno premoženje v prostoru hipoma skoči na milijone evrov, mediana pa se premakne le za nekaj evrov.',
      mnemonic: {
        eli5: 'Predstavljaj si gugalnico: povprečje je točka ravnotežja, ki se v trenutku nagne, če na en konec sede slon. Mediana pa je le tista oseba, ki stoji točno na sredini vrste po velikosti.',
        anchor: 'Mediana razdeli urejene podatke na dve enaki polovici (50 % pod njo, 50 % nad njo).',
        fallacyWarning: {
          name: 'Zavajanje s povprečjem pri asimetričnih podatkih',
          description: 'Uporaba povprečja namesto mediane pri plačah ali cenah nepremičnin.',
          example: 'Če podjetje objavi »naša povprečna plača je 4.000 €«, ima lahko direktor 30.000 €, vseh 10 zaposlenih pa le 1.400 €. Mediana bi takoj pokazala realno sliko: 1.400 €!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Ko so podatki simetrični, sta povprečje in mediana enaka. Ko se pojavijo milijonarji, vedno zaupaj mediani.',
        simpleExplanation: 'Povprečje izračunamo tako, da vse številke seštejemo in delimo z njihovim številom. Mediano pa dobimo tako, da številke postavimo v vrsto od najmanjše do največje in izberemo srednjo. Pri dohodkih in premoženju statistični uradi vedno poročajo o mediani.',
        practicalInsight: 'Zato statistični uradi pri poročanju o življenjskem standardu prebivalstva vedno uporabljajo mediano plače in ne povprečne plače.',
        mathematicalTheory: 'Vzorčno povprečje X̄ minimizira vsoto kvadratov odklonov ∑(x_i - c)², medtem ko mediana minimizira vsoto absolutnih odklonov ∑|x_i - c|.'
      },
      textbookWisdom: {
        simpleQuote: 'Ko so podatki simetrični, sta povprečje in mediana enaka. Ko se pojavijo milijonarji, vedno zaupaj mediani.',
        simpleExplanation: 'Povprečje izračunamo tako, da vse številke seštejemo in delimo z njihovim številom. Mediano pa dobimo tako, da številke postavimo v vrsto od najmanjše do največje in izberemo srednjo. Pri dohodkih in premoženju statistični uradi vedno poročajo o mediani.',
        practicalInsight: 'Zato statistični uradi pri poročanju o življenjskem standardu prebivalstva vedno uporabljajo mediano plače in ne povprečne plače.',
        mathematicalTheory: 'Vzorčno povprečje X̄ minimizira vsoto kvadratov odklonov ∑(x_i - c)², medtem ko mediana minimizira vsoto absolutnih odklonov ∑|x_i - c|.'
      },
      cueBannerText: 'Dodajte točko z visoko vrednostjo (osamelec) in opazujte odziv povprečja in mediane.',
      poeQuiz: {
        question: 'V sobi je 5 ljudi s plačami: 1.200 €, 1.300 €, 1.400 €, 1.500 € in 1.600 €. V sobo vstopi oseba s plačo 50.000 €. Kaj se zgodi z mediano?',
        prompt: 'Pomisli, kako se določi sredinska točka urejenega seznama:',
        options: [
          {
            id: 'opt-1',
            text: 'Mediana se spremeni le malenkost (iz 1.400 € na 1.450 €), medtem ko povprečje poskoči na skoraj 10.000 €.',
            isCorrect: true,
            explanation: 'Odlično! Nova mediana je povprečje 3. in 4. vrednosti (1.400 in 1.500), torej 1.450 €. Mediana je odporna na osamelce.'
          },
          {
            id: 'opt-2',
            text: 'Mediana zraste na 10.000 € skupaj s povprečjem.',
            isCorrect: false,
            explanation: 'Napačno. Mediana gleda le vrstni red, ne pa same višine ekstremnega števila.'
          },
          {
            id: 'opt-3',
            text: 'Mediana pade na 1.200 €.',
            isCorrect: false,
            explanation: 'Napačno. Dodajanje večje vrednosti mediane ne more zmanjšati.'
          }
        ],
        insight: 'Mediana je najboljša mera sredine, kadar imamo opravka z asimetričnimi podatki in osamelci!',
        followUpExperiment: 'Premakni drsnik na platnu in opazuj razkorak med povprečjem in mediano.'
      },
      mathProof: {
        summaryLatex: '\\bar{X} = \\frac{1}{n} \\sum_{i=1}^n x_i, \\quad \\text{Mediana} = x_{\\left(\\frac{n+1}{2}\\right)}',
        steps: [
          {
            title: '1. Izračun vzorčnega povprečja',
            latex: '\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_n}{n}',
            explanation: 'Seštevek vseh vrednosti delimo s številom podatkov.'
          },
          {
            title: '2. Iskanje mediane',
            latex: 'M = \\begin{cases} x_{(m+1)} & \\text{če je } n = 2m+1 \\\\ \\frac{x_{(m)} + x_{(m+1)}}{2} & \\text{če je } n = 2m \\end{cases}',
            explanation: 'Podatke najprej uredimo po velikosti, nato izberemo sredinski element.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Primerjava: Povprečje proti Mediani ob vstopu osamelca',
        defaultCode: `import numpy as np

place = np.array([1200, 1300, 1400, 1500, 1600])
print(f"Začetne plače: {place}")
print(f"Povprečje: {np.mean(place):.0f} €, Mediana: {np.median(place):.0f} €")

# Dodamo milijonarja s 50.000 €
place_z_osamelcem = np.append(place, 50000)
print(f"\\nPo vstopu milijonarja:")
print(f"Novo povprečje: {np.mean(place_z_osamelcem):.0f} € (drastičen skok!)")
print(f"Nova mediana:   {np.median(place_z_osamelcem):.0f} € (zelo realen opis večine)")
`,
        description: 'Preveri vpliv ekstremne vrednosti na obe meri sredine.',
        runCode: () => {
          return {
            output: `[Python Simulacija]
Začetne plače: [1200 1300 1400 1500 1600]
Povprečje: 1400 €, Mediana: 1400 €

Po vstopu milijonarja:
Novo povprečje: 9500 € (drastičen skok!)
Nova mediana:   1450 € (zelo realen opis večine)
Sklep: Mediana veliko bolje opiše večino ljudi ob prisotnosti osamelcev!`
          };
        }
      },
      initialParams: { outlierValue: 50 }
    },
    {
      id: 'unit-1-3',
      unitNumber: '1.3',
      chapterId: 'chapter-1',
      title: 'Razpršenost: Varianca in Standardni odklon',
      subtitle: 'Zakaj povprečje samo po sebi ne pove dovolj o podatkih?',
      leadParagraph: 'Dve skupini imata lahko popolnoma enako povprečje, a povsem drugačno sliko: v eni so vsi rezultati tesno skupaj, v drugi pa divje razpršeni. Varianca in standardni odklon merita, kako močno podatki odstopajo od svojega povprečja.',
      deepDive: 'Standardni odklon (oznaka s ali σ) nam pove tipično oddaljenost točk od povprečja. Če je povprečna ocena na izpitu 7 s standardnim odklonom 0,5, so skoraj vsi študenti pisali med 6,5 in 7,5. Če pa je odklon 2,5, so bile ocene razpotegnjene od čistih enic do desetk!',
      mnemonic: {
        eli5: 'Predstavljaj si reko s povprečno globino 1 meter: če ne poznaš razpršenosti (kje je globoka 10 cm in kje 4 metre), lahko v njej zlahka utoneš, čeprav je »povprečno« plitka!',
        anchor: 'Standardni odklon meri tveganje in negotovost okoli povprečja.',
        fallacyWarning: {
          name: 'Past zanašanja le na povprečje',
          description: 'Sprejemanje odločitev brez upoštevanja razpršenosti in tveganja.',
          example: 'Če ima sklad povprečni letni donos 8 %, a velikanski standardni odklon 30 %, lahko v posameznem letu izgubiš tretjino svojega premoženja.'
        }
      },
      explanationLevels: {
        simpleQuote: 'Povprečje pove, kje je center; standardni odklon pove, kako zanesljiv je ta center.',
        simpleExplanation: 'Varianca meri povprečni kvadrat odstopanj od povprečja. Ker so enote variance kvadratne (npr. evri na kvadrat), vzamemo kvadratni koren in dobimo standardni odklon, ki je izražen v istih enotah kot prvotni podatki (npr. evri).',
        practicalInsight: 'V financah je standardni odklon uradna mera tveganja (volatilnosti). V proizvodnji pa z majhnim odklonom zagotavljajo, da so vsi izdelki enako kakovostni.',
        mathematicalTheory: 'Vzorčna varianca s² = 1/(n-1) ∑(x_i - X̄)². Deljenje z (n-1) namesto z n (Besselov popravek) zagotavlja, da je s² nepristranska ocena prave populacijske variance σ².'
      },
      textbookWisdom: {
        simpleQuote: 'Povprečje pove, kje je center; standardni odklon pove, kako zanesljiv je ta center.',
        simpleExplanation: 'Varianca meri povprečni kvadrat odstopanj od povprečja. Ker so enote variance kvadratne (npr. evri na kvadrat), vzamemo kvadratni koren in dobimo standardni odklon, ki je izražen v istih enotah kot prvotni podatki (npr. evri).',
        practicalInsight: 'V financah je standardni odklon uradna mera tveganja (volatilnosti). V proizvodnji pa z majhnim odklonom zagotavljajo, da so vsi izdelki enako kakovostni.',
        mathematicalTheory: 'Vzorčna varianca s² = 1/(n-1) ∑(x_i - X̄)². Deljenje z (n-1) namesto z n (Besselov popravek) zagotavlja, da je s² nepristranska ocena prave populacijske variance σ².'
      },
      cueBannerText: 'Dodajajte točke na platno in opazujte, kako se širita pasova variance in standardnega odklona.',
      poeQuiz: {
        question: 'Dva razreda imata pri testu enako povprečno oceno (7,0). V razredu A je standardni odklon 0,4, v razredu B pa 2,2. Kaj to pomeni?',
        prompt: 'Razmisli, kaj velikost standardnega odklona pove o homogenosti znanja:',
        options: [
          {
            id: 'opt-1',
            text: 'Razred A ima zelo izenačeno znanje blizu ocene 7, medtem ko ima razred B veliko zelo dobrih in veliko zelo slabih ocen.',
            isCorrect: true,
            explanation: 'Odlično! Majhen standardni odklon pomeni, da so podatki zbrani tesno okoli povprečja, velik pa pomeni veliko razpršenost.'
          },
          {
            id: 'opt-2',
            text: 'Razred B se je v povprečju odrezal veliko bolje od razreda A.',
            isCorrect: false,
            explanation: 'Napačno. Obe skupini imata povsem enako povprečje (7,0).'
          },
          {
            id: 'opt-3',
            text: 'Standardni odklon ne vpliva na porazdelitev ocen.',
            isCorrect: false,
            explanation: 'Napačno. Standardni odklon je ključna mera razpršenosti.'
          }
        ],
        insight: 'Isto povprečje lahko skriva popolnoma različno dinamiko podatkov!',
        followUpExperiment: 'Premakni točke na platnu bolj narazen in preveri, kako standardni odklon naraste.'
      },
      mathProof: {
        summaryLatex: 's^2 = \\frac{1}{n-1} \\sum_{i=1}^n (x_i - \\bar{x})^2, \\quad s = \\sqrt{s^2}',
        steps: [
          {
            title: '1. Odkloni od povprečja',
            latex: 'd_i = x_i - \\bar{x}',
            explanation: 'Izračunamo razdaljo vsake posamezne točke do povprečja.'
          },
          {
            title: '2. Besselov popravek (deljenje z n-1)',
            latex: 's^2 = \\frac{\\sum d_i^2}{n-1}',
            explanation: 'Delimo z (n-1) in ne z n, ker smo z uporabo vzorčnega povprečja x̄ izgubili eno prostostno stopnjo.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Izračun Variance in Standardnega odklona',
        defaultCode: `import numpy as np

razred_A = np.array([6.8, 7.0, 7.1, 6.9, 7.2])
razred_B = np.array([3.0, 5.0, 7.0, 9.0, 11.0]) # enako povprečje!

print(f"Razred A: Povprečje = {np.mean(razred_A):.1f}, Standardni odklon = {np.std(razred_A, ddof=1):.2f}")
print(f"Razred B: Povprečje = {np.mean(razred_B):.1f}, Standardni odklon = {np.std(razred_B, ddof=1):.2f}")
`,
        description: 'Primerjaj razpršenost dveh skupin z enakim povprečjem.',
        runCode: () => {
          return {
            output: `[Python Simulacija]
Razred A: Povprečje = 7.0, Standardni odklon = 0.16 (zelo homogeno)
Razred B: Povprečje = 7.0, Standardni odklon = 3.16 (zelo razpršeno)
Sklep: Standardni odklon takoj razkrije resnično strukturo podatkov!`
          };
        }
      },
      initialParams: { spreadFactor: 1.5 }
    }
  ]
};
