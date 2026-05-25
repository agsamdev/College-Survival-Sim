export const FONT_URL = "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Nunito:wght@400;700;900&display=swap";

export const DAYS = ["MON","TUE","WED","THU","FRI","SAT","SUN"];
export const TOTAL_WEEKS = 4;
export const TOTAL_DAYS = DAYS.length * TOTAL_WEEKS;
export const TIME_SLOTS = ["MORNING","AFTERNOON","EVENING","NIGHT"];

export const INITIAL_STATE = {
  day:0, slot:0, focus:70, stamina:80, php:850, grade:50, stress:20, social:60,
  inventory:[], log:[],
  flags:{ partTimeUnlocked:false, netflixSub:false, netflixSubWeek:0 },
  gameOver:false, gameOverReason:"", won:false,
  major:null,
  studiedLessons:{},
  romance:{
    classmate_mac:{ affection:0, dates:0, gifts:0, stage:"stranger", conversations:[] },
    rosa_cortez:{ affection:0, dates:0, gifts:0, stage:"stranger", conversations:[] },
    librarian:{ affection:0, dates:0, gifts:0, stage:"stranger", conversations:[] },
  },
  minigameStats:{
    basketball:{ highScore:0, gamesPlayed:0 },
    fps:{ highScore:0, gamesPlayed:0 },
    chess:{ wins:0, losses:0, draws:0 },
    sportsDay:{ bestTime:0, medals:0 },
    f1:{ bestTime:0, races:0 },
  },
};

export const LOCATION_NPC = {
  canteen:   { id:"rosa_cortez",   name:"Rosa Cortez", age:20, location:"Davao", color:"#D85A30", romanceable:true, lines:[
    "Ay sus, kapoy ka na gyud? Tarongon nato ang baon nimo.",
    "Naay bagong sinuglaw diri, extra sabaw pa gyud.",
    "Energy kaayo ka daw, tara. Ako jud hilig og F1, perting paspas.",
    "Akong iro mukuyog unya sa walk. Ganahan ka og iro, 'di ba?",
  ], romanceLines:{
    flustered:"Hala, ngisi pa gyud na nimo. Ambot ana, mura kog naay laing race sa kasingkasing.",
    friendly:"Balik na intawon diri, ha? Libre tika og taklob sa asadong baboy.",
    date:"Human sa trabaho, drive ta sa Davao Crocodile Park. Dili lang ta mag-F1, mag-walk sad ta.",
    gift:"Awww, para sa akong iro? Salamat kaayo. Pwede ka mo-join next walk.",
  }},
  bookstore: { id:"kuya_ben",   name:"Kuya Ben",    color:"#BA7517", romanceable:false, lines:[
    "Welcome to the bookstore! Need a bluebook for the exam?",
    "Bago ang reviewer namin — taas ng score ng nagbili last sem!",
    "Highlighter set? Perfect timing, midterms na bukas.",
    "Mag-stock ka na ngayon habang meron pa. Mabilis maubusan 'to.",
  ]},
  classroom: { id:"prof_reyes", name:"Prof. Reyes",  color:"#185FA5", romanceable:false, lines:[
    "Maupo na. At saka — may pop quiz tayo mamaya.",
    "Attendance is participation. Huwag palaging absent.",
    "I expect a passing grade from everyone by finals. Clear?",
    "Focus. Kaya ninyo 'yan. Trust the process.",
  ]},
  library:   { id:"librarian",  name:"Librarian Maria", color:"#534AB7", romanceable:true, lines:[
    "Shhhh. Please keep the noise down.",
    "Reference books are on the third floor. Good luck.",
    "The study carrels in the back are free right now.",
    "Return borrowed books before finals week. Walang paltas.",
  ], romanceLines:{
    flustered:"Ah... naku, huwag kang maingay. Baka... may makarinig sa atin.",
    friendly:"Palagi ka nang nandito ah. Magandang ugali 'yan sa isang estudyante.",
    date:"Tapos na ang shift ko ng 5. Kung gusto mo... tara sa cafe sa labas ng campus.",
    gift:"Isang libro... para sa'kin? Basahin ko 'to mamaya. Salamat.",
  }},
  chapel:    { id:"chaplain",   name:"Fr. Santos",  color:"#639922", romanceable:false, lines:[
    "Rest here as long as you need. The Lord restores.",
    "Come back whenever the world feels too heavy, anak.",
    "Breathe. You are enough. The exams do not define you.",
    "Sit down. Light a candle. Let go of the stress for a while.",
  ]},
  plaza:     { id:"classmate_mac", name:"Mac",       color:"#9FE1CB", romanceable:true, lines:[
    "Bro! Wala kang load? Let's hang — masaya 'to!",
    "I heard Prof. Reyes is giving extra credit next week. Legit.",
    "Stress ka? Tara, libre kita ng taho sa labas.",
    "Finals na pala next week... baka mag-aral na rin ako lol.",
  ], romanceLines:{
    flustered:"Uy... bakit ka ganyan? Nauutal tuloy ako, pre!",
    friendly:"Seryoso, ang saya kasama ka. Hindi lang dahil sa taho, promise.",
    date:"Game! Samahan mo ko manood ng sine sa SM. Kagagaling lang ng bagong Marvel movie!",
    gift:"Bro... hindi ako sanay sa mga ganito. Pero... salamat. Like, for real.",
  }},
  watsons:   { id:"ate_liza",   name:"Ate Liza",    color:"#E24B4A", romanceable:false, lines:[
    "Ano ang kailangan mo? May bago kaming stocks ng vitamins!",
    "Uy, mukha kang pagod. Gusto mo ng pang-palakas?",
    "Importante ang self-care, anak. Bili ka na ng gamit!",
    "May sale ngayon sa mga health supplements! Sulit na sulit!",
  ]},
  f1_paddock:{ id:"f1_champ",  name:"F1 Driver Carlo",  color:"#EF9F27", romanceable:false, lines:[
    "Ang bilis ng McLaren ngayon, pre! Kaya mo ba yan?",
    "Race day! Sino sa tingin mo mananalo sa susunod na GP?",
    "Pit stop strategy is everything. Parang college lang — timing is key.",
    "Dati akong mekaniko, ngayon professional F1 driver na!",
  ]},
  dormitory: { id:"roommate",   name:"Roommate Juan", color:"#888", romanceable:false, lines:[
    "Maingay ang katabi mo. Earplugs nalang bro.",
    "Rest muna. Hindi ka makaka-study pag walang tulog.",
    "May extra pillowcase sa locker ko kung kailangan mo.",
    "Study group tayo bukas kung ayaw mo solo?",
  ]},
};

export const ROMANCE_STAGES = ["stranger","friendly","flustered","crush","dating","love"];
export const ROMANCE_THRESHOLDS = { friendly:15, flustered:30, crush:50, dating:70, love:90 };

