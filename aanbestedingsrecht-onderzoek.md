# Aanbestedingsrecht: gezamenlijk gemeentelijk investeren in open source

Status: Onderzoeksnotitie (niet-normatief)

Laatst bijgewerkt: 2026-09-07

Deze notitie onderzoekt welke ruimte de Aanbestedingswet 2012, de Europese
aanbestedingsrichtlijnen en de actuele jurisprudentie bieden om meerdere
gemeenten via het Bloei.me-model gezamenlijk te laten investeren in de
doorontwikkeling van open source componenten. Zij is geen juridisch advies en
stelt niet vast dat een route rechtmatig is; zij inventariseert wat het recht
vandaag zegt, welke constructies daarop passen, en wat wij kunnen doen om de
resterende knelpunten weg te nemen.

Het bredere productverhaal staat in
[public-sector-procurement.md](public-sector-procurement.md), de juridische
werkaannames in [legal.md](legal.md), en openstaande keuzes in
[open-questions.md](open-questions.md). Deze notitie vervangt geen van die
documenten en wijzigt geen aanvaarde beslissing.

## 1. Korte conclusie

Het knelpunt zit niet in een verbod in de Aanbestedingswet, maar in drie
structurele eigenschappen van het inkooprecht die botsen met spontane,
gestapelde co-financiering:

1. **Waarden tellen op.** Bij gezamenlijke inkoop is de geraamde waarde de som
   van alle deelnemers. Twintig gemeenten die elk EUR 15.000 toezeggen kopen
   samen voor EUR 300.000 in en zitten daarmee boven de Europese drempel van
   EUR 216.000 (diensten, decentrale overheid, 2026-2027).
2. **De leverancier moet vooraf in competitie zijn gekozen.** Het Bloei.me-model
   noemt de leverancier vóór de toezegging; het aanbestedingsrecht wil de
   competitie vóór de gunning. Directe gunning aan de steward is sinds
   HvJ EU C-578/23 nadrukkelijk geen begaanbare standaardroute.
3. **Deelnemers moeten vooraf bekend zijn.** Een raamovereenkomst kan alleen
   worden gebruikt door aanbestedende diensten die in de aankondiging
   duidelijk zijn geïdentificeerd, met een verplicht maximum, en zonder
   latere toetreders. Dat is precies het tegenovergestelde van een netwerk
   waar gemeenten spontaan aanhaken.

Er is **geen wetswijziging nodig** om het model te laten werken. De
schaalbare oplossing is structureel, niet wetgevend: laat één publieke entiteit
op eigen naam inkopen (aankoopcentrale-groothandelrol, artikel 2.11 Aw), zodat
gemeenten kunnen bijdragen zonder zelf per campagne een procedure te doorlopen
en zonder vooraf op een deelnemerslijst te staan. Dat is het model achter
Dimpact in Nederland en ZenDiS in Duitsland.

Wetgevingsbeïnvloeding is desondanks nu relevant en tijdkritisch: de Europese
Commissie presenteert op **9 september 2026** het voorstel voor één
rechtstreeks werkende aanbestedingsverordening die de drie huidige richtlijnen
vervangt. Wat daar niet in staat, staat er tot circa 2029 niet in.

## 2. Wat wet en rechtspraak vandaag zeggen

### 2.1 Drempels en waardebepaling

Verordening (EU) 2025/2152 stelt de drempels voor 1 januari 2026 tot en met
31 december 2027 vast. Voor de klassieke overheid:

| Categorie | Drempel |
| --- | --- |
| Werken | EUR 5.404.000 |
| Leveringen en diensten, centrale overheid | EUR 140.000 |
| Leveringen en diensten, decentrale overheid | EUR 216.000 |
| Sociale en andere specifieke diensten | EUR 750.000 |

De bedragen zijn dit keer verlaagd, omdat de euro sterker is geworden. Er moet
dus eerder Europees worden aanbesteed dan onder de vorige periode.

Bij gezamenlijke opdrachtverlening wordt de waarde van alle deelnemers
opgeteld. Artikel 2.14 Aw verbiedt het splitsen van een opdracht met het doel
onder de drempel te blijven. Een campagne die feitelijk één samenhangende
ontwikkelopdracht is, mag dus niet in twintig gemeentelijke deelopdrachtjes
worden geknipt om onderhands te kunnen gunnen. Onder de drempel gelden
bovendien nog steeds de beginselen uit deel 1 Aw, de Gids Proportionaliteit en
het gemeentelijke inkoopbeleid, die vaak zelf al meerdere offertes eisen.

Dit is het eerste ontwerpfeit voor Bloei.me: **de som van de toezeggingen, niet
de individuele toezegging, bepaalt het regime.**

### 2.2 Gratis gebruiken mag; betaald laten doorontwikkelen is inkoop

