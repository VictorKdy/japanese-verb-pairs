import { 
  DoorOpen, DoorClosed, Dog, Ear, CarFront, Lightbulb, LightbulbOff, 
  Calendar, HeartPulse, GraduationCap, Pen, Music, Mountain, Wallet, 
  Search, CheckSquare, Wind, Flame, Croissant, Soup, ToggleLeft, ToggleRight,
  Camera, Monitor, Package, Tag, Briefcase, Scale, Baby, RotateCw, User,
  Bone, Users, Coffee, Egg, Scissors, Trash2, CircleDot, Beer, Files,
  ArrowRight, CheckCheck, Clock, Brain, Coins, Waves, Trees, FileX,
  ThermometerSnowflake, ThermometerSun, Shirt, Sun, Banana, Fingerprint
} from './icons.js';

// --- DATA: Extracted & Cleaned from PDF with Furigana & Dictionary Forms ---
export const VERB_DATA = [
  // --- LEVEL 1 (IDs 1-20) ---
  { 
    id: 1, level: 1, sentence: "ドアが開きます", kana: "ドアがあきます", type: "Intransitive", 
    english: "The door opens",
    noun: "ドア", nounRuby: [{ text: "ドア", rt: "" }],
    verbPrompt: "開", verbRuby: [{ text: "開", rt: "あ" }],
    dictionaryRuby: [{ text: "開", rt: "あ" }, { text: "く", rt: "" }],
    icon: DoorOpen, color: "text-blue-400" 
  },
  { 
    id: 2, level: 1, sentence: "ドアを開けます", kana: "ドアをあけます", type: "Transitive", 
    english: "I open the door",
    noun: "ドア", nounRuby: [{ text: "ドア", rt: "" }],
    verbPrompt: "開", verbRuby: [{ text: "開", rt: "あ" }],
    dictionaryRuby: [{ text: "開", rt: "あ" }, { text: "け", rt: "" }, { text: "る", rt: "" }],
    icon: DoorOpen, color: "text-green-400" 
  },
  { 
    id: 3, level: 1, sentence: "ドアが閉まります", kana: "ドアがしまります", type: "Intransitive", 
    english: "The door closes",
    noun: "ドア", nounRuby: [{ text: "ドア", rt: "" }],
    verbPrompt: "閉", verbRuby: [{ text: "閉", rt: "し" }],
    dictionaryRuby: [{ text: "閉", rt: "し" }, { text: "ま", rt: "" }, { text: "る", rt: "" }],
    icon: DoorClosed, color: "text-blue-400" 
  },
  { 
    id: 4, level: 1, sentence: "ドアを閉めます", kana: "ドアをしめます", type: "Transitive", 
    english: "I close the door",
    noun: "ドア", nounRuby: [{ text: "ドア", rt: "" }],
    verbPrompt: "閉", verbRuby: [{ text: "閉", rt: "し" }],
    dictionaryRuby: [{ text: "閉", rt: "し" }, { text: "め", rt: "" }, { text: "る", rt: "" }],
    icon: DoorClosed, color: "text-green-400" 
  },
  { 
    id: 5, level: 1, sentence: "犬が出ます", kana: "いぬがでます", type: "Intransitive", 
    english: "The dog leaves / goes out",
    noun: "犬", nounRuby: [{ text: "犬", rt: "いぬ" }],
    verbPrompt: "出", verbRuby: [{ text: "出", rt: "で" }],
    dictionaryRuby: [{ text: "出", rt: "で" }, { text: "る", rt: "" }],
    icon: Dog, color: "text-blue-400" 
  },
  { 
    id: 6, level: 1, sentence: "犬を出します", kana: "いぬをだします", type: "Transitive", 
    english: "I let the dog out",
    noun: "犬", nounRuby: [{ text: "犬", rt: "いぬ" }],
    verbPrompt: "出", verbRuby: [{ text: "出", rt: "だ" }],
    dictionaryRuby: [{ text: "出", rt: "だ" }, { text: "す", rt: "" }],
    icon: Dog, color: "text-green-400" 
  },
  { 
    id: 7, level: 1, sentence: "耳が動きます", kana: "みみがうごきます", type: "Intransitive", 
    english: "The ears move",
    noun: "耳", nounRuby: [{ text: "耳", rt: "みみ" }],
    verbPrompt: "動", verbRuby: [{ text: "動", rt: "うご" }],
    dictionaryRuby: [{ text: "動", rt: "うご" }, { text: "く", rt: "" }],
    icon: Ear, color: "text-blue-400" 
  },
  { 
    id: 8, level: 1, sentence: "耳を動かします", kana: "みみをうごかします", type: "Transitive", 
    english: "I move my ears",
    noun: "耳", nounRuby: [{ text: "耳", rt: "みみ" }],
    verbPrompt: "動", verbRuby: [{ text: "動", rt: "うご" }],
    dictionaryRuby: [{ text: "動", rt: "うご" }, { text: "か", rt: "" }, { text: "す", rt: "" }],
    icon: Ear, color: "text-green-400" 
  },
  { 
    id: 9, level: 1, sentence: "車が止まります", kana: "くるマガとまります", type: "Intransitive", 
    english: "The car stops",
    noun: "車", nounRuby: [{ text: "車", rt: "くるま" }],
    verbPrompt: "止", verbRuby: [{ text: "止", rt: "と" }],
    dictionaryRuby: [{ text: "止", rt: "と" }, { text: "ま", rt: "" }, { text: "る", rt: "" }],
    icon: CarFront, color: "text-blue-400" 
  },
  { 
    id: 10, level: 1, sentence: "車を止めます", kana: "くるまをとめます", type: "Transitive", 
    english: "I stop the car",
    noun: "車", nounRuby: [{ text: "車", rt: "くるま" }],
    verbPrompt: "止", verbRuby: [{ text: "止", rt: "と" }],
    dictionaryRuby: [{ text: "止", rt: "と" }, { text: "め", rt: "" }, { text: "る", rt: "" }],
    icon: CarFront, color: "text-green-400" 
  },
  { 
    id: 11, level: 1, sentence: "電気がつきます", kana: "でんきがつきます", type: "Intransitive", 
    english: "The light comes on",
    noun: "電気", nounRuby: [{ text: "電", rt: "でん" }, { text: "気", rt: "き" }],
    verbPrompt: "つ", verbRuby: [{ text: "つ", rt: "" }],
    dictionaryRuby: [{ text: "つ", rt: "" }, { text: "く", rt: "" }],
    icon: Lightbulb, color: "text-yellow-400" 
  },
  { 
    id: 12, level: 1, sentence: "電気をつけます", kana: "でんきをつけます", type: "Transitive", 
    english: "I turn on the light",
    noun: "電気", nounRuby: [{ text: "電", rt: "でん" }, { text: "気", rt: "き" }],
    verbPrompt: "つ", verbRuby: [{ text: "つ", rt: "" }],
    dictionaryRuby: [{ text: "つ", rt: "" }, { text: "け", rt: "" }, { text: "る", rt: "" }],
    icon: Lightbulb, color: "text-yellow-400" 
  },
  { 
    id: 13, level: 1, sentence: "電気が消えます", kana: "でんきがきえます", type: "Intransitive", 
    english: "The light goes off",
    noun: "電気", nounRuby: [{ text: "電", rt: "でん" }, { text: "気", rt: "き" }],
    verbPrompt: "消", verbRuby: [{ text: "消", rt: "き" }],
    dictionaryRuby: [{ text: "消", rt: "き" }, { text: "え", rt: "" }, { text: "る", rt: "" }],
    icon: LightbulbOff, color: "text-gray-400" 
  },
  { 
    id: 14, level: 1, sentence: "電気を消します", kana: "でんきをけします", type: "Transitive", 
    english: "I turn off the light",
    noun: "電気", nounRuby: [{ text: "電", rt: "でん" }, { text: "気", rt: "き" }],
    verbPrompt: "消", verbRuby: [{ text: "消", rt: "け" }],
    dictionaryRuby: [{ text: "消", rt: "け" }, { text: "す", rt: "" }],
    icon: LightbulbOff, color: "text-gray-400" 
  },
  { 
    id: 15, level: 1, sentence: "予定が変わります", kana: "よていがかわり", type: "Intransitive", 
    english: "The plan changes",
    noun: "予定", nounRuby: [{ text: "予", rt: "よ" }, { text: "定", rt: "てい" }],
    verbPrompt: "変", verbRuby: [{ text: "変", rt: "か" }],
    dictionaryRuby: [{ text: "変", rt: "か" }, { text: "わ", rt: "" }, { text: "る", rt: "" }],
    icon: Calendar, color: "text-blue-400" 
  },
  { 
    id: 16, level: 1, sentence: "予定を変えます", kana: "よていをかえます", type: "Transitive", 
    english: "I change the plan",
    noun: "予定", nounRuby: [{ text: "予", rt: "よ" }, { text: "定", rt: "てい" }],
    verbPrompt: "変", verbRuby: [{ text: "変", rt: "か" }],
    dictionaryRuby: [{ text: "変", rt: "か" }, { text: "え", rt: "" }, { text: "る", rt: "" }],
    icon: Calendar, color: "text-green-400" 
  },
  { 
    id: 17, level: 1, sentence: "病気が治ります", kana: "びょうきがなおります", type: "Intransitive", 
    english: "The illness is cured",
    noun: "病気", nounRuby: [{ text: "病", rt: "びょう" }, { text: "気", rt: "き" }],
    verbPrompt: "治", verbRuby: [{ text: "治", rt: "なお" }],
    dictionaryRuby: [{ text: "治", rt: "なお" }, { text: "る", rt: "" }],
    icon: HeartPulse, color: "text-red-400" 
  },
  { 
    id: 18, level: 1, sentence: "病気を治します", kana: "びょうきをなおします", type: "Transitive", 
    english: "I cure the illness",
    noun: "病気", nounRuby: [{ text: "病", rt: "びょう" }, { text: "気", rt: "き" }],
    verbPrompt: "治", verbRuby: [{ text: "治", rt: "なお" }],
    dictionaryRuby: [{ text: "治", rt: "なお" }, { text: "す", rt: "" }],
    icon: HeartPulse, color: "text-red-400" 
  },
  { 
    id: 19, level: 1, sentence: "レッスンが始まります", kana: "レッスンがはじまります", type: "Intransitive", 
    english: "The lesson begins",
    noun: "レッスン", nounRuby: [{ text: "レッスン", rt: "" }],
    verbPrompt: "始", verbRuby: [{ text: "始", rt: "はじ" }],
    dictionaryRuby: [{ text: "始", rt: "はじ" }, { text: "ま", rt: "" }, { text: "る", rt: "" }],
    icon: GraduationCap, color: "text-blue-400" 
  },
  { 
    id: 20, level: 1, sentence: "レッスンを始めます", kana: "レッスンをはじめます", type: "Transitive", 
    english: "I begin the lesson",
    noun: "レッスン", nounRuby: [{ text: "レッスン", rt: "" }],
    verbPrompt: "始", verbRuby: [{ text: "始", rt: "はじ" }],
    dictionaryRuby: [{ text: "始", rt: "はじ" }, { text: "め", rt: "" }, { text: "る", rt: "" }],
    icon: GraduationCap, color: "text-green-400" 
  },

  // --- LEVEL 2 (IDs 21-40) ---
  { 
    id: 21, level: 2, sentence: "ペンが落ちます", kana: "ペンがおちます", type: "Intransitive", 
    english: "The pen falls",
    noun: "ペン", nounRuby: [{ text: "ペン", rt: "" }],
    verbPrompt: "落", verbRuby: [{ text: "落", rt: "お" }],
    dictionaryRuby: [{ text: "落", rt: "お" }, { text: "ち", rt: "" }, { text: "る", rt: "" }],
    icon: Pen, color: "text-blue-400" 
  },
  { 
    id: 22, level: 2, sentence: "ペンを落とします", kana: "ペンをおとします", type: "Transitive", 
    english: "I drop the pen",
    noun: "ペン", nounRuby: [{ text: "ペン", rt: "" }],
    verbPrompt: "落", verbRuby: [{ text: "落", rt: "お" }],
    dictionaryRuby: [{ text: "落", rt: "お" }, { text: "と", rt: "" }, { text: "す", rt: "" }],
    icon: Pen, color: "text-green-400" 
  },
  { 
    id: 23, level: 2, sentence: "音楽が聞こえます", kana: "おんがくがきこえます", type: "Intransitive", 
    english: "The music can be heard",
    noun: "音楽", nounRuby: [{ text: "音", rt: "おん" }, { text: "楽", rt: "がく" }],
    verbPrompt: "聞", verbRuby: [{ text: "聞", rt: "き" }],
    dictionaryRuby: [{ text: "聞", rt: "き" }, { text: "こ", rt: "" }, { text: "え", rt: "" }, { text: "る", rt: "" }],
    icon: Music, color: "text-purple-400" 
  },
  { 
    id: 24, level: 2, sentence: "音楽を聞きます", kana: "おんがくをききます", type: "Transitive", 
    english: "I listen to music",
    noun: "音楽", nounRuby: [{ text: "音", rt: "おん" }, { text: "楽", rt: "がく" }],
    verbPrompt: "聞", verbRuby: [{ text: "聞", rt: "き" }],
    dictionaryRuby: [{ text: "聞", rt: "き" }, { text: "く", rt: "" }],
    icon: Music, color: "text-purple-400" 
  },
  { 
    id: 25, level: 2, sentence: "富士山が見えます", kana: "ふじさんがみえます", type: "Intransitive", 
    english: "Mt. Fuji can be seen",
    noun: "富士山", nounRuby: [{ text: "富", rt: "ふ" }, { text: "士", rt: "じ" }, { text: "山", rt: "さん" }],
    verbPrompt: "見", verbRuby: [{ text: "見", rt: "み" }],
    dictionaryRuby: [{ text: "見", rt: "み" }, { text: "え", rt: "" }, { text: "る", rt: "" }],
    icon: Mountain, color: "text-blue-400" 
  },
  { 
    id: 26, level: 2, sentence: "富士山を見ます", kana: "ふじさんをみます", type: "Transitive", 
    english: "I look at Mt. Fuji",
    noun: "富士山", nounRuby: [{ text: "富", rt: "ふ" }, { text: "士", rt: "じ" }, { text: "山", rt: "さん" }],
    verbPrompt: "見", verbRuby: [{ text: "見", rt: "み" }],
    dictionaryRuby: [{ text: "見", rt: "み" }, { text: "る", rt: "" }],
    icon: Mountain, color: "text-green-400" 
  },
  { 
    id: 27, level: 2, sentence: "財布がなくなります", kana: "さいふがなくなります", type: "Intransitive", 
    english: "The wallet gets lost",
    noun: "財布", nounRuby: [{ text: "財", rt: "さい" }, { text: "布", rt: "ふ" }],
    verbPrompt: "な", verbRuby: [{ text: "な", rt: "" }],
    dictionaryRuby: [{ text: "な", rt: "" }, { text: "く", rt: "" }, { text: "な", rt: "" }, { text: "る", rt: "" }],
    icon: Wallet, color: "text-yellow-600" 
  },
  { 
    id: 28, level: 2, sentence: "財布をなくします", kana: "さいふをなくします", type: "Transitive", 
    english: "I lose the wallet",
    noun: "財布", nounRuby: [{ text: "財", rt: "さい" }, { text: "布", rt: "ふ" }],
    verbPrompt: "な", verbRuby: [{ text: "な", rt: "" }],
    dictionaryRuby: [{ text: "な", rt: "" }, { text: "く", rt: "" }, { text: "す", rt: "" }],
    icon: Wallet, color: "text-yellow-600" 
  },
  { 
    id: 29, level: 2, sentence: "財布が見つかります", kana: "さいふがみつかります", type: "Intransitive", 
    english: "The wallet is found",
    noun: "財布", nounRuby: [{ text: "財", rt: "さい" }, { text: "布", rt: "ふ" }],
    verbPrompt: "見", verbRuby: [{ text: "見", rt: "み" }],
    dictionaryRuby: [{ text: "見", rt: "み" }, { text: "つ", rt: "" }, { text: "か", rt: "" }, { text: "る", rt: "" }],
    icon: Search, color: "text-blue-400" 
  },
  { 
    id: 30, level: 2, sentence: "財布を見つけます", kana: "さいふをみつけます", type: "Transitive", 
    english: "I find the wallet",
    noun: "財布", nounRuby: [{ text: "財", rt: "さい" }, { text: "布", rt: "ふ" }],
    verbPrompt: "見", verbRuby: [{ text: "見", rt: "み" }],
    dictionaryRuby: [{ text: "見", rt: "み" }, { text: "つ", rt: "" }, { text: "け", rt: "" }, { text: "る", rt: "" }],
    icon: Search, color: "text-green-400" 
  },
  { 
    id: 31, level: 2, sentence: "予定が決まります", kana: "よていがきまります", type: "Intransitive", 
    english: "The plan is decided",
    noun: "予定", nounRuby: [{ text: "予", rt: "よ" }, { text: "定", rt: "てい" }],
    verbPrompt: "決", verbRuby: [{ text: "決", rt: "き" }],
    dictionaryRuby: [{ text: "決", rt: "き" }, { text: "ま", rt: "" }, { text: "る", rt: "" }],
    icon: CheckSquare, color: "text-blue-400" 
  },
  { 
    id: 32, level: 2, sentence: "予定を決めます", kana: "よていをきめます", type: "Transitive", 
    english: "I decide the plan",
    noun: "予定", nounRuby: [{ text: "予", rt: "よ" }, { text: "定", rt: "てい" }],
    verbPrompt: "決", verbRuby: [{ text: "決", rt: "き" }],
    dictionaryRuby: [{ text: "決", rt: "き" }, { text: "め", rt: "" }, { text: "る", rt: "" }],
    icon: CheckSquare, color: "text-green-400" 
  },
  { 
    id: 33, level: 2, sentence: "風が入ります", kana: "かぜがはいります", type: "Intransitive", 
    english: "The wind comes in",
    noun: "風", nounRuby: [{ text: "風", rt: "かぜ" }],
    verbPrompt: "入", verbRuby: [{ text: "入", rt: "はい" }],
    dictionaryRuby: [{ text: "入", rt: "はい" }, { text: "る", rt: "" }],
    icon: Wind, color: "text-cyan-400" 
  },
  { 
    id: 34, level: 2, sentence: "風を入れます", kana: "かぜをいれます", type: "Transitive", 
    english: "I let the wind in",
    noun: "風", nounRuby: [{ text: "風", rt: "かぜ" }],
    verbPrompt: "入", verbRuby: [{ text: "入", rt: "い" }],
    dictionaryRuby: [{ text: "入", rt: "い" }, { text: "れ", rt: "" }, { text: "る", rt: "" }],
    icon: Wind, color: "text-cyan-400" 
  },
  { 
    id: 35, level: 2, sentence: "お湯が沸きます", kana: "おゆがわきます", type: "Intransitive", 
    english: "The water boils",
    noun: "お湯", nounRuby: [{ text: "お", rt: "" }, { text: "湯", rt: "ゆ" }],
    verbPrompt: "沸", verbRuby: [{ text: "沸", rt: "わ" }],
    dictionaryRuby: [{ text: "沸", rt: "わ" }, { text: "く", rt: "" }],
    icon: Flame, color: "text-orange-400" 
  },
  { 
    id: 36, level: 2, sentence: "お湯を沸かします", kana: "おゆをわかします", type: "Transitive", 
    english: "I boil the water",
    noun: "お湯", nounRuby: [{ text: "お", rt: "" }, { text: "湯", rt: "ゆ" }],
    verbPrompt: "沸", verbRuby: [{ text: "沸", rt: "わ" }],
    dictionaryRuby: [{ text: "沸", rt: "わ" }, { text: "か", rt: "" }, { text: "す", rt: "" }],
    icon: Flame, color: "text-orange-400" 
  },
  { 
    id: 37, level: 2, sentence: "パンが焼けます", kana: "パンがやけます", type: "Intransitive", 
    english: "The bread bakes",
    noun: "パン", nounRuby: [{ text: "パン", rt: "" }],
    verbPrompt: "焼", verbRuby: [{ text: "焼", rt: "や" }],
    dictionaryRuby: [{ text: "焼", rt: "や" }, { text: "け", rt: "" }, { text: "る", rt: "" }],
    icon: Croissant, color: "text-yellow-700" 
  },
  { 
    id: 38, level: 2, sentence: "パンを焼きます", kana: "パンをやきます", type: "Transitive", 
    english: "I bake bread",
    noun: "パン", nounRuby: [{ text: "パン", rt: "" }],
    verbPrompt: "焼", verbRuby: [{ text: "焼", rt: "や" }],
    dictionaryRuby: [{ text: "焼", rt: "や" }, { text: "く", rt: "" }],
    icon: Croissant, color: "text-yellow-700" 
  },
  { 
    id: 39, level: 2, sentence: "肉が煮えます", kana: "にくがにえます", type: "Intransitive", 
    english: "The meat cooks / boils",
    noun: "肉", nounRuby: [{ text: "肉", rt: "にく" }],
    verbPrompt: "煮", verbRuby: [{ text: "煮", rt: "に" }],
    dictionaryRuby: [{ text: "煮", rt: "に" }, { text: "え", rt: "" }, { text: "る", rt: "" }],
    icon: Soup, color: "text-red-700" 
  },
  { 
    id: 40, level: 2, sentence: "肉を煮ます", kana: "にくをにます", type: "Transitive", 
    english: "I cook / boil the meat",
    noun: "肉", nounRuby: [{ text: "肉", rt: "にく" }],
    verbPrompt: "煮", verbRuby: [{ text: "煮", rt: "に" }],
    dictionaryRuby: [{ text: "煮", rt: "に" }, { text: "る", rt: "" }],
    icon: Soup, color: "text-red-700" 
  },

  // --- LEVEL 3 (IDs 41-60) ---
  {
    id: 41, level: 3, sentence: "カメラが壊れます", kana: "カメラがこわれます", type: "Intransitive",
    english: "The camera breaks",
    noun: "カメラ", nounRuby: [{ text: "カメラ", rt: "" }],
    verbPrompt: "壊", verbRuby: [{ text: "壊", rt: "こわ" }],
    dictionaryRuby: [{ text: "壊", rt: "こわ" }, { text: "れ", rt: "" }, { text: "る", rt: "" }],
    icon: Camera, color: "text-red-500"
  },
  {
    id: 42, level: 3, sentence: "カメラを壊します", kana: "カメラをこわします", type: "Transitive",
    english: "I break the camera",
    noun: "カメラ", nounRuby: [{ text: "カメラ", rt: "" }],
    verbPrompt: "壊", verbRuby: [{ text: "壊", rt: "こわ" }],
    dictionaryRuby: [{ text: "壊", rt: "こわ" }, { text: "す", rt: "" }],
    icon: Camera, color: "text-orange-500"
  },
  {
    id: 43, level: 3, sentence: "パソコンが直ります", kana: "パソコンがなおります", type: "Intransitive",
    english: "The PC gets fixed",
    noun: "パソコン", nounRuby: [{ text: "パソコン", rt: "" }],
    verbPrompt: "直", verbRuby: [{ text: "直", rt: "なお" }],
    dictionaryRuby: [{ text: "直", rt: "なお" }, { text: "る", rt: "" }],
    icon: Monitor, color: "text-blue-500"
  },
  {
    id: 44, level: 3, sentence: "パソコンを直します", kana: "パソコンをなおします", type: "Transitive",
    english: "I fix the PC",
    noun: "パソコン", nounRuby: [{ text: "パソコン", rt: "" }],
    verbPrompt: "直", verbRuby: [{ text: "直", rt: "なお" }],
    dictionaryRuby: [{ text: "直", rt: "なお" }, { text: "す", rt: "" }],
    icon: Monitor, color: "text-green-500"
  },
  {
    id: 45, level: 3, sentence: "荷物が届きます", kana: "にもつがとどきます", type: "Intransitive",
    english: "The package arrives",
    noun: "荷物", nounRuby: [{ text: "荷", rt: "に" }, { text: "物", rt: "もつ" }],
    verbPrompt: "届", verbRuby: [{ text: "届", rt: "とど" }],
    dictionaryRuby: [{ text: "届", rt: "とど" }, { text: "く", rt: "" }],
    icon: Package, color: "text-yellow-600"
  },
  {
    id: 46, level: 3, sentence: "荷物を届けます", kana: "にもつをとどけます", type: "Transitive",
    english: "I deliver the package",
    noun: "荷物", nounRuby: [{ text: "荷", rt: "に" }, { text: "物", rt: "もつ" }],
    verbPrompt: "届", verbRuby: [{ text: "届", rt: "とど" }],
    dictionaryRuby: [{ text: "届", rt: "とど" }, { text: "け", rt: "" }, { text: "る", rt: "" }],
    icon: Package, color: "text-green-600"
  },
  {
    id: 47, level: 3, sentence: "値段が上がります", kana: "ねだんがあがります", type: "Intransitive",
    english: "The price goes up",
    noun: "値段", nounRuby: [{ text: "値", rt: "ね" }, { text: "段", rt: "だん" }],
    verbPrompt: "上", verbRuby: [{ text: "上", rt: "あ" }],
    dictionaryRuby: [{ text: "上", rt: "あ" }, { text: "が", rt: "" }, { text: "る", rt: "" }],
    icon: Tag, color: "text-red-600"
  },
  {
    id: 48, level: 3, sentence: "値段を上げます", kana: "ねだんをあげます", type: "Transitive",
    english: "I raise the price",
    noun: "値段", nounRuby: [{ text: "値", rt: "ね" }, { text: "段", rt: "だん" }],
    verbPrompt: "上", verbRuby: [{ text: "上", rt: "あ" }],
    dictionaryRuby: [{ text: "上", rt: "あ" }, { text: "げ", rt: "" }, { text: "る", rt: "" }],
    icon: Tag, color: "text-green-600"
  },
  {
    id: 49, level: 3, sentence: "値段が下がります", kana: "ねだんがさがります", type: "Intransitive",
    english: "The price goes down",
    noun: "値段", nounRuby: [{ text: "値", rt: "ね" }, { text: "段", rt: "だん" }],
    verbPrompt: "下", verbRuby: [{ text: "下", rt: "さ" }],
    dictionaryRuby: [{ text: "下", rt: "さ" }, { text: "が", rt: "" }, { text: "る", rt: "" }],
    icon: Tag, color: "text-blue-600"
  },
  {
    id: 50, level: 3, sentence: "値段を下げます", kana: "ねだんをさげます", type: "Transitive",
    english: "I lower the price",
    noun: "値段", nounRuby: [{ text: "値", rt: "ね" }, { text: "段", rt: "だん" }],
    verbPrompt: "下", verbRuby: [{ text: "下", rt: "さ" }],
    dictionaryRuby: [{ text: "下", rt: "さ" }, { text: "げ", rt: "" }, { text: "る", rt: "" }],
    icon: Tag, color: "text-green-800"
  },
  {
    id: 51, level: 3, sentence: "仕事が増えます", kana: "しごとがふえます", type: "Intransitive",
    english: "Work increases",
    noun: "仕事", nounRuby: [{ text: "仕", rt: "し" }, { text: "事", rt: "ごと" }],
    verbPrompt: "増", verbRuby: [{ text: "増", rt: "ふ" }],
    dictionaryRuby: [{ text: "増", rt: "ふ" }, { text: "え", rt: "" }, { text: "る", rt: "" }],
    icon: Briefcase, color: "text-purple-500"
  },
  {
    id: 52, level: 3, sentence: "仕事を増やします", kana: "しごとをふやします", type: "Transitive",
    english: "I increase the work",
    noun: "仕事", nounRuby: [{ text: "仕", rt: "し" }, { text: "事", rt: "ごと" }],
    verbPrompt: "増", verbRuby: [{ text: "増", rt: "ふ" }],
    dictionaryRuby: [{ text: "増", rt: "ふ" }, { text: "や", rt: "" }, { text: "す", rt: "" }],
    icon: Briefcase, color: "text-pink-500"
  },
  {
    id: 53, level: 3, sentence: "体重が減ります", kana: "たいじゅうがへります", type: "Intransitive",
    english: "Weight decreases",
    noun: "体重", nounRuby: [{ text: "体", rt: "たい" }, { text: "重", rt: "じゅう" }],
    verbPrompt: "減", verbRuby: [{ text: "減", rt: "へ" }],
    dictionaryRuby: [{ text: "減", rt: "へ" }, { text: "る", rt: "" }],
    icon: Scale, color: "text-teal-500"
  },
  {
    id: 54, level: 3, sentence: "体重を減らします", kana: "たいじゅうをへらします", type: "Transitive",
    english: "I reduce the weight",
    noun: "体重", nounRuby: [{ text: "体", rt: "たい" }, { text: "重", rt: "じゅう" }],
    verbPrompt: "減", verbRuby: [{ text: "減", rt: "へ" }],
    dictionaryRuby: [{ text: "減", rt: "へ" }, { text: "ら", rt: "" }, { text: "す", rt: "" }],
    icon: Scale, color: "text-teal-700"
  },
  {
    id: 55, level: 3, sentence: "レッスンが続きます", kana: "レッスンがつづきます", type: "Intransitive",
    english: "The lesson continues",
    noun: "レッスン", nounRuby: [{ text: "レッスン", rt: "" }],
    verbPrompt: "続", verbRuby: [{ text: "続", rt: "つづ" }],
    dictionaryRuby: [{ text: "続", rt: "つづ" }, { text: "く", rt: "" }],
    icon: GraduationCap, color: "text-indigo-400"
  },
  {
    id: 56, level: 3, sentence: "レッスンを続けます", kana: "レッスンをつづけます", type: "Transitive",
    english: "I continue the lesson",
    noun: "レッスン", nounRuby: [{ text: "レッスン", rt: "" }],
    verbPrompt: "続", verbRuby: [{ text: "続", rt: "つづ" }],
    dictionaryRuby: [{ text: "続", rt: "つづ" }, { text: "け", rt: "" }, { text: "る", rt: "" }],
    icon: GraduationCap, color: "text-indigo-600"
  },
  {
    id: 57, level: 3, sentence: "子どもが助かります", kana: "こどもがたすかります", type: "Intransitive",
    english: "The child is saved",
    noun: "子ども", nounRuby: [{ text: "子", rt: "こ" }, { text: "ども", rt: "" }],
    verbPrompt: "助", verbRuby: [{ text: "助", rt: "たす" }],
    dictionaryRuby: [{ text: "助", rt: "たす" }, { text: "か", rt: "" }, { text: "る", rt: "" }],
    icon: Baby, color: "text-pink-300"
  },
  {
    id: 58, level: 3, sentence: "子どもを助けます", kana: "こどもをたすけます", type: "Transitive",
    english: "I save the child",
    noun: "子ども", nounRuby: [{ text: "子", rt: "こ" }, { text: "ども", rt: "" }],
    verbPrompt: "助", verbRuby: [{ text: "助", rt: "たす" }],
    dictionaryRuby: [{ text: "助", rt: "たす" }, { text: "け", rt: "" }, { text: "る", rt: "" }],
    icon: Baby, color: "text-pink-500"
  },
  {
    id: 59, level: 3, sentence: "テーブルが回ります", kana: "テーブルがまわります", type: "Intransitive",
    english: "The table turns",
    noun: "テーブル", nounRuby: [{ text: "テーブル", rt: "" }],
    verbPrompt: "回", verbRuby: [{ text: "回", rt: "まわ" }],
    dictionaryRuby: [{ text: "回", rt: "まわ" }, { text: "る", rt: "" }],
    icon: RotateCw, color: "text-gray-400"
  },
  {
    id: 60, level: 3, sentence: "テーブルを回します", kana: "テーブルをまわします", type: "Transitive",
    english: "I turn the table",
    noun: "テーブル", nounRuby: [{ text: "テーブル", rt: "" }],
    verbPrompt: "回", verbRuby: [{ text: "回", rt: "まわ" }],
    dictionaryRuby: [{ text: "回", rt: "まわ" }, { text: "す", rt: "" }],
    icon: RotateCw, color: "text-gray-600"
  },

  // --- LEVEL 4 (IDs 61-80) ---
  {
    id: 61, level: 4, sentence: "腕が曲がります", kana: "うでがまがります", type: "Intransitive",
    english: "The arm bends",
    noun: "腕", nounRuby: [{ text: "腕", rt: "うで" }],
    verbPrompt: "曲", verbRuby: [{ text: "曲", rt: "ま" }],
    dictionaryRuby: [{ text: "曲", rt: "ま" }, { text: "が", rt: "" }, { text: "る", rt: "" }],
    icon: User, color: "text-orange-300"
  },
  {
    id: 62, level: 4, sentence: "腕を曲げます", kana: "うでをまげます", type: "Transitive",
    english: "I bend my arm",
    noun: "腕", nounRuby: [{ text: "腕", rt: "うで" }],
    verbPrompt: "曲", verbRuby: [{ text: "曲", rt: "ま" }],
    dictionaryRuby: [{ text: "曲", rt: "ま" }, { text: "げ", rt: "" }, { text: "る", rt: "" }],
    icon: User, color: "text-orange-500"
  },
  {
    id: 63, level: 4, sentence: "骨が折れます", kana: "ほねがおれます", type: "Intransitive",
    english: "The bone breaks",
    noun: "骨", nounRuby: [{ text: "骨", rt: "ほね" }],
    verbPrompt: "折", verbRuby: [{ text: "折", rt: "お" }],
    dictionaryRuby: [{ text: "折", rt: "お" }, { text: "れ", rt: "" }, { text: "る", rt: "" }],
    icon: Bone, color: "text-gray-300"
  },
  {
    id: 64, level: 4, sentence: "骨を折ります", kana: "ほねをおります", type: "Transitive",
    english: "I break a bone",
    noun: "骨", nounRuby: [{ text: "骨", rt: "ほね" }],
    verbPrompt: "折", verbRuby: [{ text: "折", rt: "お" }],
    dictionaryRuby: [{ text: "折", rt: "お" }, { text: "る", rt: "" }],
    icon: Bone, color: "text-gray-500"
  },
  {
    id: 65, level: 4, sentence: "人が集まります", kana: "ひとがあつまります", type: "Intransitive",
    english: "People gather",
    noun: "人", nounRuby: [{ text: "人", rt: "ひと" }],
    verbPrompt: "集", verbRuby: [{ text: "集", rt: "あつ" }],
    dictionaryRuby: [{ text: "集", rt: "あつ" }, { text: "ま", rt: "" }, { text: "る", rt: "" }],
    icon: Users, color: "text-blue-400"
  },
  {
    id: 66, level: 4, sentence: "人を集めます", kana: "ひとをあつめます", type: "Transitive",
    english: "I gather people",
    noun: "人", nounRuby: [{ text: "人", rt: "ひと" }],
    verbPrompt: "集", verbRuby: [{ text: "集", rt: "あつ" }],
    dictionaryRuby: [{ text: "集", rt: "あつ" }, { text: "め", rt: "" }, { text: "る", rt: "" }],
    icon: Users, color: "text-green-400"
  },
  {
    id: 67, level: 4, sentence: "人が並びます", kana: "ひとがならびます", type: "Intransitive",
    english: "People line up",
    noun: "人", nounRuby: [{ text: "人", rt: "ひと" }],
    verbPrompt: "並", verbRuby: [{ text: "並", rt: "なら" }],
    dictionaryRuby: [{ text: "並", rt: "なら" }, { text: "ぶ", rt: "" }],
    icon: Users, color: "text-indigo-400"
  },
  {
    id: 68, level: 4, sentence: "人を並べます", kana: "ひとをならべます", type: "Transitive",
    english: "I line people up",
    noun: "人", nounRuby: [{ text: "人", rt: "ひと" }],
    verbPrompt: "並", verbRuby: [{ text: "並", rt: "なら" }],
    dictionaryRuby: [{ text: "並", rt: "なら" }, { text: "べ", rt: "" }, { text: "る", rt: "" }],
    icon: Users, color: "text-indigo-600"
  },
  {
    id: 69, level: 4, sentence: "コーヒーがこぼれます", kana: "コーヒーがこぼれます", type: "Intransitive",
    english: "The coffee spills",
    noun: "コーヒー", nounRuby: [{ text: "コーヒー", rt: "" }],
    verbPrompt: "こぼ", verbRuby: [{ text: "こぼ", rt: "" }],
    dictionaryRuby: [{ text: "こぼ", rt: "" }, { text: "れ", rt: "" }, { text: "る", rt: "" }],
    icon: Coffee, color: "text-amber-700"
  },
  {
    id: 70, level: 4, sentence: "コーヒーをこぼします", kana: "コーヒーをこぼします", type: "Transitive",
    english: "I spill the coffee",
    noun: "コーヒー", nounRuby: [{ text: "コーヒー", rt: "" }],
    verbPrompt: "こぼ", verbRuby: [{ text: "こぼ", rt: "" }],
    dictionaryRuby: [{ text: "こぼ", rt: "" }, { text: "す", rt: "" }],
    icon: Coffee, color: "text-amber-900"
  },
  {
    id: 71, level: 4, sentence: "卵が割れます", kana: "たまごがわれます", type: "Intransitive",
    english: "The egg breaks",
    noun: "卵", nounRuby: [{ text: "卵", rt: "たまご" }],
    verbPrompt: "割", verbRuby: [{ text: "割", rt: "わ" }],
    dictionaryRuby: [{ text: "割", rt: "わ" }, { text: "れ", rt: "" }, { text: "る", rt: "" }],
    icon: Egg, color: "text-yellow-200"
  },
  {
    id: 72, level: 4, sentence: "卵を割ります", kana: "たまごをわります", type: "Transitive",
    english: "I break the egg",
    noun: "卵", nounRuby: [{ text: "卵", rt: "たまご" }],
    verbPrompt: "割", verbRuby: [{ text: "割", rt: "わ" }],
    dictionaryRuby: [{ text: "割", rt: "わ" }, { text: "る", rt: "" }],
    icon: Egg, color: "text-yellow-400"
  },
  {
    id: 73, level: 4, sentence: "ロープが切れます", kana: "ロープがきれます", type: "Intransitive",
    english: "The rope snaps",
    noun: "ロープ", nounRuby: [{ text: "ロープ", rt: "" }],
    verbPrompt: "切", verbRuby: [{ text: "切", rt: "き" }],
    dictionaryRuby: [{ text: "切", rt: "き" }, { text: "れ", rt: "" }, { text: "る", rt: "" }],
    icon: Scissors, color: "text-red-400"
  },
  {
    id: 74, level: 4, sentence: "ロープを切ります", kana: "ロープをきります", type: "Transitive",
    english: "I cut the rope",
    noun: "ロープ", nounRuby: [{ text: "ロープ", rt: "" }],
    verbPrompt: "切", verbRuby: [{ text: "切", rt: "き" }],
    dictionaryRuby: [{ text: "切", rt: "き" }, { text: "る", rt: "" }],
    icon: Scissors, color: "text-red-600"
  },
  {
    id: 75, level: 4, sentence: "ごみが燃えます", kana: "ごみがもえます", type: "Intransitive",
    english: "The trash burns",
    noun: "ごみ", nounRuby: [{ text: "ごみ", rt: "" }],
    verbPrompt: "燃", verbRuby: [{ text: "燃", rt: "も" }],
    dictionaryRuby: [{ text: "燃", rt: "も" }, { text: "え", rt: "" }, { text: "る", rt: "" }],
    icon: Trash2, color: "text-orange-500"
  },
  {
    id: 76, level: 4, sentence: "ごみを燃やします", kana: "ごみをもやします", type: "Transitive",
    english: "I burn the trash",
    noun: "ごみ", nounRuby: [{ text: "ごみ", rt: "" }],
    verbPrompt: "燃", verbRuby: [{ text: "燃", rt: "も" }],
    dictionaryRuby: [{ text: "燃", rt: "も" }, { text: "や", rt: "" }, { text: "す", rt: "" }],
    icon: Trash2, color: "text-orange-700"
  },
  {
    id: 77, level: 4, sentence: "ボタンが取れます", kana: "ボタンがとれます", type: "Intransitive",
    english: "The button comes off",
    noun: "ボタン", nounRuby: [{ text: "ボタン", rt: "" }],
    verbPrompt: "取", verbRuby: [{ text: "取", rt: "と" }],
    dictionaryRuby: [{ text: "取", rt: "と" }, { text: "れ", rt: "" }, { text: "る", rt: "" }],
    icon: CircleDot, color: "text-purple-400"
  },
  {
    id: 78, level: 4, sentence: "ボタンを取ります", kana: "ボタンをとります", type: "Transitive",
    english: "I take the button",
    noun: "ボタン", nounRuby: [{ text: "ボタン", rt: "" }],
    verbPrompt: "取", verbRuby: [{ text: "取", rt: "と" }],
    dictionaryRuby: [{ text: "取", rt: "と" }, { text: "る", rt: "" }],
    icon: CircleDot, color: "text-purple-600"
  },
  {
    id: 79, level: 4, sentence: "ボタンが外れます", kana: "ボタンがはずれます", type: "Intransitive",
    english: "The button gets undone",
    noun: "ボタン", nounRuby: [{ text: "ボタン", rt: "" }],
    verbPrompt: "外", verbRuby: [{ text: "外", rt: "はず" }],
    dictionaryRuby: [{ text: "外", rt: "はず" }, { text: "れ", rt: "" }, { text: "る", rt: "" }],
    icon: CircleDot, color: "text-blue-400"
  },
  {
    id: 80, level: 4, sentence: "ボタンを外します", kana: "ボタンをはずします", type: "Transitive",
    english: "I undo the button",
    noun: "ボタン", nounRuby: [{ text: "ボタン", rt: "" }],
    verbPrompt: "外", verbRuby: [{ text: "外", rt: "はず" }],
    dictionaryRuby: [{ text: "外", rt: "はず" }, { text: "す", rt: "" }],
    icon: CircleDot, color: "text-blue-600"
  },

  // --- LEVEL 5 (IDs 81-100) ---
  {
    id: 81, level: 5, sentence: "ビールが売れます", kana: "ビールがうれます", type: "Intransitive",
    english: "The beer sells (well)",
    noun: "ビール", nounRuby: [{ text: "ビール", rt: "" }],
    verbPrompt: "売", verbRuby: [{ text: "売", rt: "う" }],
    dictionaryRuby: [{ text: "売", rt: "う" }, { text: "れ", rt: "" }, { text: "る", rt: "" }],
    icon: Beer, color: "text-yellow-500"
  },
  {
    id: 82, level: 5, sentence: "ビールを売ります", kana: "ビールをうります", type: "Transitive",
    english: "I sell beer",
    noun: "ビール", nounRuby: [{ text: "ビール", rt: "" }],
    verbPrompt: "売", verbRuby: [{ text: "売", rt: "う" }],
    dictionaryRuby: [{ text: "売", rt: "う" }, { text: "る", rt: "" }],
    icon: Beer, color: "text-yellow-700"
  },
  {
    id: 83, level: 5, sentence: "書類が揃います", kana: "しょるいがそろいます", type: "Intransitive",
    english: "The documents are gathered",
    noun: "書類", nounRuby: [{ text: "書", rt: "しょ" }, { text: "類", rt: "るい" }],
    verbPrompt: "揃", verbRuby: [{ text: "揃", rt: "そろ" }],
    dictionaryRuby: [{ text: "揃", rt: "そろ" }, { text: "う", rt: "" }],
    icon: Files, color: "text-gray-400"
  },
  {
    id: 84, level: 5, sentence: "書類を揃えます", kana: "しょるいをそろえます", type: "Transitive",
    english: "I gather/arrange the documents",
    noun: "書類", nounRuby: [{ text: "書", rt: "しょ" }, { text: "類", rt: "るい" }],
    verbPrompt: "揃", verbRuby: [{ text: "揃", rt: "そろ" }],
    dictionaryRuby: [{ text: "揃", rt: "そろ" }, { text: "え", rt: "" }, { text: "る", rt: "" }],
    icon: Files, color: "text-gray-600"
  },
  {
    id: 85, level: 5, sentence: "仕事が進みます", kana: "しごとがすすみます", type: "Intransitive",
    english: "The work progresses",
    noun: "仕事", nounRuby: [{ text: "仕", rt: "し" }, { text: "事", rt: "ごと" }],
    verbPrompt: "進", verbRuby: [{ text: "進", rt: "すす" }],
    dictionaryRuby: [{ text: "進", rt: "すす" }, { text: "む", rt: "" }],
    icon: ArrowRight, color: "text-blue-400"
  },
  {
    id: 86, level: 5, sentence: "仕事を進めます", kana: "しごとをすすめます", type: "Transitive",
    english: "I advance the work",
    noun: "仕事", nounRuby: [{ text: "仕", rt: "し" }, { text: "事", rt: "ごと" }],
    verbPrompt: "進", verbRuby: [{ text: "進", rt: "すす" }],
    dictionaryRuby: [{ text: "進", rt: "すす" }, { text: "め", rt: "" }, { text: "る", rt: "" }],
    icon: ArrowRight, color: "text-green-400"
  },
  {
    id: 87, level: 5, sentence: "仕事が済みます", kana: "しごとがすみます", type: "Intransitive",
    english: "The work is finished",
    noun: "仕事", nounRuby: [{ text: "仕", rt: "し" }, { text: "事", rt: "ごと" }],
    verbPrompt: "済", verbRuby: [{ text: "済", rt: "す" }],
    dictionaryRuby: [{ text: "済", rt: "す" }, { text: "む", rt: "" }],
    icon: CheckCheck, color: "text-green-500"
  },
  {
    id: 88, level: 5, sentence: "仕事を済ませます", kana: "しごとをすませます", type: "Transitive",
    english: "I finish the work",
    noun: "仕事", nounRuby: [{ text: "仕", rt: "し" }, { text: "事", rt: "ごと" }],
    verbPrompt: "済", verbRuby: [{ text: "済", rt: "す" }],
    dictionaryRuby: [{ text: "済", rt: "す" }, { text: "ま", rt: "" }, { text: "せ", rt: "" }, { text: "る", rt: "" }],
    icon: CheckCheck, color: "text-green-700"
  },
  {
    id: 89, level: 5, sentence: "時間が過ぎます", kana: "じかんがすぎます", type: "Intransitive",
    english: "Time passes",
    noun: "時間", nounRuby: [{ text: "時", rt: "じ" }, { text: "間", rt: "かん" }],
    verbPrompt: "過", verbRuby: [{ text: "過", rt: "す" }],
    dictionaryRuby: [{ text: "過", rt: "す" }, { text: "ぎ", rt: "" }, { text: "る", rt: "" }],
    icon: Clock, color: "text-purple-400"
  },
  {
    id: 90, level: 5, sentence: "時間を過ごします", kana: "じかんをすごします", type: "Transitive",
    english: "I spend time",
    noun: "時間", nounRuby: [{ text: "時", rt: "じ" }, { text: "間", rt: "かん" }],
    verbPrompt: "過", verbRuby: [{ text: "過", rt: "す" }],
    dictionaryRuby: [{ text: "過", rt: "す" }, { text: "ご", rt: "" }, { text: "す", rt: "" }],
    icon: Clock, color: "text-purple-600"
  },
  {
    id: 91, level: 5, sentence: "ストレスが溜まります", kana: "ストレスがたまります", type: "Intransitive",
    english: "Stress accumulates",
    noun: "ストレス", nounRuby: [{ text: "ストレス", rt: "" }],
    verbPrompt: "溜", verbRuby: [{ text: "溜", rt: "た" }],
    dictionaryRuby: [{ text: "溜", rt: "た" }, { text: "ま", rt: "" }, { text: "る", rt: "" }],
    icon: Brain, color: "text-red-400"
  },
  {
    id: 92, level: 5, sentence: "ストレスを溜めます", kana: "ストレスをためます", type: "Transitive",
    english: "I build up stress",
    noun: "ストレス", nounRuby: [{ text: "ストレス", rt: "" }],
    verbPrompt: "溜", verbRuby: [{ text: "溜", rt: "た" }],
    dictionaryRuby: [{ text: "溜", rt: "た" }, { text: "め", rt: "" }, { text: "る", rt: "" }],
    icon: Brain, color: "text-red-600"
  },
  {
    id: 93, level: 5, sentence: "お金が貯まります", kana: "おかねがたまります", type: "Intransitive",
    english: "Money is saved",
    noun: "お金", nounRuby: [{ text: "お", rt: "" }, { text: "金", rt: "かね" }],
    verbPrompt: "貯", verbRuby: [{ text: "貯", rt: "た" }],
    dictionaryRuby: [{ text: "貯", rt: "た" }, { text: "ま", rt: "" }, { text: "る", rt: "" }],
    icon: Coins, color: "text-yellow-400"
  },
  {
    id: 94, level: 5, sentence: "お金を貯めます", kana: "おかねをためます", type: "Transitive",
    english: "I save money",
    noun: "お金", nounRuby: [{ text: "お", rt: "" }, { text: "金", rt: "かね" }],
    verbPrompt: "貯", verbRuby: [{ text: "貯", rt: "た" }],
    dictionaryRuby: [{ text: "貯", rt: "た" }, { text: "め", rt: "" }, { text: "る", rt: "" }],
    icon: Coins, color: "text-yellow-600"
  },
  {
    id: 95, level: 5, sentence: "水が流れます", kana: "みずがながれます", type: "Intransitive",
    english: "Water flows",
    noun: "水", nounRuby: [{ text: "水", rt: "みず" }],
    verbPrompt: "流", verbRuby: [{ text: "流", rt: "なが" }],
    dictionaryRuby: [{ text: "流", rt: "なが" }, { text: "れ", rt: "" }, { text: "る", rt: "" }],
    icon: Waves, color: "text-blue-300"
  },
  {
    id: 96, level: 5, sentence: "水を流します", kana: "みずをながします", type: "Transitive",
    english: "I let the water flow",
    noun: "水", nounRuby: [{ text: "水", rt: "みず" }],
    verbPrompt: "流", verbRuby: [{ text: "流", rt: "なが" }],
    dictionaryRuby: [{ text: "流", rt: "なが" }, { text: "す", rt: "" }],
    icon: Waves, color: "text-blue-500"
  },
  {
    id: 97, level: 5, sentence: "木が倒れます", kana: "きがたおれます", type: "Intransitive",
    english: "The tree falls down",
    noun: "木", nounRuby: [{ text: "木", rt: "き" }],
    verbPrompt: "倒", verbRuby: [{ text: "倒", rt: "たお" }],
    dictionaryRuby: [{ text: "倒", rt: "たお" }, { text: "れ", rt: "" }, { text: "る", rt: "" }],
    icon: Trees, color: "text-green-800"
  },
  {
    id: 98, level: 5, sentence: "木を倒します", kana: "きをたおします", type: "Transitive",
    english: "I knock down the tree",
    noun: "木", nounRuby: [{ text: "木", rt: "き" }],
    verbPrompt: "倒", verbRuby: [{ text: "倒", rt: "たお" }],
    dictionaryRuby: [{ text: "倒", rt: "たお" }, { text: "す", rt: "" }],
    icon: Trees, color: "text-green-900"
  },
  {
    id: 99, level: 5, sentence: "紙が破れます", kana: "かみがやぶれます", type: "Intransitive",
    english: "The paper tears",
    noun: "紙", nounRuby: [{ text: "紙", rt: "かみ" }],
    verbPrompt: "破", verbRuby: [{ text: "破", rt: "やぶ" }],
    dictionaryRuby: [{ text: "破", rt: "やぶ" }, { text: "れ", rt: "" }, { text: "る", rt: "" }],
    icon: FileX, color: "text-gray-300"
  },
  {
    id: 100, level: 5, sentence: "紙を破ります", kana: "かみをやぶります", type: "Transitive",
    english: "I tear the paper",
    noun: "紙", nounRuby: [{ text: "紙", rt: "かみ" }],
    verbPrompt: "破", verbRuby: [{ text: "破", rt: "やぶ" }],
    dictionaryRuby: [{ text: "破", rt: "やぶ" }, { text: "る", rt: "" }],
    icon: FileX, color: "text-gray-500"
  },

  // --- LEVEL 6 (IDs 101-120) ---
  {
    id: 101, level: 6, sentence: "髪が乾きます", kana: "かみがかわきます", type: "Intransitive",
    english: "Hair dries",
    noun: "髪", nounRuby: [{ text: "髪", rt: "かみ" }],
    verbPrompt: "乾", verbRuby: [{ text: "乾", rt: "かわ" }],
    dictionaryRuby: [{ text: "乾", rt: "かわ" }, { text: "く", rt: "" }],
    icon: Wind, color: "text-blue-200"
  },
  {
    id: 102, level: 6, sentence: "髪を乾かします", kana: "かみをかわかします", type: "Transitive",
    english: "I dry my hair",
    noun: "髪", nounRuby: [{ text: "髪", rt: "かみ" }],
    verbPrompt: "乾", verbRuby: [{ text: "乾", rt: "かわ" }],
    dictionaryRuby: [{ text: "乾", rt: "かわ" }, { text: "か", rt: "" }, { text: "す", rt: "" }],
    icon: Wind, color: "text-blue-400"
  },
  {
    id: 103, level: 6, sentence: "体が冷えます", kana: "からだがひえます", type: "Intransitive",
    english: "Body cools down",
    noun: "体", nounRuby: [{ text: "体", rt: "からだ" }],
    verbPrompt: "冷", verbRuby: [{ text: "冷", rt: "ひ" }],
    dictionaryRuby: [{ text: "冷", rt: "ひ" }, { text: "え", rt: "" }, { text: "る", rt: "" }],
    icon: ThermometerSnowflake, color: "text-blue-300"
  },
  {
    id: 104, level: 6, sentence: "体を冷やします", kana: "からだをひやします", type: "Transitive",
    english: "I cool my body",
    noun: "体", nounRuby: [{ text: "体", rt: "からだ" }],
    verbPrompt: "冷", verbRuby: [{ text: "冷", rt: "ひ" }],
    dictionaryRuby: [{ text: "冷", rt: "ひ" }, { text: "や", rt: "" }, { text: "す", rt: "" }],
    icon: ThermometerSnowflake, color: "text-blue-500"
  },
  {
    id: 105, level: 6, sentence: "体が温まります", kana: "からだがあたたまります", type: "Intransitive",
    english: "Body warms up",
    noun: "体", nounRuby: [{ text: "体", rt: "からだ" }],
    verbPrompt: "温", verbRuby: [{ text: "温", rt: "あたた" }],
    dictionaryRuby: [{ text: "温", rt: "あたた" }, { text: "ま", rt: "" }, { text: "る", rt: "" }],
    icon: ThermometerSun, color: "text-orange-300"
  },
  {
    id: 106, level: 6, sentence: "体を温めます", kana: "からだをあたためます", type: "Transitive",
    english: "I warm my body",
    noun: "体", nounRuby: [{ text: "体", rt: "からだ" }],
    verbPrompt: "温", verbRuby: [{ text: "温", rt: "あたた" }],
    dictionaryRuby: [{ text: "温", rt: "あたた" }, { text: "め", rt: "" }, { text: "る", rt: "" }],
    icon: ThermometerSun, color: "text-orange-500"
  },
  {
    id: 107, level: 6, sentence: "スープが冷めます", kana: "スープがさめます", type: "Intransitive",
    english: "The soup cools down",
    noun: "スープ", nounRuby: [{ text: "スープ", rt: "" }],
    verbPrompt: "冷", verbRuby: [{ text: "冷", rt: "さ" }],
    dictionaryRuby: [{ text: "冷", rt: "さ" }, { text: "め", rt: "" }, { text: "る", rt: "" }],
    icon: Soup, color: "text-blue-200"
  },
  {
    id: 108, level: 6, sentence: "スープを冷まします", kana: "スープをさまします", type: "Transitive",
    english: "I let the soup cool",
    noun: "スープ", nounRuby: [{ text: "スープ", rt: "" }],
    verbPrompt: "冷", verbRuby: [{ text: "冷", rt: "さ" }],
    dictionaryRuby: [{ text: "冷", rt: "さ" }, { text: "ま", rt: "" }, { text: "す", rt: "" }],
    icon: Soup, color: "text-blue-400"
  },
  {
    id: 109, level: 6, sentence: "服が汚れます", kana: "ふくがよごれます", type: "Intransitive",
    english: "Clothes get dirty",
    noun: "服", nounRuby: [{ text: "服", rt: "ふく" }],
    verbPrompt: "汚", verbRuby: [{ text: "汚", rt: "よご" }],
    dictionaryRuby: [{ text: "汚", rt: "よご" }, { text: "れ", rt: "" }, { text: "る", rt: "" }],
    icon: Shirt, color: "text-gray-500"
  },
  {
    id: 110, level: 6, sentence: "服を汚します", kana: "ふくをよごします", type: "Transitive",
    english: "I get clothes dirty",
    noun: "服", nounRuby: [{ text: "服", rt: "ふく" }],
    verbPrompt: "汚", verbRuby: [{ text: "汚", rt: "よご" }],
    dictionaryRuby: [{ text: "汚", rt: "よご" }, { text: "す", rt: "" }],
    icon: Shirt, color: "text-gray-700"
  },
  {
    id: 111, level: 6, sentence: "子どもが起きます", kana: "こどもがおきます", type: "Intransitive",
    english: "The child wakes up",
    noun: "子ども", nounRuby: [{ text: "子", rt: "こ" }, { text: "ども", rt: "" }],
    verbPrompt: "起", verbRuby: [{ text: "起", rt: "お" }],
    dictionaryRuby: [{ text: "起", rt: "お" }, { text: "き", rt: "" }, { text: "る", rt: "" }],
    icon: Sun, color: "text-yellow-400"
  },
  {
    id: 112, level: 6, sentence: "子どもを起こします", kana: "こどもをおこします", type: "Transitive",
    english: "I wake the child up",
    noun: "子ども", nounRuby: [{ text: "子", rt: "こ" }, { text: "ども", rt: "" }],
    verbPrompt: "起", verbRuby: [{ text: "起", rt: "お" }],
    dictionaryRuby: [{ text: "起", rt: "お" }, { text: "こ", rt: "" }, { text: "す", rt: "" }],
    icon: Sun, color: "text-yellow-600"
  },
  {
    id: 113, level: 6, sentence: "皮がむけます", kana: "かわがむけます", type: "Intransitive",
    english: "The skin peels",
    noun: "皮", nounRuby: [{ text: "皮", rt: "かわ" }],
    verbPrompt: "む", verbRuby: [{ text: "む", rt: "" }],
    dictionaryRuby: [{ text: "む", rt: "" }, { text: "け", rt: "" }, { text: "る", rt: "" }],
    icon: Banana, color: "text-yellow-300"
  },
  {
    id: 114, level: 6, sentence: "皮をむきます", kana: "かわをむきます", type: "Transitive",
    english: "I peel the skin",
    noun: "皮", nounRuby: [{ text: "皮", rt: "かわ" }],
    verbPrompt: "む", verbRuby: [{ text: "む", rt: "" }],
    dictionaryRuby: [{ text: "む", rt: "" }, { text: "く", rt: "" }],
    icon: Banana, color: "text-yellow-500"
  },
  {
    id: 115, level: 6, sentence: "赤ちゃんが生まれます", kana: "あかちゃんがうまれます", type: "Intransitive",
    english: "The baby is born",
    noun: "赤ちゃん", nounRuby: [{ text: "赤", rt: "あか" }, { text: "ちゃん", rt: "" }],
    verbPrompt: "生", verbRuby: [{ text: "生", rt: "う" }],
    dictionaryRuby: [{ text: "生", rt: "う" }, { text: "ま", rt: "" }, { text: "れ", rt: "" }, { text: "る", rt: "" }],
    icon: Baby, color: "text-pink-200"
  },
  {
    id: 116, level: 6, sentence: "赤ちゃんを生みます", kana: "あかちゃんをうみます", type: "Transitive",
    english: "I give birth to a baby",
    noun: "赤ちゃん", nounRuby: [{ text: "赤", rt: "あか" }, { text: "ちゃん", rt: "" }],
    verbPrompt: "生", verbRuby: [{ text: "生", rt: "う" }],
    dictionaryRuby: [{ text: "生", rt: "う" }, { text: "む", rt: "" }],
    icon: Baby, color: "text-pink-400"
  },
  {
    id: 117, level: 6, sentence: "予定が延びます", kana: "よていがのびます", type: "Intransitive",
    english: "The schedule is extended",
    noun: "予定", nounRuby: [{ text: "予", rt: "よ" }, { text: "定", rt: "てい" }],
    verbPrompt: "延", verbRuby: [{ text: "延", rt: "の" }],
    dictionaryRuby: [{ text: "延", rt: "の" }, { text: "び", rt: "" }, { text: "る", rt: "" }],
    icon: Calendar, color: "text-blue-300"
  },
  {
    id: 118, level: 6, sentence: "予定を延ばします", kana: "よていをのばします", type: "Transitive",
    english: "I extend the schedule",
    noun: "予定", nounRuby: [{ text: "予", rt: "よ" }, { text: "定", rt: "てい" }],
    verbPrompt: "延", verbRuby: [{ text: "延", rt: "の" }],
    dictionaryRuby: [{ text: "延", rt: "の" }, { text: "ば", rt: "" }, { text: "す", rt: "" }],
    icon: Calendar, color: "text-blue-500"
  },
  {
    id: 119, level: 6, sentence: "犯人が捕まります", kana: "はんにんがつかまります", type: "Intransitive",
    english: "The criminal is caught",
    noun: "犯人", nounRuby: [{ text: "犯", rt: "はん" }, { text: "人", rt: "にん" }],
    verbPrompt: "捕", verbRuby: [{ text: "捕", rt: "つか" }],
    dictionaryRuby: [{ text: "捕", rt: "つか" }, { text: "ま", rt: "" }, { text: "る", rt: "" }],
    icon: Fingerprint, color: "text-gray-600"
  },
  {
    id: 120, level: 6, sentence: "犯人を捕まえます", kana: "はんにんをつかまえます", type: "Transitive",
    english: "I catch the criminal",
    noun: "犯人", nounRuby: [{ text: "犯", rt: "はん" }, { text: "人", rt: "にん" }],
    verbPrompt: "捕", verbRuby: [{ text: "捕", rt: "つか" }],
    dictionaryRuby: [{ text: "捕", rt: "つか" }, { text: "ま", rt: "" }, { text: "え", rt: "" }, { text: "る", rt: "" }],
    icon: Fingerprint, color: "text-gray-800"
  },
];