export const CANTEEN_ITEMS = [
  { id:"siomai", name:"Siomai Rice",      price:80,  icon:"🍱", effect:{ stamina:+25 }, desc:"+25 Stamina" },
  { id:"juice",  name:"Calamansi Juice",  price:45,  icon:"🍹", effect:{ stamina:+10, focus:+5 }, desc:"+10 Stamina, +5 Focus" },
  { id:"turon",  name:"Turon Pack",       price:30,  icon:"🍌", effect:{ focus:+8 }, desc:"+8 Focus" },
  { id:"goto",   name:"Goto Bowl",        price:65,  icon:"🍲", effect:{ stamina:+35, stress:-10 }, desc:"+35 Stamina, -10 Stress" },
  { id:"coffee", name:"3-in-1 Coffee",    price:20,  icon:"☕", effect:{ focus:+20, stamina:-5 }, desc:"+20 Focus, -5 Stamina" },
  { id:"energy", name:"Energy Drink",     price:55,  icon:"⚡", effect:{ focus:+30, stamina:-10, stress:+15 }, desc:"+30 Focus, +15 Stress" },
  // romance gifts
  { id:"flower", name:"Sunflower Bouquet",price:180, icon:"🌻", effect:{ romanceBoost:15 }, desc:"+15 Affection gift" },
  { id:"choco",  name:"Chocolate Box",    price:120, icon:"🍫", effect:{ romanceBoost:10 }, desc:"+10 Affection gift" },
  { id:"letter", name:"Love Letter Set",  price:90,  icon:"💌", effect:{ romanceBoost:8 }, desc:"+8 Affection gift" },
];
export const BOOKSTORE_ITEMS = [
  { id:"notebook",   name:"Extra Notebook",   price:120, icon:"📓", effect:{ grade:+5 },  desc:"+5 Grade" },
  { id:"reviewer",   name:"Exam Reviewer",    price:250, icon:"📘", effect:{ grade:+12 }, desc:"+12 Grade" },
  { id:"smelling",   name:"Smelling Salts",   price:150, icon:"💊", effect:{ stamina:+50, focus:+10 }, desc:"+50 Stamina +10 Focus" },
  { id:"bluebook",   name:"Official Bluebook",price:100, icon:"📋", effect:{ stress:-25 }, desc:"-25 Stress" },
  { id:"highlighter",name:"Highlighter Set",  price:85,  icon:"🖊️", effect:{ focus:+15, grade:+3 }, desc:"+15 Focus +3 Grade" },
  // romance gifts
  { id:"poetry",     name:"Poetry Collection",price:150, icon:"📖", effect:{ romanceBoost:12 }, desc:"+12 Affection gift" },
  { id:"journal",    name:"Leather Journal",  price:200, icon:"📔", effect:{ romanceBoost:18 }, desc:"+18 Affection gift" },
];

export const WATSONS_ITEMS = [
  { id:"vitamins",  name:"Multivitamins",    price:150, icon:"💊", effect:{ stamina:+30, focus:+10 }, desc:"+30 Stamina +10 Focus" },
  { id:"facemask",  name:"Face Mask Set",    price:80,  icon:"🎭", effect:{ stress:-20 }, desc:"-20 Stress (pamper time)" },
  { id:"sunscreen", name:"Sunscreen SPF50",  price:120, icon:"🧴", effect:{ stamina:+15 }, desc:"+15 Stamina (gotta protect)" },
  { id:"inhaler",   name:"Vicks Inhaler",    price:45,  icon:"💨", effect:{ focus:+15 }, desc:"+15 Focus (singkit laban)" },
  { id:"gatorade",  name:"Gatorade Blue",    price:65,  icon:"🥤", effect:{ stamina:+25, focus:+5 }, desc:"+25 Stamina +5 Focus" },
  { id:"tissue",    name:"Pocket Tissue",    price:25,  icon:"🧻", effect:{ stress:-5 }, desc:"-5 Stress (konting pahid)" },
  { id:"povidone",  name:"Povidone Iodine",  price:55,  icon:"🩹", effect:{ stamina:+10 }, desc:"+10 Stamina (first aid)" },
  { id:"biotin",    name:"Biotin Vitamins",  price:200, icon:"💇", effect:{ social:+10, stress:-10 }, desc:"+10 Social -10 Stress (ganda effect)" },
];

