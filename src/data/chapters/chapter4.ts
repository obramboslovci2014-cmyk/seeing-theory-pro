import { ChapterConfig } from '../../types';

export const chapter4: ChapterConfig = {
  id: 'chapter-4',
  chapterNumber: 4,
  title: 'Porazdelitve & Zvonasta krivulja',
  subtitle: 'Kako so podatki razporejeni v naravi in zakaj se vedno pojavi zvon',
  description: 'Spoznaj razliko med štetjem in merjenjem, odkrij skrivnost Gaussove normalne porazdelitve ter razumi, zakaj vsota naključij vedno ustvari zvonasto obliko.',
  iconName: 'Activity',
  color: '#059669',
  units: [
    {
      id: 'unit-4-1',
      unitNumber: '4.1',
      chapterId: 'chapter-4',
      title: 'Diskretne vs. Zvezne porazdelitve',
      subtitle: 'Štetje celih stvari (kocke) vs. zvezno merjenje (čas in višina)',
      leadParagraph: 'Podatki se v statistiki delijo na dve glavni vrsti: diskretne (ki jih štejemo v celih korakih: 0, 1, 2, 3...) in zvezne (ki jih merimo in lahko zavzamejo katerokoli decimalno število na zvezni skali).',
      deepDive: 'Pri diskretni spremenljivki (npr. število pik na kocki) ima vsak točen izid svojo verjetnost (P(X = 3) = 1/6). Pri zvezni spremenljivki (npr. natančna višina človeka v nanometrih) pa je verjetnost za katerokoli TOČNO določeno neskončno natančno točko enaka 0! Zato pri zveznih podatkih vedno merimo verjetnost v intervalu (npr. med 175 cm in 180 cm) kot ploščino pod krivuljo.',
      mnemonic: {
        eli5: 'Diskretno je kot stopnice (lahko stojiš le na 1., 2. ali 3. stopnici). Zvezno pa je kot klančina (stojiš lahko na katerikoli poljubni višini).',
        anchor: 'Diskretno = štejemo cele enote; Zvezno = merimo površino pod krivuljo.',
        fallacyWarning: {
          name: 'Iskanje verjetnosti točke pri zveznih podatkih',
          description: 'Pričakovanje, da ima natanko določena decimalna vrednost neničelno verjetnost.',
          example: 'Možnost, da je nekdo visok NATANKO 175,000000000... cm, je 0. Možnost, da je visok med 174,5 in 175,5 cm, pa je povsem realna in merljiva.'
        }
      },
      explanationLevels: {
        simpleQuote: 'Ko štejemo koščke, rišemo stolpce. Ko merimo tekočine in dolžine, rišemo gladke krivulje.',
        simpleExplanation: 'Pri diskretnih porazdelitvah (Binomska, Poissonova) rišemo stolpični diagram, kjer višina stolpca pomeni verjetnost. Pri zveznih porazdelitvah (Normalna, Eksponentna) pa verjetnost ustreza ploščini pod krivuljo med dvema točkama.',
        practicalInsight: 'V trgovini je število obiskovalcev diskretna spremenljivka (celi ljudje), čas, ki ga preživijo v trgovini, pa zvezna spremenljivka (minute in sekunde).',
        mathematicalTheory: 'Za zvezno slučajno spremenljivko je verjetnost dana z integralom funkcije gostote verjetnosti f(x): P(a \\le X \\le b) = \\int_a^b f(x) dx, pri čemer je \\int_{-\\infty}^\\infty f(x) dx = 1.'
      },
      textbookWisdom: {
        simpleQuote: 'Ko štejemo koščke, rišemo stolpce. Ko merimo tekočine in dolžine, rišemo gladke krivulje.',
        simpleExplanation: 'Pri diskretnih porazdelitvah (Binomska, Poissonova) rišemo stolpični diagram, kjer višina stolpca pomeni verjetnost. Pri zveznih porazdelitvah (Normalna, Eksponentna) pa verjetnost ustreza ploščini pod krivuljo med dvema točkama.',
        practicalInsight: 'V trgovini je število obiskovalcev diskretna spremenljivka (celi ljudje), čas, ki ga preživijo v trgovini, pa zvezna spremenljivka (minute in sekunde).',
        mathematicalTheory: 'Za zvezno slučajno spremenljivko je verjetnost dana z integralom funkcije gostote verjetnosti f(x): P(a \\le X \\le b) = \\int_a^b f(x) dx, pri čemer je \\int_{-\\infty}^\\infty f(x) dx = 1.'
      },
      cueBannerText: 'Preklopite med diskretnimi stolpci in zvezno krivuljo ter opazujte ploščino pod krivuljo.',
      poeQuiz: {
        question: 'Če merimo čas čakanja na avtobus v minutah (zvezna spremenljivka), kolikšna je matematična verjetnost, da bo avtobus prispel v NATANKO 5.0000000... minutah?',
        prompt: 'Pomisli, kakšna je širina ene same točke na zvezni črti:',
        options: [
          {
            id: 'opt-1',
            text: 'Natanko 0, ker ima posamezna točka širino nič (merimo le verjetnost intervalov).',
            isCorrect: true,
            explanation: 'Odlično! Pri zveznih porazdelitvah ima ena sama točka ploščino 0. Verjetnost obstaja le za razpon, npr. med 4.9 in 5.1 minute.'
          },
          {
            id: 'opt-2',
            text: '20 %, ker je 5 minut tipičen interval.',
            isCorrect: false,
            explanation: 'Napačno. Ne moremo pripisati neničelne verjetnosti neskončno natančni točki.'
          },
          {
            id: 'opt-3',
            text: '100 %, če je avtobus točen.',
            isCorrect: false,
            explanation: 'Napačno. Čas je zvezna spremenljivka z neskončno možnimi decimalnimi mesti.'
          }
        ],
        insight: 'Pri zveznih porazdelitvah vedno računamo ploščino pod krivuljo v določenem intervalu!',
        followUpExperiment: 'Označi interval na platnu in poglej, kako se izračuna njegova ploščina.'
      },
      mathProof: {
        summaryLatex: 'P(a \\le X \\le b) = \\int_a^b f(x) \\, dx, \\quad P(X = c) = \\int_c^c f(x) \\, dx = 0',
        steps: [
          {
            title: '1. Funkcija gostote verjetnosti (PDF)',
            latex: 'f(x) \\ge 0, \\quad \\int_{-\\infty}^{\\infty} f(x) \\, dx = 1',
            explanation: 'Celotna ploščina pod celotno krivuljo je vedno natanko 1 (100 %).'
          },
          {
            title: '2. Ploščina intervala',
            latex: 'P(a \\le X \\le b) = F(b) - F(a)',
            explanation: 'Verjetnost razpona je razlika kumulativnih funkcij (CDF).'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Diskretna vs. Zvezna verjetnost v Pythonu',
        defaultCode: `import scipy.stats as stats

# Diskretno: Verjetnost, da pri 10 metih kovanca dobimo natanko 5 cifer
p_diskretno = stats.binom.pmf(k=5, n=10, p=0.5)
print(f"Diskretno (natanko 5 cifer od 10): {p_diskretno:.1%}")

# Zvezno: Verjetnost, da je višina med 170 in 180 cm (μ=175, σ=7)
p_zvezno = stats.norm.cdf(180, loc=175, scale=7) - stats.norm.cdf(170, loc=175, scale=7)
print(f"Zvezno (višina med 170 in 180 cm):   {p_zvezno:.1%}")
`,
        description: 'Primerjaj izračun točkovne verjetnosti in verjetnosti intervala.',
        runCode: () => {
          return {
            output: `[Python Simulacija]
Diskretno (natanko 5 cifer od 10): 24.6%
Zvezno (višina med 170 in 180 cm):   52.5%
Sklep: Pri diskretnih gledamo točke, pri zveznih pa intervale pod krivuljo!`
          };
        }
      },
      initialParams: { isContinuous: false }
    },
    {
      id: 'unit-4-2',
      unitNumber: '4.2',
      chapterId: 'chapter-4',
      title: 'Normalna (Gaussova) porazdelitev',
      subtitle: 'Zakaj narava ljubi obliko simetričnega zvona?',
      leadParagraph: 'Normalna ali Gaussova porazdelitev je najbolj slavna krivulja v celotni znanosti. Je popolnoma simetrična, ima obliko zvona ter je v celoti določena le z dvema številkama: sredino (μ) in širino (σ).',
      deepDive: 'Normalno porazdelitev opisuje zlato empirično pravilo 68 - 95 - 99.7: v območju 1 standardnega odklona od sredine (μ ± 1σ) leži približno 68 % vseh podatkov, v območju 2 odklonov (μ ± 2σ) leži 95 % podatkov, v območju 3 odklonov (μ ± 3σ) pa kar 99,7 % vseh podatkov!',
      mnemonic: {
        eli5: 'Zvonasta krivulja je kot kup mivke, ki jo sipaš skozi lijak: največ mivke se nabere točno na sredini, proti robovom pa količina gladko in simetrično upada.',
        anchor: 'Pravilo 68-95-99.7: skoraj vse (95 %) se nahaja znotraj 2 standardnih odklonov.',
        fallacyWarning: {
          name: 'Predpostavka normalnosti tam, kjer je ni',
          description: 'Pričakovanje, da so vsi pojavi v svetu normalno porazdeljeni.',
          example: 'Premoženje ljudi, število sledilcev na družbenih omrežjih in potresi niso normalno porazdeljeni, ampak sledijo potenčnemu zakonu (kjer peščica obvladuje večino)!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Večina je na sredini, ekstremov na levi in desni pa je zmeraj manj.',
        simpleExplanation: 'Kadar na nek pojav vpliva veliko drobnih, neodvisnih dejavnikov (kot so geni in prehrana pri višini človeka), se vrednosti naravno porazdelijo v obliki zvonaste krivulje.',
        practicalInsight: 'Standardizirani testi (IQ, SAT), tolerance v industrijski proizvodnji (šest sigma) in medicinski referenčni intervali temeljijo na normalni porazdelitvi.',
        mathematicalTheory: 'Funkcija gostote normalne porazdelitve: f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} \\exp\\left( -\\frac{(x-\\mu)^2}{2\\sigma^2} \\right).'
      },
      textbookWisdom: {
        simpleQuote: 'Večina je na sredini, ekstremov na levi in desni pa je zmeraj manj.',
        simpleExplanation: 'Kadar na nek pojav vpliva veliko drobnih, neodvisnih dejavnikov (kot so geni in prehrana pri višini človeka), se vrednosti naravno porazdelijo v obliki zvonaste krivulje.',
        practicalInsight: 'Standardizirani testi (IQ, SAT), tolerance v industrijski proizvodnji (šest sigma) in medicinski referenčni intervali temeljijo na normalni porazdelitvi.',
        mathematicalTheory: 'Funkcija gostote normalne porazdelitve: f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} \\exp\\left( -\\frac{(x-\\mu)^2}{2\\sigma^2} \\right).'
      },
      cueBannerText: 'Spreminjajte parametra μ in σ na platnu ter opazujte premik in širino porazdelitve.',
      poeQuiz: {
        question: 'Če je povprečni IQ v populaciji 100 s standardnim odklonom 15, kolikšen delež ljudi ima IQ med 70 in 130?',
        prompt: 'Opazi, da je interval od 70 do 130 natanko μ ± 2σ (100 - 30 do 100 + 30):',
        options: [
          {
            id: 'opt-1',
            text: 'Približno 95 % (po empiričnem pravilu dveh standardnih odklonov).',
            isCorrect: true,
            explanation: 'Odlično! Znotraj 2 standardnih odklonov (μ ± 2σ) se vedno nahaja približno 95 % populacije.'
          },
          {
            id: 'opt-2',
            text: 'Približno 68 % populacije.',
            isCorrect: false,
            explanation: 'Napačno. 68 % velja za območje enega standardnega odklona (IQ med 85 in 115).'
          },
          {
            id: 'opt-3',
            text: 'Točno 50 % populacije.',
            isCorrect: false,
            explanation: 'Napačno. 50 % je le na eni polovici zvona.'
          }
        ],
        insight: 'Empirično pravilo 68-95-99.7 omogoča takojšnjo oceno deležev brez zapletenega računanja!',
        followUpExperiment: 'Označi območje ±2σ na platnu in preveri izračunano površino 95 %.'
      },
      mathProof: {
        summaryLatex: 'X \\sim \\mathcal{N}(\\mu, \\sigma^2), \\quad Z = \\frac{X - \\mu}{\\sigma} \\sim \\mathcal{N}(0, 1)',
        steps: [
          {
            title: '1. Standardizacija na Z-vrednost',
            latex: 'Z = \\frac{X - \\mu}{\\sigma}',
            explanation: 'Odštejemo povprečje in delimo z odklonom, da dobimo standardno normalno porazdelitev.'
          },
          {
            title: '2. Integracija površine zvona',
            latex: '\\int_{-\\infty}^{\\infty} e^{-z^2/2} \\, dz = \\sqrt{2\\pi}',
            explanation: 'Znameniti Poissonov integral, ki poskrbi, da je celotna verjetnost točno 1.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Preverjanje pravila 68-95-99.7 z 100.000 vzorci',
        defaultCode: `import numpy as np

# Ustvarimo 100.000 podatkov iz normalne porazdelitve (μ=100, σ=15)
mu, sigma = 100, 15
podatki = np.random.normal(mu, sigma, size=100000)

delez_1sd = np.mean((podatki >= mu - 1*sigma) & (podatki <= mu + 1*sigma))
delez_2sd = np.mean((podatki >= mu - 2*sigma) & (podatki <= mu + 2*sigma))
delez_3sd = np.mean((podatki >= mu - 3*sigma) & (podatki <= mu + 3*sigma))

print(f"Znotraj ±1σ (85 - 115): {delez_1sd:.1%} (pričakovano ~68 %)")
print(f"Znotraj ±2σ (70 - 130): {delez_2sd:.1%} (pričakovano ~95 %)")
print(f"Znotraj ±3σ (55 - 145): {delez_3sd:.2%} (pričakovano ~99.7 %)")
`,
        description: 'Simulacija empiričnega pravila normalne porazdelitve.',
        runCode: () => {
          return {
            output: `[Python Simulacija]
Znotraj ±1σ (85 - 115): 68.3% (pričakovano ~68 %)
Znotraj ±2σ (70 - 130): 95.5% (pričakovano ~95 %)
Znotraj ±3σ (55 - 145): 99.73% (pričakovano ~99.7 %)
Sklep: Pravilo 68-95-99.7 se popolnoma potrdi v praksi!`
          };
        }
      },
      initialParams: { mu: 0, sigma: 1 }
    },
    {
      id: 'unit-4-3',
      unitNumber: '4.3',
      chapterId: 'chapter-4',
      title: 'Centralni mejni izrek',
      subtitle: 'Zakaj vsota poljubnih naključnih stvari vedno ustvari obliko zvona?',
      leadParagraph: 'Centralni mejni izrek (Central Limit Theorem) je eden največjih čudežev matematike: ne glede na to, kako nenavadne oblike je začetna porazdelitev (lahko je ravna, trikotna ali z dvema vrhoma), bo povprečje dovolj velikega vzorca VEDNO imelo popolno normalno zvonasto porazdelitev!',
      deepDive: 'To pojasnjuje, zakaj je normalna porazdelitev tako pogosta v naravi: človeška višina, teža, napake pri merjenju in reakcijski časi so namreč vsota tisočih drobnih genetskih in okoljskih dejavnikov. Ko sešteješ veliko majhnih vplivov, neizogibno nastane Gaussov zvon.',
      mnemonic: {
        eli5: 'Predstavljaj si Galtonovo desko: ko kroglice padajo med žebljički, se vsaka posamezna kroglica pri vsakem žebljičku naključno odloči levo ali desno. Na dnu pa se tisoče kroglic vedno zloži v popolno zvonasto krivuljo!',
        anchor: 'Vsota mnogih neodvisnih naključij se vedno zlije v zvon.',
        fallacyWarning: {
          name: 'Zamenjava porazdelitve posameznih podatkov s porazdelitvijo povprečja',
          description: 'Mnenje, da morajo biti posamezni podatki normalni, da bi veljal centralni mejni izrek.',
          example: 'Met ene kocke je popolnoma raven (vsaka številka od 1 do 6 ima enako 16,7 % možnost). Toda povprečje 30 kock ima čudovito obliko zvona!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Tudi iz čistega kaosa nastane red, ko seštejemo dovolj veliko število poskusov.',
        simpleExplanation: 'Vzemi katerokoli čudno porazdelitev, naključno izberi 30 številk in izračunaj njihovo povprečje. To ponovi stokrat in nariši histogram teh povprečij – pred teboj se bo prikazal popolnoma gladek simetričen zvon.',
        practicalInsight: 'To je temelj celotne moderne statistike: omogoča nam računanje intervalov zaupanja in testiranje hipotez, ne da bi morali vnaprej poznati točno obliko populacije.',
        mathematicalTheory: 'Za neodvisne enako porazdeljene spremenljivke s končno varianco velja: \\frac{\\bar{X}_n - \\mu}{\\sigma / \\sqrt{n}} \\xrightarrow{d} \\mathcal{N}(0, 1), ko gre n \\to \\infty.'
      },
      textbookWisdom: {
        simpleQuote: 'Tudi iz čistega kaosa nastane red, ko seštejemo dovolj veliko število poskusov.',
        simpleExplanation: 'Vzemi katerokoli čudno porazdelitev, naključno izberi 30 številk in izračunaj njihovo povprečje. To ponovi stokrat in nariši histogram teh povprečij – pred teboj se bo prikazal popolnoma gladek simetričen zvon.',
        practicalInsight: 'To je temelj celotne moderne statistike: omogoča nam računanje intervalov zaupanja in testiranje hipotez, ne da bi morali vnaprej poznati točno obliko populacije.',
        mathematicalTheory: 'Za neodvisne enako porazdeljene spremenljivke s končno varianco velja: \\frac{\\bar{X}_n - \\mu}{\\sigma / \\sqrt{n}} \\xrightarrow{d} \\mathcal{N}(0, 1), ko gre n \\to \\infty.'
      },
      cueBannerText: 'Izberite poljubno porazdelitev in povečajte velikost vzorca n ter opazujte nastanek normalnega zvona.',
      poeQuiz: {
        question: 'Met poštene 6-strane kocke ima popolnoma ravno porazdelitev (števila 1 do 6 so enako verjetna). Kaj se zgodi, če vržeš 50 kock hkrati in sešteješ njihove pike?',
        prompt: 'Kaj napoveduje centralni mejni izrek za vsoto 50 neodvisnih metov?',
        options: [
          {
            id: 'opt-1',
            text: 'Vsote bodo imele čudovito simetrično normalno (zvonasto) porazdelitev s sredino pri 175.',
            isCorrect: true,
            explanation: 'Tako je! Čeprav je posamezna kocka ravna, se vsota 50 kock zaradi centralnega mejnega izreka popolnoma zlije v normalni zvon.'
          },
          {
            id: 'opt-2',
            text: 'Vsote bodo še vedno popolnoma ravno porazdeljene.',
            isCorrect: false,
            explanation: 'Napačno. Dobiti vsoto 50 (vse enke) je izjemno redko, medtem ko je srednjih vsot okoli 175 ogromno.'
          },
          {
            id: 'opt-3',
            text: 'Vsote bodo imele obliko črke U z dvema vrhoma na robovih.',
            isCorrect: false,
            explanation: 'Napačno. Vsote se kopičijo na sredini, ne na robovih.'
          }
        ],
        insight: 'Centralni mejni izrek spremeni vsoto poljubnih naključij v predvidljiv zvon!',
        followUpExperiment: 'Preizkusi simulacijo vsote kock na desnem platnu in opazuj nastajanje zvona.'
      },
      mathProof: {
        summaryLatex: '\\sqrt{n}\\left(\\frac{\\bar{X}_n - \\mu}{\\sigma}\\right) \\xrightarrow{d} \\mathcal{N}(0,1)',
        steps: [
          {
            title: '1. Standardna napaka povprečja',
            latex: '\\text{SE} = \\frac{\\sigma}{\\sqrt{n}}',
            explanation: 'Širina zvona povprečij se z večanjem vzorca n krči s faktorjem 1/√n.'
          },
          {
            title: '2. Karakteristične funkcije',
            latex: '\\lim_{n \\to \\infty} \\phi_{\\bar{Z}_n}(t) = e^{-t^2/2}',
            explanation: 'Fourierova transformacija dokazuje konvergenco proti normalni porazdelitvi.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Demonstracija Centralnega mejnega izreka v Pythonu',
        defaultCode: `import numpy as np

# Začnemo s popolnoma RAVNO porazdelitvijo (met kocke od 1 do 6)
# Vzamemo 10.000 vzorcev velikosti n=30 in izračunamo njihova povprečja
vzorci = np.random.randint(1, 7, size=(10000, 30))
povprecja = np.mean(vzorci, axis=1)

print(f"Teoretična sredina ene kocke: 3.50")
print(f"Povprečje vseh 10.000 vzorcev: {np.mean(povprecja):.2f}")
print(f"Standardni odklon povprečij:  {np.std(povprecja):.2f}")
print("Sklep: Histogram teh povprečij tvori popolnoma gladek zvon!")
`,
        description: 'Preveri, kako povprečja kock ustvarijo normalno porazdelitev.',
        runCode: () => {
          return {
            output: `[Python Simulacija]
Teoretična sredina ene kocke: 3.50
Povprečje vseh 10.000 vzorcev: 3.50
Standardni odklon povprečij:  0.31
Sklep: Histogram teh povprečij tvori popolnoma gladek zvon!`
          };
        }
      },
      initialParams: { sampleSize: 30, baseDist: 'uniform' }
    }
  ]
};
