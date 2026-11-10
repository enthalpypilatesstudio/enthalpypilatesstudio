// ENTHALPY Platform Initial Seed Data (ES Module)
export const classes = [
  {
    id: 'cls-1',
    slug: 'foundation-reformer',
    name: 'Foundation Reformer',
    level: 'Foundation · Beginners',
    duration: 50,
    shortDesc: 'Learn the machine, breathing mechanics, and the five essential classical reformer exercises.',
    fullDesc: 'Your starting point on the reformer. We break down carriage glide, spring tensions, footbar alignment, and neutral spine. Every movement is coached with precision in small groups capped at 12 reformers.',
    springSetting: '1 Blue, 1 Red (moderate tension)',
    focus: 'Breathing, Pelvic Stability, Footwork & Carriage Control',
    whoItIsFor: 'Complete beginners or members returning after injury or a break.',
    reformerBrand: 'Balanced Body Allegro 2'
  },
  {
    id: 'cls-2',
    slug: 'reformer-flow',
    name: 'Reformer Flow',
    level: 'All Levels',
    duration: 50,
    shortDesc: 'A seamless, full-body sequence connecting classical principles with dynamic tempo.',
    fullDesc: 'Continuous flow connecting short box, long box, elephant, and kneeling arm series. Seamless transitions that challenge endurance, coordination, and postural alignment.',
    springSetting: '2 Red, 1 Blue',
    focus: 'Core Integration, Spinal Articulation, Continuous Movement',
    whoItIsFor: 'Members with 5+ foundation sessions looking for fluid, rhythmic strength.'
  },
  {
    id: 'cls-3',
    slug: 'dynamic-reformer',
    name: 'Dynamic Reformer',
    level: 'Intermediate',
    duration: 55,
    shortDesc: 'Heavier springs, longer isometric holds, standing series, and higher muscular load.',
    fullDesc: 'Athletic, high-energy reformer training. Integrates split lunges, side splits, jumpboard cardio bursts, and deep core contractions to elevate heart rate while preserving technical form.',
    springSetting: 'Variable spring progressions',
    focus: 'Muscular Endurance, Glute Activation, Power & Stability',
    whoItIsFor: 'Experienced practitioners wanting an athletic, sweat-inducing workout.'
  },
  {
    id: 'cls-4',
    slug: 'advanced-reformer',
    name: 'Advanced Reformer',
    level: 'Advanced',
    duration: 55,
    shortDesc: 'Complex classical sequences: Tendon Stretch, Snake, Teaser on the box, and Control Balance.',
    fullDesc: 'Demanding work requiring full shoulder girdle stability, high core strength, and acute body awareness. Strict prerequisites apply to ensure joint safety.',
    springSetting: 'Minimal spring support (high core control)',
    focus: 'Balance, Precision, High-Leverage Suspension',
    whoItIsFor: 'Pilates practitioners with 6+ months regular practice or instructor approval.'
  },
  {
    id: 'cls-5',
    slug: 'private-session',
    name: 'Private Studio Session',
    level: 'Personalized 1:1',
    duration: 60,
    shortDesc: 'Custom one-on-one session built around specific injuries, goals, or athletic tuning.',
    fullDesc: 'Dedicated room with Cadillac, Wunda Chair, Spine Corrector, and Reformer. Full postural assessment, tailored programming, and hands-on tactile feedback.',
    springSetting: 'Customized',
    focus: 'Rehabilitation, Athletic Conditioning, Prenatal/Postnatal Care',
    whoItIsFor: 'Clients wanting bespoke attention or targeted injury recovery.'
  }
];

export const instructors = [
  {
    id: 'ins-1',
    slug: 'ananya-roy',
    name: 'Ananya Roy',
    role: 'Head Instructor & Founder',
    certifications: 'Comprehensive Pilates Master (PMA), Biomechanics Specialist',
    bio: 'Former contemporary dancer trained in London and Melbourne. Ananya founded ENTHALPY to bring editorial calm, architectural precision, and scientific rigor to movement.',
    specialisms: ['Classical Repertoire', 'Spinal Rehabilitation', 'Prenatal/Postnatal'],
    quote: 'Movement is the science of energy and transformation.'
  },
  {
    id: 'ins-2',
    slug: 'devika-menon',
    name: 'Devika Menon',
    role: 'Senior Instructor',
    certifications: 'BASI Comprehensive, Kinesiology B.Sc.',
    bio: 'Devika brings rhythmic flow, anatomy-first cues, and deep tactile adjustments. Her classes are known for intelligent progressions and mindful breath control.',
    specialisms: ['Reformer Flow', 'Hip & Shoulder Mobility', 'Breath Dynamics']
  },
  {
    id: 'ins-3',
    slug: 'kabir-oberoi',
    name: 'Kabir Oberoi',
    role: 'Movement & Performance Coach',
    certifications: 'STOTT Pilates Lead, CSCS Strength Coach',
    bio: 'Specializing in athletic conditioning and injury prevention for athletes, runners, and desk-bound professionals seeking core power and rotational strength.',
    specialisms: ['Dynamic Reformer', 'Athletic Conditioning', 'Lower Back Care']
  }
];

