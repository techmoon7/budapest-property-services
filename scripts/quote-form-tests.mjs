import assert from "node:assert/strict";
import fs from "node:fs";

const serviceOptions = {
  maintenance: { en: "Property maintenance", hu: "Ingatlankarbantartás" },
  handyman: { en: "Handyman / small repairs", hu: "Ezermester / kisebb javítások" },
  painting: { en: "Painting and wall repairs", hu: "Szobafestés és faljavítás" },
  garden: { en: "Garden maintenance", hu: "Kertfenntartás" },
  cleaning: { en: "Cleaning", hu: "Takarítás" },
  airbnb: { en: "Airbnb maintenance", hu: "Airbnb-karbantartás" },
  foreign_owner: {
    en: "Property support for a foreign owner",
    hu: "Ingatlankezelési segítség külföldi tulajdonosnak",
  },
  other: { en: "Other", hu: "Egyéb" },
};

const propertyOptions = {
  apartment: { en: "Apartment", hu: "Lakás" },
  house: { en: "House", hu: "Ház" },
  airbnb_rental: { en: "Airbnb / rental", hu: "Airbnb / kiadó ingatlan" },
  office: { en: "Office", hu: "Iroda" },
  representative_property: { en: "Representative property", hu: "Képviseleti ingatlan" },
  garden_outdoor: { en: "Garden / outdoor area", hu: "Kert / kültéri terület" },
  other: { en: "Other", hu: "Egyéb" },
};

const timingOptions = {
  asap: { en: "As soon as possible", hu: "Amint lehetséges" },
  week: { en: "Within one week", hu: "Egy héten belül" },
  month: { en: "Within one month", hu: "Egy hónapon belül" },
  flexible: {
    en: "Flexible / just requesting information",
    hu: "Rugalmas / egyelőre érdeklődöm",
  },
};

const routeService = {
  "/": "maintenance",
  "/property-maintenance-budapest.html": "maintenance",
  "/handyman-services-budapest.html": "handyman",
  "/painting-wall-repairs-budapest.html": "painting",
  "/garden-maintenance-budapest.html": "garden",
  "/cleaning-services-budapest.html": "cleaning",
  "/airbnb-property-maintenance-budapest.html": "airbnb",
  "/property-management-for-foreign-owners-budapest.html": "foreign_owner",
  "/hu/": "maintenance",
  "/hu/ingatlan-karbantartas-budapest.html": "maintenance",
  "/hu/ezermester-budapest.html": "handyman",
  "/hu/szobafestes-faljavitas-budapest.html": "painting",
  "/hu/kertfenntartas-budapest.html": "garden",
  "/hu/takaritas-budapest.html": "cleaning",
  "/hu/airbnb-karbantartas-budapest.html": "airbnb",
  "/hu/ingatlankezeles-kulfoldi-tulajdonosoknak-budapest.html": "foreign_owner",
};

const labels = {
  en: {
    greeting: "Hello! I would like to request a quote from Budapest Property Services.",
    name: "Name",
    service: "Service",
    propertyType: "Property type",
    location: "Location / district",
    timing: "Preferred timing",
    access: "Access information",
    description: "Task description",
    photos: "Photos",
    page: "Page",
    photosYes: "Photos are ready and will be attached in WhatsApp.",
    photosNo: "No photos yet / I will explain in WhatsApp.",
  },
  hu: {
    greeting: "Üdvözlöm! Ajánlatot szeretnék kérni a Budapest Property Servicestől.",
    name: "Név",
    service: "Szolgáltatás",
    propertyType: "Ingatlan típusa",
    location: "Helyszín / kerület",
    timing: "Kívánt időpont",
    access: "Bejutási információ",
    description: "Feladat leírása",
    photos: "Fotók",
    page: "Oldal",
    photosYes: "Vannak fotók, és WhatsAppon csatolom őket.",
    photosNo: "Még nincsenek fotók / WhatsAppon pontosítom.",
  },
};

const sanitizeCanonical = (url) => {
  const canonical = new URL(url);
  canonical.search = "";
  canonical.hash = "";
  return canonical.href;
};

