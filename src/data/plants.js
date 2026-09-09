/**
 * Monitored mining-area water sources, Jharkhand.
 *
 * `id` is the key used across demoWaterQuality.js and plantLocations.js —
 * keep the three files in sync when adding or renaming a plant.
 */
export const STATE = "Jharkhand";
export const STATES = [
  "Jharkhand",
  "Bihar",
  "Uttar Pradesh",
  "Odisha",
  "West Bangal",
];
export const PLANTS_BY_STATE = {
  Jharkhand: [
    { id: "jh-dhanbad-jharia", name: "Dhanbad - Jharia" },
    { id: "jh-bokaro", name: "Bokaro" },
    { id: "jh-ramgarh", name: "Ramgarh" },
    { id: "jh-north-karanpura", name: "North Karanpura" },
    { id: "jh-south-karanpura", name: "South Karanpura" },
    { id: "jh-giridih", name: "Giridih" },
    { id: "jh-hazaribagh", name: "Hazaribagh" },
    { id: "jh-latehar", name: "Latehar" },
    { id: "jh-west-singhbhum", name: "West Singhbhum" },
    { id: "jh-east-singhbhum", name: "East Singhbhum" },
    { id: "jh-lohardaga", name: "Lohardaga" },
    { id: "jh-palamu", name: "Palamu" },
    { id: "jh-ranchi", name: "Ranchi" },
    { id: "jh-pakur", name: "Pakur" },
  ],

  Bihar: [
    { id: "br-rohtas", name: "Rohtas" },
    { id: "br-kaimur", name: "Kaimur" },
    { id: "br-munger", name: "Munger" },
    { id: "br-nawada", name: "Nawada" },
    { id: "br-jamui", name: "Jamui" },
    { id: "br-bhagalpur", name: "Bhagalpur" },
    { id: "br-banka", name: "Banka" },
    { id: "br-lakhisarai", name: "Lakhisarai" },
  ],

  "Uttar Pradesh": [
    { id: "up-sonbhadra", name: "Sonbhadra - Singrauli" },
    { id: "up-mirzapur", name: "Mirzapur" },
    { id: "up-prayagraj", name: "Prayagraj - Naini" },
    { id: "up-shankargarh", name: "Shankargarh" },
    { id: "up-banda", name: "Banda" },
    { id: "up-lalitpur", name: "Lalitpur" },
    { id: "up-hamirpur", name: "Hamirpur" },
    { id: "up-jhansi", name: "Jhansi" },
    { id: "up-mahoba", name: "Mahoba" },
    { id: "up-chitrakoot", name: "Chitrakoot" },
  ],

  Odisha: [
    { id: "od-talcher", name: "Talcher" },
    { id: "od-ib-valley", name: "Ib Valley" },
    { id: "od-keonjhar", name: "Keonjhar" },
    { id: "od-sundargarh", name: "Sundargarh" },
    { id: "od-jajpur-sukinda", name: "Jajpur - Sukinda" },
    { id: "od-mayurbhanj", name: "Mayurbhanj" },
    { id: "od-koraput", name: "Koraput" },
    { id: "od-rayagada", name: "Rayagada" },
    { id: "od-angul", name: "Angul" },
    { id: "od-dhenkanal", name: "Dhenkanal" },
    { id: "od-jharsuguda", name: "Jharsuguda" },
    { id: "od-kalahandi", name: "Kalahandi" },
  ],

  "West Bengal": [
    { id: "wb-raniganj", name: "Raniganj Coalfield" },
    { id: "wb-bardhaman", name: "Bardhaman" },
    { id: "wb-bankura", name: "Bankura - Barjora" },
    { id: "wb-birbhum", name: "Birbhum" },
    { id: "wb-darjeeling", name: "Darjeeling" },
  ],
};

export const PLANTS = Object.values(PLANTS_BY_STATE).flat();

export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