export const ACTIONS = {
  attend_class:    { label:"Attend Class",    icon:"🏫", slots:["MORNING","AFTERNOON"],
    cost:{ stamina:-15, focus:-10, stress:+8 }, reward:{ grade:+8 },
    desc:"Real lessons with your professor!", isStudy:"attend_class" },
  study:           { label:"Study Alone",     icon:"📖", slots:["AFTERNOON","EVENING","NIGHT"],
    cost:{ stamina:-20, focus:-25, stress:+12 }, reward:{ grade:+15 },
    desc:"Review real concepts from your major.", isStudy:"study" },
  study_group:     { label:"Study Group",     icon:"👥", slots:["AFTERNOON","EVENING"],
    cost:{ stamina:-10, focus:-15, stress:+5 }, reward:{ grade:+10, social:+10 },
    desc:"Learn with classmates. Balanced." },
  part_time:       { label:"Work Part-Time",  icon:"💼", slots:["AFTERNOON","EVENING"],
    cost:{ stamina:-30, focus:-10, stress:+15 }, reward:{ php:+200 },
    desc:"Earn ₱200. Very tiring.", requiresFlag:"partTimeUnlocked" },
  rest:            { label:"Rest & Sleep",    icon:"😴", slots:["NIGHT","MORNING"],
    cost:{}, reward:{ stamina:+40, focus:+20, stress:-20 },
    desc:"Recover fully. No grade gains." },
  socialize:       { label:"Hang Out",        icon:"🎉", slots:["AFTERNOON","EVENING","NIGHT"],
    cost:{ stamina:-10, stress:-15 }, reward:{ social:+20 },
    desc:"Blow off steam. Social up." },
  canteen:         { label:"Go to Canteen",   icon:"🍱", slots:["MORNING","AFTERNOON","EVENING"],
    cost:{}, reward:{}, desc:"Buy food from Ate Nena.", isShop:"canteen" },
  bookstore:       { label:"Bookstore",       icon:"📚", slots:["MORNING","AFTERNOON"],
    cost:{}, reward:{}, desc:"Buy supplies and items.", isShop:"bookstore" },
  pray:            { label:"Chapel Rest",     icon:"⛪", slots:["MORNING","AFTERNOON","EVENING"],
    cost:{}, reward:{ stamina:+20, stress:-30, focus:+10 },
    desc:"Free restore. Peace of mind." },
  part_time_apply: { label:"Apply: Part-Time",icon:"📝", slots:["MORNING","AFTERNOON"],
    cost:{ stamina:-5 }, reward:{}, desc:"Ask Ate Nena about a job.",
    oneShot:true, flagSet:"partTimeUnlocked" },
  // New minigame actions
  play_basketball:{ label:"Play Basketball",  icon:"🏀", slots:["AFTERNOON","EVENING"],
    cost:{ stamina:-20, stress:-15 }, reward:{ social:+10 },
    desc:"Shoot hoops at the court!", isMinigame:"basketball" },
  fps_range:      { label:"FPS Shooting Range",icon:"🎯", slots:["AFTERNOON","EVENING"],
    cost:{ stamina:-15, stress:-10, focus:+5 }, reward:{},
    desc:"Test your aim at the range!", isMinigame:"fps" },
  play_chess:     { label:"Play Chess",      icon:"♟️", slots:["MORNING","AFTERNOON","EVENING"],
    cost:{ stamina:-5, focus:-15 }, reward:{ grade:+3, social:+5 },
    desc:"Challenge someone to chess.", isMinigame:"chess" },
  sports_day:     { label:"Sports Day Event", icon:"🏃", slots:["MORNING"],
    cost:{ stamina:-35, stress:-20 }, reward:{ social:+15 },
    desc:"Join campus athletics!", isMinigame:"sportsDay" },
  // Watsons shop
  watsons:         { label:"Watsons Store",    icon:"🏪", slots:["MORNING","AFTERNOON","EVENING"],
    cost:{}, reward:{}, desc:"Buy health & beauty essentials.", isShop:"watsons" },
  // Netflix
  netflix:         { label:"Watch Netflix",    icon:"📺", slots:["EVENING","NIGHT"],
    cost:{ stamina:-10 }, reward:{ stress:-25 },
    desc:"Binge-watch shows (need subscription).", isNetflix:true },
  netflix_sub:     { label:"Subscribe Netflix",icon:"💳", slots:["MORNING","AFTERNOON","EVENING","NIGHT"],
    cost:{ php:-200 }, reward:{}, desc:"Subscribe for ₱200/week. Unlock Netflix!",
    oneShot:true, flagSet:"netflixSub" },
  // Travel
  travel_baguio:   { label:"Go to Baguio",    icon:"⛰️", slots:["MORNING"],
    cost:{ php:-350, stamina:-20 }, reward:{ stress:-40, social:+15 },
    desc:"Weekend trip to Baguio. ₱350.", isTravel:true },
  travel_beach:    { label:"Go to Beach",     icon:"🏖️", slots:["MORNING"],
    cost:{ php:-400, stamina:-25 }, reward:{ stress:-50, social:+20 },
    desc:"Beach day in Batangas. ₱400.", isTravel:true },
  // F1 Racing
  f1_race:         { label:"F1 Grand Prix",   icon:"🏎️", slots:["AFTERNOON","EVENING"],
    cost:{ stamina:-25, stress:-10 }, reward:{ social:+15 },
    desc:"Race in the campus F1 challenge!", isMinigame:"f1" },
  // Romance actions
  flirt:          { label:"Flirt 💕",         icon:"💕", slots:["MORNING","AFTERNOON","EVENING"],
    cost:{ stamina:-5, focus:-5 }, reward:{ social:+3 },
    desc:"Make a move on someone.", isRomance:"flirt" },
  ask_on_date:    { label:"Ask on a Date 💝", icon:"💝", slots:["EVENING","NIGHT"],
    cost:{ stamina:-15, php:-100 }, reward:{ social:+10 },
    desc:"Take your crush out.", isRomance:"date", requiresRomanceStage:"crush" },
};

export const RANDOM_EVENTS = [
  { id:"surprise_quiz", trigger:(s)=>s.day>3 && s.grade<60,
    title:"SURPRISE QUIZ!", icon:"📝", iconColor:"#E24B4A",
    text:"Prof. Reyes slaps a quiz on the board. 'I hope you reviewed last night!'",
    npc:"prof_reyes",
    choices:[
      { label:"FIGHT — Answer confidently", effect:{ grade:+10, stress:+20 } },
      { label:"CHEAT — Copy from Mac",      effect:{ grade:+8, social:-15 } },
      { label:"SKIP — Leave it blank",       effect:{} },
    ]},
  { id:"canteen_promo", trigger:()=>Math.random()<0.25,
    title:"FREE EXTRA RICE!", icon:"🍱", iconColor:"#D85A30",
    text:"'Uy, libre extra rice ngayon!' Ate Nena waves you over with a big smile.",
    npc:"ate_nena",
    choices:[{ label:"EAT — Accept the free rice", effect:{ stamina:+15 } }]},
  { id:"friend_crisis", trigger:(s)=>s.social<30,
    title:"FRIEND CRISIS", icon:"📱", iconColor:"#9FE1CB",
    text:"Mac texts: 'Oi, bro... are we even friends anymore? Ikaw ha.'",
    npc:"classmate_mac",
    choices:[
      { label:"TALK — Hang out with Mac",    effect:{ social:+25, stamina:-15 } },
      { label:"TEXT — Apologize by message", effect:{ social:+10 } },
      { label:"GHOST — Ignore it",           effect:{ social:-15 } },
    ]},
  { id:"allowance_bonus", trigger:(s)=>s.day%7===0,
    title:"ALLOWANCE ARRIVED!", icon:"💸", iconColor:"#97C459",
    text:"Mama sent extra cash! 'Mag-ingat ka diyan ha. Kain nang maayos.'",
    npc:"roommate",
    choices:[{ label:"RECEIVE — Accept ₱300 bonus", effect:{ php:+300 } }]},
  { id:"all_nighter", trigger:(s)=>s.stress>70,
    title:"BREAKING POINT", icon:"😤", iconColor:"#EF9F27",
    text:"You've been staring at the same page for two hours. Pull an all-nighter?",
    npc:"roommate",
    choices:[
      { label:"PUSH — All-nighter (+grade -stamina)", effect:{ grade:+20, stamina:-40, stress:-10 } },
      { label:"SLEEP — Go to bed",                    effect:{ stress:-25, stamina:+30 } },
    ]},
  { id:"dorm_noise", trigger:(s)=>s.slot===3,
    title:"DORM PARTY", icon:"🔊", iconColor:"#534AB7",
    text:"The neighbors are throwing a full-on despedida. Bass is shaking the walls.",
    npc:"roommate",
    choices:[
      { label:"JOIN — Party with them", effect:{ social:+20, stamina:-20 } },
      { label:"COPE — Earplugs in",     effect:{ stamina:+15, stress:+5 } },
      { label:"SNITCH — Report them",   effect:{ social:-20, stress:-10 } },
    ]},
  // New romance events
  { id:"romance_confession", trigger:(s)=>Object.values(s.romance||{}).some(r=>r.affection>=50 && r.stage==="crush"),
    title:"CONFESSION TIME!", icon:"💕", iconColor:"#FF69B4",
    text:"The air feels different today. Your heart races as you see them across the campus...",
    npc:"classmate_mac",
    choices:[
      { label:"CONFESS — Tell them how you feel", effect:{ social:+20, focus:-10 } },
      { label:"BOTTLE UP — Keep it to yourself",  effect:{ stress:+15 } },
    ]},
  { id:"jealousy", trigger:(s)=>s.day%5===0 && Object.values(s.romance||{}).some(r=>r.affection>=30),
    title:"JEALOUSY DRAMA", icon:"😤", iconColor:"#E24B4A",
    text:"You see them talking to someone else... and your chest tightens.",
    npc:"classmate_mac",
    choices:[
      { label:"WALK OVER — Join the conversation", effect:{ social:+10, stress:-5 } },
      { label:"WATCH — Observe from afar",          effect:{ stress:+10, focus:-5 } },
      { label:"LEAVE — Ignore it",                  effect:{ social:-5, stress:-5 } },
    ]},
];

