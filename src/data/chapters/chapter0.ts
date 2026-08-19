import { ChapterConfig } from '../../types';

export const chapter0: ChapterConfig = {
  id: 'chapter-0',
  chapterNumber: 0,
  title: 'Uvod v statistiko & Vizualni učbenik',
  subtitle: 'Kaj je statistika, zakaj jo potrebujemo in kako se učiti s tem učbenikom',
  description: 'Uvodni vodnik po svetu podatkov: zakaj je statistika jezik sodobnega sveta, kateri so trije temeljni stebri statističnega mišljenja in kako s pomočjo interaktivnih simulacij zgraditi resnično intuicijo.',
  iconName: 'Sparkles',
  color: '#059669',
  units: [
    {
      id: 'unit-0-1',
      unitNumber: '0.1',
      chapterId: 'chapter-0',
      title: 'Kaj je statistika in zakaj je pomembna?',
      subtitle: 'Znanost o odločanju in razumevanju sveta v razmerah negotovosti',
      leadParagraph: 'Živimo v svetu, polnem negotovosti in poplave informacij. Statistika je veja znanosti, ki se ukvarja z zbiranjem, urejanjem, analizo in interpretacijo podatkov. Ne gre za suhoparno seštevanje številk, temveč za orodje, ki nam omogoča ločiti resnične vzorce od čistega naključnega šuma.',
      deepDive: 'Brez statistike ne bi imeli varnih zdravil (saj ne bi mogli dokazati njihove učinkovitosti), ne bi imeli zanesljivih vremenskih napovedi, delujočih algoritmov umetne inteligence, niti varnih letalskih potovanj. Statistika je most med posameznimi meritvami in splošnimi zakonitostmi narave.',
      mnemonic: {
        eli5: 'Statistika je kot očala za branje podatkov: brez njih vidiš le zamegljene pike in šum, z njimi pa jasno prepoznaš resnično sliko.',
        anchor: 'Statistika spremeni surove podatke v zanesljivo znanje za sprejemanje odločitev.',
        fallacyWarning: {
          name: 'Zanašanje na anekdotične dokaze',
          description: 'Sprejemanje splošnih odločitev na podlagi ene same osebne zgodbe ali govorice (npr. »Moj sosed je kadil 40 let in doživel 95 let, torej kajenje ni nevarno«).',
          example: 'Ena sama osebna izkušnja je le osamelec (anecdote), statistična analiza pa preuči tisoče ljudi in razkrije pravo zakonitost.'
        }
      },
      explanationLevels: {
        simpleQuote: 'Statistika je umetnost in znanost, kako iz nepopolnih podatkov potegniti zanesljive sklepe.',
        simpleExplanation: 'Ljudje imamo naravno težnjo, da povsod iščemo vzorce – tudi tam, kjer je le naključje. Statistika nam ponuja natančna orodja, s katerimi preverimo: ali ta pojav zares obstaja ali pa gre le za naključno srečo?',
        practicalInsight: 'Vsak dan se srečujemo s statističnimi trditvami v novicah, oglasih in politiki. Razumevanje osnov statistike je najboljša obramba pred manipulacijami s podatki in lažnimi novicami.',
        mathematicalTheory: 'Statistika združuje deskriptivno analizo podatkovnih nizov ter matematično teorijo verjetnosti z namenom ocenjevanja parametrov in preverjanja hipotez.'
      },
      textbookWisdom: {
        simpleQuote: 'Statistika je umetnost in znanost, kako iz nepopolnih podatkov potegniti zanesljive sklepe.',
        simpleExplanation: 'Ljudje imamo naravno težnjo, da povsod iščemo vzorce – tudi tam, kjer je le naključje. Statistika nam ponuja natančna orodja, s katerimi preverimo: ali ta pojav zares obstaja ali pa gre le za naključno srečo?',
        practicalInsight: 'Vsak dan se srečujemo s statističnimi trditvami v novicah, oglasih in politiki. Razumevanje osnov statistike je najboljša obramba pred manipulacijami s podatki in lažnimi novicami.',
        mathematicalTheory: 'Statistika združuje deskriptivno analizo podatkovnih nizov ter matematično teorijo verjetnosti z namenom ocenjevanja parametrov in preverjanja hipotez.'
      },
      cueBannerText: 'Ta uvodna lekcija je namenjena jasnemu razumevanju temeljnih konceptov brez zapletenega računanja.',
      hasSimulation: false,
      poeQuiz: {
        question: 'Prijatelj vam reče: »Videl sem dva človeka, ki sta jedla to dieto in shujšala, torej dieta stoodstotno deluje za vsakogar.« Kakšna je statistična ocena te trditve?',
        prompt: 'Pomislite na razliko med anekdotičnim primerom in statističnim dokazom:',
        options: [
          {
            id: 'opt-1',
            text: 'Gre za anekdotičen dokaz na premajhnem vzorcu (N=2), iz katerega ne moremo veljavno posploševati na celotno populacijo.',
            isCorrect: true,
            explanation: 'Pravilno! Dva posameznika ne predstavljata statističnega dokaza, saj so na rezultat lahko vplivali številni drugi dejavniki (gibanje, metabolizem, naključje).'
          },
          {
            id: 'opt-2',
            text: 'Trditev je povsem zanesljiva, ker temelji na resničnih opazovanjih dveh ljudi.',
            isCorrect: false,
            explanation: 'Napačno. Resničnost posameznega primera še ne pomeni, da je pojav univerzalen ali statistično značilen.'
          },
          {
            id: 'opt-3',
            text: 'Trditev je napačna le, če sta bila oba človeka istega spola.',
            isCorrect: false,
            explanation: 'Napačno. Glavna težava je premajhen vzorec in odsotnost kontrolne skupine.'
          }
        ],
        insight: 'Anekdote niso podatki – za resnične sklepe potrebujemo sistematično zbrane vzorce!',
        followUpExperiment: 'V naslednjih poglavjih boste spoznali, kako pravilno načrtujemo vzorčenje in merimo verjetnost.'
      },
      initialParams: {}
    },
    {
      id: 'unit-0-2',
      unitNumber: '0.2',
      chapterId: 'chapter-0',
      title: 'Trije stebri statističnega mišljenja',
      subtitle: 'Od opazovanja podatkov prek verjetnosti do znanstvenega sklepanja',
      leadParagraph: 'Vsak učbenik statistike in vsaka resna analiza podatkov temelji na treh medsebojno povezanih stebrih. Razumevanje te poti vam omogoča, da točno veste, kje v učnem procesu se nahajate in zakaj se posamezne teme navezujejo druga na drugo.',
      deepDive: 'Prvi steber nam pove, kaj imamo pred seboj. Drugi steber zgradi matematični model za negotovost in naključje. Tretji steber pa združi podatke in verjetnost, da lahko z izračunano stopnjo zaupanja sprejemamo odločitve o stvareh, ki jih nismo neposredno izmerili.',
      mnemonic: {
        eli5: 'Predstavljaj si detektiva: 1. najprej zbere vse odtise na kraju zločina (opisna statistika), 2. izračuna možnosti različnih scenarijev (verjetnost), 3. na sodišču predloži dokaze, ki izključijo naključje (sklepanje!).',
        anchor: '1. Opiši podatke → 2. Razumi naključje → 3. Sklepaj o celoti.',
        fallacyWarning: {
          name: 'Zamenjava opisa s sklepom',
          description: 'Prepričanje, da zgolj opis vzorca (npr. »v našem vzorcu je bilo 52 % moških«) samodejno pomeni dokaz za celotno populacijo brez preverjanja statistične značilnosti.',
          example: 'Razlika v vzorcu je lahko zgolj posledica naključnega nihanja, zato potrebujemo teste hipotez.'
        }
      },
      explanationLevels: {
        simpleQuote: '1. Opazuj sedanjost, 2. modeliraj negotovost, 3. zanesljivo napovej prihodnost.',
        simpleExplanation: 'Celotna statistika se deli na tri logične korake: 1. Opisna statistika (povprečja, mediane, grafikoni), 2. Verjetnost in porazdelitve (pravila naključja in Gaussova krivulja), 3. Inferenčna statistika (intervali zaupanja in p-vrednosti).',
        practicalInsight: 'Ko berete znanstveni članek ali poslovno poročilo, boste vedno prepoznali to zaporedje: najprej tabela opisnih podatkov, nato verjetnostni model in na koncu statistični sklep s stopnjo zaupanja.',
        mathematicalTheory: 'Struktura: Deskriptivna statistika S = {x_i} → Verjetnostni prostor (Ω, F, P) → Inferenčne metode T(X) z določenimi nivoji značilnosti α in intervali zaupanja 1-α.'
      },
      textbookWisdom: {
        simpleQuote: '1. Opazuj sedanjost, 2. modeliraj negotovost, 3. zanesljivo napovej prihodnost.',
        simpleExplanation: 'Celotna statistika se deli na tri logične korake: 1. Opisna statistika (povprečja, mediane, grafikoni), 2. Verjetnost in porazdelitve (pravila naključja in Gaussova krivulja), 3. Inferenčna statistika (intervali zaupanja in p-vrednosti).',
        practicalInsight: 'Ko berete znanstveni članek ali poslovno poročilo, boste vedno prepoznali to zaporedje: najprej tabela opisnih podatkov, nato verjetnostni model in na koncu statistični sklep s stopnjo zaupanja.',
        mathematicalTheory: 'Struktura: Deskriptivna statistika S = {x_i} → Verjetnostni prostor (Ω, F, P) → Inferenčne metode T(X) z določenimi nivoji značilnosti α in intervali zaupanja 1-α.'
      },
      cueBannerText: 'Spoznajte celotno arhitekturo statistike, preden se poglobite v posamezna poglavja.',
      hasSimulation: false,
      poeQuiz: {
        question: 'V katero vejo statistike spada izračun povprečne višine 50 dijakov v razredu?',
        prompt: 'Razmislite, ali gre za zgolj povzetek zbranih podatkov ali za posploševanje na celotno državo:',
        options: [
          {
            id: 'opt-1',
            text: 'V opisno (deskriptivno) statistiko, saj le povzemamo lastnosti skupine, ki smo jo neposredno izmerili.',
            isCorrect: true,
            explanation: 'Tako je! Opisna statistika se ukvarja s povzemanjem in opisovanjem obstoječih podatkov.'
          },
          {
            id: 'opt-2',
            text: 'V inferenčno statistiko, ker smo uporabili matematično formulo.',
            isCorrect: false,
            explanation: 'Napačno. Inferenčna statistika bi bila, če bi iz teh 50 dijakov ocenjevali višino vseh dijakov v državi.'
          },
          {
            id: 'opt-3',
            text: 'V Bayesovo verjetnost.',
            isCorrect: false,
            explanation: 'Napačno. Preprost izračun povprečja ne zahteva Bayesovega modeliranja.'
          }
        ],
        insight: 'Opisna statistika opisuje znano sedanjost, inferenčna statistika pa z verjetnostjo sklepa o neznanem!',
        followUpExperiment: 'V naslednjem poglavju 1 boste podrobno raziskali populacije, vzorce in mere sredine.'
      },
      initialParams: {}
    },
    {
      id: 'unit-0-3',
      unitNumber: '0.3',
      chapterId: 'chapter-0',
      title: 'Kako se učiti s tem spletnim učbenikom?',
      subtitle: 'Vizualno, interaktivno in brez nepotrebnega balasta',
      leadParagraph: 'Večina tradicionalnih učbenikov predstavi statistiko skozi kupe abstraktnih formul, ki jih študenti memorizirajo brez pravega intuitivnega razumevanja. Ta interaktivni učbenik je zasnovan na sodobnih pedagoških načelih: učenje z aktivnim raziskovanjem.',
      deepDive: 'Vsaka lekcija sledi jasni strukturi: 1. Jasno pojasnilo ideje v vsakdanjem jeziku z resničnimi primeri in opozorili na miselne pasti, 2. Interaktivno platno (kjer je to smiselno), kjer lahko sami spreminjate parametre in opazujete spremembe v živo, 3. Kratek konceptualni kviz za samopreverjanje razumevanja.',
      mnemonic: {
        eli5: 'Učenje statistike brez vizualizacije je kot učenje vožnje kolesa zgolj z branjem priročnika. Šele ko primeš krmilo (interaktivno platno), začutiš pravo ravnotežje!',
        anchor: 'Preberi idejo → Preizkusi v praksi → Preveri svoje razumevanje.',
        fallacyWarning: {
          name: 'Pasivno branje brez preizkušanja',
          description: 'Občutek, da razumemo koncept zgolj zato, ker smo prebrali besedilo, ne da bi ga aktivno preizkusili na podatkih.',
          example: 'Ko sami spremenite velikost vzorca na simulacijskem platnu, takoj opazite, kako se nihanje umiri – to si možgani zapomnijo za vedno.'
        }
      },
      explanationLevels: {
        simpleQuote: 'Če mi poveš, bom pozabil; če mi pokažeš, si bom zapomnil; če me vključiš, bom razumel.',
        simpleExplanation: 'V zgornjem meniju lahko kadarkoli preklapljate med tremi načini ogleda: enotni zvezni tok lekcije (priporočeno za branje), celozaslonsko interaktivno platno (za prosto raziskovanje) ali deljeni zaslon ob lekcijah z živo simulacijo.',
        practicalInsight: 'Za vsako lekcijo je na voljo tudi programska koda v Pythonu (Mini-Jupyter), ki jo lahko zaženete neposredno v brskalniku in vidite, kako te izračune izvajajo podatkovni znanstveniki v podjetjih.',
        mathematicalTheory: 'Interaktivna vizualizacija temelji na Monte Carlo simulacijah in dinamičnem izrisovanju analitičnih gostot verjetnosti v realnem času.'
      },
      textbookWisdom: {
        simpleQuote: 'Če mi poveš, bom pozabil; če mi pokažeš, si bom zapomnil; če me vključiš, bom razumel.',
        simpleExplanation: 'V zgornjem meniju lahko kadarkoli preklapljate med tremi načini ogleda: enotni zvezni tok lekcije (priporočeno za branje), celozaslonsko interaktivno platno (za prosto raziskovanje) ali deljeni zaslon ob lekcijah z živo simulacijo.',
        practicalInsight: 'Za vsako lekcijo je na voljo tudi programska koda v Pythonu (Mini-Jupyter), ki jo lahko zaženete neposredno v brskalniku in vidite, kako te izračune izvajajo podatkovni znanstveniki v podjetjih.',
        mathematicalTheory: 'Interaktivna vizualizacija temelji na Monte Carlo simulacijah in dinamičnem izrisovanju analitičnih gostot verjetnosti v realnem času.'
      },
      cueBannerText: 'Pripravljeni ste na začetek! Kliknite spodaj za prehod na Poglavje 1.',
      hasSimulation: false,
      poeQuiz: {
        question: 'Kaj je po sodobnih raziskavah najbolj učinkovit način za osvajanje statističnih konceptov?',
        prompt: 'Izberite pristop, ki prinaša trajno intuitivno razumevanje:',
        options: [
          {
            id: 'opt-1',
            text: 'Kombinacija jasne konceptualne razlage, interaktivnega vizualnega preizkusa in aktivnega samopreverjanja.',
            isCorrect: true,
            explanation: 'Odlično! Ravno temu cilju je v celoti prilagojen ta spletni učbenik.'
          },
          {
            id: 'opt-2',
            text: 'Učenje formul na pamet brez razumevanja podatkov.',
            isCorrect: false,
            explanation: 'Napačno. Formule brez intuicije hitro pozabimo.'
          },
          {
            id: 'opt-3',
            text: 'Zgolj reševanje ročnih računskih nalog brez vizualizacije.',
            isCorrect: false,
            explanation: 'Napačno. Ročno računanje ne razvije nujno pravega statističnega občutka za naključje.'
          }
        ],
        insight: 'Aktivno učenje s takojšnjo povratno informacijo omogoča najhitrejši napredek!',
        followUpExperiment: 'Nadaljujte na prvo lekcijo: Populacija, vzorec in spremenljivke.'
      },
      initialParams: {}
    }
  ]
};