PIANOo bevestigt de kernregel: je hoeft alleen aan te besteden als je iets
inkoopt tegen betaling of een andere tegenprestatie. Open source software
kosteloos downloaden en gebruiken is geen overheidsopdracht, omdat er geen
wederkerige, op geld waardeerbare verbintenis is. PIANOo waarschuwt wel dat
een "zuivere situatie zonder tegenprestatie" moet worden getoetst: licentie- of
gebruiksverplichtingen jegens de licentiegever, of betaalde premium-onderdelen,
kunnen alsnog een opdracht opleveren.

Betaalde doorontwikkeling, integratie, ondersteuning of hosting is wel een
dienst en wordt op eigen merites beoordeeld. Dat het resultaat onder een open
licentie voor iedereen beschikbaar komt, maakt de afdwingbare betaalde opdracht
niet vanzelf een gift of subsidie.

### 2.3 Directe gunning aan de steward: HvJ EU C-578/23

In C-578/23 (9 januari 2025, IT-systeem Tsjechische belastingdienst) heeft het
Hof de onderhandelingsprocedure zonder voorafgaande bekendmaking bij technische
redenen of exclusieve rechten aangescherpt. De lijn:

- aanbestedende diensten mogen niet zelf een toestand van exclusiviteit in het
  leven roepen en zich daar vervolgens op beroepen;
- er geldt een dubbele toets: heeft de dienst de exclusiviteit zelf gecreëerd,
  en kan die redelijkerwijs worden doorbroken;
- een bestaande exclusiviteit is geen vrijbrief voor blijvende toepassing van
  de uitzondering;
- de keuze moet grondig in het administratieve dossier zijn onderbouwd.

Voor Bloei.me betekent dit dat stewardschap en release-autoriteit **feitelijk
bewijsmateriaal** zijn, geen exclusief commercieel recht. Bij open source is
het argument "alleen deze partij kan dit bouwen" bovendien intrinsiek zwak: de
broncode is per definitie voor iedere gekwalificeerde leverancier toegankelijk.
De aanbeveling uit het bestaande discussiestuk om de implementatie in
competitie te brengen en de steward-review apart en transparant te financieren,
wordt door dit arrest bevestigd.

### 2.4 Publiek-publieke samenwerking rond software: HvJ EU C-796/18

C-796/18 (ISE/Stadt Köln, 28 mei 2020) gaat exact over onze situatie: een
overheid stelt software om niet ter beschikking aan een andere overheid, met een
afspraak over wederzijdse doorontwikkeling. Kernpunten:

- die afspraak kan een **overeenkomst onder bezwarende titel** zijn, ook zonder
  geldstroom, omdat de toegezegde doorontwikkelingen op geld waardeerbaar zijn;
- horizontale samenwerking tussen aanbestedende diensten mag er niet toe leiden
  dat **een particuliere onderneming in een bevoorrechte situatie** wordt
  geplaatst (r.o. 76, in lijn met Lecce en Piepenbrock);
- er moet voldoende informatie beschikbaar zijn, waaronder de broncode, om
  daadwerkelijke mededinging op de afgeleide markt van aanpassing en onderhoud
  mogelijk te maken (r.o. 74-75).

Dit is voor ons eerder een steun in de rug dan een obstakel. Een model waarin de
volledige broncode publiek is, alle gefinancierde wijzigingen upstream landen en
elke leverancier het onderhoud kan bieden, voldoet structureel aan de toets die
Keulen niet doorstond. Het gelijke-toegangsargument is bij Bloei.me een
ontwerpeigenschap, geen mitigatie achteraf.

De keerzijde staat in de VNG-handreiking publiek-publieke samenwerking. Twee
casusposities daaruit zijn direct relevant en beide negatief:

- *Uitbreiding software:* gemeente B die gaat meeliften op het contract van
  gemeente A met leverancier X is **geen** toegestane horizontale samenwerking;
  er is geen gezamenlijke vervulling van een taak van algemeen belang, en een
  particuliere onderneming wordt bevoordeeld.
- *Kantoorautomatisering:* generieke ICT is geen taak van algemeen belang die
  gezamenlijk op de deelnemers rust, en dienstverlening tegen kostenvergoeding
  is juist een kenmerk van een overheidsopdracht.

Meeliften op andermans contract is dus geen route. Dat sluit een populaire
verwachting bij gemeenten expliciet uit.

### 2.5 Raamovereenkomsten schalen slecht naar een open netwerk

De regels en rechtspraak zijn hier hard:

- deelnemende aanbestedende diensten moeten in de aanbestedingsstukken
  **duidelijk zijn geïdentificeerd**, zodanig dat zowel de dienst zelf als elke
  geïnteresseerde ondernemer daarvan op de hoogte is (C-216/17, Coopservice,
  19 december 2018);
- de **maximumhoeveelheid en/of maximumwaarde** moet vooraf worden vermeld en
  geldt voor alle deelnemers samen; bij het bereiken daarvan heeft de
  raamovereenkomst geen effect meer (C-216/17 en C-23/20, Simonsen & Weel,
  17 juni 2021; bevestigd in een arrest van 1 augustus 2025, zaaknummer nog te
  verifiëren, waarin een enkele prijsformule onvoldoende werd geacht);
