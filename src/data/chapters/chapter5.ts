import { ChapterConfig } from '../../types';

export const chapter5: ChapterConfig = {
  id: 'chapter-5',
  chapterNumber: 5,
  title: 'Vzorčenje & Sklepanje na celoto',
  subtitle: 'Kako iz majhnega vzorca oceniti celotno populacijo z določeno zanesljivostjo',
  description: 'Odkrij, kako statistiki z anketiranjem 1.000 ljudi zanesljivo napovejo volitve za milijone državljanov, kaj v resnici pomeni 95 % interval zaupanja in kako Bayesovo pravilo posodablja prepričanja ob novih dokazih.',
  iconName: 'HelpCircle',
  color: '#ea580c',
  units: [
    {
      id: 'unit-5-1',
      unitNumber: '5.1',
      chapterId: 'chapter-5',
      title: 'Ocenjevanje parametrov populacije',
      subtitle: 'Kako z majhnim vzorcem oceniti pravo resnico o celoti?',
      leadParagraph: 'V resničnem svetu skoraj nikoli ne moremo izmeriti vseh članov populacije (npr. vseh prebivalcev Slovenije ali vseh rib v jezeru). Zato vzamemo naključen vzorec in iz njega izračunamo oceno.',
      deepDive: 'Dobra ocena mora biti nepristranska (Unbiased), kar pomeni, da v povprečju zadene točno pravo vrednost in se ne nagiba sistematično v levo ali desno. Ključno je, da je vzorec zares naključen – reprezentativen za celoto.',
      mnemonic: {
        eli5: 'Predstavljaj si kuhanje juhe: če želiš poskusiti, ali je juha dovolj slana, ti ni treba pojesti celega lonca! Dovolj je ena dobro premešana žlica juhe.',
        anchor: 'Dobro premešan (naključen) vzorec natančno odraža celoten lonec.',
        fallacyWarning: {
          name: 'Pristranskost vzorčenja (Selection Bias)',
          description: 'Zbiranje vzorca iz napačne skupine, ki ne odraža celotne populacije.',
          example: 'Če na spletni strani za računalniške igre vprašaš »Koliko ur na dan igrate igrice?«, rezultat ne velja za vse prebivalce države!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Ena dobro premešana žlica juhe pove vse o slanosti celega lonca.',
        simpleExplanation: 'Pri vzorčenju je najpomembnejša naključnost. Če vsak član populacije dobi enako možnost za uvrstitev v vzorec, bo vzorčno povprečje odlična ocena resničnega povprečja populacije.',
        practicalInsight: 'Javnomnenjske ankete pred volitvami uporabljajo naključno klicanje tisočih gospodinjstev, da ocenijo razpoloženje milijonov volivcev z natančnostjo ±3 %.',
        mathematicalTheory: 'Vzorčno povprečje X̄ je nepristranski cenilec parametra μ: E[X̄] = μ, njegova varianca pa je Var(X̄) = σ²/n.'
      },
      textbookWisdom: {
        simpleQuote: 'Ena dobro premešana žlica juhe pove vse o slanosti celega lonca.',
        simpleExplanation: 'Pri vzorčenju je najpomembnejša naključnost. Če vsak član populacije dobi enako možnost za uvrstitev v vzorec, bo vzorčno povprečje odlična ocena resničnega povprečja populacije.',
        practicalInsight: 'Javnomnenjske ankete pred volitvami uporabljajo naključno klicanje tisočih gospodinjstev, da ocenijo razpoloženje milijonov volivcev z natančnostjo ±3 %.',
        mathematicalTheory: 'Vzorčno povprečje X̄ je nepristranski cenilec parametra μ: E[X̄] = μ, njegova varianca pa je Var(X̄) = σ²/n.'
      },
      cueBannerText: 'Izberite velikost vzorca na platnu ter opazujte približevanje ocene dejanski vrednosti.',
      poeQuiz: {
        question: 'Zakaj je 1.000 naključno izbranih ljudi dovolj za zanesljivo napoved volitev v državi z 2 milijonoma prebivalcev?',
        prompt: 'Pomisli na prispodobo o juhi:',
        options: [
          {
            id: 'opt-1',
            text: 'Ker je pri pravem naključnem vzorčenju statistična natančnost odvisna od velikosti vzorca (n=1000) in ne od velikosti celotne populacije.',
            isCorrect: true,
            explanation: 'Odlično! Če je lonec dobro premešan, velikost lonca ne spremeni okusa ene same polne žlice.'
          },
          {
            id: 'opt-2',
            text: 'Ni dovolj, za zanesljivost bi morali anketirati vsaj 10 % vseh ljudi (200.000 ljudi).',
            isCorrect: false,
            explanation: 'Napačno. To je pogosta zabloda; z večanjem n napaka pade sorazmerno z 1/√n.'
          },
          {
            id: 'opt-3',
            text: 'Ker vsi ljudje vedno glasujejo enako.',
            isCorrect: false,
            explanation: 'Napačno. Ljudje so raznoliki, a vzorec zajame pravilna razmerja.'
          }
        ],
        insight: 'Reprezentativen vzorec 1.000 enot daje presenetljivo natančne ocene za poljubno veliko populacijo!',
        followUpExperiment: 'Spreminjaj velikost vzorca na platnu in opazuj zmanjševanje standardne napake.'
      },
      mathProof: {
        summaryLatex: '\\mathbb{E}[\\bar{X}] = \\mu, \\quad \\text{SE}(\\bar{X}) = \\frac{\\sigma}{\\sqrt{n}}',
        steps: [
          {
            title: '1. Nepristranskost vzorčnega povprečja',
            latex: '\\mathbb{E}[\\bar{X}] = \\mathbb{E}\\left[ \\frac{1}{n} \\sum_{i=1}^n X_i \\right] = \\frac{1}{n} \\sum_{i=1}^n \\mathbb{E}[X_i] = \\mu',
            explanation: 'Pričakovana vrednost vzorčnega povprečja je točno enaka pravemu povprečju populacije.'
          },
          {
            title: '2. Standardna napaka ocene',
            latex: '\\text{SE} = \\sqrt{\\text{Var}(\\bar{X})} = \\frac{\\sigma}{\\sqrt{n}}',
            explanation: 'Z vsakim 4-kratnim povečanjem vzorca se negotovost ocene prepolovi.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Vzorčenje iz populacije 1.000.000 prebivalcev v Pythonu',
        defaultCode: `import numpy as np

# Ustvarimo celotno populacijo 1.000.000 ljudi z znano pravo podporo 54.0 %
populacija = np.random.choice([1, 0], size=1000000, p=[0.54, 0.46])
prava_podpora = np.mean(populacija)

# Vzamemo naključen vzorec le 1.000 ljudi
vzorec = np.random.choice(populacija, size=1000, replace=False)
ocena = np.mean(vzorec)

print(f"Prava resnica v celotni populaciji (1.000.000): {prava_podpora:.1%}")
print(f"Ocena iz majhnega vzorca (1.000 anketirancev):   {ocena:.1%}")
print(f"Razlika / napaka ocene:                          {abs(ocena - prava_podpora):.2%}")
`,
        description: 'Preveri, kako natančno 1.000 ljudi oceni milijonsko populacijo.',
        runCode: () => {
          return {
            output: `[Python Simulacija]
Prava resnica v celotni populaciji (1.000.000): 54.0%
Ocena iz majhnega vzorca (1.000 anketirancev):   53.8%
Razlika / napaka ocene:                          0.20%
Sklep: Majhen vzorec 1.000 enot zadene resnico z izjemno natančnostjo!`
          };
        }
      },
      initialParams: { populationSize: 100000, sampleN: 1000 }
    },
    {
      id: 'unit-5-2',
      unitNumber: '5.2',
      chapterId: 'chapter-5',
      title: 'Intervali zaupanja',
      subtitle: 'Zakaj je razpon bolj pošten in zanesljiv kot ena sama številka?',
      leadParagraph: 'Ker vsak vzorec zaradi naključja malce odstopa, je nepošteno reči: »Prava podpora je točno 54,2 %«. Veliko bolj pošteno je navesti interval zaupanja, npr. [51,1 %, 57,3 %] z 95 % stopnjo zaupanja.',
      deepDive: 'Kaj natanko pomeni »95 % interval zaupanja«? Pomeni, da če bi ta poskus vzorčenja ponovili 100-krat in vsakič izračunali interval, bi točno 95 od teh 100 intervalov uspešno zajelo pravo resnično vrednost populacije!',
      mnemonic: {
        eli5: 'Interval zaupanja je kot ribiška mreža: namesto da poskušaš ujeti ribo s harpuno v eno samo točko, vržeš mrežo določene širine. 95 % zanesljivost pomeni, da mreža v 95 od 100 metov ujame ribo.',
        anchor: 'Širši interval = večja zanesljivost, a manjša natančnost.',
        fallacyWarning: {
          name: 'Napačna razlaga intervala zaupanja',
          description: 'Mnenje, da se prava neznana vrednost populacije premika.',
          example: 'Prava vrednost populacije μ je stalna fiksna številka. Interval je tisti, ki se premika od vzorca do vzorca!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Namesto ugibanja ene same točke raje postavimo zanesljiv varnostni razpon.',
        simpleExplanation: '95 % interval zaupanja običajno izračunamo kot: Vzorčno povprečje ± 2 standardni napaki. Če želimo ožji interval ob enaki 95 % zanesljivosti, moramo preprosto povečati vzorec.',
        practicalInsight: 'V medicini se nobeno zdravilo ne odobri brez intervala zaupanja za učinkovitost in stranske učinke.',
        mathematicalTheory: '95 % interval zaupanja za povprečje pri znani varianci: \\left[ \\bar{X} - 1.96 \\frac{\\sigma}{\\sqrt{n}}, \\; \\bar{X} + 1.96 \\frac{\\sigma}{\\sqrt{n}} \\right].'
      },
      textbookWisdom: {
        simpleQuote: 'Namesto ugibanja ene same točke raje postavimo zanesljiv varnostni razpon.',
        simpleExplanation: '95 % interval zaupanja običajno izračunamo kot: Vzorčno povprečje ± 2 standardni napaki. Če želimo ožji interval ob enaki 95 % zanesljivosti, moramo preprosto povečati vzorec.',
        practicalInsight: 'V medicini se nobeno zdravilo ne odobri brez intervala zaupanja za učinkovitost in stranske učinke.',
        mathematicalTheory: '95 % interval zaupanja za povprečje pri znani varianci: \\left[ \\bar{X} - 1.96 \\frac{\\sigma}{\\sqrt{n}}, \\; \\bar{X} + 1.96 \\frac{\\sigma}{\\sqrt{n}} \\right].'
      },
      cueBannerText: 'Izberite [Generiraj intervale] in opazujte, kolikšen delež intervalov uspešno zajame pravo vrednost.',
      poeQuiz: {
        question: 'Kaj se zgodi z intervalom zaupanja, če velikost vzorca n povečamo s 100 na 400?',
        prompt: 'Spomni se formule z 1/√n v imenovalcu:',
        options: [
          {
            id: 'opt-1',
            text: 'Interval postane 2-krat ožji (bolj natančen), ker je √400 / √100 = 20 / 10 = 2.',
            isCorrect: true,
            explanation: 'Odlično! 4-krat večji vzorec prepolovi širino intervala in bistveno poveča natančnost.'
          },
          {
            id: 'opt-2',
            text: 'Interval postane 4-krat širši.',
            isCorrect: false,
            explanation: 'Napačno. Večji vzorec vedno zmanjša negotovost in zoži interval.'
          },
          {
            id: 'opt-3',
            text: 'Interval ostane popolnoma enak.',
            isCorrect: false,
            explanation: 'Napačno. Velikost vzorca neposredno vpliva na širino intervala.'
          }
        ],
        insight: 'Širina intervala zaupanja se krči s hitrostjo kvadratnega korena iz velikosti vzorca!',
        followUpExperiment: 'Spreminjaj vzorec n na platnu in opazuj oženje intervalov.'
      },
      mathProof: {
        summaryLatex: 'P\\left( \\bar{X} - 1.96 \\frac{\\sigma}{\\sqrt{n}} \\le \\mu \\le \\bar{X} + 1.96 \\frac{\\sigma}{\\sqrt{n}} \\right) = 0.95',
        steps: [
          {
            title: '1. Standardizacija Z-statistike',
            latex: 'Z = \\frac{\\bar{X} - \\mu}{\\sigma / \\sqrt{n}} \\sim \\mathcal{N}(0, 1)',
            explanation: 'Povprečje standardiziramo na enotsko normalno porazdelitev.'
          },
          {
            title: '2. Izbira 95 % kritične vrednosti',
            latex: 'P(-1.96 \\le Z \\le 1.96) = 0.95',
            explanation: 'Iz normalnega zvona vzamemo meje, ki pokrivata srednjih 95 % površine.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Izračun 95 % intervala zaupanja v Pythonu',
        defaultCode: `import numpy as np
import scipy.stats as stats

# Vzorec 100 meritev baterije (v urah delovanja)
np.random.seed(42)
vzorec = np.random.normal(loc=24.0, scale=3.0, size=100)

x_bar = np.mean(vzorec)
s = np.std(vzorec, ddof=1)
n = len(vzorec)
se = s / np.sqrt(n)

# 95 % interval (t-porazdelitev)
spodnja, zgornja = stats.t.interval(0.95, df=n-1, loc=x_bar, scale=se)

print(f"Vzorčno povprečje: {x_bar:.2f} ur")
print(f"Standardna napaka: {se:.2f} ur")
print(f"95 % interval zaupanja: [{spodnja:.2f} ur, {zgornja:.2f} ur]")
`,
        description: 'Izračunaj 95 % interval zaupanja za vzorčne podatke.',
        runCode: () => {
          return {
            output: `[Python Simulacija]
Vzorčno povprečje: 23.89 ur
Standardna napaka: 0.28 ur
95 % interval zaupanja: [23.33 ur, 24.45 ur]
Sklep: Z 95 % zanesljivostjo trdimo, da je pravo povprečje med 23.33 in 24.45 urami!`
          };
        }
      },
      initialParams: { confidenceLevel: 0.95 }
    },
    {
      id: 'unit-5-3',
      unitNumber: '5.3',
      chapterId: 'chapter-5',
      title: 'Bayesovo posodabljanje',
      subtitle: 'Kako pametno spreminjati mnenje in verjetnost ob novih dokazih',
      leadParagraph: 'Bayesovo pravilo je matematični recept za logično razmišljanje: pove nam, kako moramo posodobiti svoje predhodno prepričanje (Prior), ko prejmemo nov dokaz ali opazovanje.',
      deepDive: 'Ključni del Bayesovega pravila je upoštevanje osnovne stopnje (Base Rate). Če je neka redka bolezen prisotna le pri 1 od 1000 ljudi (0,1 %), bo tudi ob 99 % natančnem testu večina pozitivnih rezultatov lažno pozitivnih! Brez upoštevanja predhodne verjetnosti ljudje močno precenijo tveganje.',
      mnemonic: {
        eli5: 'Če zunaj zaslišiš topot kopit, najprej pomisli na konje in ne na zebre – razen če si sredi afriške savane!',
        anchor: 'Novo prepričanje = (Moč dokaza × Začetno prepričanje) / Vsi možni dokazi.',
        fallacyWarning: {
          name: 'Zanemarjanje osnovne stopnje (Base Rate Neglect)',
          description: 'Gledanje le natančnosti testa ob popolnem ignoriranju redkosti pojava.',
          example: 'Pozitiven test za izjemno redko bolezen pogosto pomeni le 10 % možnost dejanske bolezni, ker je zdravih ljudi v populaciji neprimerljivo več!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Izredni dokazi zahtevajo izredno močne začetne verjetnosti.',
        simpleExplanation: 'Bayesovo pravilo združi to, kar smo vedeli prej, z novim podatkom, ki smo ga pravkar izmerili. Tako dobimo novo, posodobljeno verjetnost.',
        practicalInsight: 'Umetna inteligenca (filtri za vsiljeno pošto / spam), medicinska diagnostika in navigacija v samovozečih avtomobilih delujejo na Bayesovem sklepanju.',
        mathematicalTheory: 'Bayesov izrek: P(H \\mid E) = \\frac{P(E \\mid H) \\cdot P(H)}{P(E)}, kjer je P(H) apriorna verjetnost, P(H|E) pa aposteriorna verjetnost.'
      },
      textbookWisdom: {
        simpleQuote: 'Izredni dokazi zahtevajo izredno močne začetne verjetnosti.',
        simpleExplanation: 'Bayesovo pravilo združi to, kar smo vedeli prej, z novim podatkom, ki smo ga pravkar izmerili. Tako dobimo novo, posodobljeno verjetnost.',
        practicalInsight: 'Umetna inteligenca (filtri za vsiljeno pošto / spam), medicinska diagnostika in navigacija v samovozečih avtomobilih delujejo na Bayesovem sklepanju.',
        mathematicalTheory: 'Bayesov izrek: P(H \\mid E) = \\frac{P(E \\mid H) \\cdot P(H)}{P(E)}, kjer je P(H) apriorna verjetnost, P(H|E) pa aposteriorna verjetnost.'
      },
      cueBannerText: 'Spreminjajte apriorno verjetnost in natančnost testa na platnu ter opazujte aposteriorno verjetnost.',
      poeQuiz: {
        question: 'Redka bolezen prizadene 1 od 1.000 ljudi (0.1 %). Test ima 99 % natančnost (in 1 % lažno pozitivnih). Prejmeš pozitiven izvid. Kolikšna je dejanska verjetnost, da si bolan?',
        prompt: 'Predstavljaj si skupino 100.000 ljudi (100 bolnih, 99.900 zdravih):',
        options: [
          {
            id: 'opt-1',
            text: 'Le okoli 9 % (približno 1 od 11), ker bo med zdravimi ljudmi kar okoli 1.000 lažno pozitivnih!',
            isCorrect: true,
            explanation: 'Neverjetno, a resnično! 100 bolnih da 99 pozitivnih, 99.900 zdravih pa da 999 lažno pozitivnih. 99 / (99 + 999) ≈ 9 %.'
          },
          {
            id: 'opt-2',
            text: 'Točno 99 %, saj je test 99 % zanesljiv.',
            isCorrect: false,
            explanation: 'Napačno. To je klasična zmota zanemarjanja osnovne stopnje (Base Rate Neglect).'
          },
          {
            id: 'opt-3',
            text: '50 %, ker sta le dve možnosti.',
            isCorrect: false,
            explanation: 'Napačno. Možnosti nista enako verjetni.'
          }
        ],
        insight: 'Pri redkih pojavih je večina pozitivnih izvidov lažnih alarmov!',
        followUpExperiment: 'Preizkusi različne vrednosti na interaktivnem Bayesovem platnu.'
      },
      mathProof: {
        summaryLatex: 'P(B \\mid +) = \\frac{P(+ \\mid B) P(B)}{P(+ \\mid B)P(B) + P(+ \\mid \\neg B)P(\\neg B)}',
        steps: [
          {
            title: '1. Izrek o popolni verjetnosti',
            latex: 'P(+) = P(+ \\mid B)P(B) + P(+ \\mid \\neg B)P(\\neg B)',
            explanation: 'Seštejemo prave pozitivne in lažne pozitivne rezultate.'
          },
          {
            title: '2. Bayesova posodobitev',
            latex: 'P(B \\mid +) = \\frac{0.99 \\times 0.001}{(0.99 \\times 0.001) + (0.01 \\times 0.999)} \\approx 0.0901',
            explanation: 'Končni izračun da točno 9.01 % verjetnost.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Izračun Bayesove verjetnosti pozitivnega testa',
        defaultCode: `p_bolezen = 0.001    # 1 od 1000 ljudi
p_zdrav = 0.999      # 999 od 1000 ljudi

obcutljivost = 0.99  # P(+ | bolan)
lazno_pozitivni = 0.01 # P(+ | zdrav)

# Bayesova formula
p_pravi_pozitivni = obcutljivost * p_bolezen
p_vsi_pozitivni = p_pravi_pozitivni + (lazno_pozitivni * p_zdrav)

p_bolan_ce_pozitiven = p_pravi_pozitivni / p_vsi_pozitivni

print(f"Osnovna razširjenost bolezni: {p_bolezen:.1%}")
print(f"Pravi pozitivni:              {p_pravi_pozitivni:.5f}")
print(f"Lažno pozitivni:              {lazno_pozitivni * p_zdrav:.5f}")
print(f"Dejanska možnost bolezni:     {p_bolan_ce_pozitiven:.1%}")
`,
        description: 'Izračunaj posodobljeno verjetnost z Bayesovim izrekom.',
        runCode: () => {
          return {
            output: `[Python Simulacija]
Osnovna razširjenost bolezni: 0.1%
Pravi pozitivni:              0.00099
Lažno pozitivni:              0.00999
Dejanska možnost bolezni:     9.0%
Sklep: Čeprav je test 99% natančen, je dejanska možnost le 9 % zaradi redkosti bolezni!`
          };
        }
      },
      initialParams: { priorProb: 0.01, testAccuracy: 0.95 }
    }
  ]
};