export const products = [
  {
    id: 'prod-intro',
    name: 'First-Timer Intro Offer',
    type: 'intro',
    price: 1500,
    credits: 1,
    validityDays: 14,
    badge: 'New Members Only',
    desc: 'Your first 50-minute reformer class with machine setup and coach consultation.'
  },
  {
    id: 'prod-single',
    name: 'Single Class Drop-in',
    type: 'dropin',
    price: 2200,
    credits: 1,
    validityDays: 30,
    desc: 'Flexible single session valid for any group class on the timetable.'
  },
  {
    id: 'prod-pack5',
    name: '5-Class Pack',
    type: 'pack',
    price: 9500,
    credits: 5,
    validityDays: 60,
    pricePerClass: 1900,
    desc: 'Save ₹1,500. Perfect for training 1 to 2 times per week.'
  },
  {
    id: 'prod-pack10',
    name: '10-Class Pack',
    type: 'pack',
    price: 17000,
    credits: 10,
    validityDays: 90,
    pricePerClass: 1700,
    popular: true,
    desc: 'Our most popular pack. Sharable with partner. Save ₹5,000.'
  },
  {
    id: 'prod-mem-core8',
    name: 'Core 8 Membership',
    type: 'membership',
    price: 13600,
    credits: 8,
    interval: 'monthly',
    pricePerClass: 1700,
    desc: '8 classes per month (2/week). Priority booking window & 2 freeze weeks/year.'
  },
  {
    id: 'prod-mem-unlimited',
    name: 'Unlimited Practice',
    type: 'membership',
    price: 22000,
    credits: 999,
    interval: 'monthly',
    desc: 'Unlimited classes. 14-day advance booking window, guest passes & merchandise discount.'
  }
];

export const studioSettings = {
  studioName: 'ENTHALPY Reformer Pilates & Movement',
  location: '12th Main Road, 4th Block, Koramangala, Bengaluru, Karnataka 560034',
  phone: '+91 80 4920 1800',
  whatsapp: '+91 98450 12345',
  email: 'hello@enthalpy.studio',
  gstin: '29AABCE1234F1Z5',
  capacityPerSession: 12,
  seatHoldTtlMinutes: 10,
  freeCancellationHours: 12,
  checkInOpensBeforeMinutes: 30
};

export function generateSessions() {
  const dates = [];
  const today = new Date();

  for (let d = 0; d < 7; d++) {
    const cur = new Date(today);
    cur.setDate(today.getDate() + d);
    const dateStr = cur.toISOString().split('T')[0];
    const dayName = cur.toLocaleDateString('en-US', { weekday: 'short' });
    const formattedDate = cur.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    dates.push({ dateStr, dayName, formattedDate, isToday: d === 0 });
  }

  const timeslots = [
    { time: '07:00 AM', clsId: 'cls-1', insId: 'ins-1', bookedCount: 11 },
    { time: '08:15 AM', clsId: 'cls-2', insId: 'ins-2', bookedCount: 9 },
    { time: '09:30 AM', clsId: 'cls-3', insId: 'ins-3', bookedCount: 12, waitlistCount: 3 },
    { time: '11:00 AM', clsId: 'cls-4', insId: 'ins-1', bookedCount: 7 },
    { time: '05:00 PM', clsId: 'cls-1', insId: 'ins-2', bookedCount: 10 },
    { time: '06:15 PM', clsId: 'cls-2', insId: 'ins-3', bookedCount: 12, waitlistCount: 2 },
    { time: '07:30 PM', clsId: 'cls-3', insId: 'ins-1', bookedCount: 8 }
  ];

  const sessions = [];
  let idCounter = 100;

  dates.forEach(d => {
    timeslots.forEach(ts => {
      idCounter++;
      const cls = classes.find(c => c.id === ts.clsId);
      const ins = instructors.find(i => i.id === ts.insId);
      const booked = ts.bookedCount;
      const capacity = studioSettings.capacityPerSession;
      const spotsLeft = Math.max(0, capacity - booked);
      const isFull = spotsLeft === 0;

      sessions.push({
        id: `sess-${idCounter}`,
        date: d.dateStr,
        dayName: d.dayName,
        formattedDate: d.formattedDate,
        time: ts.time,
        classId: cls.id,
        className: cls.name,
        classSlug: cls.slug,
        level: cls.level,
        duration: cls.duration,
        instructorId: ins.id,
        instructorName: ins.name,
        capacity,
        booked,
        spotsLeft,
        isFull,
        waitlistCount: ts.waitlistCount || 0
      });
    });
  });

  return { dates, sessions };
}