- tijdens de looptijd deelnemers toevoegen is een wezenlijke wijziging;
- de looptijd is in beginsel maximaal vier jaar.

Een raamovereenkomst blijft bruikbaar voor een **cohort** dat vooraf bekend is,
bijvoorbeeld een regio of een bestaand samenwerkingsverband. Zij is ongeschikt
als generiek toetredingsmechanisme voor "iedere Nederlandse gemeente die later
wil meedoen". Het model moet daarom niet op één landelijke raamovereenkomst
worden gebouwd.

### 2.6 Quasi-inbesteden: de coöperatie- of GR-route

Artikel 2.24a en 2.24b Aw (artikel 12 richtlijn 2014/24) sluiten opdrachten aan
een gelieerde rechtspersoon uit wanneer cumulatief geldt:

- de deelnemende overheden oefenen **toezicht uit als op de eigen diensten**,
  dat wil zeggen beslissende invloed op strategische doelen en belangrijke
  besluiten; gezamenlijk toezicht via vertegenwoordiging in de bestuursorganen
  is toegestaan;
- **meer dan 80%** van de activiteiten wordt verricht voor de deelnemende
  overheden;
- er is **geen directe private kapitaaldeelneming** (met beperkte uitzonderingen
  voor niet-controlerende belangen).

Dit is de route die in de praktijk al werkt. Dimpact is een coöperatie van en
voor gemeenten die als rechtspersoon fungeert voor gezamenlijke ontwikkeling,
onder meer voor de open source data- en dienstenlaag rond Common Ground en Open
Zaak. In Duitsland is ZenDiS bewust zo opgezet dat deelnemende overheden
openDesk in-house kunnen afnemen zonder aanbesteding.

Aandachtspunten: nieuwe deelnemers moeten daadwerkelijk mede-toezicht krijgen
(lidmaatschap, stemrecht, zetel in de ledenraad), het 80%-criterium beperkt
verkoop aan derden, en de entiteit wordt zelf een aanbestedende dienst en moet
haar eigen inkoop bij marktpartijen aanbesteden. Dat laatste is geen bezwaar:
één procedure vervangt honderden.

### 2.7 Aankoopcentrale: de meest onderschatte route

Artikel 2.11 Aw kent twee vormen van gecentraliseerde aankoopactiviteiten:

- **groothandelrol:** de aankoopcentrale koopt leveringen en diensten (geen
  werken) **op eigen naam** in en levert door aan aangesloten diensten; de
  aanbestedingsplicht verschuift daarmee naar de aankoopcentrale;
- **tussenpersoonrol:** de aankoopcentrale besteedt namens aangesloten diensten
  aan, beheert een dynamisch aankoopsysteem of sluit raamovereenkomsten.

Een aanbestedende dienst die van een aankoopcentrale gebruikmaakt, voldoet
daarmee aan zijn eigen verplichtingen; hij blijft alleen verantwoordelijk voor
de delen die hij zelf uitvoert.

De groothandelrol is voor ons het interessantst, omdat daarin **geen vooraf
geïdentificeerde deelnemerslijst** nodig is zoals bij een raamovereenkomst. De
centrale koopt voor eigen rekening in; wie later aanhaakt, haakt aan bij de
centrale, niet bij een gesloten aanbesteding. Bij open source is de
"doorlevering" bovendien triviaal, omdat het resultaat sowieso publiek is.

Dit is niet in de rechtspraak getest voor de specifieke figuur "publieke
entiteit koopt open source doorontwikkeling in en financiert dat uit
gemeentelijke bijdragen". Het is de sterkste kandidaat, maar het is expliciet
een te valideren constructie, geen vaststaand recht.

### 2.8 De O&O-uitzondering: smal, maar precies op ons snijvlak

Artikel 2.24 sub g Aw (artikel 14 richtlijn 2014/24) zondert
onderzoeks- en ontwikkelingsdiensten uit. De Nederlandse uitleg hanteert drie
cumulatieve voorwaarden:

1. de opdracht valt onder CPV-codes 73000000-2 tot en met 73120000-9,
   73300000-5, 73420000-2 of 73430000-5;
2. de resultaten komen niet uitsluitend toe aan de aanbestedende dienst voor
   gebruik in de eigen werkzaamheden;
3. de dienstverlening wordt niet volledig door de aanbestedende dienst betaald.

Voorwaarden 2 en 3 zijn bij het Bloei.me-model **structureel vervuld**: het
resultaat komt onder een open licentie aan iedereen toe, en de kosten worden
door meerdere partijen gedeeld. Precies dat is ook de ratio van de uitzondering,
namelijk het stimuleren van cofinanciering van onderzoek en ontwikkeling.

Voorwaarde 1 is de beperking. De uitzondering geldt alleen voor echte O&O. Op de
TRL-schaal geldt: hoe hoger het niveau, hoe minder sprake van onderzoek en
ontwikkeling; bij TRL 9 is er geen O&O meer. Een nieuwe, nog niet bestaande
capaciteit kan kwalificeren. Regulier onderhoud, bugfixes, een extra veld in een
formulier of een integratie met een bestaand systeem kwalificeert niet. De
uitzondering is dus bruikbaar voor de innovatieve kop van de portefeuille, niet
voor de dagelijkse stroom aan verbeteringen.