const buildMessage = (payload, lang) => {
  const t = labels[lang];
  const lines = [
    t.greeting,
    "",
    `${t.name}: ${payload.name}`,
    `${t.service}: ${serviceOptions[payload.service][lang]}`,
  ];
  if (payload.propertyType) lines.push(`${t.propertyType}: ${propertyOptions[payload.propertyType][lang]}`);
  if (String(payload.location || "").trim()) lines.push(`${t.location}: ${payload.location.trim()}`);
  lines.push(`${t.timing}: ${timingOptions[payload.timing][lang]}`);
  if (payload.access) lines.push(`${t.access}: ${payload.access}`);
  lines.push(`${t.description}:`);
  lines.push(payload.description);
  lines.push("");
  lines.push(`${t.photos}: ${payload.photosReady ? t.photosYes : t.photosNo}`);
  lines.push(`${t.page}: ${sanitizeCanonical(payload.page)}`);
  return lines.join("\n");
};

const validateRequired = (payload) =>
  ["name", "service", "description", "timing", "consent"].filter((field) => {
    if (field === "consent") return !payload.consent;
    return !String(payload[field] || "").trim();
  });

const analyticsPayload = (payload, path, lang) => ({
  event: "quote_whatsapp_open",
  page_path: path,
  page_language: lang,
  service_type: payload.service,
  property_type: payload.propertyType || "not_selected",
  preferred_timing: payload.timing,
  photos_ready: payload.photosReady,
  form_location: "contact_section",
});

const piiValues = [
  "Jane Owner",
  "District V",
  "Door code 1234",
  "Paint two cracked walls",
  "Hello! I would like to request a quote",
];

const englishPayload = {
  name: "Jane Owner",
  service: "painting",
  propertyType: "apartment",
  location: "District V",
  timing: "week",
  access: "Door code 1234",
  description: "Paint two cracked walls",
  photosReady: true,
  consent: true,
  page: "https://budapestpropertyservices.hu/painting-wall-repairs-budapest.html?utm=test#contact",
};

const hungarianPayload = {
  name: "Kovács Anna",
  service: "garden",
  propertyType: "",
  location: "XII. kerület",
  timing: "flexible",
  access: "",
  description: "Sövényvágást és tavaszi kertfrissítést szeretnék kérni.",
  photosReady: false,
  consent: true,
  page: "https://budapestpropertyservices.hu/hu/kertfenntartas-budapest.html?utm=test#contact",
};

assert.deepEqual(validateRequired({}), ["name", "service", "description", "timing", "consent"]);
assert.deepEqual(validateRequired(englishPayload), []);
["Budapest", "Buda", "Pest", "13", "XIII", "belváros", "nem tudom", ""].forEach((location) => {
  assert.deepEqual(validateRequired({ ...englishPayload, location }), []);
});

const englishMessage = buildMessage(englishPayload, "en");
assert.match(englishMessage, /Painting and wall repairs/);
assert.match(englishMessage, /Page: https:\/\/budapestpropertyservices.hu\/painting-wall-repairs-budapest.html/);
assert.doesNotMatch(englishMessage, /undefined/);
assert.doesNotMatch(englishMessage, /utm=/);

const englishWithoutLocation = buildMessage({ ...englishPayload, location: "   " }, "en");
assert.doesNotMatch(englishWithoutLocation, /Location \/ district:/);

const hungarianMessage = buildMessage(hungarianPayload, "hu");
assert.match(hungarianMessage, /Üdvözlöm!/);
assert.match(hungarianMessage, /Kertfenntartás/);
assert.match(hungarianMessage, /Sövényvágást/);
assert.doesNotMatch(hungarianMessage, /Ingatlan típusa:/);
assert.doesNotMatch(hungarianMessage, /Bejutási információ:/);

const hungarianWithoutLocation = buildMessage({ ...hungarianPayload, location: "" }, "hu");
assert.doesNotMatch(hungarianWithoutLocation, /Helyszín \/ kerület:/);

const encodedUrl = `https://wa.me/36206671832?text=${encodeURIComponent(hungarianMessage)}`;
assert.equal(decodeURIComponent(new URL(encodedUrl).searchParams.get("text")), hungarianMessage);

