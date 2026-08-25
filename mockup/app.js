(function () {
  "use strict";

  const SCHEMA_VERSION = 1;
  const MAX_PRICE_MINOR = 10_000_000;
  const app = document.getElementById("app");
  const personaSelect = document.getElementById("persona-select");
  const localeToggle = document.getElementById("locale-toggle");
  const dialog = document.getElementById("action-dialog");
  const actionForm = document.getElementById("action-form");
  const dialogContent = document.getElementById("dialog-content");
  const dialogError = document.getElementById("dialog-error");
  const toast = document.getElementById("toast");

  const copy = {
    en: {
      skip: "Skip to content",
      mockupBanner: "Interactive mockup · Data stays in this browser",
      primaryNavigation: "Primary navigation",
      navJourney: "Journey",
      navDiscover: "Discover",
      navWorkspace: "Workspace",
      navCampaign: "Campaign",
      navShare: "Share",
      actingAs: "Act as",
      footerCopy: "A browser-only product simulation.",
      resetJourney: "Reset journey",
      cancel: "Cancel",
      close: "Close",
      journeyEyebrow: "PDF/UA pilot journey",
      journeyTitle: "Move a shared need from idea to accepted result.",
      journeyIntro: "Switch roles as the work moves between a municipality, platform operator, maintainer, suppliers, and funders. Every action updates the same shared record.",
      journeyProgress: "Journey progress",
      stepsComplete: "steps complete",
      recommendedNext: "Recommended next step",
      switchAndContinue: "Switch role and continue",
      openTask: "Open task",
      allComplete: "The journey is complete",
      allCompleteDetail: "The accepted result and external settlement notes are now preserved in the shared record.",
      currentPersona: "Current perspective",
      organization: "Organization",
      authority: "Authority",
      publicView: "Public information only",
      noOrganization: "No acting organization",
      discoverEyebrow: "One canonical network",
      discoverTitle: "Discover shared needs and funded outcomes.",
      discoverIntro: "Components, organizations, proposals, and campaigns have one public identity. Budgets and personal authority remain private.",
      components: "Components",
      organizations: "Organizations",
      proposals: "Proposals",
      campaigns: "Campaigns",
      verified: "Identity verified",
      provisional: "Provisional",
      notRegistered: "Not registered",
      active: "Active participant",
      awaitingTerms: "Awaiting terms",
      public: "Public",
      private: "Private",
      endorsements: "endorsements",
      noProposal: "The PDF/UA idea has not been published as a proposal yet.",
      noCampaign: "Suppliers have not published a campaign yet.",
      workspaceEyebrow: "Role-based workspace",
      workspaceTitle: "Your work follows your authority.",
      workspaceIntro: "Tasks and protected records change with the selected persona. Organization-owned actions survive persona changes.",
      availableTasks: "Available tasks",
      noTasks: "There are no actions for this role at the current stage.",
      protectedRecords: "Protected records",
      activity: "Recent activity",
      noActivity: "No domain actions have been recorded yet.",
      budgetTotal: "Budget total",
      budgetAvailable: "Available",
      budgetReserved: "Reserved",
      budgetConsumed: "Consumed",
      noBudgetAccess: "This persona cannot see any organization budget.",
      campaignEyebrow: "Campaign record",
      campaignPlaceholderTitle: "PDF/UA-compliant document generation",
      campaignPlaceholder: "The campaign becomes public after the supplier team and component maintainer confirm it.",
      maximumPrice: "Maximum net price",
      finalPrice: "Final net price",
      coverage: "Coverage",
      supplierGap: "Supplier-funded gap",
      stage: "Stage",
      supplierTeam: "Supplier team",
      targetComponents: "Target components",
      acceptanceCriteria: "Acceptance criteria",
      funding: "Funding",
      noPledges: "No organization has pledged yet.",
      cap: "cap",
      projected: "projected",
      worstCase: "worst case",
      settlement: "Settlement",
      open: "Open",
      completed: "Completed",
      shareEyebrow: "Portable local state",
      shareTitle: "Share this outcome without an account.",
      shareIntro: "This section will create a compressed state link and a JSON backup. No data is uploaded.",
      sharePending: "Sharing is added in the next implementation unit.",
      registerOrg: "Register Rivierenstad",
      registerOrgDetail: "Create its provisional legal profile after checking for duplicates.",
      verifyOrg: "Verify Rivierenstad",
      verifyOrgDetail: "Confirm legal identity and the claimant’s organization control.",
      acceptTerms: "Accept platform terms",
      acceptTermsDetail: "Activate participation and assign the municipality’s working roles.",
      createBudget: "Create innovation budget",
      createBudgetDetail: "Reserve a private envelope that remains valid through delivery and review.",
      submitIdea: "Submit PDF/UA idea",
      submitIdeaDetail: "Describe the need privately against Epistola and Document Generator.",
      publishProposal: "Publish the proposal",
      publishProposalDetail: "Curate the idea into an outcome-focused public need.",
      endorseProposal: "Endorse the proposal",
      endorseProposalDetail: "Show organization demand without making a financial commitment.",
      createCampaign: "Create supplier campaign",
      createCampaignDetail: "Offer a combined outcome with a maximum net price and objective criteria.",
      confirmCoSupplier: "Confirm co-supplier participation",
      confirmCoSupplierDetail: "Accept public naming and participation in the combined outcome.",
      publishCampaign: "Confirm and publish campaign",
      publishCampaignDetail: "Confirm upstream status and open immutable terms for funding.",
      pledge: "Place or update pledge",
      pledgeDetail: "Commit a maximum percentage backed by an eligible private budget.",
      startEarly: "Start delivery early",
      startEarlyDetail: "Irreversibly accept the uncovered supplier-funded risk.",
      submitDelivery: "Submit delivery",
      submitDeliveryDetail: "Lock a final price, evidence, funders, and fair allocations.",
      acceptDelivery: "Accept delivery",
      acceptDeliveryDetail: "Record one equal organization position against the criteria.",
      completeNote: "Complete settlement note",
      completeNoteDetail: "Confirm that the supplier team considers external handling complete.",
      taskUnavailable: "This action is not available for the selected role or campaign stage.",
      actionComplete: "Action completed",
      invalidValue: "Check the entered values and try again.",
      irreversible: "I understand this action changes the shared journey.",
      registerTitle: "Register Municipality Rivierenstad",
      legalName: "Legal name",
      country: "Country",
      registration: "Registration reference",
      website: "Official website",
      verifyTitle: "Verify organization identity",
      evidence: "Evidence note",
      termsTitle: "Activate organization participation",
      termsConfirm: "I accept the current Bloei.me pilot terms for Rivierenstad.",
      budgetTitle: "Create an innovation budget",
      budgetName: "Budget name",
      costCenter: "Cost center",
      amount: "Net amount",
      validUntil: "Valid until",
      ideaTitle: "Submit an idea",
      ideaName: "Short title",
      need: "Describe the shared need",
      proposalTitle: "Publish proposal",
      publicOutcome: "Public outcome",
      campaignTitle: "Create campaign draft",
      outcome: "Promised outcome",
      criterion: "Acceptance criterion",
      deliveryTitle: "Submit delivery for review",
      deliveryEvidence: "Evidence summary",
      declaredFinalPrice: "Declared final net price",
      pledgeTitle: "Make a budget-backed pledge",
      pledgeCap: "Maximum percentage",
      backingBudget: "Backing budget",
      latePledge: "I understand this pledge locks immediately because delivery has started.",
      startTitle: "Start below full coverage",
      startConfirm: "I understand the supplier team bears every uncovered final-price share.",
      acceptTitle: "Accept the delivered outcome",
      acceptConfirm: "I reviewed the evidence against the published criteria and accept the outcome.",
      settlementTitle: "Complete external settlement note",
      settlementConfirm: "The supplier team considers this organization’s external settlement handling complete.",
      stages: ["Join", "Verify", "Budget", "Proposal", "Campaign", "Pledge", "Deliver", "Review", "Settle"],
      stageDescriptions: ["Create the organization", "Establish identity and control", "Reserve capacity", "Shape shared demand", "Publish supplier terms", "Fund fairly", "Submit one outcome", "Assess evidence", "Record contributions"]
    },
    nl: {
      skip: "Ga naar de inhoud",
      mockupBanner: "Interactief model · Gegevens blijven in deze browser",
      primaryNavigation: "Hoofdnavigatie",
      navJourney: "Reis",
      navDiscover: "Ontdekken",
      navWorkspace: "Werkruimte",
      navCampaign: "Campagne",
      navShare: "Delen",
      actingAs: "Bekijk als",
      footerCopy: "Een volledig browsersimulatie van het product.",
      resetJourney: "Reis opnieuw starten",
      cancel: "Annuleren",
      close: "Sluiten",
      journeyEyebrow: "PDF/UA-pilotreis",
      journeyTitle: "Breng een gedeelde behoefte van idee naar geaccepteerd resultaat.",
      journeyIntro: "Wissel van rol terwijl het werk tussen gemeente, platformbeheerder, beheerder, leveranciers en financiers beweegt. Elke actie werkt hetzelfde gedeelde dossier bij.",
      journeyProgress: "Voortgang van de reis",
      stepsComplete: "stappen afgerond",
      recommendedNext: "Aanbevolen volgende stap",
      switchAndContinue: "Wissel van rol en ga verder",
      openTask: "Open taak",
      allComplete: "De reis is afgerond",
      allCompleteDetail: "Het geaccepteerde resultaat en de externe afwikkelingsnotities zijn nu vastgelegd in het gedeelde dossier.",
      currentPersona: "Huidig perspectief",
      organization: "Organisatie",
      authority: "Bevoegdheid",
      publicView: "Alleen openbare informatie",
      noOrganization: "Geen handelende organisatie",
      discoverEyebrow: "Eén canoniek netwerk",
      discoverTitle: "Ontdek gedeelde behoeften en gefinancierde resultaten.",
      discoverIntro: "Componenten, organisaties, voorstellen en campagnes hebben één openbare identiteit. Budgetten en persoonlijke bevoegdheid blijven privé.",
      components: "Componenten",
      organizations: "Organisaties",
      proposals: "Voorstellen",
      campaigns: "Campagnes",
      verified: "Identiteit geverifieerd",
      provisional: "Voorlopig",
      notRegistered: "Niet geregistreerd",
      active: "Actieve deelnemer",
      awaitingTerms: "Wacht op voorwaarden",
      public: "Openbaar",
      private: "Privé",
      endorsements: "steunbetuigingen",
      noProposal: "Het PDF/UA-idee is nog niet als voorstel gepubliceerd.",
      noCampaign: "Leveranciers hebben nog geen campagne gepubliceerd.",
      workspaceEyebrow: "Werkruimte per rol",
      workspaceTitle: "Je werk volgt je bevoegdheid.",
      workspaceIntro: "Taken en beschermde gegevens veranderen met de gekozen persona. Acties blijven eigendom van de organisatie.",
      availableTasks: "Beschikbare taken",
      noTasks: "Er zijn voor deze rol in deze fase geen acties.",
      protectedRecords: "Beschermde gegevens",
      activity: "Recente activiteit",
      noActivity: "Er zijn nog geen domeinacties vastgelegd.",
      budgetTotal: "Totaal budget",
      budgetAvailable: "Beschikbaar",
      budgetReserved: "Gereserveerd",
      budgetConsumed: "Verbruikt",
      noBudgetAccess: "Deze persona kan geen organisatiebudget zien.",
      campaignEyebrow: "Campagnedossier",
      campaignPlaceholderTitle: "PDF/UA-toegankelijke documentgeneratie",
      campaignPlaceholder: "De campagne wordt openbaar nadat het leveranciersteam en de componentbeheerder deze bevestigen.",
      maximumPrice: "Maximale nettoprijs",
      finalPrice: "Definitieve nettoprijs",
      coverage: "Dekking",
      supplierGap: "Bijdrage leverancier",
      stage: "Fase",
      supplierTeam: "Leveranciersteam",
      targetComponents: "Doelcomponenten",
      acceptanceCriteria: "Acceptatiecriteria",
      funding: "Financiering",
      noPledges: "Nog geen organisatie heeft toegezegd.",
      cap: "maximum",
      projected: "verwacht",
      worstCase: "maximaal bedrag",
      settlement: "Afwikkeling",
      open: "Open",
      completed: "Afgerond",
      shareEyebrow: "Overdraagbare lokale staat",
      shareTitle: "Deel dit resultaat zonder account.",
      shareIntro: "Hier komt een gecomprimeerde toestandslink en JSON-reservekopie. Er worden geen gegevens geüpload.",
      sharePending: "Delen wordt in de volgende implementatiestap toegevoegd.",
      registerOrg: "Registreer Rivierenstad", registerOrgDetail: "Maak na een duplicaatcontrole het voorlopige juridische profiel.",
      verifyOrg: "Verifieer Rivierenstad", verifyOrgDetail: "Bevestig juridische identiteit en zeggenschap van de aanvrager.",
      acceptTerms: "Accepteer platformvoorwaarden", acceptTermsDetail: "Activeer deelname en wijs de werkrollen van de gemeente toe.",
      createBudget: "Maak innovatiebudget", createBudgetDetail: "Reserveer een privébudget dat geldig blijft tot na levering en beoordeling.",
      submitIdea: "Dien PDF/UA-idee in", submitIdeaDetail: "Beschrijf de behoefte privé voor Epistola en Document Generator.",
      publishProposal: "Publiceer het voorstel", publishProposalDetail: "Werk het idee uit tot een openbaar, resultaatgericht voorstel.",
      endorseProposal: "Steun het voorstel", endorseProposalDetail: "Toon vraag vanuit de organisatie zonder financiële toezegging.",
      createCampaign: "Maak leverancierscampagne", createCampaignDetail: "Bied een gecombineerd resultaat met maximumprijs en objectieve criteria.",
      confirmCoSupplier: "Bevestig deelname co-leverancier", confirmCoSupplierDetail: "Accepteer openbare vermelding en deelname aan het gezamenlijke resultaat.",
      publishCampaign: "Bevestig en publiceer campagne", publishCampaignDetail: "Bevestig upstreamstatus en open onveranderlijke voorwaarden voor financiering.",
      pledge: "Doe of wijzig toezegging", pledgeDetail: "Zeg een maximumpercentage toe vanuit een geschikt privébudget.",
      startEarly: "Start levering vroeg", startEarlyDetail: "Accepteer onomkeerbaar het nog ongedekte leveranciersrisico.",
      submitDelivery: "Dien levering in", submitDeliveryDetail: "Leg definitieve prijs, bewijs, financiers en eerlijke verdeling vast.",
      acceptDelivery: "Accepteer levering", acceptDeliveryDetail: "Leg één gelijkwaardige organisatiepositie vast tegen de criteria.",
      completeNote: "Rond afwikkelingsnotitie af", completeNoteDetail: "Bevestig dat het leveranciersteam de externe afhandeling als afgerond ziet.",
      taskUnavailable: "Deze actie is niet beschikbaar voor de gekozen rol of campagnefase.",
      actionComplete: "Actie uitgevoerd",
      invalidValue: "Controleer de ingevoerde waarden en probeer opnieuw.",
      irreversible: "Ik begrijp dat deze actie de gedeelde reis verandert.",
      registerTitle: "Registreer Gemeente Rivierenstad", legalName: "Juridische naam", country: "Land", registration: "Registratiereferentie", website: "Officiële website",
      verifyTitle: "Verifieer organisatie-identiteit", evidence: "Notitie over bewijs",
      termsTitle: "Activeer deelname van de organisatie", termsConfirm: "Ik accepteer namens Rivierenstad de huidige Bloei.me-pilotvoorwaarden.",
      budgetTitle: "Maak een innovatiebudget", budgetName: "Budgetnaam", costCenter: "Kostenplaats", amount: "Nettobedrag", validUntil: "Geldig tot",
      ideaTitle: "Dien een idee in", ideaName: "Korte titel", need: "Beschrijf de gedeelde behoefte",
      proposalTitle: "Publiceer voorstel", publicOutcome: "Openbaar resultaat",
      campaignTitle: "Maak campagneconcept", outcome: "Beloofd resultaat", criterion: "Acceptatiecriterium",
      deliveryTitle: "Dien levering ter beoordeling in", deliveryEvidence: "Samenvatting van bewijs", declaredFinalPrice: "Vastgestelde definitieve nettoprijs",
      pledgeTitle: "Doe een budgetgedekte toezegging", pledgeCap: "Maximumpercentage", backingBudget: "Dekkend budget", latePledge: "Ik begrijp dat deze toezegging direct vastligt omdat de levering al is gestart.",
      startTitle: "Start onder volledige dekking", startConfirm: "Ik begrijp dat het leveranciersteam elk ongedekt deel van de definitieve prijs draagt.",
      acceptTitle: "Accepteer het geleverde resultaat", acceptConfirm: "Ik heb het bewijs aan de gepubliceerde criteria getoetst en accepteer het resultaat.",
      settlementTitle: "Rond externe afwikkelingsnotitie af", settlementConfirm: "Het leveranciersteam beschouwt de externe afwikkeling voor deze organisatie als afgerond.",
      stages: ["Aansluiten", "Verifiëren", "Budget", "Voorstel", "Campagne", "Toezeggen", "Leveren", "Beoordelen", "Afwikkelen"],
      stageDescriptions: ["Maak de organisatie", "Stel identiteit en zeggenschap vast", "Reserveer ruimte", "Vorm de gedeelde vraag", "Publiceer leveranciersvoorwaarden", "Financier eerlijk", "Lever één resultaat", "Beoordeel bewijs", "Leg bijdragen vast"]
    }
  };

  const personas = [
    { id: "public", label: { en: "Public visitor", nl: "Openbare bezoeker" }, organizationId: null, roles: [] },
    { id: "rivierenstad", label: { en: "Rivierenstad adviser", nl: "Adviseur Rivierenstad" }, organizationId: "rivierenstad", roles: ["member", "organization-admin", "budget-manager", "funding-representative"] },
    { id: "operator", label: { en: "Bloei.me operator", nl: "Bloei.me-platformbeheerder" }, organizationId: null, roles: ["platform-operator"] },
    { id: "maintainer", label: { en: "Epistola maintainer", nl: "Epistola-componentbeheerder" }, organizationId: "epistola-foundation", roles: ["component-maintainer"] },
    { id: "lead", label: { en: "Lead supplier", nl: "Hoofdleverancier" }, organizationId: "open-document", roles: ["supplier-representative"] },
    { id: "co-supplier", label: { en: "Co-supplier", nl: "Medeleverancier" }, organizationId: "accessible-software", roles: ["supplier-representative"] },
    { id: "waterdam", label: { en: "Waterdam funder", nl: "Financier Waterdam" }, organizationId: "waterdam", roles: ["funding-representative"] },
    { id: "polderland", label: { en: "Polderland funder", nl: "Financier Polderland" }, organizationId: "polderland", roles: ["funding-representative"] }
  ];

  const roleLabels = {
    member: { en: "Member", nl: "Lid" },
    "organization-admin": { en: "Organization administrator", nl: "Organisatiebeheerder" },
    "budget-manager": { en: "Budget manager", nl: "Budgetbeheerder" },
    "funding-representative": { en: "Funding representative", nl: "Financieringsvertegenwoordiger" },
    "platform-operator": { en: "Platform operator", nl: "Platformbeheerder" },
    "component-maintainer": { en: "Component maintainer", nl: "Componentbeheerder" },
    "supplier-representative": { en: "Supplier representative", nl: "Leveranciersvertegenwoordiger" }
  };

  function seedState() {
    return {
      schemaVersion: SCHEMA_VERSION,
      updatedAt: new Date().toISOString(),
      rivierenstad: { registered: false, verified: false, termsAccepted: false, rolesAssigned: false },
      organizations: [
        organization("rivierenstad", "Municipality Rivierenstad", "Gemeente Rivierenstad", "not-registered", false, false),
        organization("waterdam", "Municipality Waterdam", "Gemeente Waterdam", "verified", true, true),
        organization("polderland", "Province Polderland", "Provincie Polderland", "verified", true, true),
        organization("epistola-foundation", "Epistola Foundation", "Stichting Epistola", "verified", true, true),
        organization("open-document", "Open Document Cooperative", "Coöperatie Open Document", "verified", true, true),
        organization("accessible-software", "Accessible Software B.V.", "Toegankelijke Software B.V.", "verified", true, true)
      ],
      components: [
        { id: "epistola", name: "Epistola", type: "application", description: { en: "Open-source document composition and generation.", nl: "Open source voor documentcompositie en -generatie." } },
        { id: "document-generator", name: "Document Generator", type: "component", description: { en: "Reusable rendering component within the Epistola family.", nl: "Herbruikbare rendercomponent binnen de Epistola-familie." } }
      ],
      budgets: [
        budget("waterdam-budget", "waterdam", "Digital commons 2027", "DIG-2027", 12_000_000),
        budget("polderland-budget", "polderland", "Accessible services 2027", "ACC-2027", 15_000_000)
      ],
      idea: null,
      proposal: null,
      campaign: null,
      events: []
    };
  }

  function organization(id, en, nl, status, verified, active) {
    return { id, name: { en, nl }, status, verified, active };
  }

  function budget(id, organizationId, name, costCenter, totalMinor) {
    return { id, organizationId, name, costCenter, totalMinor, validUntil: "2027-12-31", consumedMinor: 0 };
  }

  let state = seedState();
  let locale = navigator.language && navigator.language.toLowerCase().startsWith("nl") ? "nl" : "en";
  let currentPersonaId = "public";
  let currentView = "overview";
  let activeAction = null;

  function t(key) {
    return copy[locale][key] ?? copy.en[key] ?? key;
  }

  function localized(value) {
    if (value && typeof value === "object" && !Array.isArray(value)) return value[locale] ?? value.en ?? "";
    return value ?? "";
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;" })[character]);
  }

  function money(minor) {
    return new Intl.NumberFormat(locale === "nl" ? "nl-NL" : "en-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format((minor || 0) / 100);
  }

  function percentage(bps) {
    return `${new Intl.NumberFormat(locale === "nl" ? "nl-NL" : "en-NL", { maximumFractionDigits: 1 }).format((bps || 0) / 100)}%`;
  }

  function persona(id = currentPersonaId) {
    return personas.find(item => item.id === id) || personas[0];
  }

  function organizationById(id) {
    return state.organizations.find(item => item.id === id);
  }

  function budgetById(id) {
    return state.budgets.find(item => item.id === id);
  }

  function hasRole(role, personaId = currentPersonaId) {
    const selected = persona(personaId);
    if (selected.id === "rivierenstad") {
      if (role === "member") return state.rivierenstad.registered;
      if (role === "organization-admin") return state.rivierenstad.registered;
      if (role === "budget-manager" || role === "funding-representative") return state.rivierenstad.rolesAssigned;
    }
    return selected.roles.includes(role);
  }

  function isActiveOrganization(organizationId) {
    const item = organizationById(organizationId);
    return Boolean(item && item.verified && item.active);
  }

  function campaignStatus() {
    return state.campaign ? state.campaign.status : "not-created";
  }

  function coverageBps() {
    return Math.min(10_000, (state.campaign?.pledges || []).reduce((sum, pledge) => sum + pledge.capBps, 0));
  }

  function fairShares(pledges) {
    if (!pledges.length) return [];
    let remaining = Math.min(10_000, pledges.reduce((sum, pledge) => sum + pledge.capBps, 0));
    let active = pledges.map(pledge => ({ pledge, cap: pledge.capBps }));
    const shares = new Map();
    while (active.length) {
      const equal = remaining / active.length;
      const capped = active.filter(item => item.cap <= equal + Number.EPSILON);
      if (!capped.length) {
        active.forEach(item => shares.set(item.pledge.organizationId, equal));
        break;
      }
      capped.forEach(item => {
        shares.set(item.pledge.organizationId, item.cap);
        remaining -= item.cap;
      });
      active = active.filter(item => !capped.includes(item));
    }
    return pledges.map(pledge => ({ ...pledge, shareBps: shares.get(pledge.organizationId) || 0 }));
  }

  function budgetUsage(item) {
    const pledges = state.campaign?.pledges || [];
    const reservedMinor = pledges.filter(pledge => pledge.budgetId === item.id).reduce((sum, pledge) => sum + (pledge.reservedMinor || 0), 0);
    return { reservedMinor, consumedMinor: item.consumedMinor || 0, availableMinor: item.totalMinor - reservedMinor - (item.consumedMinor || 0) };
  }

  function campaignStageLabel() {
    const labels = {
      draft: { en: "Supplier draft", nl: "Leveranciersconcept" },
      funding: { en: "Funding", nl: "Financiering" },
      delivering: { en: "Delivery", nl: "Levering" },
      review: { en: "Review", nl: "Beoordeling" },
      accepted: { en: "Accepted", nl: "Geaccepteerd" },
      settled: { en: "Settled", nl: "Afgewikkeld" },
      "not-created": { en: "Not formed", nl: "Nog niet gevormd" }
    };
    return localized(labels[campaignStatus()]);
  }

  function journeyCompletion() {
    return [
      state.rivierenstad.registered,
      state.rivierenstad.verified && state.rivierenstad.termsAccepted,
      state.budgets.some(item => item.organizationId === "rivierenstad"),
      Boolean(state.proposal),
      Boolean(state.campaign && state.campaign.status !== "draft"),
      Boolean(state.campaign && state.campaign.pledges.length),
      Boolean(state.campaign && ["review", "accepted", "settled"].includes(state.campaign.status)),
      Boolean(state.campaign && ["accepted", "settled"].includes(state.campaign.status)),
      Boolean(state.campaign && state.campaign.status === "settled")
    ];
  }

  const actionDefinitions = {
    register: { personaId: "rivierenstad", label: "registerOrg", detail: "registerOrgDetail", allowed: () => !state.rivierenstad.registered },
    verify: { personaId: "operator", label: "verifyOrg", detail: "verifyOrgDetail", allowed: () => state.rivierenstad.registered && !state.rivierenstad.verified },
    terms: { personaId: "rivierenstad", label: "acceptTerms", detail: "acceptTermsDetail", allowed: () => state.rivierenstad.verified && !state.rivierenstad.termsAccepted },
    budget: { personaId: "rivierenstad", label: "createBudget", detail: "createBudgetDetail", allowed: () => state.rivierenstad.termsAccepted && hasRole("budget-manager", "rivierenstad") && !state.budgets.some(item => item.organizationId === "rivierenstad") },
    idea: { personaId: "rivierenstad", label: "submitIdea", detail: "submitIdeaDetail", allowed: () => state.rivierenstad.termsAccepted && !state.idea },
    proposal: { personaId: "maintainer", label: "publishProposal", detail: "publishProposalDetail", allowed: () => Boolean(state.idea && !state.proposal) },
    endorse: { personaId: null, label: "endorseProposal", detail: "endorseProposalDetail", allowed: personaId => {
      const selected = persona(personaId);
      return Boolean(state.proposal && selected.organizationId && isActiveOrganization(selected.organizationId) && !state.proposal.endorsements.includes(selected.organizationId) && !["open-document", "accessible-software"].includes(selected.organizationId));
    } },
    campaign: { personaId: "lead", label: "createCampaign", detail: "createCampaignDetail", allowed: () => Boolean(state.proposal && !state.campaign) },
    coConfirm: { personaId: "co-supplier", label: "confirmCoSupplier", detail: "confirmCoSupplierDetail", allowed: () => Boolean(state.campaign && state.campaign.status === "draft" && !state.campaign.coSupplierConfirmed) },
    publishCampaign: { personaId: "maintainer", label: "publishCampaign", detail: "publishCampaignDetail", allowed: () => Boolean(state.campaign && state.campaign.status === "draft" && state.campaign.coSupplierConfirmed) },
    pledge: { personaId: null, label: "pledge", detail: "pledgeDetail", allowed: personaId => canPledge(personaId) },
    startEarly: { personaId: "lead", label: "startEarly", detail: "startEarlyDetail", allowed: () => Boolean(state.campaign && state.campaign.status === "funding" && coverageBps() > 0 && coverageBps() < 10_000) },
    delivery: { personaId: "lead", label: "submitDelivery", detail: "submitDeliveryDetail", allowed: () => Boolean(state.campaign && state.campaign.status === "delivering") },
    accept: { personaId: null, label: "acceptDelivery", detail: "acceptDeliveryDetail", allowed: personaId => canAccept(personaId) },
    completeNote: { personaId: "lead", label: "completeNote", detail: "completeNoteDetail", allowed: () => Boolean(state.campaign && state.campaign.status === "accepted" && state.campaign.settlementNotes.some(note => note.status === "open")) }
  };

  function canPledge(personaId) {
    const selected = persona(personaId);
    if (!state.campaign || !["funding", "delivering"].includes(state.campaign.status)) return false;
    if (!selected.organizationId || !hasPersonaRole(selected, "funding-representative") || !isActiveOrganization(selected.organizationId)) return false;
    if ([state.campaign.leadSupplierId, state.campaign.coSupplierId].includes(selected.organizationId)) return false;
    const existing = state.campaign.pledges.find(pledge => pledge.organizationId === selected.organizationId);
    return state.campaign.status === "funding" || !existing;
  }

  function hasPersonaRole(selected, role) {
    if (selected.id === "rivierenstad") return hasRole(role, selected.id);
    return selected.roles.includes(role);
  }

  function canAccept(personaId) {
    const selected = persona(personaId);
    if (!state.campaign || state.campaign.status !== "review" || !selected.organizationId || !hasPersonaRole(selected, "funding-representative")) return false;
    return state.campaign.pledges.some(pledge => pledge.organizationId === selected.organizationId) && !state.campaign.acceptances.includes(selected.organizationId) && ![state.campaign.leadSupplierId, state.campaign.coSupplierId].includes(selected.organizationId);
  }

  function actionsForPersona(personaId = currentPersonaId) {
    return Object.entries(actionDefinitions).filter(([, definition]) => (!definition.personaId || definition.personaId === personaId) && definition.allowed(personaId)).map(([id, definition]) => ({ id, ...definition }));
  }

  function recommendedAction() {
    const order = ["register", "verify", "terms", "budget", "idea", "proposal", "endorse", "campaign", "coConfirm", "publishCampaign", "pledge", "startEarly", "delivery", "accept", "completeNote"];
    for (const id of order) {
      const definition = actionDefinitions[id];
      if (definition.personaId && definition.allowed(definition.personaId)) return { id, ...definition, personaId: definition.personaId };
      if (!definition.personaId) {
        const candidate = personas.find(item => definition.allowed(item.id));
        if (candidate) return { id, ...definition, personaId: candidate.id };
      }
    }
    return null;
  }

  function recordEvent(key, actorId = currentPersonaId) {
    state.updatedAt = new Date().toISOString();
    state.events.unshift({ id: `${Date.now()}-${state.events.length}`, key, actorId, occurredAt: state.updatedAt });
  }

  function setOrganizationStatus(id, values) {
    Object.assign(organizationById(id), values);
  }

  function render() {
    document.documentElement.lang = locale;
    document.title = locale === "nl" ? "Bloei.me — Productmodel" : "Bloei.me — Product mockup";
    document.querySelectorAll("[data-i18n]").forEach(element => { element.textContent = t(element.dataset.i18n); });
    document.querySelectorAll("[data-i18n-aria]").forEach(element => { element.setAttribute("aria-label", t(element.dataset.i18nAria)); });
    localeToggle.textContent = locale === "en" ? "NL" : "EN";
    document.querySelector("[data-close-dialog]").setAttribute("aria-label", t("close"));
    renderPersonaSelect();
    document.querySelectorAll("[data-view-target]").forEach(button => button.setAttribute("aria-current", button.dataset.viewTarget === currentView ? "page" : "false"));
    if (currentView === "overview") app.innerHTML = renderOverview();
    if (currentView === "discover") app.innerHTML = renderDiscover();
    if (currentView === "workspace") app.innerHTML = renderWorkspace();
    if (currentView === "campaign") app.innerHTML = renderCampaign();
    if (currentView === "share") app.innerHTML = renderSharePlaceholder();
  }

  function renderPersonaSelect() {
    personaSelect.innerHTML = personas.map(item => `<option value="${item.id}"${item.id === currentPersonaId ? " selected" : ""}>${escapeHtml(localized(item.label))}</option>`).join("");
    personaSelect.setAttribute("aria-label", t("actingAs"));
  }

  function renderOverview() {
    const complete = journeyCompletion();
    const completedCount = complete.filter(Boolean).length;
    const next = recommendedAction();
    const selected = persona();
    const organization = selected.organizationId ? organizationById(selected.organizationId) : null;
    return `
      <section class="hero-grid">
        <article class="journey-card surface">
          <p class="eyebrow">${t("journeyEyebrow")}</p>
          <h1>${t("journeyTitle")}</h1>
          <p>${t("journeyIntro")}</p>
          <div class="progress-track" aria-label="${t("journeyProgress")}"><span style="width:${completedCount / complete.length * 100}%"></span></div>
          <div class="progress-copy"><span>${completedCount} / ${complete.length} ${t("stepsComplete")}</span><strong>${Math.round(completedCount / complete.length * 100)}%</strong></div>
          ${next ? `<div class="next-action"><p class="eyebrow">${t("recommendedNext")}</p><strong>${t(next.label)}</strong><span>${t(next.detail)}</span><button class="button" type="button" data-switch-action="${next.id}" data-persona="${next.personaId}">${currentPersonaId === next.personaId ? t("openTask") : t("switchAndContinue")}</button></div>` : `<div class="next-action"><strong>${t("allComplete")}</strong><span>${t("allCompleteDetail")}</span><button class="button" type="button" data-view-target="campaign">${t("navCampaign")}</button></div>`}
        </article>
        <aside class="persona-card surface">
          <p class="eyebrow">${t("currentPersona")}</p>
          <h2>${escapeHtml(localized(selected.label))}</h2>
          <p>${organization ? escapeHtml(localized(organization.name)) : t("noOrganization")}</p>
          <div class="role-list">${effectiveRoles(selected).length ? effectiveRoles(selected).map(role => `<span class="role-pill">${escapeHtml(localized(roleLabels[role]))}</span>`).join("") : `<span class="role-pill">${t("publicView")}</span>`}</div>
          <div class="persona-meta"><div><strong>${t("organization")}</strong><span>${organization ? escapeHtml(localized(organization.name)) : "—"}</span></div><div><strong>${t("authority")}</strong><span>${effectiveRoles(selected).length ? effectiveRoles(selected).map(role => localized(roleLabels[role])).join(" · ") : t("publicView")}</span></div></div>
        </aside>
      </section>
      <section class="stage-grid" aria-label="${t("journeyProgress")}">
        ${complete.map((done, index) => `<button type="button" class="stage-card ${done ? "done" : index === complete.findIndex(value => !value) ? "current" : ""}" data-view-target="${stageView(index)}"><span class="stage-number">${index + 1}</span><strong>${copy[locale].stages[index]}</strong><span>${copy[locale].stageDescriptions[index]}</span></button>`).join("")}
      </section>`;
  }

  function effectiveRoles(selected) {
    return selected.roles.filter(role => selected.id !== "rivierenstad" || hasRole(role, selected.id));
  }

  function stageView(index) {
    if (index <= 1) return "workspace";
    if (index <= 4) return index === 3 ? "discover" : "workspace";
    return "campaign";
  }

  function renderDiscover() {
    const visibleOrganizations = state.organizations.filter(item => item.status !== "not-registered");
    return `
      ${pageHeading("discoverEyebrow", "discoverTitle", "discoverIntro")}
      <section><div class="section-title"><h2>${t("components")}</h2></div><div class="cards">${state.components.map(component => `<article class="record-card surface"><span class="tag">${escapeHtml(component.type)}</span><h3>${escapeHtml(component.name)}</h3><p>${escapeHtml(localized(component.description))}</p><div class="card-footer"><span>${t("public")}</span><strong>↗</strong></div></article>`).join("")}</div></section>
      <section><div class="section-title"><h2>${t("organizations")}</h2></div><div class="cards">${visibleOrganizations.map(item => `<article class="record-card surface"><span class="status-pill ${item.active ? "complete" : "warn"}">${item.verified ? t("verified") : t("provisional")}</span><h3>${escapeHtml(localized(item.name))}</h3><p>${item.active ? t("active") : t("awaitingTerms")}</p><div class="card-footer"><span>${t("public")}</span><strong>${item.active ? "✓" : "…"}</strong></div></article>`).join("")}</div></section>
      <section><div class="section-title"><h2>${t("proposals")}</h2></div>${state.proposal ? `<div class="cards"><article class="record-card surface"><span class="status-pill complete">${t("public")}</span><h3>${escapeHtml(state.proposal.title)}</h3><p>${escapeHtml(state.proposal.outcome)}</p><div class="card-footer"><span>${state.proposal.endorsements.length} ${t("endorsements")}</span><button class="button small secondary" type="button" data-view-target="workspace">${t("navWorkspace")}</button></div></article></div>` : `<div class="surface empty">${t("noProposal")}</div>`}</section>
      <section><div class="section-title"><h2>${t("campaigns")}</h2></div>${state.campaign && state.campaign.status !== "draft" ? `<div class="cards"><article class="record-card surface"><span class="status-pill">${escapeHtml(campaignStageLabel())}</span><h3>${escapeHtml(state.campaign.title)}</h3><p>${escapeHtml(state.campaign.outcome)}</p><div class="card-footer"><span class="money">${money(state.campaign.maximumPriceMinor)}</span><button class="button small" type="button" data-view-target="campaign">${t("navCampaign")}</button></div></article></div>` : `<div class="surface empty">${t("noCampaign")}</div>`}</section>`;
  }

  function renderWorkspace() {
    const selected = persona();
    const tasks = actionsForPersona();
    const budgets = selected.organizationId && (hasPersonaRole(selected, "budget-manager") || hasPersonaRole(selected, "funding-representative")) ? state.budgets.filter(item => item.organizationId === selected.organizationId) : [];
    return `
      ${pageHeading("workspaceEyebrow", "workspaceTitle", "workspaceIntro")}
      <div class="workspace-grid">
        <section class="surface"><div class="section-title"><h2>${t("availableTasks")}</h2><span class="status-pill">${tasks.length}</span></div><div class="task-list">${tasks.length ? tasks.map(task => renderTask(task)).join("") : `<p class="empty">${t("noTasks")}</p>`}</div></section>
        <aside class="surface"><div class="section-title"><h2>${t("protectedRecords")}</h2><span class="tag">${t("private")}</span></div>${budgets.length ? budgets.map(renderBudget).join("") : `<p class="empty">${t("noBudgetAccess")}</p>`}</aside>
      </div>
      <section class="surface" style="margin-top:1rem"><div class="section-title"><h2>${t("activity")}</h2></div><div class="activity-list">${state.events.length ? state.events.slice(0, 8).map(renderEvent).join("") : `<p class="empty">${t("noActivity")}</p>`}</div></section>`;
  }

  function renderTask(task) {
    return `<article class="task"><span class="task-icon" aria-hidden="true">→</span><div><strong>${t(task.label)}</strong><span>${t(task.detail)}</span></div><button class="button small" type="button" data-action="${task.id}">${t("openTask")}</button></article>`;
  }

  function renderBudget(item) {
    const usage = budgetUsage(item);
    return `<div class="side-panel"><h2>${escapeHtml(item.name)}</h2><dl><dt>${t("budgetTotal")}</dt><dd class="money">${money(item.totalMinor)}</dd><dt>${t("budgetAvailable")}</dt><dd>${money(usage.availableMinor)}</dd><dt>${t("budgetReserved")}</dt><dd>${money(usage.reservedMinor)}</dd><dt>${t("budgetConsumed")}</dt><dd>${money(usage.consumedMinor)}</dd><dt>${t("private")}</dt><dd>${escapeHtml(item.costCenter)} · ${escapeHtml(item.validUntil)}</dd></dl></div>`;
  }

  function renderEvent(event) {
    const actor = persona(event.actorId);
    return `<div class="activity-item"><span class="activity-dot"></span><div><strong>${escapeHtml(localized(eventLabel(event.key)))}</strong><time datetime="${escapeHtml(event.occurredAt)}">${escapeHtml(localized(actor.label))} · ${new Intl.DateTimeFormat(locale === "nl" ? "nl-NL" : "en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(event.occurredAt))}</time></div></div>`;
  }

  function eventLabel(key) {
    const labels = {
      registered: { en: "Rivierenstad registered", nl: "Rivierenstad geregistreerd" }, verified: { en: "Organization identity verified", nl: "Organisatie-identiteit geverifieerd" },
      activated: { en: "Platform terms accepted", nl: "Platformvoorwaarden geaccepteerd" }, budget: { en: "Innovation budget created", nl: "Innovatiebudget aangemaakt" },
      idea: { en: "PDF/UA idea submitted", nl: "PDF/UA-idee ingediend" }, proposal: { en: "Proposal published", nl: "Voorstel gepubliceerd" }, endorse: { en: "Proposal endorsed", nl: "Voorstel gesteund" },
      campaign: { en: "Supplier campaign drafted", nl: "Leverancierscampagne opgesteld" }, coConfirm: { en: "Co-supplier confirmed", nl: "Medeleverancier bevestigd" }, published: { en: "Campaign published", nl: "Campagne gepubliceerd" },
      pledged: { en: "Budget-backed pledge recorded", nl: "Budgetgedekte toezegging vastgelegd" }, autoStart: { en: "Delivery started at full coverage", nl: "Levering gestart bij volledige dekking" }, earlyStart: { en: "Supplier started delivery early", nl: "Leverancier vroeg met levering gestart" },
      delivery: { en: "Delivery submitted for review", nl: "Levering ter beoordeling ingediend" }, accepted: { en: "Organization accepted delivery", nl: "Organisatie accepteerde levering" }, settlement: { en: "Delivery accepted and settlement created", nl: "Levering geaccepteerd en afwikkeling aangemaakt" }, note: { en: "Settlement note completed", nl: "Afwikkelingsnotitie afgerond" }
    };
    return labels[key] || { en: key, nl: key };
  }

  function renderCampaign() {
    const campaign = state.campaign;
    if (!campaign) return `${pageHeading("campaignEyebrow", "campaignPlaceholderTitle", "campaignPlaceholder")}<div class="surface empty">${t("noCampaign")}<br><br><button class="button" type="button" data-view-target="workspace">${t("navWorkspace")}</button></div>`;
    const shares = fairShares(campaign.pledges);
    const finalPrice = campaign.finalPriceMinor;
    const supplierGapMinor = finalPrice == null ? Math.round(campaign.maximumPriceMinor * (10_000 - coverageBps()) / 10_000) : Math.max(0, finalPrice - campaign.pledges.reduce((sum, pledge) => sum + (pledge.finalAllocationMinor || 0), 0));
    const tasks = actionsForPersona().filter(task => ["pledge", "startEarly", "delivery", "accept", "completeNote"].includes(task.id));
    return `
      <section class="campaign-hero surface">
        <span class="status-pill ${["accepted", "settled"].includes(campaign.status) ? "complete" : ""}">${escapeHtml(campaignStageLabel())}</span>
        <h1>${escapeHtml(campaign.title)}</h1><p>${escapeHtml(campaign.outcome)}</p>
        <div class="campaign-actions">${tasks.map(task => `<button class="button ${task.id === "pledge" ? "secondary" : ""}" type="button" data-action="${task.id}">${t(task.label)}</button>`).join("")}${!tasks.length ? `<button class="button secondary" type="button" disabled title="${t("taskUnavailable")}">${t("taskUnavailable")}</button>` : ""}</div>
      </section>
      <section class="facts">
        <div class="fact surface"><strong>${money(campaign.maximumPriceMinor)}</strong><span>${t("maximumPrice")}</span></div>
        <div class="fact surface"><strong>${finalPrice == null ? "—" : money(finalPrice)}</strong><span>${t("finalPrice")}</span></div>
        <div class="fact surface"><strong>${percentage(coverageBps())}</strong><span>${t("coverage")}</span></div>
        <div class="fact surface"><strong>${money(supplierGapMinor)}</strong><span>${t("supplierGap")}</span></div>
      </section>
      <div class="campaign-layout">
        <div>
          <section class="funding-panel surface"><div class="funding-summary"><div class="funding-total"><span>${t("funding")}</span><strong>${percentage(coverageBps())}</strong><span>${campaign.pledges.length} ${t("organizations").toLowerCase()}</span></div><div class="funding-bars">${shares.length ? shares.map(item => renderFunder(item, finalPrice)).join("") : `<p class="empty">${t("noPledges")}</p>`}</div></div></section>
          <section class="surface" style="margin-top:1rem"><div class="section-title"><h2>${t("acceptanceCriteria")}</h2></div><div class="criteria-list">${campaign.criteria.map(item => `<div class="criterion"><span>✓</span><span>${escapeHtml(item)}</span></div>`).join("")}</div></section>
          ${campaign.settlementNotes?.length ? `<section class="surface" style="margin-top:1rem"><div class="section-title"><h2>${t("settlement")}</h2></div><div class="task-list">${campaign.settlementNotes.map(note => `<div class="task"><span class="task-icon">${note.status === "completed" ? "✓" : "·"}</span><div><strong>${escapeHtml(localized(organizationById(note.organizationId).name))}</strong><span>${money(note.amountMinor)}</span></div><span class="status-pill ${note.status === "completed" ? "complete" : "warn"}">${t(note.status)}</span></div>`).join("")}</div></section>` : ""}
        </div>
        <aside class="side-panel surface"><h2>${t("campaignEyebrow")}</h2><dl><dt>${t("stage")}</dt><dd>${escapeHtml(campaignStageLabel())}</dd><dt>${t("supplierTeam")}</dt><dd>${escapeHtml(localized(organizationById(campaign.leadSupplierId).name))}<br>${escapeHtml(localized(organizationById(campaign.coSupplierId).name))}</dd><dt>${t("targetComponents")}</dt><dd>Epistola<br>Document Generator</dd><dt>${t("activity")}</dt><dd>${campaign.startedAt ? new Intl.DateTimeFormat(locale === "nl" ? "nl-NL" : "en-GB", { dateStyle: "medium" }).format(new Date(campaign.startedAt)) : "—"}</dd></dl></aside>
      </div>`;
  }

  function renderFunder(item, finalPrice) {
    const organization = organizationById(item.organizationId);
    const amountMinor = finalPrice == null ? Math.round(MAX_PRICE_MINOR * item.shareBps / 10_000) : item.finalAllocationMinor;
    return `<div class="funder-row"><strong>${escapeHtml(localized(organization.name))}<br><small>${percentage(item.capBps)} ${t("cap")}</small></strong><div class="bar" aria-hidden="true"><span style="width:${Math.min(100, item.shareBps / 100)}%"></span></div><span class="money">${percentage(item.shareBps)}<br><small>${money(amountMinor)} ${t("projected")}</small></span></div>`;
  }

  function renderSharePlaceholder() {
    return `${pageHeading("shareEyebrow", "shareTitle", "shareIntro")}<div class="surface empty">${t("sharePending")}</div>`;
  }

  function pageHeading(eyebrow, title, intro) {
    return `<header class="page-heading"><div><p class="eyebrow">${t(eyebrow)}</p><h1>${t(title)}</h1><p>${t(intro)}</p></div></header>`;
  }

  function openAction(actionId) {
    const definition = actionDefinitions[actionId];
    if (!definition || !definition.allowed(currentPersonaId)) {
      showToast(t("taskUnavailable"));
      return;
    }
    activeAction = actionId;
    dialogError.hidden = true;
    document.getElementById("dialog-eyebrow").textContent = t(definition.label);
    document.getElementById("dialog-title").textContent = actionTitle(actionId);
    document.getElementById("dialog-submit").textContent = t(definition.label);
    dialogContent.innerHTML = actionFields(actionId);
    dialog.showModal();
  }

  function actionTitle(id) {
    const titles = { register: "registerTitle", verify: "verifyTitle", terms: "termsTitle", budget: "budgetTitle", idea: "ideaTitle", proposal: "proposalTitle", campaign: "campaignTitle", pledge: "pledgeTitle", startEarly: "startTitle", delivery: "deliveryTitle", accept: "acceptTitle", completeNote: "settlementTitle" };
    return t(titles[id] || actionDefinitions[id].label);
  }

  function actionFields(id) {
    if (id === "register") return `${field("legalName", "text", "Municipality Rivierenstad", true)}${field("country", "text", locale === "nl" ? "Nederland" : "Netherlands", true)}${field("registration", "text", "GEM-RIV-2027", true)}${field("website", "url", "https://rivierenstad.example", true)}${confirmation()}`;
    if (id === "verify") return `${textArea("evidence", locale === "nl" ? "Registratie en zeggenschap bevestigd via officieel kanaal." : "Registration and control confirmed through an official channel.", true)}${confirmation()}`;
    if (id === "terms") return checkField("confirmed", "termsConfirm");
    if (id === "budget") return `${field("budgetName", "text", locale === "nl" ? "Open-source-innovatie 2027" : "Open-source innovation 2027", true)}${field("costCenter", "text", "ICT-INNOV-2027", true)}${field("amount", "number", "80000", true, "1000")}${field("validUntil", "date", "2027-12-31", true)}${confirmation()}`;
    if (id === "idea") return `${field("ideaName", "text", "PDF/UA-compliant document generation", true)}${textArea("need", locale === "nl" ? "Overheidsorganisaties moeten toegankelijke PDF/UA-documenten kunnen genereren met Epistola." : "Public organizations need to generate accessible PDF/UA documents with Epistola.", true)}${confirmation()}`;
    if (id === "proposal") return `${textArea("publicOutcome", locale === "nl" ? "Epistola genereert aantoonbaar PDF/UA-conforme documenten." : "Epistola generates demonstrably PDF/UA-compliant documents.", true)}${confirmation()}`;
    if (["endorse", "coConfirm", "publishCampaign"].includes(id)) return confirmation();
    if (id === "campaign") return `${field("ideaName", "text", "PDF/UA-compliant document generation", true)}${textArea("outcome", locale === "nl" ? "Een stabiele Epistola-release die PDF/UA-documenten volgens de gepubliceerde criteria genereert." : "A stable Epistola release that generates PDF/UA documents against the published criteria.", true)}${field("amount", "number", "100000", true, "1000")}${textArea("criterion", locale === "nl" ? "Een onafhankelijke PAC 2024-controle toont geen PDF/UA-fouten." : "An independent PAC 2024 check reports no PDF/UA failures.", true)}${confirmation()}`;
    if (id === "pledge") {
      const selected = persona();
      const existing = state.campaign.pledges.find(pledge => pledge.organizationId === selected.organizationId);
      const budgets = state.budgets.filter(item => item.organizationId === selected.organizationId);
      return `${field("pledgeCap", "number", existing ? String(existing.capBps / 100) : selected.id === "rivierenstad" ? "20" : selected.id === "waterdam" ? "40" : "100", true, "1", "100")}${selectField("backingBudget", budgets, existing?.budgetId)}${state.campaign.status === "delivering" ? checkField("lateConfirmed", "latePledge") : confirmation()}`;
    }
    if (id === "startEarly") return checkField("confirmed", "startConfirm");
    if (id === "delivery") return `${field("declaredFinalPrice", "number", "82000", true, "0", "100000")}${textArea("deliveryEvidence", locale === "nl" ? "Release 3.2, PAC 2024-rapport en openbare implementatiereferenties." : "Release 3.2, PAC 2024 report, and public implementation references.", true)}${confirmation()}`;
    if (id === "accept") return checkField("confirmed", "acceptConfirm");
    if (id === "completeNote") {
      const openNotes = state.campaign.settlementNotes.filter(note => note.status === "open");
      return `${selectField("settlementNote", openNotes.map(note => ({ id: note.organizationId, name: localized(organizationById(note.organizationId).name) })), openNotes[0]?.organizationId)}${checkField("confirmed", "settlementConfirm")}`;
    }
    return confirmation();
  }

  function field(key, type, value, required, min, max) {
    return `<div class="field"><label for="field-${key}">${t(key)}</label><input id="field-${key}" name="${key}" type="${type}" value="${escapeHtml(value)}"${required ? " required" : ""}${min != null ? ` min="${min}"` : ""}${max != null ? ` max="${max}"` : ""}></div>`;
  }

  function textArea(key, value, required) {
    return `<div class="field"><label for="field-${key}">${t(key)}</label><textarea id="field-${key}" name="${key}"${required ? " required" : ""}>${escapeHtml(value)}</textarea></div>`;
  }

  function checkField(name, labelKey) {
    return `<label class="check-field"><input name="${name}" type="checkbox" value="true" required><span>${t(labelKey)}</span></label>`;
  }

  function confirmation() {
    return checkField("confirmed", "irreversible");
  }

  function selectField(key, items, selectedId) {
    return `<div class="field"><label for="field-${key}">${t(key)}</label><select id="field-${key}" name="${key}" required>${items.map(item => `<option value="${escapeHtml(item.id)}"${item.id === selectedId ? " selected" : ""}>${escapeHtml(item.name || localized(item.name))}</option>`).join("")}</select></div>`;
  }

  function submitAction(formData) {
    if (!actionDefinitions[activeAction]?.allowed(currentPersonaId)) throw new Error(t("taskUnavailable"));
    const handlers = { register: registerOrganization, verify: verifyOrganization, terms: acceptTerms, budget: createBudget, idea: submitIdea, proposal: publishProposal, endorse: endorseProposal, campaign: createCampaign, coConfirm: confirmCoSupplier, publishCampaign, pledge: placePledge, startEarly, delivery: submitDelivery, accept: acceptDelivery, completeNote };
    handlers[activeAction](formData);
    recordEvent(eventKey(activeAction));
    dialog.close();
    showToast(t("actionComplete"));
    render();
  }

  function eventKey(actionId) {
    return { register: "registered", verify: "verified", terms: "activated", publishCampaign: "published", startEarly: "earlyStart", completeNote: "note" }[actionId] || actionId;
  }

  function requireConfirmation(data, key = "confirmed") {
    if (data.get(key) !== "true") throw new Error(t("invalidValue"));
  }

  function registerOrganization(data) {
    requireConfirmation(data);
    state.rivierenstad.registered = true;
    setOrganizationStatus("rivierenstad", { name: { en: data.get("legalName"), nl: data.get("legalName").replace("Municipality", "Gemeente") }, status: "provisional", registration: data.get("registration"), website: data.get("website") });
  }

  function verifyOrganization(data) {
    requireConfirmation(data);
    state.rivierenstad.verified = true;
    setOrganizationStatus("rivierenstad", { status: "verified", verified: true, verificationNote: data.get("evidence") });
  }

  function acceptTerms(data) {
    requireConfirmation(data);
    state.rivierenstad.termsAccepted = true;
    state.rivierenstad.rolesAssigned = true;
    setOrganizationStatus("rivierenstad", { active: true });
  }

  function createBudget(data) {
    requireConfirmation(data);
    const amountMinor = Math.round(Number(data.get("amount")) * 100);
    if (!Number.isFinite(amountMinor) || amountMinor <= 0) throw new Error(t("invalidValue"));
    state.budgets.push(budget("rivierenstad-budget", "rivierenstad", data.get("budgetName"), data.get("costCenter"), amountMinor));
    state.budgets[state.budgets.length - 1].validUntil = data.get("validUntil");
  }

  function submitIdea(data) {
    requireConfirmation(data);
    state.idea = { id: "pdf-ua-idea", title: data.get("ideaName"), need: data.get("need"), componentIds: ["epistola", "document-generator"], status: "maintainer-review" };
  }

  function publishProposal(data) {
    requireConfirmation(data);
    state.proposal = { id: "pdf-ua-proposal", title: state.idea.title, outcome: data.get("publicOutcome"), componentIds: state.idea.componentIds, endorsements: [], status: "open" };
    state.idea.status = "published";
  }

  function endorseProposal(data) {
    requireConfirmation(data);
    const organizationId = persona().organizationId;
    if (!organizationId || state.proposal.endorsements.includes(organizationId)) throw new Error(t("invalidValue"));
    state.proposal.endorsements.push(organizationId);
  }

  function createCampaign(data) {
    requireConfirmation(data);
    const maximumPriceMinor = Math.round(Number(data.get("amount")) * 100);
    if (!Number.isFinite(maximumPriceMinor) || maximumPriceMinor <= 0) throw new Error(t("invalidValue"));
    state.campaign = { id: "pdf-ua-campaign", title: data.get("ideaName"), outcome: data.get("outcome"), criteria: [data.get("criterion"), locale === "nl" ? "Voorbeeldbestanden worden als open testfixtures gepubliceerd." : "Sample files are published as open test fixtures."], maximumPriceMinor, finalPriceMinor: null, leadSupplierId: "open-document", coSupplierId: "accessible-software", coSupplierConfirmed: false, maintainerConfirmed: false, status: "draft", pledges: [], acceptances: [], settlementNotes: [] };
    state.proposal.status = "campaign-forming";
  }

  function confirmCoSupplier(data) {
    requireConfirmation(data);
    state.campaign.coSupplierConfirmed = true;
  }

  function publishCampaign(data) {
    requireConfirmation(data);
    state.campaign.maintainerConfirmed = true;
    state.campaign.status = "funding";
    state.campaign.publishedAt = new Date().toISOString();
    state.proposal.status = "campaign-funding";
  }

  function placePledge(data) {
    const selected = persona();
    const capBps = Math.round(Number(data.get("pledgeCap")) * 100);
    if (!Number.isFinite(capBps) || capBps <= 0 || capBps > 10_000) throw new Error(t("invalidValue"));
    requireConfirmation(data, state.campaign.status === "delivering" ? "lateConfirmed" : "confirmed");
    const budgetItem = budgetById(data.get("backingBudget"));
    if (!budgetItem || budgetItem.organizationId !== selected.organizationId || budgetItem.validUntil < "2027-03-01") throw new Error(t("invalidValue"));
    const exposure = Math.round(state.campaign.maximumPriceMinor * capBps / 10_000);
    const existing = state.campaign.pledges.find(pledge => pledge.organizationId === selected.organizationId);
    const previousReservation = existing?.reservedMinor || 0;
    if (budgetUsage(budgetItem).availableMinor + previousReservation < exposure) throw new Error(t("invalidValue"));
    if (existing) Object.assign(existing, { capBps, budgetId: budgetItem.id, reservedMinor: exposure });
    else state.campaign.pledges.push({ organizationId: selected.organizationId, capBps, budgetId: budgetItem.id, reservedMinor: exposure, status: state.campaign.status === "delivering" ? "locked" : "active" });
    if (state.campaign.status === "funding" && coverageBps() >= 10_000) {
      state.campaign.status = "delivering";
      state.campaign.startedAt = new Date().toISOString();
      state.campaign.startCoverageBps = coverageBps();
      state.campaign.pledges.forEach(pledge => { pledge.status = "locked"; });
      recordEvent("autoStart", "system");
    }
  }

  function startEarly(data) {
    requireConfirmation(data);
    state.campaign.status = "delivering";
    state.campaign.startedAt = new Date().toISOString();
    state.campaign.startCoverageBps = coverageBps();
    state.campaign.pledges.forEach(pledge => { pledge.status = "locked"; });
  }

  function submitDelivery(data) {
    requireConfirmation(data);
    const finalPriceMinor = Math.round(Number(data.get("declaredFinalPrice")) * 100);
    if (!Number.isFinite(finalPriceMinor) || finalPriceMinor < 0 || finalPriceMinor > state.campaign.maximumPriceMinor) throw new Error(t("invalidValue"));
    state.campaign.finalPriceMinor = finalPriceMinor;
    state.campaign.deliveryEvidence = data.get("deliveryEvidence");
    state.campaign.submittedAt = new Date().toISOString();
    state.campaign.status = state.campaign.pledges.length ? "review" : "accepted";
    const allocations = allocateMoney(finalPriceMinor, fairShares(state.campaign.pledges));
    state.campaign.pledges.forEach(pledge => {
      pledge.status = "allocated";
      pledge.finalAllocationMinor = allocations.get(pledge.organizationId) || 0;
      pledge.reservedMinor = pledge.finalAllocationMinor;
    });
    if (!state.campaign.pledges.length) createSettlement();
  }

  function allocateMoney(priceMinor, shares) {
    const result = new Map();
    let allocated = 0;
    shares.forEach((item, index) => {
      const amount = index === shares.length - 1 && coverageBps() >= 10_000 ? Math.max(0, priceMinor - allocated) : Math.floor(priceMinor * item.shareBps / 10_000);
      result.set(item.organizationId, amount);
      allocated += amount;
    });
    return result;
  }

  function acceptDelivery(data) {
    requireConfirmation(data);
    const organizationId = persona().organizationId;
    if (!organizationId || state.campaign.acceptances.includes(organizationId)) throw new Error(t("invalidValue"));
    state.campaign.acceptances.push(organizationId);
    if (state.campaign.acceptances.length === state.campaign.pledges.length) {
      state.campaign.status = "accepted";
      state.campaign.acceptedAt = new Date().toISOString();
      createSettlement();
      recordEvent("settlement", "system");
    }
  }

  function createSettlement() {
    state.campaign.settlementNotes = state.campaign.pledges.filter(pledge => pledge.finalAllocationMinor > 0).map(pledge => ({ organizationId: pledge.organizationId, amountMinor: pledge.finalAllocationMinor, status: "open" }));
    state.campaign.pledges.forEach(pledge => {
      const budgetItem = budgetById(pledge.budgetId);
      budgetItem.consumedMinor += pledge.finalAllocationMinor;
      pledge.reservedMinor = 0;
      pledge.status = "settled";
    });
    if (!state.campaign.settlementNotes.length) state.campaign.status = "settled";
  }

  function completeNote(data) {
    requireConfirmation(data);
    const note = state.campaign.settlementNotes.find(item => item.organizationId === data.get("settlementNote"));
    if (!note || note.status !== "open") throw new Error(t("invalidValue"));
    note.status = "completed";
    note.completedAt = new Date().toISOString();
    if (state.campaign.settlementNotes.every(item => item.status === "completed")) state.campaign.status = "settled";
  }

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => { toast.hidden = true; }, 3200);
  }

  document.addEventListener("click", event => {
    const viewTarget = event.target.closest("[data-view-target]");
    if (viewTarget) {
      currentView = viewTarget.dataset.viewTarget;
      render();
      document.getElementById("main-content").focus();
      return;
    }
    const actionTarget = event.target.closest("[data-action]");
    if (actionTarget) openAction(actionTarget.dataset.action);
    const switchTarget = event.target.closest("[data-switch-action]");
    if (switchTarget) {
      currentPersonaId = switchTarget.dataset.persona;
      currentView = "workspace";
      render();
      openAction(switchTarget.dataset.switchAction);
    }
    if (event.target.closest("[data-close-dialog]")) dialog.close();
  });

  personaSelect.addEventListener("change", () => {
    currentPersonaId = personaSelect.value;
    render();
  });

  localeToggle.addEventListener("click", () => {
    locale = locale === "en" ? "nl" : "en";
    render();
  });

  document.getElementById("reset-button").addEventListener("click", () => {
    const message = locale === "nl" ? "Weet je zeker dat je de hele modelreis opnieuw wilt starten?" : "Reset the complete mockup journey?";
    if (window.confirm(message)) {
      state = seedState();
      currentPersonaId = "public";
      currentView = "overview";
      render();
    }
  });

  actionForm.addEventListener("submit", event => {
    event.preventDefault();
    dialogError.hidden = true;
    try {
      submitAction(new FormData(actionForm));
    } catch (error) {
      dialogError.textContent = error.message || t("invalidValue");
      dialogError.hidden = false;
    }
  });

  render();
}());