Wie deze route gebruikt moet ook staatssteun afdekken. De Kaderregeling
staatssteun O&O&I (2014, punt 33) neemt geen steun aan wanneer de betaalde prijs
de marktwaarde volledig weergeeft, met name als cumulatief geldt:

- de selectieprocedure is openbaar, transparant, niet-discriminerend en
  gebaseerd op vooraf vastgestelde objectieve criteria;
- de contractuele regelingen, inclusief de intellectuele-eigendomsrechten, zijn
  vóór de biedprocedure aan alle geïnteresseerde bieders beschikbaar gesteld;
- geen deelnemende dienstverrichter krijgt een voorkeursbehandeling bij latere
  commerciële volumes;
- alle resultaten die geen IE-rechten opleveren kunnen breed worden verspreid,
  of de opdrachtgever krijgt de rechten en derden krijgen markconforme toegang.

Publicatie van alle resultaten als open source onder een standaardlicentie is
een vrijwel ideale invulling van de laatste voorwaarde. Ook hier geldt: dit
maakt de constructie verdedigbaar, niet automatisch goedgekeurd.

### 2.9 Subsidie of overheidsopdracht

Het onderscheid bepaalt of er überhaupt aanbestedingsplicht is. PIANOo en de
Afdeling bestuursrechtspraak (ECLI:NL:RVS:2016:803) wegen onder meer:

- is er een reële tegenprestatie voor verrichte werkzaamheden, inclusief
  winstmarge, of dekt de bijdrage slechts een deel van de kosten;
- is er een rechtstreeks verband tussen betaling en prestatie;
- ligt het initiatief en de inhoudelijke bepaling bij de overheid of bij de
  ontvanger;
- is de rechtsrelatie eenzijdig (beschikking) of meerzijdig (overeenkomst).

Voor Bloei.me is de scheidslijn scherp en bruikbaar: hoe concreter de gemeente
een specifieke, afdwingbare feature koopt, hoe zekerder het een
overheidsopdracht is. Hoe meer de bijdrage een niet-geoormerkte investering in
een gemeenschappelijk goed is, waarbij de ontvangende entiteit zelf de
prioritering bepaalt, hoe dichter men bij een subsidie of contributie komt. Een
bijdrage aan een concrete feature met een genoemde leverancier moet worden
verondersteld een overheidsopdracht te zijn totdat de gemeente zelf anders
vaststelt.

Dit is geen ontsnappingsroute maar een ontwerpkeuze met een prijs: hoe verder
richting subsidie, hoe minder hard de belofte "mijn feature wordt gebouwd" kan
zijn. Bovendien komen dan het subsidiekader en de staatssteunregels in beeld.

### 2.10 Aanpalende regelgeving die in ons voordeel werkt

- **GIBIT 2025 (gepubliceerd maart 2026):** maatwerksoftware voor gemeenten
  wordt standaard "open source, tenzij"; de handreiking wijst op publicatie van
  broncode en op de European Union Public Licence. Dit maakt het open karakter
  van Bloei.me-resultaten conform het gemeentelijke standaardinkoopkader in
  plaats van een uitzondering die moet worden bevochten.
- **Interoperabel Europa-verordening (EU) 2024/903:** verplicht
  interoperabiliteitsbeoordelingen en het delen van
  interoperabiliteitsoplossingen met andere overheden op verzoek. Dit levert een
  beleidsmatige rechtvaardiging voor gezamenlijke investering, geen
  aanbestedingsrechtelijke uitzondering.
- **Cyber Resilience Act (EU) 2024/2847, artikel 24:** introduceert de
  juridische figuur van de **open-source software steward** met eigen, lichtere
  verplichtingen (cyberbeveiligingsbeleid, samenwerking met markttoezicht, en
  vanaf 11 september 2026 meldplichten voor actief misbruikte kwetsbaarheden).
  De stewardrol in ons model sluit hierop aan, en gefinancierd
  upstream-onderhoud wordt hierdoor voor gemeenten aantoonbaar relevant in
  plaats van vrijblijvend.
- **Innovatiebudget Digitale Overheid (BZK):** in 2026 EUR 3 miljoen verdeeld
  over 15 projecten met 74 samenwerkende overheidsorganisaties, beoordeeld op
  herbruikbaarheid en transparantie, gericht op schaalbare open source
  oplossingen, met verplichte cofinanciering en bestuurlijke commitment. Dit is
  een bestaand, werkend precedent voor gezamenlijke publieke cofinanciering van
  open source en een realistische eerste financieringsbron voor een pilot.
- **Fonds Gezamenlijke Gemeentelijke Uitvoering (VNG):** gemeenten dragen
  ongeveer EUR 4,64 per inwoner bij aan een collectief fonds waaruit gezamenlijk
  wordt ingekocht en ontwikkeld; het bedrag wordt jaarlijks op de ALV
  vastgesteld. Dit bewijst dat collectieve gemeentelijke financiering
  bestuurlijk en juridisch inrichtbaar is; het bewijst niet dat de onderliggende
  inkoop zonder procedure kan.