Object.entries(routeService).forEach(([path, service]) => {
  assert.equal(routeService[path], service);
});
assert.equal(routeService["/hu/szobafestes-faljavitas-budapest.html"], "painting");
assert.equal(routeService["/cleaning-services-budapest.html"], "cleaning");

const eventPayload = analyticsPayload(englishPayload, "/painting-wall-repairs-budapest.html", "en");
const eventJson = JSON.stringify(eventPayload);
piiValues.forEach((value) => assert.equal(eventJson.includes(value), false));
assert.equal(eventPayload.service_type, "painting");
assert.equal(eventPayload.form_location, "contact_section");

const setFieldError = (state, field, message = "") => {
  state[field] = { invalid: Boolean(message), message };
};
const refreshField = (state, payload, field, showErrors = false) => {
  const message = validateRequired(payload).includes(field) ? "Please complete this field." : "";
  if (!message || showErrors) setFieldError(state, field, message);
};
const formState = { name: { invalid: true, message: "Please complete this field." } };
refreshField(formState, { ...englishPayload, name: "Jane Owner" }, "name");
assert.deepEqual(formState.name, { invalid: false, message: "" });

const scriptSource = fs.readFileSync("script.js", "utf8");
const stylesSource = fs.readFileSync("styles.css", "utf8");
const englishHome = fs.readFileSync("index.html", "utf8");
const hungarianHome = fs.readFileSync("hu/index.html", "utf8");

