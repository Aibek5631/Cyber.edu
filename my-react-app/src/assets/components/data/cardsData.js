// src/data/cardsData.js

export const cardsData = [
  {
    id: 1,
    title: "Контроль отдачи AK-47",
    question:
      "Куда первым делом надо вести при стрельбе одиночными выстрелами из AK-47?",
    options: [
      { id: "o1", text: "В голову", isCorrect: true },
      { id: "o2", text: "В грудь", isCorrect: false },
      { id: "o3", text: "В талию", isCorrect: false },
      { id: "o4", text: "В ноги", isCorrect: false },
    ],
  },
  {
    id: 2,
    title: "Граната на Inferno",
    question:
      "С какой точки на A-пленте кидается молотов на подъём к «постройке»?",
    options: [
      {
        id: "o1",
        text: "Позиция «банан» рядом с тёмным углом",
        isCorrect: true,
      },
      { id: "o2", text: "Угловая дверь в «пекарне»", isCorrect: false },
      { id: "o3", text: "Бочка на «респе» Т-сил", isCorrect: false },
      { id: "o4", text: "Угол с аркой после «канализации»", isCorrect: false },
    ],
  },
  {
    id: 3,
    title: "Схема движения по Dust II",
    question: "Как называется короткий маршрут от «CT-спавна» до «тапочек»?",
    options: [
      { id: "o1", text: "Catwalk", isCorrect: true },
      { id: "o2", text: "Long A", isCorrect: false },
      { id: "o3", text: "Mid", isCorrect: false },
      { id: "o4", text: "B-Tunnels", isCorrect: false },
    ],
  },
  {
    id: 4,
    title: "Покупка Kevlar+Шлема",
    question: "Какая команда в CS2 включает в себя покупку Kevlar+Шлема?",
    options: [
      { id: "o1", text: "buy vest", isCorrect: false },
      { id: "o2", text: "buy vesthelm", isCorrect: true },
      { id: "o3", text: "buy kevlar", isCorrect: false },
      { id: "o4", text: "buy vesthelm;buy vest", isCorrect: false },
    ],
  },
  {
    id: 5,
    title: "Тайминги на Nuke",
    question:
      "Сколько секунд в среднем занимает ротейт от A-пленте до B-пленте (через хеви и радио)?",
    options: [
      { id: "o1", text: "6–7 сек", isCorrect: false },
      { id: "o2", text: "10–12 сек", isCorrect: true },
      { id: "o3", text: "14–16 сек", isCorrect: false },
      { id: "o4", text: "18–20 сек", isCorrect: false },
    ],
  },
  {
    id: 6,
    title: "Bind на флешку",
    question:
      "Как записать в консоль bind для броска флешки на колесико мыши вниз (mousewheeldown)?",
    options: [
      {
        id: "o1",
        text: `bind "mwheelup" "use weapon_smokegrenade;throw"`,
        isCorrect: false,
      },
      {
        id: "o2",
        text: `bind "mousewheeldown" "use weapon_hegrenade;throw"`,
        isCorrect: false,
      },
      {
        id: "o3",
        text: `bind "MWHEELDOWN" "use weapon_flashbang;throw"`,
        isCorrect: true,
      },
      {
        id: "o4",
        text: `bind "mouse2" "use weapon_molotov;throw"`,
        isCorrect: false,
      },
    ],
  },

  // --- 8 дополнительных CS2-вопросов ---

  {
    id: 7,
    title: "Smoke CT Mid на Dust II",
    question:
      "С какой позиции на T-спавне кидается дым в CT Mid на Dust II?",
    options: [
      { id: "o1", text: "У синей коробки на спавне Т", isCorrect: false },
      {
        id: "o2",
        text: "От двери рядом с дежуркой",
        isCorrect: false,
      },
      {
        id: "o3",
        text: "С края железной двери (post-локс)",
        isCorrect: true,
      },
      { id: "o4", text: "За бочкой на банане", isCorrect: false },
    ],
  },
  {
    id: 8,
    title: "Smoke Market на Mirage",
    question:
      "С какой позиции в Mid кидается дым на Market Window на Mirage?",
    options: [
      { id: "o1", text: "Под аркой в Mid (Jungle)", isCorrect: true },
      { id: "o2", text: "За коробкой на Connector", isCorrect: false },
      { id: "o3", text: "Из-за дверей Palace", isCorrect: false },
      { id: "o4", text: "От банана", isCorrect: false },
    ],
  },
  {
    id: 9,
    title: "Molotov B Dark на Overpass",
    question:
      "Откуда кидать молотов на B Dark (Apartments) на Overpass?",
    options: [
      { id: "o1", text: "С края дверей Short", isCorrect: false },
      {
        id: "o2",
        text: "С угла под красной машиной",
        isCorrect: true,
      },
      { id: "o3", text: "Из-за кассы на Long", isCorrect: false },
      { id: "o4", text: "От синей машины", isCorrect: false },
    ],
  },
  {
    id: 10,
    title: "Ротация Secret → Outside на Nuke",
    question:
      "Сколько секунд занимает ротейт от зоны Secret до Outside на Nuke?",
    options: [
      { id: "o1", text: "4–5 сек", isCorrect: false },
      { id: "o2", text: "6–7 сек", isCorrect: true },
      { id: "o3", text: "8–9 сек", isCorrect: false },
      { id: "o4", text: "10–11 сек", isCorrect: false },
    ],
  },
  {
    id: 11,
    title: "Callout 'Heaven' на Train",
    question:
      "Где находится область 'Heaven' на карте Train?",
    options: [
      { id: "o1", text: "Во втором вагоне", isCorrect: false },
      {
        id: "o2",
        text: "На верхней платформе возле WC",
        isCorrect: true,
      },
      { id: "o3", text: "В туннеле между Box Cars", isCorrect: false },
      { id: "o4", text: "На крыше контейнера", isCorrect: false },
    ],
  },
  {
    id: 12,
    title: "Время детонации бомбы",
    question:
      "Сколько секунд длится таймер детонации бомбы после установки?",
    options: [
      { id: "o1", text: "35 сек", isCorrect: false },
      { id: "o2", text: "40 сек", isCorrect: true },
      { id: "o3", text: "45 сек", isCorrect: false },
      { id: "o4", text: "50 сек", isCorrect: false },
    ],
  },
  {
    id: 13,
    title: "Урон AWP в тело",
    question:
      "Какой урон наносит выстрел из AWP в грудь при полной броне?",
    options: [
      { id: "o1", text: "255", isCorrect: true },
      { id: "o2", text: "450", isCorrect: false },
      { id: "o3", text: "100", isCorrect: false },
      { id: "o4", text: "150", isCorrect: false },
    ],
  },
  {
    id: 14,
    title: "Decoy граната",
    question: "Какая граната не наносит урона противникам?",
    options: [
      { id: "o1", text: "Molotov", isCorrect: false },
      { id: "o2", text: "HE", isCorrect: false },
      { id: "o3", text: "Decoy", isCorrect: true },
      { id: "o4", text: "Smoke", isCorrect: false },
    ],
  },
];