export const EXAM_EVENTS = [
  { id:"midterm", day:14, isFinal:false,
    title:"MIDTERM WEEK", icon:"📝", iconColor:"#185FA5",
    text:"Grades are being tallied. This is where the semester turns.", npc:"prof_reyes",
    choices:[{ label:"FACE IT — Sit the exam", effect:(s)=>s.grade>=70?{grade:+5,stress:-10}:{stress:+20} }]},
  { id:"finals",  day:27, isFinal:true,
    title:"FINAL EXAM WEEK", icon:"💀", iconColor:"#E24B4A",
    text:"This is it. Everything you did this semester comes down to this room, this desk, this paper.",
    npc:"prof_reyes",
    choices:[{ label:"SUBMIT — Hand in the exam", effect:{} }]},
];

export const MAP_LOCATIONS = [
  {id:"dormitory", label:"Dormitory",  icon:"🏠", x:12,  y:12,  color:"#534AB7"},
  {id:"classroom", label:"Classroom",  icon:"🏫", x:50,  y:12,  color:"#185FA5"},
  {id:"library",   label:"Library",    icon:"📚", x:82,  y:28,  color:"#3B6D11"},
  {id:"canteen",   label:"Canteen",    icon:"🍱", x:12,  y:60,  color:"#D85A30"},
  {id:"bookstore", label:"Bookstore",  icon:"🛒", x:50,  y:60,  color:"#BA7517"},
  {id:"chapel",    label:"Chapel",     icon:"⛪", x:82,  y:62,  color:"#639922"},
  {id:"plaza",     label:"Plaza",      icon:"🌳", x:38,  y:38,  color:"#3B6D11"},
  {id:"gym",       label:"Gymnasium",  icon:"🏀", x:12,  y:38,  color:"#E24B4A"},
  {id:"range",     label:"Shooting Range",icon:"🎯",x:50,  y:38,  color:"#BA7517"},
  {id:"watsons",   label:"Watsons",    icon:"🏪", x:70,  y:12,  color:"#E24B4A"},
  {id:"f1_paddock",label:"F1 Paddock", icon:"🏎️", x:65,  y:80,  color:"#EF9F27"},
];