## 3. Beoordeling van de routes

| Route | Schaalt naar veel gemeenten | Juridisch risico | Doorlooptijd per campagne | Wie moet iets opzetten |
| --- | --- | --- | --- | --- |
| A. Bestaand contract of raamovereenkomst per gemeente | Nee | Laag tot midden, afhankelijk van scope en wezenlijke wijziging | Kort als het past | Gemeente zelf |
| B. Gezamenlijke aanbesteding per campagne | Nee | Laag | Lang | Wisselende penvoerder |
| C. Eén landelijke raamovereenkomst | Nee, deelnemers zitten vast | Midden, C-216/17 en maximumwaarde | Kort binnen cohort | Inkooporganisatie |
| D. Dynamisch aankoopsysteem | Deels | Laag tot midden | Middel, minicompetitie per opdracht | Inkooporganisatie |
| E. Quasi-inbesteden via coöperatie of GR | Ja, via lidmaatschap | Midden, 80%- en toezichtcriterium | Kort | Gemeenten samen |
| F. Aankoopcentrale in groothandelrol | Ja, zonder deelnemerslijst | Midden, weinig getest | Kort | Publieke entiteit |
| G. Horizontale samenwerking (meeliften) | Niet van toepassing | Hoog, expliciet afgewezen | - | - |
| H. Directe gunning aan de steward | Niet van toepassing | Hoog, C-578/23 | - | - |
| I. O&O-uitzondering / precommercieel inkopen | Ja, maar smal toepasbaar | Midden, alleen bij echte O&O plus staatssteuntoets | Middel | Gemeente of centrale |
| J. Subsidie of contributie zonder geoormerkte prestatie | Ja | Midden, herkwalificatierisico plus staatssteun | Kort | Ontvangende entiteit |

Routes G en H zijn geen route. Route A blijft nuttig als snelle instap voor
individuele gemeenten en is de kern van "Path A" in het bestaande
discussiestuk. De schaalbare kandidaten zijn E en F, met I als aanvulling voor
de innovatieve kop en D als praktisch werkpaard voor herhaalde kleine
opdrachten.

## 4. Aanbevolen constructie

Een gezamenlijke publieke entiteit die zowel als **aankoopcentrale** (artikel
2.11 Aw, groothandelrol) als **quasi-inbesteedbare rechtspersoon** (artikel
2.24b Aw) is ingericht. Werking:

1. Gemeenten worden lid of deelnemer en krijgen daarmee mede-zeggenschap:
   stemrecht over strategie en jaarplan. Dat borgt het toezichtcriterium.
2. De entiteit koopt op eigen naam open source ontwikkel-, onderhouds- en
   integratiediensten in via één Europese procedure, bij voorkeur een dynamisch
   aankoopsysteem met percelen, zodat nieuwe leveranciers doorlopend kunnen
   toetreden en per campagne een korte minicompetitie volstaat.
3. Gemeenten dragen bij aan de entiteit, niet aan een leverancier. Zij kopen
   geen individuele feature van een individuele leverancier.
4. De entiteit gunt, contracteert, betaalt en publiceert; het resultaat komt
   onder open licentie aan iedereen toe.
5. Nieuwe gemeenten haken op elk moment aan door lid te worden. Er is geen
   gesloten deelnemerslijst en geen maximum dat de constructie uitput.

Waarom dit de drie knelpunten uit paragraaf 1 oplost: de waardeoptelling
verhuist naar één inkopende partij die toch al Europees aanbesteedt; de
leverancierskeuze gebeurt in competitie vóór de campagne in plaats van erna; en
toetreding is lidmaatschap in plaats van contractwijziging.

Valkuilen die vooraf moeten worden geadresseerd:

- de entiteit wordt zelf een aanbestedende dienst, waarschijnlijk als
  publiekrechtelijke instelling zodra zij voor meer dan de helft door overheden
  wordt gefinancierd (C-380/98) of onder overheidstoezicht staat; dat is bewust
  te aanvaarden, niet te vermijden;
- het 80%-criterium beperkt dienstverlening aan niet-deelnemers, wat botst met
  het idee dat private organisaties in hetzelfde netwerk meefinancieren; private
  financiering moet dan buiten de entiteit om lopen of de quasi-inbesteedroute
  wordt losgelaten ten gunste van uitsluitend de aankoopcentrale-route;
- geen directe private kapitaaldeelneming in de entiteit;
- de relatie tussen bijdrage en concrete feature moet bestuurlijk expliciet
  zijn: hoe harder de belofte, hoe eerder het een overheidsopdracht van de
  gemeente zelf is;
- de steward mag review en release-integratie leveren, maar dat moet transparant
  en gescheiden van de implementatiegunning worden gefinancierd, met een
  beschreven omgang met de dubbele rol van specificeren en accepteren.

