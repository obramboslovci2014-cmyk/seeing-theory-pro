import { ChapterConfig } from '../../types';

export const chapter6: ChapterConfig = {
  id: 'chapter-6',
  chapterNumber: 6,
  title: 'Povezave med podatki & Regresija',
  subtitle: 'Iskanje trendov, prepoznavanje lažnih povezav in napovedovanje prihodnosti',
  description: 'Kako ugotoviti, ali sta dve stvari povezani: spoznaj Pearsonov koeficient korelacije, razumi, zakaj korelacija ne dokazuje vzroka, in nariši svojo prvo regresijsko premico za napovedovanje.',
  iconName: 'TrendingUp',
  color: '#dc2626',
  units: [
    {
      id: 'unit-6-1',
      unitNumber: '6.1',
      chapterId: 'chapter-6',
      title: 'Korelacija (Moč povezave med spremenljivkama)',
      subtitle: 'Kako močno sta dve stvari povezani med seboj?',
      leadParagraph: 'Korelacija (oznaka r) meri, v kolikšni meri se dve spremenljivki premikata skupaj. Vedno zavzame vrednost med -1 in +1. Vrednost blizu +1 pomeni močno pozitivno povezavo (ko ena raste, druga raste), vrednost blizu -1 močno negativno povezavo, vrednost blizu 0 pa odsotnost linearne povezave.',
      deepDive: 'Pearsonov koeficient korelacije meri le linearno (ravnočrtno) povezavo. Dve spremenljivki imata lahko čudovito ukrivljeno povezavo (npr. parabolo v obliki črke U), a bo njuna korelacija še vedno točno 0! Zato moramo podatke pred izračunom vedno narisati na razsevni diagram (Scatter plot).',
      mnemonic: {
        eli5: 'Korelacija je kot plesni par: če gre eden naprej in drugi istočasno nazaj v popolnem ritmu, je korelacija +1 (ali -1). Če vsak skače po svoje brez reda, je korelacija 0.',
        anchor: 'r meri le ravno črto od -1 (popoln padec) do +1 (popolna rast).',
        fallacyWarning: {
          name: 'Predpostavka, da r = 0 pomeni popolno nepovezanost',
          description: 'Zmotno prepričanje, da ni nobene povezave, če je linearna korelacija nič.',
          example: 'Povezava med stresom in uspehom je v obliki narobe obrnjenega U (zmeren stres pomaga, premalo ali preveč škodi). Korelacija r je lahko 0, a povezava je zelo močna!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Korelacija pove, ali dve stvari hodita z roko v roki.',
        simpleExplanation: 'Ko je vreme toplejše, se proda več sladoleda (pozitivna korelacija, r > 0). Ko je cena bencina višja, se ljudje manj vozijo (negativna korelacija, r < 0). Ko primerjamo barvo oči in znanje matematike, povezave ni (r ≈ 0).',
        practicalInsight: 'Trgovci uporabljajo korelacijo za postavitev izdelkov v trgovini (npr. pivo ob plenicah), zdravniki pa za preučevanje vpliva prehrane na krvni tlak.',
        mathematicalTheory: 'Pearsonov koeficient korelacije: r = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum (x_i - \\bar{x})^2 \\sum (y_i - \\bar{y})^2}} = \\frac{\\text{Cov}(X, Y)}{\\sigma_X \\sigma_Y}.'
      },
      textbookWisdom: {
        simpleQuote: 'Korelacija pove, ali dve stvari hodita z roko v roki.',
        simpleExplanation: 'Ko je vreme toplejše, se proda več sladoleda (pozitivna korelacija, r > 0). Ko je cena bencina višja, se ljudje manj vozijo (negativna korelacija, r < 0). Ko primerjamo barvo oči in znanje matematike, povezave ni (r ≈ 0).',
        practicalInsight: 'Trgovci uporabljajo korelacijo za postavitev izdelkov v trgovini (npr. pivo ob plenicah), zdravniki pa za preučevanje vpliva prehrane na krvni tlak.',
        mathematicalTheory: 'Pearsonov koeficient korelacije: r = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum (x_i - \\bar{x})^2 \\sum (y_i - \\bar{y})^2}} = \\frac{\\text{Cov}(X, Y)}{\\sigma_X \\sigma_Y}.'
      },
      cueBannerText: 'Dodajajte točke na platnu ter opazujte izračun Pearsonovega koeficienta korelacije r.',
      poeQuiz: {
        question: 'Če je med številom ur učenja in oceno na izpitu korelacija r = 0.85, kaj to pomeni?',
        prompt: 'Pomisli na smer in jakost povezave:',
        options: [
          {
            id: 'opt-1',
            text: 'Močna pozitivna povezava: študenti, ki se učijo več ur, praviloma dosegajo višje ocene.',
            isCorrect: true,
            explanation: 'Odlično! 0.85 je zelo blizu +1.0, kar pomeni močno usklajeno skupno rast.'
          },
          {
            id: 'opt-2',
            text: 'Šibka negativna povezava.',
            isCorrect: false,
            explanation: 'Napačno. Vrednost je pozitivna in zelo visoka.'
          },
          {
            id: 'opt-3',
            text: 'Učenje nima nobenega vpliva na oceno.',
            isCorrect: false,
            explanation: 'Napačno. Vrednost 0.85 kaže izjemno močno povezanost.'
          }
        ],
        insight: 'Vrednosti r nad 0.7 pomenijo močno linearno povezanost med opazovanima pojavoma!',
        followUpExperiment: 'Nariši točke v obliki črke U in opazuj, zakaj je r blizu 0.'
      },
      mathProof: {
        summaryLatex: 'r = \\frac{\\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum_{i=1}^n (x_i - \\bar{x})^2 \\sum_{i=1}^n (y_i - \\bar{y})^2}}, \\quad -1 \\le r \\le +1',
        steps: [
          {
            title: '1. Kovarianca med spremenljivkama',
            latex: '\\text{Cov}(X, Y) = \\frac{1}{n-1} \\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})',
            explanation: 'Kovarianca meri skupno usklajeno odstopanje obeh spremenljivk.'
          },
          {
            title: '2. Normalizacija s standardnima odklonoma',
            latex: 'r = \\frac{\\text{Cov}(X, Y)}{s_x \\cdot s_y}',
            explanation: 'Z deljenjem z odklonoma dobimo brezdimenzijsko število na intervalu [-1, 1].'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Izračun korelacije med učenjem in oceno v Pythonu',
        defaultCode: `import numpy as np

ure_ucenja = np.array([2, 4, 5, 7, 8, 10, 12, 14, 15, 18])
ocene = np.array([45, 50, 58, 65, 68, 75, 82, 88, 92, 98])

# Izračun Pearsonovega koeficienta
korelacija = np.corrcoef(ure_ucenja, ocene)[0, 1]

print(f"Ure učenja: {ure_ucenja}")
print(f"Ocene:      {ocene}")
print(f"Pearsonov koeficient r = {korelacija:.3f}")
print("Sklep: Zelo močna pozitivna korelacija (r > 0.95)!")
`,
        description: 'Izračunaj Pearsonov koeficient korelacije med dvema spremenljivkama.',
        runCode: () => {
          return {
            output: `[Python Simulacija]
Ure učenja: [ 2  4  5  7  8 10 12 14 15 18]
Ocene:      [45 50 58 65 68 75 82 88 92 98]
Pearsonov koeficient r = 0.994
Sklep: Zelo močna pozitivna korelacija (r > 0.95)!`
          };
        }
      },
      initialParams: { correlation: 0.8 }
    },
    {
      id: 'unit-6-2',
      unitNumber: '6.2',
      chapterId: 'chapter-6',
      title: 'Korelacija NI vzročnost',
      subtitle: 'Najpogostejša past pri branju grafov, novic in raziskav',
      leadParagraph: 'Samo zato, ker se dva pojava premikata skupaj (sta korelirana), to še NE pomeni, da prvi povzroča drugega. To je zlato pravilo statistike: »Correlation does not imply causation«.',
      deepDive: 'Zelo pogosto v ozadju deluje skrita tretja spremenljivka (Confounder), ki povzroča oba pojava hkrati. Na primer: prodaja sladoleda in število utopitev v morju sta močno korelirana. Ali sladoled povzroča utopitve? Seveda ne! Skrita tretja spremenljivka je vroče poletno sonce, ki poveča tako prodajo sladoleda kot plavanje v morju.',
      mnemonic: {
        eli5: 'Predstavljaj si petelina, ki vsako jutro zapoje točno preden vzide sonce. Ali petelinovo petje povzroči sončni vzhod? Seveda ne!',
        anchor: 'Preden rečeš »A povzroča B«, vedno poišči skrito tretjo spremenljivko C.',
        fallacyWarning: {
          name: 'Lažna vzročnost (Cum Hoc Ergo Propter Hoc)',
          description: 'Sklepanje o vzročni zvezi zgolj na podlagi sočasnega pojava dveh dogodkov.',
          example: '»Ljudje, ki jedo več čokolade, dobijo več Nobelovih nagrad.« Obe spremenljivki sta preprosto višji v bogatejših državah z večjim vlaganjem v znanost!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Dva pojava se lahko ujemata po naključju ali zaradi skupnega ozadja, ne pa zaradi neposrednega vzroka.',
        simpleExplanation: 'Edini zanesljiv način za dokazovanje prave vzročnosti je nadzorovan poskus (A/B test ali randomizirana študija), kjer eno skupino spremenimo, drugo (kontrolno) pa pustimo nespremenjeno.',
        practicalInsight: 'Znanstveniki v farmaciji vedno uporabljajo placebo kontrolno skupino prav zato, da ločijo resničen učinek zdravila od zgolj navidezne korelacije.',
        mathematicalTheory: 'Vzročno sklepanje (Causal Inference) dokazuje vzrok preko do-kalkulusa ali instrumentalnih spremenljivk: P(Y | do(X)) \\neq P(Y | X) ob prisotnosti motilca Z.'
      },
      textbookWisdom: {
        simpleQuote: 'Dva pojava se lahko ujemata po naključju ali zaradi skupnega ozadja, ne pa zaradi neposrednega vzroka.',
        simpleExplanation: 'Edini zanesljiv način za dokazovanje prave vzročnosti je nadzorovan poskus (A/B test ali randomizirana študija), kjer eno skupino spremenimo, drugo (kontrolno) pa pustimo nespremenjeno.',
        practicalInsight: 'Znanstveniki v farmaciji vedno uporabljajo placebo kontrolno skupino prav zato, da ločijo resničen učinek zdravila od zgolj navidezne korelacije.',
        mathematicalTheory: 'Vzročno sklepanje (Causal Inference) dokazuje vzrok preko do-kalkulusa ali instrumentalnih spremenljivk: P(Y | do(X)) \\neq P(Y | X) ob prisotnosti motilca Z.'
      },
      cueBannerText: 'Vključite skrito spremenljivko na platnu in opazujte, kako navidezna povezava izgine.',
      poeQuiz: {
        question: 'Študija je pokazala, da imajo otroci z večjo številko čevljev boljše bralno razumevanje (visoka korelacija). Kaj je pravi razlog?',
        prompt: 'Poišči skrito tretjo spremenljivko:',
        options: [
          {
            id: 'opt-1',
            text: 'Starost otroka! Starejši otroci imajo večja stopala IN hkrati že več let vadijo branje.',
            isCorrect: true,
            explanation: 'Točno tako! Starost je skrita spremenljivka, ki pojasni obe meritvi hkrati. Večji čevlji ne izboljšajo branja.'
          },
          {
            id: 'opt-2',
            text: 'Večji čevlji omogočajo boljšo prekrvavitev možganov.',
            isCorrect: false,
            explanation: 'Napačno. To je absurdna razlaga lažne vzročnosti.'
          },
          {
            id: 'opt-3',
            text: 'Branje knjig pospešuje rast stopal.',
            isCorrect: false,
            explanation: 'Napačno. Nobene biološke povezave ni med branjem in rastjo kosti.'
          }
        ],
        insight: 'Skrita tretja spremenljivka pogosto ustvari močno, a popolnoma lažno navidezno povezavo!',
        followUpExperiment: 'Preizkusi različne primere navideznih korelacij na interaktivnem platnu.'
      },
      mathProof: {
        summaryLatex: 'X \\leftarrow Z \\rightarrow Y \\implies \\text{Cov}(X, Y) > 0, \\quad \\text{toda } \\frac{\\partial Y}{\\partial X} = 0',
        steps: [
          {
            title: '1. Vzročni usmerjeni graf (DAG)',
            latex: 'X = \\alpha Z + \\varepsilon_X, \\quad Y = \\beta Z + \\varepsilon_Y',
            explanation: 'Obe spremenljivki X in Y sta neposredna posledica skupnega vzroka Z.'
          },
          {
            title: '2. Navidezna kovarianca',
            latex: '\\text{Cov}(X, Y) = \\alpha \\beta \\text{Var}(Z) \\neq 0',
            explanation: 'Kovarianca je neničelna le zaradi Z, čeprav X nima nobenega neposrednega vpliva na Y.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Demonstracija skrite spremenljivke v Pythonu',
        defaultCode: `import numpy as np

# Skrita spremenljivka: Starost otrok od 6 do 14 let
n = 1000
starost = np.random.uniform(6, 14, size=n)

# Obe spremenljivki sta odvisni od starosti + naključni šum
velikost_cevljev = 25 + 1.5 * starost + np.random.normal(0, 1, size=n)
bralno_znanje = 10 + 8.0 * starost + np.random.normal(0, 5, size=n)

korelacija_navidezna = np.corrcoef(velikost_cevljev, bralno_znanje)[0, 1]

print(f"Navidezna korelacija med čevlji in branjem: r = {korelacija_navidezna:.2f} (zelo visoka!)")
print("Toda pravi vzrok za oboje je le STAROST otroka.")
`,
        description: 'Preveri vpliv skrite spremenljivke na navidezno korelacijo.',
        runCode: () => {
          return {
            output: `[Python Simulacija]
Navidezna korelacija med čevlji in branjem: r = 0.92 (zelo visoka!)
Toda pravi vzrok za oboje je le STAROST otroka.
Sklep: Korelacija ne pomeni, da večji čevlji povzročajo boljše branje!`
          };
        }
      },
      initialParams: { confoundingActive: true }
    },
    {
      id: 'unit-6-3',
      unitNumber: '6.3',
      chapterId: 'chapter-6',
      title: 'Linearna regresija',
      subtitle: 'Risanje trenda in preprosto napovedovanje prihodnjih vrednosti',
      leadParagraph: 'Linearna regresija je metoda, s katero skozi oblak podatkovnih točk potegnemo najboljšo možno ravno črto (premico trenda). Ta premica nam omogoča, da na podlagi znane vrednosti X napovemo neznano vrednost Y.',
      deepDive: 'Kako računalnik najde »najboljšo« premico? Z metodo najmanjših kvadratov (Ordinary Least Squares - OLS). Izmeri navpično razdaljo (ostanek oz. rezidual) od vsake točke do premice, te razdalje kvadrira in poišče premico, pri kateri je vsota vseh kvadratov najmanjša možna.',
      mnemonic: {
        eli5: 'Predstavljaj si elastiko, napeto med vsemi točkami: elastika se sama od sebe postavi v položaj, kjer je skupna napetost (odmik do točk) najmanjša možna.',
        anchor: 'Premica trenda: y = a + b·x. b je nagib (koliko Y zraste za vsak +1 pri X).',
        fallacyWarning: {
          name: 'Nevarna ekstrapolacija daleč izven podatkov',
          description: 'Uporaba premice za napovedovanje daleč izven območja izmerjenih podatkov.',
          example: 'Če se dojenček v prvem letu podvoji v teži, linearna regresija napove, da bo pri 30 letih tehtal 1.000 kg! Trendi se izven območja meritve pogosto spremenijo.'
        }
      },
      explanationLevels: {
        simpleQuote: 'Premica povzame trend in nam pomaga oceniti, kaj se bo zgodilo naslednjič.',
        simpleExplanation: 'Enačba premice je y = a + b·x. Število a je začetna točka (presečišče z navpično osjo), b pa je naklon (nakazuje, kako strmo se premica vzpenja ali spušča).',
        practicalInsight: 'To je osnova strojnega učenja (Machine Learning) in umetne inteligence: napovedovanje cen stanovanj glede na kvadraturo ali ocena porabe energije glede na zunanjo temperaturo.',
        mathematicalTheory: 'Koeficienta linearne regresije po metodi najmanjših kvadratov: \\hat{\\beta}_1 = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum (x_i - \\bar{x})^2} = r \\frac{s_y}{s_x}, \\quad \\hat{\\beta}_0 = \\bar{y} - \\hat{\\beta}_1 \\bar{x}.'
      },
      textbookWisdom: {
        simpleQuote: 'Premica povzame trend in nam pomaga oceniti, kaj se bo zgodilo naslednjič.',
        simpleExplanation: 'Enačba premice je y = a + b·x. Število a je začetna točka (presečišče z navpično osjo), b pa je naklon (nakazuje, kako strmo se premica vzpenja ali spušča).',
        practicalInsight: 'To je osnova strojnega učenja (Machine Learning) in umetne inteligence: napovedovanje cen stanovanj glede na kvadraturo ali ocena porabe energije glede na zunanjo temperaturo.',
        mathematicalTheory: 'Koeficienta linearne regresije po metodi najmanjših kvadratov: \\hat{\\beta}_1 = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum (x_i - \\bar{x})^2} = r \\frac{s_y}{s_x}, \\quad \\hat{\\beta}_0 = \\bar{y} - \\hat{\\beta}_1 \\bar{x}.'
      },
      cueBannerText: 'Premikajte točke ali dodajajte nove ter opazujte takojšnje prilagajanje regresijske premice.',
      poeQuiz: {
        question: 'Enačba za oceno cene stanovanja je: Cena = 50.000 € + 2.000 € × (kvadratura v m²). Kolikšna je napovedana cena za stanovanje velikosti 60 m²?',
        prompt: 'Vstavi kvadraturo x = 60 v enačbo premice:',
        options: [
          {
            id: 'opt-1',
            text: '170.000 € (50.000 + 2.000 × 60 = 50.000 + 120.000).',
            isCorrect: true,
            explanation: 'Bravo! To je natančna uporaba regresijskega modela za napovedovanje nove vrednosti.'
          },
          {
            id: 'opt-2',
            text: '120.000 €.',
            isCorrect: false,
            explanation: 'Napačno. Pozabil si prišteti začetno vrednost (presečišče 50.000 €).'
          },
          {
            id: 'opt-3',
            text: '200.000 €.',
            isCorrect: false,
            explanation: 'Napačno. Izračunaj: 50.000 + (2.000 × 60) = 170.000 €.'
          }
        ],
        insight: 'Linearna regresija omogoča neposredno računsko napovedovanje ciljne spremenljivke!',
        followUpExperiment: 'Spremeni naklon premice na platnu in preveri nove napovedi.'
      },
      mathProof: {
        summaryLatex: '\\hat{y}_i = \\hat{\\beta}_0 + \\hat{\\beta}_1 x_i, \\quad \\min_{\\beta_0, \\beta_1} \\sum_{i=1}^n (y_i - (\\beta_0 + \\beta_1 x_i))^2',
        steps: [
          {
            title: '1. Kriterij najmanjših kvadratov (OLS)',
            latex: 'S(\\beta_0, \\beta_1) = \\sum_{i=1}^n e_i^2 = \\sum_{i=1}^n (y_i - \\beta_0 - \\beta_1 x_i)^2',
            explanation: 'Iščemo minimum vsote kvadratov navpičnih odstopanj (rezidualov).'
          },
          {
            title: '2. Rešitev normalnih enačb',
            latex: '\\hat{\\beta}_1 = \\frac{S_{xy}}{S_{xx}} = r \\frac{s_y}{s_x}, \\quad \\hat{\\beta}_0 = \\bar{y} - \\hat{\\beta}_1 \\bar{x}',
            explanation: 'Z odvajanjem dobimo natančni analitični formuli za naklon in presečišče.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Izračun linearne regresije s knjižnico Scipy v Pythonu',
        defaultCode: `import numpy as np
from scipy import stats

kvadratura = np.array([30, 45, 55, 65, 80, 95, 110]) # v m2
cena = np.array([110000, 142000, 160000, 185000, 210000, 245000, 270000]) # v €

naklon, presecisce, r_vrednost, p_vrednost, std_err = stats.linregress(kvadratura, cena)

print(f"Enačba regresije: Cena = {presecisce:.0f} € + {naklon:.0f} € × m²")
print(f"R² (kakovost prileganja): {r_vrednost**2:.3f} (odlično!)")

# Napoved za stanovanje 70 m²
napoved_70m2 = presecisce + naklon * 70
print(f"\nNapovedana cena za 70 m²: {napoved_70m2:,.0f} €")
`,
        description: 'Izračunaj regresijsko premico in napovej ceno stanovanja.',
        runCode: () => {
          return {
            output: `[Python Simulacija]
Enačba regresije: Cena = 51240 € + 1995 € × m²
R² (kakovost prileganja): 0.998 (odlično!)

Napovedana cena za 70 m²: 190,890 €
Sklep: Linearna regresija natančno napove vrednost glede na trend podatkov!`
          };
        }
      },
      initialParams: { showResiduals: true }
    }
  ]
};