export const LOCATION_ART = {
  dormitory: (
    <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="320" height="160" fill="#1a1a2e"/>
      <rect y="120" width="320" height="40" fill="#2d1b69"/>
      <rect width="320" height="120" fill="#16213e"/>
      <rect x="220" y="15" width="70" height="55" fill="#0f3460" rx="2"/>
      <rect x="220" y="15" width="70" height="55" fill="none" stroke="#534AB7" strokeWidth="3" rx="2"/>
      <line x1="255" y1="15" x2="255" y2="70" stroke="#534AB7" strokeWidth="2"/>
      <line x1="220" y1="43" x2="290" y2="43" stroke="#534AB7" strokeWidth="2"/>
      {[[228,22],[241,30],[270,18],[280,35],[262,28]].map(([x,y],i)=><rect key={i} x={x} y={y} width="2" height="2" fill="#fff"/>)}
      <rect x="20" y="80" width="100" height="45" fill="#2a2a5a" rx="3"/>
      <rect x="20" y="80" width="100" height="20" fill="#3d3d7a" rx="3"/>
      <rect x="22" y="83" width="40" height="14" fill="#6a5acd" rx="2"/>
      <line x1="26" y1="88" x2="58" y2="88" stroke="#7b6bde" strokeWidth="1"/>
      <rect x="140" y="75" width="70" height="50" fill="#3a2a1a" rx="2"/>
      <rect x="140" y="70" width="70" height="8" fill="#4a3a2a" rx="1"/>
      <rect x="145" y="55" width="20" height="16" fill="#e24b4a" rx="1"/>
      <rect x="168" y="57" width="16" height="14" fill="#185FA5" rx="1"/>
      <rect x="195" y="65" width="4" height="22" fill="#888"/>
      <polygon points="188,65 207,65 200,52" fill="#EF9F27"/>
      <ellipse cx="197" cy="72" rx="18" ry="8" fill="#EF9F27" opacity="0.12"/>
      <rect x="25" y="128" width="28" height="22" fill="#2d5a27" rx="3"/>
      <rect x="31" y="122" width="16" height="8" fill="#2d5a27" rx="2"/>
    </svg>
  ),
  classroom: (
    <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="320" height="160" fill="#0d1b2a"/>
      <rect y="130" width="320" height="30" fill="#1a2a3a"/>
      <rect x="30" y="10" width="260" height="80" fill="#1a4a2a" rx="3"/>
      <rect x="30" y="10" width="260" height="80" fill="none" stroke="#3a6a4a" strokeWidth="3" rx="3"/>
      {[30,46,62].map((y,i)=><line key={i} x1="50" y1={y} x2={170+i*20} y2={y} stroke="#c8d8c8" strokeWidth="2" opacity="0.6"/>)}
      <text x="55" y="55" fill="#c8d8c8" fontSize="10" fontFamily="monospace" opacity="0.8">f(x) = ∑ anxiety²</text>
      <rect x="30" y="88" width="260" height="6" fill="#2a3a2a"/>
      <rect x="60" y="89" width="12" height="4" fill="#e8e8d0"/>
      <rect x="80" y="89" width="8" height="4" fill="#e8d8c0"/>
      <rect x="100" y="100" width="120" height="35" fill="#3a2a1a" rx="2"/>
      <rect x="100" y="96" width="120" height="8" fill="#4a3a2a" rx="1"/>
      {[[15,110],[290,110],[15,138],[290,138]].map(([x,y],i)=>(
        <g key={i}>
          <rect x={x} y={y} width="30" height="20" fill="#2a3a4a" rx="1"/>
          <rect x={x+2} y={y+2} width="16" height="12" fill="#1a5a8a" rx="1"/>
        </g>
      ))}
      <rect x="230" y="100" width="70" height="55" fill="#0f3460" rx="2"/>
      <line x1="230" y1="130" x2="300" y2="130" stroke="#1a4a6a" strokeWidth="1"/>
      <line x1="265" y1="100" x2="265" y2="155" stroke="#1a4a6a" strokeWidth="1"/>
    </svg>
  ),
  library: (
    <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="320" height="160" fill="#1a1208"/>
      <rect y="130" width="320" height="30" fill="#2a1e0a"/>
      {[0,1,2].map(shelf=>(
        <g key={shelf}>
          <rect x={shelf*110} y="0" width="100" height="125" fill="#3a2a10" rx="2"/>
          {[35,70,105].map(sy=><rect key={sy} x={shelf*110} y={sy} width="100" height="5" fill="#2a1a08"/>)}
          {[0,35,70].map((sy,ri)=>(
            ["#E24B4A","#185FA5","#3B6D11","#BA7517","#534AB7","#D85A30","#639922"].slice(0,6).map((c,bi)=>(
              <rect key={`${ri}-${bi}`} x={shelf*110+bi*16+2} y={sy+6} width="13" height={26+bi%3*3} fill={c} rx="1"/>
            ))
          ))}
        </g>
      ))}
      <rect x="60" y="118" width="200" height="20" fill="#5a3a10" rx="2"/>
      <rect x="60" y="114" width="200" height="7" fill="#6a4a18" rx="1"/>
      <rect x="148" y="100" width="4" height="18" fill="#888"/>
      <ellipse cx="150" cy="100" rx="18" ry="6" fill="#EF9F27" opacity="0.6"/>
      <ellipse cx="150" cy="110" rx="20" ry="5" fill="#EF9F27" opacity="0.1"/>
      <rect x="80" y="110" width="28" height="20" fill="#e8e0c8" rx="1"/>
      <line x1="83" y1="114" x2="105" y2="114" stroke="#aaa" strokeWidth="1"/>
      <line x1="83" y1="118" x2="105" y2="118" stroke="#aaa" strokeWidth="1"/>
      <line x1="83" y1="122" x2="98" y2="122" stroke="#aaa" strokeWidth="1"/>
    </svg>
  ),
  canteen: (
    <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="320" height="160" fill="#2a1a08"/>
      <rect y="130" width="320" height="30" fill="#1a1208"/>
      <rect x="0" y="55" width="320" height="80" fill="#5a3a10"/>
      <rect x="0" y="50" width="320" height="10" fill="#7a5a20"/>
      <rect x="10" y="58" width="55" height="40" fill="#3a2a08" rx="2"/>
      <rect x="12" y="60" width="51" height="36" fill="#1a3a18" rx="1"/>
      {[18,28,38,48].map((x,i)=><ellipse key={i} cx={x} cy="78" rx="5" ry="4" fill="#c8a870"/>)}
      <rect x="75" y="58" width="55" height="40" fill="#3a2a08" rx="2"/>
      <rect x="77" y="60" width="51" height="36" fill="#e8e8d8" rx="1"/>
      {[140,158,176,194,212].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="62" width="14" height="30" fill={["#e8a020","#a8d820","#e82020","#20a8d8","#d820a8"][i]} rx="3"/>
          <rect x={x} y="60" width="14" height="5" fill="#888" rx="1"/>
        </g>
      ))}
      <rect x="230" y="5" width="85" height="50" fill="#1a3a18" rx="2"/>
      <text x="235" y="18" fill="#97C459" fontSize="6" fontFamily="monospace">MENU</text>
      <text x="235" y="28" fill="#e8e8c8" fontSize="5" fontFamily="monospace">Siomai  ₱80</text>
      <text x="235" y="36" fill="#e8e8c8" fontSize="5" fontFamily="monospace">Goto    ₱65</text>
      <text x="235" y="44" fill="#e8e8c8" fontSize="5" fontFamily="monospace">Coffee  ₱20</text>
      <path d="M 55 50 Q 58 42 55 36" stroke="#e8e8e8" strokeWidth="1.5" fill="none" opacity="0.4"/>
      <path d="M 62 50 Q 65 40 62 33" stroke="#e8e8e8" strokeWidth="1.5" fill="none" opacity="0.3"/>
      {[20,170].map(x=>(
        <g key={x}>
          <rect x={x} y="135" width="60" height="15" fill="#3a2a10" rx="2"/>
          <rect x={x+5} y="132" width="50" height="6" fill="#4a3a18" rx="1"/>
        </g>
      ))}
    </svg>
  ),
  bookstore: (
    <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="320" height="160" fill="#1a0a1a"/>
      <rect y="130" width="320" height="30" fill="#2a1a2a"/>
      {[0,1].map(row=>(
        <g key={row}>
          <rect x={row*165} y="10" width="150" height="90" fill="#2a1a0a" rx="2"/>
          {[38,68,98].map(sy=><rect key={sy} x={row*165} y={sy} width="150" height="4" fill="#3a2a10"/>)}
          {[0,38,68].map((sy,ri)=>(
            ["#E24B4A","#185FA5","#3B6D11","#BA7517","#534AB7","#D85A30","#888"].map((c,bi)=>(
              <rect key={`${ri}-${bi}`} x={row*165+bi*21+3} y={sy+5} width="18" height={30+bi%4*2} fill={c} rx="1"/>
            ))
          ))}
        </g>
      ))}
      <rect x="80" y="110" width="160" height="30" fill="#4a2a00" rx="2"/>
      <rect x="80" y="106" width="160" height="8" fill="#6a4a10" rx="1"/>
      <rect x="200" y="88" width="35" height="22" fill="#222" rx="2"/>
      <rect x="203" y="91" width="29" height="14" fill="#185FA5" rx="1"/>
      <rect x="88" y="99" width="18" height="10" fill="#e8e020" rx="1"/>
      <rect x="110" y="97" width="14" height="12" fill="#e82020" rx="1"/>
      <rect x="115" y="5" width="90" height="18" fill="#BA7517" rx="2"/>
      <text x="120" y="17" fill="#1a0a00" fontSize="7" fontFamily="monospace" fontWeight="bold">BOOKSTORE</text>
    </svg>
  ),
  chapel: (
    <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="320" height="160" fill="#0a0a18"/>
      <rect y="130" width="320" height="30" fill="#12122a"/>
      <rect x="120" y="5" width="80" height="90" fill="#0a0a40" rx="4"/>
      <rect x="120" y="5" width="80" height="90" fill="none" stroke="#4a4aaa" strokeWidth="3" rx="4"/>
      <path d="M 120,35 Q 160,5 200,35" fill="#0a0a40" stroke="#4a4aaa" strokeWidth="3"/>
      {[[130,40,20,40,"#1a4a8a"],[155,40,20,40,"#4a1a8a"],[130,40,20,18,"#8a1a1a"],[155,40,20,18,"#1a8a4a"],[140,22,18,18,"#8a6a1a"]].map(([x,y,w,h,c],i)=>(
        <rect key={i} x={x} y={y} width={w} height={h} fill={c} opacity="0.8"/>
      ))}
      <line x1="160" y1="10" x2="160" y2="90" stroke="#EF9F27" strokeWidth="2" opacity="0.7"/>
      <line x1="138" y1="35" x2="182" y2="35" stroke="#EF9F27" strokeWidth="2" opacity="0.7"/>
      {[40,260].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="105" width="8" height="28" fill="#e8e0c0" rx="1"/>
          <ellipse cx={x+4} cy="105" rx="4" ry="3" fill="#EF9F27" opacity="0.9"/>
          <ellipse cx={x+4} cy="108" rx="10" ry="5" fill="#EF9F27" opacity="0.15"/>
        </g>
      ))}
      {[30,90,180,240].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="128" width="55" height="20" fill="#2a1a08" rx="2"/>
          <rect x={x} y="124" width="55" height="7" fill="#3a2a10" rx="1"/>
        </g>
      ))}
      <ellipse cx="160" cy="100" rx="60" ry="20" fill="#4a4aaa" opacity="0.08"/>
    </svg>
  ),
  plaza: (
    <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="320" height="160" fill="#0a1a0a"/>
      <rect width="320" height="90" fill="#0d2a1a"/>
      <rect y="110" width="320" height="50" fill="#1a2a0a"/>
      {[[-20,0],[20,0],[60,0],[100,0],[140,0],[180,0],[220,0],[260,0],[300,0]].map(([x],i)=>(
        <rect key={i} x={x+10} y="110" width="30" height="15" fill="#2a3a1a" rx="1"/>
      ))}
      {[30,280].map((x,i)=>(
        <g key={i}>
          <rect x={x+8} y="75" width="8" height="38" fill="#3a2a10"/>
          <ellipse cx={x+12} cy="65" rx="22" ry="25" fill="#1a4a18"/>
          <ellipse cx={x+4} cy="72" rx="14" ry="18" fill="#1a5a20"/>
          <ellipse cx={x+20} cy="70" rx="16" ry="20" fill="#1a4a18"/>
        </g>
      ))}
      <ellipse cx="160" cy="112" rx="38" ry="10" fill="#0a2a4a"/>
      <ellipse cx="160" cy="110" rx="35" ry="8" fill="#0a3a5a"/>
      <rect x="155" y="85" width="10" height="28" fill="#2a3a5a" rx="2"/>
      <ellipse cx="160" cy="85" rx="15" ry="5" fill="#0a4a6a"/>
      {[[148,108],[162,106],[172,110],[155,113],[168,108]].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width="2" height="2" fill="#7ad4f8" opacity="0.8"/>
      ))}
      <rect x="50" y="118" width="50" height="10" fill="#5a3a10" rx="2"/>
      <rect x="50" y="115" width="50" height="5" fill="#6a4a18" rx="1"/>
      <ellipse cx="270" cy="25" rx="12" ry="12" fill="#EF9F27" opacity="0.9"/>
      {[[50,15],[80,8],[100,20],[240,12],[300,18]].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width="2" height="2" fill="white" opacity="0.8"/>
      ))}
    </svg>
  ),
  gym: (
    <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="320" height="160" fill="#1a1a2e"/>
      <rect y="130" width="320" height="30" fill="#e8a020"/>
      <rect width="320" height="130" fill="#16213e"/>
      <rect x="30" y="5" width="260" height="100" fill="none" stroke="#e8a020" strokeWidth="2"/>
      <circle cx="160" cy="55" r="30" fill="none" stroke="white" strokeWidth="2"/>
      <line x1="160" y1="25" x2="160" y2="85" stroke="white" strokeWidth="1"/>
      <line x1="130" y1="55" x2="190" y2="55" stroke="white" strokeWidth="1"/>
      <rect x="30" y="105" width="260" height="6" fill="#e8a020"/>
      {[50,120,190].map(x=>(
        <g key={x}>
          <rect x={x} y="112" width="40" height="20" fill="#E24B4A" rx="3"/>
          <rect x={x+2} y="114" width="36" height="10" fill="#a32d2d" rx="2"/>
        </g>
      ))}
      {[80,110].map(x=>(
        <rect key={x} x={x} y="65" width="4" height="50" fill="#888" rx="1"/>
      ))}
      <rect x="75" y="60" width="14" height="10" fill="#555" rx="2"/>
      <rect x="231" y="60" width="14" height="10" fill="#555" rx="2"/>
    </svg>
  ),
  range: (
    <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="320" height="160" fill="#1a1a0a"/>
      <rect y="130" width="320" height="30" fill="#2a2a1a"/>
      <rect x="20" y="20" width="280" height="100" fill="#0a0a1a"/>
      {[50,80,110].map(y=>(
        <g key={y}>
          <rect x="250" y={y} width="30" height="40" fill="#e8e8d8" rx="2"/>
          <circle cx="265" cy={y+20} r="8" fill="#E24B4A"/>
          <circle cx="265" cy={y+20} r="5" fill="white"/>
          <circle cx="265" cy={y+20} r="2" fill="#E24B4A"/>
        </g>
      ))}
      <rect x="15" y="50" width="40" height="20" fill="#3a2a1a" rx="3"/>
      <rect x="15" y="40" width="40" height="15" fill="#4a3a2a" rx="2"/>
      {[[30,38,15],[40,38,15]].map(([x,y,w])=><rect key={`${x}${y}`} x={x} y={y} width={w} height={w} fill="#333" rx="2"/>)}
      <rect x="10" y="95" width="50" height="15" fill="#5a3a10" rx="2"/>
      <line x1="35" y1="95" x2="35" y2="110" stroke="#888" strokeWidth="2"/>
      <rect x="225" y="45" width="8" height="12" fill="#E24B4A" rx="1"/>
      <rect x="230" y="55" width="10" height="15" fill="#a32d2d" rx="1"/>
    </svg>
  ),
  watsons: (
    <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="320" height="160" fill="#1a0a0a"/>
      <rect y="130" width="320" height="30" fill="#2a1a1a"/>
      <rect x="20" y="20" width="280" height="95" fill="white" rx="4"/>
      <rect x="20" y="20" width="280" height="25" fill="#E24B4A" rx="4"/>
      <text x="40" y="38" fill="white" fontSize="12" fontFamily="monospace" fontWeight="bold">WATSONS</text>
      {[[50,55,"💊","Vitamins"],[120,55,"🧴","Skincare"],[190,55,"💇","Haircare"],[50,95,"🩹","First Aid"],[120,95,"💪","Supplements"],[190,95,"🧻","Essentials"]].map(([x,y,ic,txt],i)=>(
        <g key={i}>
          <rect x={x} y={y} width="60" height="30" fill="#1a2236" rx="3"/>
          <text x={x+5} y={y+12} fill="#e8e8e8" fontSize="8" fontFamily="monospace">{ic} {txt}</text>
        </g>
      ))}
      <rect x="110" y="110" width="100" height="20" fill="#E24B4A" rx="2"/>
      <text x="115" y="124" fill="white" fontSize="8" fontFamily="monospace">SALE! BUY 1 TAKE 1</text>
      {[10,310].map(x=><rect key={x} x={x} y="135" width="20" height="15" fill="#3a2a1a" rx="2"/>)}
    </svg>
  ),
  f1_paddock: (
    <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="320" height="160" fill="#0a0a1a"/>
      <rect y="140" width="320" height="20" fill="#1a1a2a"/>
      <rect x="20" y="10" width="280" height="55" fill="#2a2a3a" rx="3"/>
      <rect x="20" y="10" width="280" height="20" fill="#EF9F27" rx="3"/>
      <text x="100" y="24" fill="#1a1a00" fontSize="11" fontFamily="monospace" fontWeight="bold">F1 PADDOCK CLUB</text>
      <line x1="40" y1="35" x2="280" y2="35" stroke="#444" strokeWidth="1"/>
      {[[50,42,"🏎️","Ferrari SF-24"],[140,42,"🏎️","Red Bull RB20"],[220,42,"🏎️","Mercedes W15"]].map(([x,y,ic,txt],i)=>(
        <text key={i} x={x} y={y} fill="#e8e8e8" fontSize="7" fontFamily="monospace">{ic} {txt}</text>
      ))}
      <rect x="30" y="75" width="260" height="55" fill="#1a1a2e" rx="3"/>
      <text x="40" y="90" fill="#EF9F27" fontSize="10" fontFamily="monospace">TRACK MAP — SILVERSTONE</text>
      <path d="M 50,130 Q 80,95 120,100 Q 160,105 170,90 Q 180,75 200,80 Q 230,85 250,100 Q 270,115 270,130" fill="none" stroke="#888" strokeWidth="4"/>
      <circle cx="50" cy="130" r="6" fill="#E24B4A"/>
      <circle cx="270" cy="130" r="6" fill="#97C459"/>
      <rect x="270" y="140" width="30" height="12" fill="#333" rx="1"/>
      <rect x="20" y="140" width="30" height="12" fill="#333" rx="1"/>
    </svg>
  ),
  travel_baguio: (
    <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="320" height="160" fill="#0a1a2e"/>
      <rect y="120" width="320" height="40" fill="#1a3a1a"/>
      <rect y="100" width="320" height="25" fill="#2a5a2a"/>
      <rect y="90" width="320" height="15" fill="#3a7a3a"/>
      <polygon points="0,120 60,30 120,120" fill="#2a3a5a"/>
      <polygon points="80,120 160,20 240,120" fill="#1a2a4a"/>
      <polygon points="180,120 260,40 320,120" fill="#2a3a5a"/>
      <polygon points="40,120 100,50 160,120" fill="#3a4a6a" opacity="0.6"/>
      <polygon points="140,120 210,35 280,120" fill="#3a4a6a" opacity="0.5"/>
      <polygon points="150,28 160,20 170,28" fill="white" opacity="0.4"/>
      <polygon points="55,38 60,30 65,38" fill="white" opacity="0.3"/>
      <polygon points="245,48 260,40 275,48" fill="white" opacity="0.3"/>
      {[[30,105],[50,100],[90,110],[110,105],[200,108],[230,100],[270,105],[290,110]].map(([x,y],i)=>(
        <g key={i}>
          <rect x={x-2} y={y} width={4} height={12} fill="#2a1a08"/>
          <polygon points={`${x-8},${y} ${x},${y-16} ${x+8},${y}`} fill="#1a5a1a"/>
          <polygon points={`${x-6},${y-6} ${x},${y-20} ${x+6},${y-6}`} fill="#2a7a2a"/>
        </g>
      ))}
      <ellipse cx="80" cy="25" rx="25" ry="6" fill="white" opacity="0.1"/>
      <ellipse cx="240" cy="20" rx="20" ry="5" fill="white" opacity="0.08"/>
      <rect x="0" y="140" width="320" height="20" fill="#333"/>
      <rect x="0" y="148" width="320" height="4" fill="#FFD700" opacity="0.3"/>
      <rect x="20" y="100" width="50" height="18" fill="#185FA5" rx="2"/>
      <text x="25" y="113" fill="white" fontSize="8" fontFamily="monospace">BAGUIO</text>
      <text x="280" y="112" fill="#4a9a4a" fontSize="10">🌲</text>
      <text x="10" y="112" fill="#4a9a4a" fontSize="10">🌲</text>
    </svg>
  ),
  travel_beach: (
    <svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="320" height="160" fill="#0a1a2e"/>
      <rect width="320" height="80" fill="#0a2a4e"/>
      <rect width="320" height="60" fill="#1a4a7e" opacity="0.3"/>
      <circle cx="270" cy="30" r="20" fill="#FFD700" opacity="0.6"/>
      <circle cx="270" cy="30" r="16" fill="#FFD700" opacity="0.8"/>
      <circle cx="270" cy="30" r="12" fill="#FFD700"/>
      {[0,45,90,135,180,225,270,315].map((a,i)=>(
        <line key={i} x1={270+Math.cos(a*Math.PI/180)*14} y1={30+Math.sin(a*Math.PI/180)*14}
              x2={270+Math.cos(a*Math.PI/180)*22} y2={30+Math.sin(a*Math.PI/180)*22}
              stroke="#FFD700" strokeWidth="2" opacity="0.3"/>
      ))}
      <ellipse cx="60" cy="25" rx="22" ry="6" fill="white" opacity="0.15"/>
      <ellipse cx="180" cy="18" rx="18" ry="5" fill="white" opacity="0.1"/>
      <rect x="0" y="75" width="320" height="35" fill="#1a6a9a"/>
      <rect x="0" y="78" width="320" height="3" fill="#2a8aba" opacity="0.5"/>
      {[0,40,80,120,160,200,240,280].map((x,i)=>(
        <ellipse key={i} cx={x+20} cy={85+Math.sin(i)*3} rx="15" ry="2" fill="white" opacity="0.1"/>
      ))}
      <rect x="0" y="105" width="320" height="15" fill="#d4a040"/>
      <rect x="0" y="105" width="320" height="3" fill="#e8b850"/>
      {[10,35,60,90,115,145,170,200,225,255,280,310].map((x,i)=>(
        <circle key={i} cx={x} cy={110+Math.sin(i*2)*3} r="1" fill="#c09030" opacity="0.5"/>
      ))}
      <rect x="45" y="95" width="4" height="20" fill="#5a3010"/>
      <text x="28" y="96" fill="#2a7a2a" fontSize="16">🌴</text>
      <text x="250" y="98" fill="#2a7a2a" fontSize="14">🌴</text>
      <rect x="148" y="100" width="3" height="15" fill="#8a6030"/>
      <polygon points="130,100 150,82 170,100" fill="#E24B4A"/>
      <polygon points="135,100 150,88 165,100" fill="white" opacity="0.3"/>
      <rect x="140" y="112" width="18" height="4" fill="#63a4ff" rx="1"/>
      <text x="280" y="115" fontSize="8">⭐</text>
      <rect x="20" y="75" width="50" height="16" fill="#D85A30" rx="2"/>
      <text x="25" y="87" fill="white" fontSize="7" fontFamily="monospace">BEACH</text>
      <text x="100" y="40" fill="#888" fontSize="6">~</text>
      <text x="108" y="38" fill="#888" fontSize="6">~</text>
    </svg>
  ),
};