Dit is een te valideren constructie. Zij moet vóór een pilot door een
Nederlandse aanbestedings- en staatssteunspecialist worden getoetst, inclusief
de vraag of de bijdrage van een gemeente aan de entiteit zelfstandig
aanbestedingsplichtig is of onder artikel 2.11 dan wel 2.24b Aw valt.

## 5. Gevolgen voor het product

Deze bevindingen bevestigen en verscherpen enkele voorstellen uit het bestaande
discussiestuk:

- **Onderscheid interesse, voorwaardelijke toezegging en effectieve pledge.**
  Dit is geen luxe maar noodzakelijk: publieke interesse mag nooit als gedekte
  financiering worden gepresenteerd zolang de route niet rond is.
- **Ondersteun een leverancier-neutrale voorstelfase.** Het model dat de
  leverancier vóór de financiering vastlegt, is voor publieke financiers in veel
  gevallen onbruikbaar. Route "leverancier volgt uit gunning" moet een
  eersteklas pad worden, niet een uitzondering.
- **Registreer de route, niet de rechtmatigheid.** Bloei.me legt vast welk
  instrument een organisatie inroept, wie dat heeft goedgekeurd, tot welk bedrag
  en tot welke datum. Het platform beoordeelt niet of de juridische conclusie
  klopt.
- **Toon de opgetelde waarde.** Omdat de som bepalend is, moet een campagne het
  publieke totaal en het aandeel publieke financiers expliciet tonen, met een
  waarschuwing zodra drempeloverschrijding in zicht komt.
- **Maak "aankoopcentrale of gezamenlijke entiteit" een eersteklas
  organisatietype**, met eigen leden, in plaats van het te modelleren als één
  gewone financierende organisatie.

## 6. Wat wij kunnen doen richting wetgeving

### 6.1 Europees, en het is nu

De Commissie presenteert op 9 september 2026 het voorstel voor een
**rechtstreeks werkende aanbestedingsverordening** die richtlijnen 2014/23,
2014/24 en 2014/25 vervangt. Uit het op 9 juli 2026 uitgelekte ontwerp komen
onder meer naar voren: drie hoofdprocedures waaronder een *dynamic simplified
procedure* en een *innovation challenge procedure*, een minimumaandeel
kwalitatieve gunningscriteria, ruimte voor Europese voorkeur, en een verplichte
aankondiging van het behoeftenplan per begrotingsperiode. Inwerkingtreding
twintig dagen na publicatie, toepassing naar verwachting circa twee jaar later,
dus rond 2029. Omdat het een verordening wordt, verdwijnt de nationale
beleidsruimte die de Aanbestedingswet 2012 nu nog biedt.

Realistische, verdedigbare inbreng namens een open source
co-financieringsnetwerk:

1. **Erken gezamenlijke financiering van publiek beschikbare digitale
   gemeenschapsgoederen als eigen figuur.** Concreet: een expliciete bepaling
   dat een bijdrage aan een gezamenlijk gefinancierde ontwikkeling waarvan het
   resultaat onder een open licentie voor iedereen beschikbaar komt, voor de
   bijdragende dienst geen zelfstandige opdracht is, mits de inkopende entiteit
   zelf conform de verordening heeft gegund. Dit codificeert wat nu via artikel
   2.11 Aw moet worden geconstrueerd.
2. **Maak de O&O-uitzondering bruikbaar buiten klassiek onderzoek.** De huidige
   koppeling aan CPV 73-codes en TRL-niveaus sluit onderhoud en incrementele
   doorontwikkeling van gedeelde open source uit, terwijl juist daar de
   marktfalen zit. Voorstel: een aparte, gepubliceerde lichte procedure voor
   opdrachten waarvan alle resultaten publiek en herbruikbaar worden opgeleverd.
3. **Sta open toetreding tot raamovereenkomsten en dynamische systemen toe voor
   opdrachten met volledig open resultaten.** De identificatieplicht uit
   C-216/17 beschermt tegen verborgen volumeverschuiving. Dat belang is veel
   kleiner wanneer het resultaat sowieso voor iedereen gratis beschikbaar is.
4. **Neem afhankelijkheid en exit expliciet op als kwalitatief
   gunningscriterium.** Sluit aan bij het minimumaandeel kwalitatieve criteria
   uit het ontwerp en bij de Duitse ZenDiS-inbreng om digitale soevereiniteit en
   lock-in-effecten als zelfstandig criterium te verankeren.

Kanalen: de Nederlandse Vereniging voor Aanbestedingsrecht, PIANOo, VNG en het
Ministerie van Binnenlandse Zaken voor de Nederlandse positiebepaling in de
Raad, en het Europees Parlement via rapporteur en schaduwrapporteurs zodra het
dossier is toegewezen. De Interoperabel Europa-board en OSOR zijn geschikte
routes om het onderwerp inhoudelijk te agenderen.

### 6.2 Nationaal

- Het lopende wetsvoorstel **36874** (versterking rechtsbescherming bij
  aanbesteden) is inhoudelijk te smal om open source-bepalingen aan te hangen en
  bevindt zich bovendien in een adviestraject. Niet geschikt als vehikel.