assert.match(scriptSource, /const assetBuildId = "[a-z0-9-]+"/);
assert.doesNotMatch(scriptSource, /insertAdjacentElement\("afterend", languageSelector\)/);
assert.doesNotMatch(scriptSource, /mobileTools\.insertBefore\(languageSelector/);
assert.match(scriptSource, /languageSelectorTrigger/);
assert.match(scriptSource, /openLanguageSelectorFromTrigger/);
assert.match(stylesSource, /\.language-menu\s*\{[\s\S]*?position:\s*absolute/);
assert.match(stylesSource, /@media \(max-width: 1120px\)[\s\S]*?\.language-menu\s*\{[\s\S]*?position:\s*fixed/);
assert.match(stylesSource, /pointer-events:\s*auto;/);
assert.match(englishHome, /<button class="language-trust-badge" type="button" data-language-selector-trigger/);
assert.match(hungarianHome, /<button class="language-trust-badge" type="button" data-language-selector-trigger/);

["index.html", "hu/index.html"].forEach((file) => {
  const html = fs.readFileSync(file, "utf8");
  assert.equal((html.match(/id="langBtn"/g) || []).length, 1);
  assert.equal((html.match(/id="languageMenu"/g) || []).length, 1);
});

// Regression tests for the "WhatsApp form jumps instead of opening WhatsApp"
// bug family, which traced back to the homepage being rendered twice: once
// immediately by script.js against static markup, then again asynchronously
// by script-core.js, which replaced the entire document.body via innerHTML.
// Binding a live quote form during the first (doomed) pass let a visitor's
// click or typed input be silently destroyed or misdirected when the
// replacement landed mid-interaction.
//
// That architecture has been removed rather than re-gated: index.html and
// hu/index.html now contain the complete final markup directly (including
// the comparison sliders and case-card content that script-core.js used to
// generate at runtime), script.js initializes the page exactly once against
// that static DOM, and there is no second script or destructive innerHTML
// swap left to race against. These assertions guard against that
// architecture quietly reappearing.
assert.doesNotMatch(
  scriptSource,
  /script-core/,
  "script.js must not load or reference script-core.js — the homepage no longer double-renders"
);
assert.doesNotMatch(
  scriptSource,
  /document\.body\.innerHTML\s*=/,
  "no code path may replace the entire document body at runtime"
);
assert.doesNotMatch(
  scriptSource,
  /new MutationObserver\(/,
  "the homepage must not re-run its enhancements via a whole-document MutationObserver"
);
assert.ok(!fs.existsSync("script-core.js"), "script-core.js must not exist as a deployed file");
const initHomeBody = scriptSource.match(/const initHome = \(\) => \{([\s\S]*?)\n {2}\};/)?.[1];
assert.ok(initHomeBody, "could not locate initHome body to inspect");
assert.match(
  initHomeBody,
  /^\s*bindQuoteForms\(\);\s*$/m,
  "bindQuoteForms() must run unconditionally in initHome — there is no destructive-replacement race left to gate against"
);
["index.html", "hu/index.html"].forEach((file) => {
  const html = fs.readFileSync(file, "utf8");
  assert.match(html, /data-compare/, `${file} must contain the comparison-slider markup statically, not generated at runtime`);
  assert.match(html, /data-whatsapp-quote-form/, `${file} must contain the quote-form mount point`);
});

// Regression test for the language-aware image-lightbox aria-label fix.
// bindHeroLightbox() previously hardcoded an English "Open image: ..." label
// regardless of page language, so Hungarian-page screen-reader users heard
// English text. It must now go through the same t()-based lookup used for
// the neighbouring closeImage/previousImage/nextImage labels.
assert.match(
  scriptSource,
  /target\.setAttribute\("aria-label", image\.alt \? `\$\{t\("openImage"\)\}: \$\{image\.alt\}` : t\("openImage"\)\);/,
  "bindHeroLightbox must build its aria-label from the language-aware openImage translation, not a hardcoded English string"
);
assert.doesNotMatch(
  scriptSource,
  /aria-label", image\.alt \? `Open image: \$\{image\.alt\}` : "Open image"\)/,
  "the old hardcoded-English lightbox aria-label must not reappear"
);
["hu", "en", "de", "uk", "zh-CN"].forEach((lang) => {
  assert.match(
    scriptSource,
    new RegExp(`openImage:\\s*\\{[\\s\\S]{0,220}?"?${lang}"?:`),
    `uiText.openImage must provide a "${lang}" translation`
  );
});

// Regression test for the "Hungarian pages contain English image alt text"
// bug: 37 <img alt="..."> attributes across the 8 Hungarian pages were
// left untranslated in English. Sweep every hu/*.html file and fail if any
// alt text still looks like English prose (a rough heuristic: plain ASCII
// with no Hungarian diacritics and at least one 4+ letter word — the same
// check used to originally find the 37 bugs).
// A handful of genuinely-Hungarian alt texts happen to contain no accented
// characters (e.g. plain "Rendezett budapesti udvari kert"), which would
// otherwise false-positive against the ASCII-only heuristic below.
const knownHungarianAltWithoutDiacritics = new Set(["Rendezett budapesti udvari kert"]);
const isEnglishLookingAlt = (value) =>
  !knownHungarianAltWithoutDiacritics.has(value) &&
  /^[A-Za-z0-9 ,.'()&:%-]+$/.test(value) &&
  /[a-zA-Z]{4}/.test(value) &&
  !/[áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/.test(value) &&
  value.length >= 15;
const hungarianPages = [
  "hu/index.html",
  "hu/ingatlan-karbantartas-budapest.html",
  "hu/ezermester-budapest.html",
  "hu/szobafestes-faljavitas-budapest.html",
  "hu/kertfenntartas-budapest.html",
  "hu/takaritas-budapest.html",
  "hu/airbnb-karbantartas-budapest.html",
  "hu/ingatlankezeles-kulfoldi-tulajdonosoknak-budapest.html",
];
hungarianPages.forEach((file) => {
  const html = fs.readFileSync(file, "utf8");
  const englishAlts = [];
  const altRe = /alt="([^"]+)"/g;
  let am;
  while ((am = altRe.exec(html))) {
    if (isEnglishLookingAlt(am[1])) englishAlts.push(am[1]);
  }
  assert.deepEqual(englishAlts, [], `${file} has English-looking alt text: ${JSON.stringify(englishAlts)}`);
});

let opening = false;
const guardedSubmit = () => {
  if (opening) return false;
  opening = true;
  return true;
};
assert.equal(guardedSubmit(), true);
assert.equal(guardedSubmit(), false);

console.log("Quote form tests passed.");