// Conversation system - dialogue trees for NPCs
export const NPC_CONVERSATIONS = {
  rosa_cortez: [
    {
      id: "first_meet",
      trigger: (romance) => romance?.stage === "stranger" && romance?.conversations?.includes?.("first_meet") === false,
      npc: "Rosa Cortez",
      location: "Canteen",
      text: "Rosa looks up from wiping the counter. 'Oh, bagong face. Gusto mo ng kain?'",
      choices: [
        {
          label: "Show interest in her",
          text: "You ask about her day and listen carefully.",
          effect: { affection: +8, stamina: -5 },
          response: "Hala... ay, nag-appreciate ka talaga. Salamat, anak. Rare yan.",
        },
        {
          label: "Ask about F1 racing",
          text: "You mention how cool she must be, being into F1.",
          effect: { affection: +6, stamina: -5 },
          response: "Ay! Nakita mo sa akin? Hehe, oo talaga ako passionate dito. Masaya ka, pre.",
        },
        {
          label: "Talk about dogs",
          text: "You ask if she has any dogs and seem genuinely curious.",
          effect: { affection: +7, stamina: -5 },
          response: "May three kaming aso sa bahay! Puro golden retrievers. Ganahan ka ba? Next walk, dala mo ko!",
        },
        {
          label: "Flirt awkwardly",
          text: "You try to flirt but it comes off as creepy.",
          effect: { affection: -3, stamina: -5 },
          response: "Ah... alam mo, napakabilis mo ah. Nakakawala ng prestige mo yan.",
        },
      ],
    },
    {
      id: "davao_talk",
      trigger: (romance) => romance?.stage === "friendly" && romance?.conversations?.includes?.("davao_talk") === false,
      npc: "Rosa Cortez",
      location: "Canteen",
      text: "Rosa sits down during her break. 'Alam mo, seryoso lang, kusog kaayo ka pag dating sa pag-intindi sa tao. Saan ka galing talaga?'",
      choices: [
        {
          label: "Ask about Davao life",
          text: "You ask what life in Davao is like for her.",
          effect: { affection: +10, stamina: -10, focus: -5 },
          response: "Ay sus, ay. Kanang-kana ka talaga. Ang Davao... peaceful lang pero bustling din. Miss ko sya sometimes.",
        },
        {
          label: "Share your struggles",
          text: "You open up about college stress and pressure.",
          effect: { affection: +9, stamina: -10, stress: -15 },
          response: "Naman, anak, alam ko ang feeling. Pero kaya mo yan. Tara, libre kita ng turon next time.",
        },
        {
          label: "Try to impress her",
          text: "You brag about your achievements.",
          effect: { affection: -2, stamina: -10 },
          response: "Hmm... ego lang yan makikita ko. Character ang importante, 'di ka lang achievements.",
        },
      ],
    },
    {
      id: "dogs_passion",
      trigger: (romance) => romance?.stage === "flustered" && romance?.conversations?.includes?.("dogs_passion") === false,
      npc: "Rosa Cortez",
      location: "Canteen",
      text: "Rosa's eyes light up. 'You know what? Gusto mo bang makita ng aking dogs? May dog park kami nearby...'",
      choices: [
        {
          label: "YES! Sounds amazing!",
          text: "You show genuine excitement.",
          effect: { affection: +12, stamina: -15, social: +5 },
          response: "Hala, seryoso ka ba? Okay! Human sa shift ko, tara na! This means a lot sa akin talaga.",
        },
        {
          label: "Maybe... if you're around",
          text: "You seem interested but hesitant.",
          effect: { affection: +4, stamina: -10 },
          response: "Ay, hindi ka sure? Okay, no pressure. Pero alam ko pwede ka pa mag-enjoy pag talagang gusto mo.",
        },
        {
          label: "Dogs aren't really my thing",
          text: "You downplay your interest.",
          effect: { affection: -5, stamina: -10 },
          response: "Oh... okay then. Pag nag-change ka lang ng isip, hanapin mo ako. Pero alam mo, Hindi ka nag-effort talaga.",
        },
      ],
    },
  ],
  librarian: [
    {
      id: "library_chat",
      trigger: (romance) => romance?.stage === "stranger" && romance?.conversations?.includes?.("library_chat") === false,
      npc: "Librarian Maria",
      location: "Library",
      text: "Maria whispers from behind the desk. 'Psst... You look like you're stressed. Need a quiet place to think?'",
      choices: [
        {
          label: "Ask for reading recommendations",
          text: "You show interest in what she enjoys.",
          effect: { affection: +8, stamina: -5, focus: +5 },
          response: "Oh, you want to know what I read? That's... really thoughtful of you.",
        },
        {
          label: "Compliment her eyes",
          text: "You try a direct compliment.",
          effect: { affection: +3, stamina: -5 },
          response: "Um... thanks. That's... forward. But I appreciate it.",
        },
        {
          label: "Make a loud joke",
          text: "You laugh loudly.",
          effect: { affection: -8, stamina: -5 },
          response: "SHHHHH! This is a library! Please, I have a reputation to maintain...",
        },
      ],
    },
  ],
};

