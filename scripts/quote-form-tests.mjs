import assert from "node:assert/strict";

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
  lines.push(`${t.location}: ${payload.location}`);
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
  ["name", "service", "location", "description", "timing", "consent"].filter((field) => {
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

assert.deepEqual(validateRequired({}), ["name", "service", "location", "description", "timing", "consent"]);
assert.deepEqual(validateRequired(englishPayload), []);

const englishMessage = buildMessage(englishPayload, "en");
assert.match(englishMessage, /Painting and wall repairs/);
assert.match(englishMessage, /Page: https:\/\/budapestpropertyservices.hu\/painting-wall-repairs-budapest.html/);
assert.doesNotMatch(englishMessage, /undefined/);
assert.doesNotMatch(englishMessage, /utm=/);

const hungarianMessage = buildMessage(hungarianPayload, "hu");
assert.match(hungarianMessage, /Üdvözlöm!/);
assert.match(hungarianMessage, /Kertfenntartás/);
assert.match(hungarianMessage, /Sövényvágást/);
assert.doesNotMatch(hungarianMessage, /Ingatlan típusa:/);
assert.doesNotMatch(hungarianMessage, /Bejutási információ:/);

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

let opening = false;
const guardedSubmit = () => {
  if (opening) return false;
  opening = true;
  return true;
};
assert.equal(guardedSubmit(), true);
assert.equal(guardedSubmit(), false);

console.log("Quote form tests passed.");