- Meer rendement zit in **soft law**: de Gids Proportionaliteit,
  PIANOo-handreikingen, en vooral GIBIT, dat sinds GIBIT 2025 al "open source,
  tenzij" voorschrijft voor maatwerksoftware. Een handreiking "gezamenlijk
  financieren van open source componenten", opgesteld met PIANOo en VNG,
  verandert de praktijk sneller dan een wetswijziging en kan er in de tussentijd
  komen.
- De VNG werkt in 2026 al aan een handreiking percelen, een dynamische
  aanbestedingskalender en collectiviseringsvoorstellen, en benoemt financiering
  expliciet als knelpunt. Dat is een open deur om het Bloei.me-model als
  financieringsmechanisme te positioneren.

### 6.3 Wat wij niet moeten proberen

- Pleiten voor een algemene vrijstelling voor "alles wat open source is". Dat
  botst frontaal met het gelijkheidsbeginsel en met C-796/18, en beschadigt de
  geloofwaardigheid van de wel verdedigbare voorstellen.
- Stewardschap presenteren als exclusief recht. C-578/23 maakt dit alleen maar
  riskanter dan het al was.
- Drempelvermijding faciliteren door campagnes of bijdragen te knippen. Artikel
  2.14 Aw verbiedt het, en één zichtbare misstap kost het hele model zijn
  publieke deelnemers.

## 7. Openstaande punten voor validatie

1. Is de bijdrage van een gemeente aan een aankoopcentrale die op eigen naam
   inkoopt, zelfstandig aanbestedingsplichtig? Dit is de spil van route F en is
   niet in rechtspraak beslecht.
2. Kan één entiteit tegelijk aankoopcentrale en quasi-inbesteedbaar zijn zonder
   dat het 80%-criterium de private deelname in het netwerk blokkeert?
3. Waar ligt bij incrementele ontwikkeling aan bestaande open source de grens
   tussen O&O in de zin van artikel 2.24 sub g Aw en reguliere dienstverlening?
4. Welk zaaknummer en welke exacte overweging horen bij het arrest van
   1 augustus 2025 over maximumwaarden in raamovereenkomsten?
5. Hoe verhoudt een gemeentelijke bijdrage zonder geoormerkte prestatie zich tot
   het staatssteunkader wanneer de ontvangende entiteit ook commerciële
   leveranciers betaalt?
6. Welke bestaande entiteit kan de rol vervullen: Dimpact, een bestaand
   inkoopbureau, een nieuwe coöperatie, of VNG-gerelateerde uitvoering?
7. Bevat het definitieve verordeningsvoorstel van 9 september 2026 bepalingen
   die deze analyse veranderen?

## 8. Bronnen

Wet- en regelgeving