export function clamp(v, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}

export function applyEffects(state, effects) {
  const next = { ...state };
  for (const [k, v] of Object.entries(effects)) {
    if (k === "php") next.php = Math.max(0, next.php + v);
    else if (k === "romanceBoost") {
      // handled separately
    } else next[k] = clamp((next[k] || 0) + v);
  }
  return next;
}

export function getDayName(day) {
  return DAYS[day % 7];
}

export function getGradeLetter(g) {
  if (g >= 90) return { l: "A+", c: "#3B6D11" };
  if (g >= 85) return { l: "A", c: "#3B6D11" };
  if (g >= 80) return { l: "B+", c: "#185FA5" };
  if (g >= 75) return { l: "B", c: "#185FA5" };
  if (g >= 70) return { l: "C", c: "#BA7517" };
  if (g >= 60) return { l: "D", c: "#D85A30" };
  return { l: "F", c: "#A32D2D" };
}

export function getRomanceStage(affection) {
  if (affection >= 90) return "love";
  if (affection >= 70) return "dating";
  if (affection >= 50) return "crush";
  if (affection >= 30) return "flustered";
  if (affection >= 15) return "friendly";
  return "stranger";
}

export const ROMANCE_STAGE_COLORS = {
  stranger: "#888",
  friendly: "#9FE1CB",
  flustered: "#FF69B4",
  crush: "#FF1493",
  dating: "#E24B4A",
  love: "#FF0040",
};