- [Aanbestedingswet 2012, artikel 2.24](https://omgevingsweb.nl/wetgeving/aanbestedingswet-2012/deel-2-overheidsopdrachten-en-prijsvragen-voor-overheidsopdrachten/hoofdstuk-2-1-reikwijdte/afdeling-2-1-3-uitgezonderde-overheidsopdrachten-en-prijsvragen/artikel-2-24/)
- [Richtlijn 2014/24/EU](https://eur-lex.europa.eu/eli/dir/2014/24/oj/eng)
- [Drempelbedragen Europees aanbesteden 2026-2027 (PIANOo)](https://www.pianoo.nl/nl/regelgeving/drempelbedragen-europees-aanbesteden)
- [Lagere drempelbedragen 2026-2027 (Europa decentraal)](https://europadecentraal.nl/nieuws/lagere-drempelbedragen-europese-aanbestedingen-en-concessies-vanaf-2026-2027/)
- [Kaderregeling staatssteun O&O&I 2022/C 414/01](https://eur-lex.europa.eu/NL/legal-content/summary/state-aid-framework-for-research-and-development-and-innovation-rdi-framework.html)
- [Cyber Resilience Act, artikel 24 (open-source software stewards)](https://www.european-cyber-resilience-act.com/Cyber_Resilience_Act_Article_24.html)
- [Interoperabel Europa-verordening (Europa decentraal)](https://europadecentraal.nl/onderwerp/digitale-overheid/privacy/interoperabel-europa-verordening/)

Jurisprudentie

- [HvJ EU C-796/18 (ISE/Stadt Köln)](https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX:62018CJ0796)
- [Analyse C-796/18 en bevoorrechte positie particuliere onderneming](http://keesvandewater.blogspot.com/2020/06/een-particuliere-onderneming-in-een.html)
- [HvJ EU C-578/23 en de onderhandelingsprocedure zonder bekendmaking (Schoups)](https://legalnews.be/overheidsopdrachten/de-onderhandelingsprocedure-zonder-voorafgaande-bekendmaking-het-hof-van-justitie-zet-de-puntjes-op-de-i-schoups/)
- [HvJ EU C-216/17 (Coopservice)](https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX:62017CJ0216)
- [HvJ EU C-23/20 (Simonsen & Weel)](https://www.inview.nl/document/id29a24b614db64809820f8d571b78d612/hvj-eu-17-06-2021-nr-c-23-20)
- [Arrest 1 augustus 2025 over raamovereenkomsten (Advocalex)](https://legalnews.be/overheidsopdrachten/overheidsopdrachten-raamovereenkomsten-arrest-van-1-augustus-2025-van-het-hof-van-justitie-advocalex/)
- [Publiekrechtelijke instelling: financiering, beheer en toezicht (PIANOo)](https://www.pianoo.nl/nl/publiekrechtelijke-instelling-financiering-beheer-toezicht)

Uitleg en handreikingen

- [Open source software gebruiken zonder aanbesteding (PIANOo)](https://www.pianoo.nl/nl/actueel/nieuws/open-source-software-gebruiken-zonder-aanbesteding-wat-mag-wel-en-wat-niet)
- [Open source software en licentiemodellen (PIANOo)](https://www.pianoo.nl/nl/sectoren/ict/ict-categorieen/open-source-software-en-de-belangrijkste-licentiemodellen)
- [Raamovereenkomsten (PIANOo)](https://www.pianoo.nl/nl/inkoopproces/aanbestedingsprocedures/raamovereenkomsten)
- [Gecentraliseerde aankoopactiviteiten en aankoopcentrales (PIANOo)](https://www.pianoo.nl/nl/inkoopproces/aanbestedingsprocedures/gecentraliseerde-aankoopactiviteiten-en-aankoopcentrales)
- [Inbesteden en de aanbestedingsrichtlijnen (Europa decentraal)](https://europadecentraal.nl/onderwerp/aanbesteden/uitzonderingen/inbesteden/)
- [Handreiking publiek-publieke samenwerking en het aanbestedingsrecht (VNG)](https://www.pianoo.nl/sites/default/files/documents/documents/handreiking-vng-publiek-publieke-samenwerking.pdf)
- [Aanbestedings- en staatssteunrechtelijke kaders voor innovatiegericht inkopen (PIANOo, Corvers en Apostol)](https://www.pianoo.nl/sites/default/files/media/documents/2021-07/De-aanbestedings-en-staatssteunrechtelijke-kaders-voor-innovatiegericht-inkopen-2-juli2021.pdf)
- [Onderzoeks- en ontwikkelingsdiensten uitgesloten? (Europa decentraal)](https://europadecentraal.nl/praktijkvraag/zijn-onderzoeks-en-ontwikkelingendiensten-uitgesloten-van-de-aanbestedingsplicht/)
- [Subsidie of overheidsopdracht (PIANOo)](https://www.pianoo.nl/nl/visie-subsidie-overheidsopdracht)

Beleid, praktijk en wetgevingsontwikkeling

- [Herziening Europese aanbestedingsrichtlijnen (PIANOo)](https://www.pianoo.nl/nl/regelgeving/europese-wetgeving/herziening-europese-aanbestedingsrichtlijnen)
- [Herziening laat nog op zich wachten, publicatie 9 september 2026 (PIANOo)](https://www.pianoo.nl/nl/actueel/nieuws/herziening-europese-aanbestedingsrichtlijnen-laat-nog-op-zich-wachten)
- [Gelekt ontwerp EU Public Procurement Regulation (Noerr)](https://www.noerr.com/en/insights/turning-point-in-eu-public-procurement-law-proposal-drawn-up)
- [De keuze voor een rechtstreeks toepasselijke verordening (CMS)](https://cms.law/nl/nld/publication/de-toekomst-van-aanbesteden-deel-i-de-keuze-voor-een-rechtstreeks-toepasselijke-europese-verordening)
- [Wetsvoorstel 36874, versterking rechtsbescherming bij aanbesteden](https://www.tweedekamer.nl/kamerstukken/wetsvoorstellen/detail?cfg=wetsvoorsteldetails&qry=wetsvoorstel%3A36874)
- [Gemeenten verankeren open source in inkoopvoorwaarden (Binnenlands Bestuur)](https://www.binnenlandsbestuur.nl/digitaal/gemeenten-verankeren-open-source-in-inkoopvoorwaarden)
- [GIBIT (VNG)](https://vng.nl/projecten/gibit)
- [Digitale autonomie: wat kunnen gemeenten nu al doen (VNG)](https://vng.nl/artikelen/digitale-autonomie-wat-kunnen-gemeenten-nu-al-doen)
- [Gemeenten betrokken bij 15 winnende innovatieprojecten (VNG)](https://vng.nl/nieuws/gemeenten-betrokken-bij-15-winnende-innovatieprojecten)
- [15 projecten ontvangen Innovatiebudget 2026 (Digitale Overheid)](https://www.digitaleoverheid.nl/nieuws/15-projecten-ontvangen-innovatiebudget-2026/)
- [Gezamenlijke Gemeentelijke Uitvoering (VNG)](https://vng.nl/ggu)
- [Coöperatie Dimpact](https://www.dimpact.nl/over-ons/)
- [OpenZaak community](https://openzaak.org/community/)
- [ZenDiS](https://www.zendis.de/en)
