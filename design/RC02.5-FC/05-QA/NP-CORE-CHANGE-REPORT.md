# NILE PETRO — تقرير التعديلات في الصميم
`NP-CORE-CHANGE-REPORT` · التاريخ: 2026-09-19 · الحالة: **مفتوح لمراجعة المالك** (بلا اجتياز مراجعة رئيسية — توجد معوّقات أخرى)

كل رقم في هذا التقرير مقيس من المصدر الحالي، أو موسوم صراحة بأنه **خط أساس من المالك**.

---

# الجزء الأول — أحدث أمر: `NP-WORKER-BIOMETRIC-01`

## القرار
حكم مالك جديد **ينسخ بنداً واحداً فقط** من `NP-WORKER-SECURITY-ALIGNMENT-01`:

| البند | قبل | بعد |
|---|---|---|
| دخول العامل بالبصمة | **NO** | **CONDITIONAL — مشروط بسياسة الخادم** |

بقية عقد أمان العامل **سارية دون تغيير**: لا كلمة مرور روتينية · لا تفضيل OTP روتيني · تحقق استثنائي بالسياسة فقط · الجلسات والأجهزة نعم · تغيير رمز الدخول = مسار W53 · بصمة المدير دون تغيير.

**قاعدة الأهلية:** القدرة تأتي من الخادم (`workerBiometricAllowed`) — الواجهة **لا تستنتج** نوع الجهاز.

| الجهاز | البصمة |
|---|---|
| جهاز عامل موثوق/مخصّص | **مسموحة** (اختيارية) |
| جهاز محطة مشترك | **غير مسموحة** — لا زر ولا تفعيل ولا تفضيل |

**سبب استثناء الجهاز المشترك:** بصمة نظام التشغيل تُثبت مستخدم الجهاز المسجَّل، لا هوية عامل المحطة الذي يستخدم الجهاز الآن. ولا يُربط أي بصمة بحساب عامل بعينه.

## التنفيذ
إطاران جديدان بلغة تطبيق العامل الحالية (وليس الإطار المؤرشف):

| الإطار | المعرّف | المحتوى |
|---|---|---|
| **04b** | `screen_enable_biometric_offer` | عرض اختياري بعد نجاح الهوية: «تفعيل الدخول بالبصمة» + «ليس الآن» · تأكيد أن الهوية مُتحقَّقة برمز الدخول · يعمل على هذا الجهاز فقط · نص الخصوصية |
| **04c** | `screen_worker_login__biometric` | الدخول المتكرر: إجراء أساسي «الدخول بالبصمة» + «الدخول برمز الدخول» + سطر أن رمز الدخول متاح دائماً + ملاحظة استثناء الجهاز المشترك |

**W51 · الأمان** صار يحمل: تغيير رمز الدخول الشخصي · **الدخول بالبصمة — هذا الجهاز الموثوق (مفعّلة)** · **الدخول بالبصمة — جهاز المحطة المشترك (غير متاحة بسياسة الجهاز)** · تحقق استثنائي · الأجهزة والجلسات.

**لم يُستعد** الإطار المؤرشف `99-archive/99 · Archive - 05 Frame 05 Biometrics.dc.html` — عقده (تفعيل على جهاز مشترك) باطل، ويبقى مرجعاً تاريخياً فقط.

## التدفقات (`10 · Prototype Flows`)
```
أول دخول      رمز الدخول الشخصي → تحقق استثنائي إن لزم → جلسة →
              [إن كان الجهاز مؤهلاً] عرض تفعيل البصمة (04b) → الرئيسية
دخول متكرر    جهاز مؤهل + مفعّلة → 04c → موجه نظام الجهاز → الرئيسية
البديل        الدخول برمز الدخول الشخصي — متاح دائماً
جهاز مشترك    رمز الدخول الشخصي وحده — لا مسار بصمة
```

## الأمان
- **البصمة ليست عامل التحقق الأول** ولا تستبدل إثبات الهوية الأولي، ولا تسجيل تلقائي ولا إجبار.
- **التحقق يملكه نظام التشغيل** (iOS/Android). التطبيق لا يستقبل ولا يخزّن صورة ولا قالب بصمة — فقط المفتاح المحلي الآمن لفتح جلسة الجهاز المُصادَق.
- **التعطيل:** من الأمان → إبطال المفتاح المحلي → الدخول التالي برمز الدخول. لا يُحذف الحساب ولا سجل الجلسات ولا سجل الأجهزة.
- **إبطال تلقائي:** سحب الجهاز · تعطيل القدرة بالسياسة · إبطال المفتاح · إعادة تهيئة أمنية · تغيّر مجموعة بصمات النظام بما يُبطل المفتاح المحمي · إبطال الخادم لعلاقة الجهاز/الجلسة. الاسترداد: رمز الدخول + تحقق استثنائي عند اللزوم. **لا تجاوز صامت.**
- **الفشل:** نجاح · إلغاء · فشل · غير متاح مؤقتاً · قفل النظام · مفتاح مُبطَل · معطّلة بالسياسة → عودة آمنة للدخول مع بديل رمز الدخول. لا عدّاد محاولات داخل التطبيق (السياسة يملكها النظام).
- **الحالة غير المؤهَّلة:** لا يُعرض زر بصمة معطّل بلا سبب — يُستخدم دخول رمز الدخول العادي.

## الأيقونة
البصمة تستخدم المعرّف القانوني `fingerprint` من `np-icons.js` (المرادفات الصريحة `s-finger · np-fp · icon-fingerprint`). **لا هندسة بصمة محلية** ولا SVG داخلي ولا رمز 64×64. مستخدَمة الآن في: بصمة المدير + أسطح بصمة العامل المؤهَّلة.

## الملفات المتأثرة
`05 · Worker App` · `07 · Authentication` · `10 · Prototype Flows` · `12 · QA and Final Audit` · `00 · Project Index` · `00-NILE-PETRO-MASTER-PROJECT.md` · `DELIVERY-MANIFEST.md`.

## QA (مقيس من المصدر الحالي)
| المقياس | القيمة |
|---|---|
| إطارات العامل | **51 → 53** |
| حالات دخول بالبصمة مؤهَّلة | 1 إطار (04c) + صفّ أمان مفعَّل |
| حالات غير مؤهَّلة / جهاز مشترك | 2 (ملاحظة 04c + صفّ الأمان) |
| إجراءات تفعيل البصمة | 2 نصّاً (04b + الأمان) |
| إجراء بصمة على جهاز مشترك | **0** |
| توفّر بديل رمز الدخول على شاشة البصمة | **100%** (12 إشارة لرمز الدخول الشخصي) |
| إجراءات كلمة مرور للعامل | **0** (كلمة «كلمة المرور» غير موجودة في الصفحة) |
| تفضيلات OTP روتينية للعامل | **0** |
| هندسة بصمة محلية | **0** |
| مراجع أيقونات مكسورة | **0** |
| رموز محلية داخل الصفحة | **0** |
| أزرار أيقونة بلا اسم | **26 → 0** |
| مسارات بصمة مسدودة | **0** |
| إجراءات مخفية تحت الشريط السفلي | **4 → 0** (W40b · W50 · TB3 · DK11 — حُجزت مساحة 104px أسفل `.bd`) |
| أخطاء Console | **0** |

## النتيجة
**WORKER BIOMETRIC CONTRACT — ALIGNED**

---

# الجزء الثاني — كل التعديلات الأخيرة في الصميم

## 1 · Worker Security Alignment — `NP-WORKER-SECURITY-ALIGNMENT-01`
عيّنة المكوّنات: «استخدم البصمة» → **«إجراء ثانوي»** (الأسلوب والأبعاد والرموز والحالات والمسافات والتراتب دون تغيير) · **الإطار 05 Biometrics** أُخرج من مسار الدخول القانوني إلى الأرشيف بسبب صريح، بلا إعادة تصميم وبلا بديل، ولم يُنقل إلى بصمة المدير لعدم تطابق العقد · مسارات العامل نُظّفت · العدد 52 → 51.
**بند واحد منه مَنسوخ الآن:** «دخول العامل بالبصمة = لا» ← انظر الجزء الأول. بقية البنود سارية.

## 2 · Worker Biometrics — `NP-WORKER-BIOMETRIC-01`
انظر الجزء الأول. العدد 51 → **53**.

## 3 · Canonical Filled Icon System — `NP-ICON-SYSTEM-01`
| المرحلة | الحالة |
|---|---|
| **تاريخي (المرحلة الأولى)** | 54 معرّفاً أُعيد تصميمها من خطوط إلى **مملوءة** (fill=currentColor · `evenodd` للتفاصيل · بلا لون داخل الأيقونة) |
| **تاريخي (المرحلة الثانية)** | شريحة مشتركة انتقالية بمُحلِّل كلمات مفتاحية + مراقب DOM + تلوين تلقائي للأحجام الكبيرة |
| **الحالي — مقيس** | **101 معرّفاً قانونياً** · 9 `mirror:true` · 92 `mirror:false` · تكرار 0 |

**الترقيات:** 47 معنى وظيفياً يستخدمه المنتج فعلاً ولم يكن له معرّف (شاحنة · ميزان · درع · هاتف · كرة أرضية · مشاركة · QR · NFC · تذكرة · بنك · بطاقة · تحويل · توقيع · تسليم · رفع سحابي · مزامنة سحابية · بدء · إيقاف · فريق · خوذة · طباعة · نجمة · قلب · إرسال · موقع · محادثة · سؤال · سند · مشتريات · واي فاي · دائري · أداء · حاسبة · معرّف · مستند …) — ترقية صريحة إلى `np-icons.js`. فنّ الورقة المرجعية غير المستخدم **لم يُرقَّ**.
**تحسينات هندسية:** `station` (كان يُقرأ منزلاً → مظلّة + مضخة + عمود) · `sliders` (كان خطاً مائلاً عند 16px → شريطان بمقبضين مفرّغين) · `refresh` · `sort` · `eye-off` · `wifi-off` · `gauge` · `fingerprint` (تلال سميكة دائرية — استثناء موثَّق يبقى داخل العائلة المملوءة).

## 4 · Icon Runtime / Adapter Cleanup
| العنصر | الحالة الحالية |
|---|---|
| `np-icons.js` | **مصدر الهندسة القانوني الوحيد** |
| `np-sprite.js` | **محوّل توافق مُولَّد** — صفر هندسة، يقرأ `window.NPIcons.registry` |
| جدول المرادفات | **صريح · 106 مدخلاً** (معرّف قديم → معرّف قانوني + سبب) |
| تخمين بالكلمات / أقرب أيقونة | **0** |
| مراقب DOM لإعادة الربط | **0 — أُزيل** |
| اعتماد على ترتيب DOM كعقد | **0** |
| تلوين مخفي داخل الأيقونة | **0** — كل أيقونة ترث `currentColor`؛ الدلالة والوضع الداكن يملكهما السطح |
| معرّف غير معروف | خطأ Console صريح — **لا أيقونة بديلة ولا مربّع فارغ** |
| رموز وظيفية محلية في الصفحات | **0** (أُزيلت من المصدر: 55 + 28 + 27 + 26 + 34 رمزاً) |
| أغلفة `viewBox 0 0 64 64` لمراجع الأيقونات | **0** (طُبِّعت إلى 20×20؛ ما بقي رسوم توضيحية لا أيقونات) |
| `03 · Icons & Assets` | يُعرض مباشرة من السجل: فئات · معرّف · مرادفات · علم الانعكاس · معاينة 24/20/16px |

## 5 · Manager Visual Alignment
طبقة تطبيق العامل المعتمدة نُقلت إلى **الملفات الأربعة** للمدير عبر الرموز الدلالية لكل صفحة: رأس متدرّج 184px بمنحنى 44% · بطاقات نصف قطر 20 بظلّ مزدوج · صفوف 16/56px · KPI بخلفية أزرق فاتح وأرقام 19px · زر أساسي بتدرّج مرتفع · أقراص 44×44 · شرائح 28px · حقول 16px · شريط سفلي 82px. **بلا تغيير في المحتوى أو القواعد أو الصلاحيات.**

## 6 · Button Variable Fix — حرج
كتلة التوحيد استعملت `var(--action-primary)` وهو غير معرَّف في صفحتي المخزون والموافقات، فسقط إعلان `background` كاملاً وبقي نص أبيض على سطح أبيض. أُضيفت قيم احتياطية لكل متغيّر (`var(--action-primary,#2962FF)` …) في الملفات الثلاثة. **مقيس:** التدرّج يُحسب `rgb(62,107,255) → rgb(41,98,255) → rgb(30,79,230)`.

## 7 · Arabic Typography Clipping Fix
`.hdr b` و`.t3` وعناوين معاينة المستأجر B كانت بارتفاع ثابت مع `overflow:hidden` فتُقصّ الصعودات/النزولات. عُدِّلت أطوال الأسطر. **أُغلق:** معاينة المستأجر B (العنوان · اسم الشركة · البريد · سطر المحطة) وترويسات الجوال كلها. السبب الجذري: صندوق حِبر خط Noto Sans Arabic ‎≈1.85em، فعنوان 18px/800 داخل سطر 24px كان يطبع 11px فوق السطر الثانوي — رُفع السطر في قاعدة النطاق إلى 30px للعنوان و20px للسطر الثانوي (في تطبيق العامل وملفات المدير الأربعة معاً). المقيس: قصّ **0** · تصادم **0** · تراكب ترويسة **0**. ملاحظة منهجية: `scrollHeight > clientHeight` على نصّ عربي لا يعني عيباً بحد ذاته — الخط نفسه يفيض بصرياً بأمان؛ العيب هو القطع أو التصادم، وكلاهما صفر. وأُصلح كذلك إخفاء الإجراء تحت الشريط السفلي في أربعة إطارات (W40b · W50 · TB3 · DK11).

## 8 · Rolled-back Visual Experiment
طبقة بصرية غنية (نقش سداسي · حزام كروم · هالة · زر بنقاط ووهج · فنّ محطة مغسول · شريط سفلي بقطرة) طُبِّقت على تطبيق العامل ثم **أُلغيت بالكامل** بأمر المالك «تراجع عن التعديل». لا أثر باقٍ ولا محتوى مفقود.

## 9 · Counts / Preservation
| المقياس | القيمة |
|---|---|
| إطارات العامل | 52 → 51 → **53** |
| إطارات المدير | **98 — دون تغيير** (24 رئيسي + B/C/D) |
| مسارات الويب | **16 + 4 أدراج — دون تغيير** |
| Tokens مُعدَّلة | **0** |
| قواعد عمل مُعدَّلة | **0** |
| صلاحيات مُعدَّلة | **0** |
| شاشات مفقودة | **0** |

## 11 · تلميع شاشات الدخول + توحيد البصمة (بعد المراجعة)
| العمل | التفصيل |
|---|---|
| **بصمة واحدة للتطبيق** | مدخل قانوني واحد `fingerprint` مربوط بأصل المشروع `assets/np-fingerprint.png` (`brandArtwork: true`)، وكل المرادفات `s-finger · np-fp · icon-fingerprint` و`<np-icon name="fingerprint">` وصفحة السجل تعرض **نفس الأصل**. صفر رسم بصمة محلي. استثناء موثَّق: هذا المدخل وحده لا يتبع `currentColor` (أصل علامة، كالشعار) |
| **آلية موثوقة** | الأصل الراستر يُبنى بعقد DOM حقيقية في المحوّل (`createElementNS` + `href` و`xlink:href`) و`<img>` داخل `<np-icon>` وصفحة السجل — لأن `<image>` المُحلَّل من نصّ HTML لا يُرسم في كل مستضيف |
| **ميدالية موحّدة** | 96×96 (حلقة `#E4F2FD` + دائرة بيضاء) وبصمة 44px في 04b و04c معاً · نسخة الزر 19px |
| **موازنة الشعار** | ارتفاع 44px ومسافة 14px تحت طرف القطرة في الخمس شاشات (02 · 03 · 04 · 04b · 04c) — تداخل 0 |
| **اختصار نصّ OTP** | «تحقق استثنائي — جهاز جديد أو استرداد وصول» |
| **تجربة النقشة** | بانر الرأس المرفق جُرِّب على 04c ثم **تُراجع عنه** بأمر المالك؛ الأصل محفوظ في `assets/np-header-wave.png` بلا استخدام |
| **ترويسات الجوال** | السبب الجذري: صندوق حِبر Noto Sans Arabic ‎≈1.85em فعنوان 18px/800 في سطر 24px يطبع 11px فوق السطر الثانوي — رُفع السطر في قاعدة النطاق (30px/20px) في تطبيق العامل والمدير الأربعة · تراكب 0 |
| **أخطاء Console** | كان المحوّل ينتظر `DOMContentLoaded` فيسجّل المتصفح فشل مرجع لأوائل `<use>` — صار يُثبَّت تزامنياً وقت تنفيذ السكربت · الأخطاء 0 |

## 10 · Current Open Decisions
1. ~~مصادر المدير B/C/D~~ — **مغلق 2026-09-20 (NP-DESIGN-CLOSURE-01 · P1):** 98 إطاراً في مصدر قانوني واحد · الأصول مؤرشفة ببصمات SHA-256 · حذف 0 · فقد شاشات 0.
2. **UNVERIFIED / BLOCKED كما هي** (لم يحلّها أي من هذه الأوامر): ~~تكافؤ تهيئة عميل ثالث~~ — **مغلق في P4**.

---

## 12 · دمج مصادر المدير — NP-DESIGN-CLOSURE-01 · P1 (مغلق 2026-09-20)
| البند | القيمة |
|---|---|
| المصدر القانوني | `06 · Manager App.dc.html` — **98 إطاراً** · صنف منطق واحد · state واحد · `renderVals` واحد |
| النطاقات | `M` top-level · `b.*` (23 إطاراً) · `c.*` (22) · `d.*` (29) |
| ارتباطات أُعيدت كتابتها | b 33 · c 39 · d 68 = **140** |
| عزل CSS | `.src-b` · `.src-c` · `.src-d` — قواعد غير مُنطَّقة 0 (عالمية مستثناة: `:root` · `html,body`) |
| بصمات ما قبل الدمج | M `0440ef30…` · B `1335035a…` · C `760e2cdb…` · D `768eaeea…` |
| ضوابط سلبية | كسر ارتباط → التُقط 1 ✓ · تسريب نطاق CSS → التُقط 1 ✓ |
| فقد شاشات · فقد محتوى | **0 · 0** (3 فروق إضافية فقط: عناوين أقسام المصادر انتقلت كما هي) |
| معرّفات DOM مكررة · ارتباطات غير محلولة | **0 · 0** |
| روابط B/C/D نشطة | **0** |
| أيقونات غير معروفة | **0** (أُضيف مرادف صريح `s-history → clock`) |
| هندسة أيقونات محلية · أخطاء Console | **0 · 0** |
| ملفات محذوفة | **0** — B/C/D في `99-archive/` بوسم ARCHIVED كامل |


## 13 · Brand Dark — NP-DESIGN-CLOSURE-01 · P2 (مغلق 2026-09-20)

**المعادلة الواحدة (OKLCH · حتمية · بلا مزج مع الأسود):**
```
INPUT  theme.brand.deep   → fallback theme.brand.primary
H = hue(deep)                                  ← محفوظة حرفياً
C = clamp(chroma(deep) × 0.42, 0.030, 0.055)   ← حارس صبغة العلامة
L = canvas .205 · surface .245 · raised .285 · elevated .325
    حارس العتمة L ≥ 0.18 · خطوة ثابتة .040 → تدرّج مقروء دائماً
border L .590 · C×0.85 · نفس H      text L .965/.845/.700 · C×0.30
action L max(.74, L(primary)) · C clamp(.10,.13) · H(primary)
on-action #0A1020 ثابت      focus L .860 · C .140 · نفس H
ROUNDING  L,C → 3 خانات · H → خانة واحدة · sRGB 8-bit داخل النطاق
```

### BRAND DARK DERIVATION TABLE
| Tenant | Input Primary | Input Deep | Input OKLCH | Canvas | Surface | Raised | Elevated | الهوية محفوظة؟ | إخفاقات |
|---|---|---|---|---|---|---|---|---|---|
| A | #2962FF | #1A237E | 0.321 0.151 270.3 | `0.205 0.055 270.3` **#0E1530** | `0.245 0.055 270.3` **#161E3B** | `0.285 0.055 270.3` **#202845** | `0.325 0.055 270.3` **#293250** | نعم — الصبغة 270.3° محفوظة حرفياً | 0 |
| B | #00897B | #00453C | 0.350 0.063 180.5 | `0.205 0.03 180.5` **#051C18** | `0.245 0.03 180.5` **#0E2521** | `0.285 0.03 180.5` **#182F2B** | `0.325 0.03 180.5` **#223935** | نعم — الصبغة 180.5° محفوظة حرفياً | 0 |
| C | #E91E8C | #7A1F5C | 0.408 0.141 344.1 | `0.205 0.055 344.1` **#280B1D** | `0.245 0.055 344.1` **#321527** | `0.285 0.055 344.1` **#3D1E31** | `0.325 0.055 344.1` **#48283B** | نعم — الصبغة 344.1° محفوظة حرفياً | 0 |

### BRAND DARK CONTRAST TABLE (WCAG · مقيس)
| الزوج | A | B | C | العتبة | النتيجة |
|---|---|---|---|---|---|
| text-primary / canvas | 16.20 | 16.10 | 16.28 | 4.5 | PASS |
| text-primary / surface | 14.76 | 14.63 | 14.79 | 4.5 | PASS |
| text-primary / raised | 13.05 | 12.90 | 13.17 | 4.5 | PASS |
| text-primary / elevated | 11.36 | 11.20 | 11.46 | 4.5 | PASS |
| text-secondary / canvas | 11.20 | 11.05 | 11.24 | 4.5 | PASS |
| text-secondary / surface | 10.20 | 10.04 | 10.21 | 4.5 | PASS |
| text-muted / surface | 6.11 | 6.04 | 6.12 | 4.5 | PASS |
| on-action / action | 8.15 | 8.62 | 7.69 | 4.5 | PASS |
| success / surface | 9.39 | 9.23 | 9.47 | 4.5 | PASS |
| warning / surface | 10.03 | 9.86 | 10.12 | 4.5 | PASS |
| danger / surface | 8.03 | 7.89 | 8.10 | 4.5 | PASS |
| info / surface | 8.90 | 8.75 | 8.98 | 4.5 | PASS |
| border / canvas | 4.33 | 4.35 | 4.29 | 3.0 | PASS |
| border / surface | 3.95 | 3.95 | 3.90 | 3.0 | PASS |
| border / raised | 3.49 | 3.48 | 3.47 | 3.0 | PASS |
| border / elevated | 3.04 | 3.03 | 3.02 | 3.0 | PASS |
| focus / canvas | 11.02 | 12.28 | 10.58 | 3.0 | PASS |
| focus / surface | 10.04 | 11.16 | 9.61 | 3.0 | PASS |
| focus / raised | 8.88 | 9.84 | 8.56 | 3.0 | PASS |

**اختبارات:** 57 (19 زوجاً × 3 عملاء) · **نجاح 57** · **إخفاق 0** · أدنى نسبة **3.02** (حدود على الأعلى ارتفاعاً · عتبتها 3.0).

**عدّادات:** ألوان داكنة مثبَّتة خاصة بعميل داخل مكوّنات **0** · معادلات اشتقاق محلية في الشاشات **0** · أسطح رئيسية شبه سوداء **0** (أدنى إضاءة نسبية 0.0078 بصبغة 344.1° ظاهرة — ليست رمادية) · خرائط رموز داكنة ناقصة 0 · مراجع أيقونات غير معروفة 0 · أخطاء Console 0.

**البصمة على الداكن:** الأصل `assets/np-fingerprint.png` بلون ثابت لا يرث `currentColor` — يُعرض داخل ميدالية يوفّرها المكوّن بخلفية فاتحة (`#E4F2FD` + قرص أبيض) في الوضعين، فتبقى نسبة التباين كما في الوضع الفاتح. أسطح البصمة الحالية (04b · 04c) ليست داكنة، ولا يوجد إطار `.dk` يستدعي البصمة. **لا إخفاق · لم يُنشأ أصل جديد · لم يُعَد تلوينه.**

### تطبيق الاشتقاق على الأسطح الحية (§17 · §18 · §24 · §25)
المعادلة لم تبقَ في Foundation وحدها — نُقلت إلى كل سطح نشط، وأُزيل **مزج العلامة بالأسود** من المصدر:

| الملف | ما تغيّر |
|---|---|
| `np-tokens.css` | حُذفت القواعد الرمادية الأربع `--np-dark-base-1…4`؛ الأسطح تُشتق بـ `oklch()` من `--np-dark-hue` و`--np-dark-chroma` وحدهما |
| `05 · Worker App` | سُلَّم OKLCH في `.dk` + طبقة إغلاق: الإطار · البطاقات · الحقول · الشريط السفلي · الشرائح · الأزرار · الحبر |
| `06 · Manager App` | 4 نطاقات (`:root` · `.src-b` · `.src-c` · `.src-d`) + سلسلة رموز `var(--surface-card,var(--surface,#fff))` بدل `#fff` الذي كان يفوز داخل الداكن |
| `08 · Client Branding` | معاينات A/B بقيم السُلَّم بدل `color-mix(brand 35%, #14161A)` |

**قياس حيّ (لا نظري) على الإطارات الداكنة:**
| السطح | إطارات داكنة | عقد نصّية مقيسة | إخفاقات | أدنى نسبة |
|---|---|---|---|---|
| Manager | 8 | 184 | **0** | 4.80 |
| Worker | 3 | 53 | **0** | 4.80 |

مسار الإصلاح موثَّق: Manager 44 → 13 → 10 → 3 → **0** · Worker 18 → 1 → **0**. كل إصلاح على الرمز أو سلسلة الرموز، **لا قيمة مختارة يدوياً لشاشة**.

## 14 · مواءمة توثيق P1 (§23)
- مفاتيح `renderVals` قبل الدمج — **القياس الحالي: M 32 · B 29 · C 31 · D 37**. الأرقام الأقدم (33/37/39/47) كانت **تقديراً أولياً قبل الدمج — HISTORICAL**، ليست قياساً حالياً.
- **المرادفات الصريحة بعد P1: 107** (106 + `s-history → clock`) — مُعاد قياسها لا مُفترَضة. لم تُمسّ هندسة أي أيقونة.

## 15 · Offline / Idempotency — NP-DESIGN-CLOSURE-01 · P3 (مغلق 2026-09-20)
| البند | العقد |
|---|---|
| **المفتاح** | `idempotencyKey` على كل عملية مُطابَرة — يُولَّد **مرة واحدة لكل نيّة مستخدم**، يُحفظ مع العملية، ويصمد عبر إعادة التشغيل وانقطاع الشبكة |
| **إعادة المحاولة** | نفس المفتاح دائماً — لا توليد جديد · **نيّة جديدة = مفتاح جديد** |
| **الخادم** | المرجع النهائي: نفس المفتاح ⇒ نفس السجل — **صفر سجل تجاري مكرر من إعادة المحاولة** |
| **قابل لإعادة المحاولة** | شبكة · مهلة · 5xx · 429 → تراجع أسي مع jitter كامل (أساس 1s · ×2 · سقف 60s · 8 محاولات) ثم `sync_failed` بانتظار المستخدم؛ `Retry-After` يُحترم |
| **نهائي بلا إعادة** | فشل تحقق (4xx) · 403 · 401 · 409 على `recordVersion` أحدث |
| **الواجهة** | لا رياضيات تراجع في أي شاشة — المستخدم يرى **الحالة + الإجراء** فقط |

**جدول الحالات الواحد** (لا مفردات ثانية): `local_draft` مسودة محلية → متابعة/إرسال · `pending_sync` بانتظار المزامنة → مزامنة الآن/حذف · `syncing` جارٍ الرفع → بلا إجراء · `confirmed` مؤكد من الخادم → عرض/تصحيح بالصلاحية · `sync_failed` تعذر الرفع → إعادة المحاولة/عرض السبب.

**إغلاق وردية العامل (OD-13) — محسوم من القدرة المعتمدة لا باختراع:** التصميم المعتمد ينصّ أصلاً «تعذر إنهاء ورديتي — عناصر بانتظار المزامنة تمنع الإغلاق النهائي». إذن `closeWorkerShift` **متصل فقط وغير قابل للطابور**، شرطه `pendingSyncCount == 0`، والإجراء عند الحجب «مزامنة ثم الإنهاء». **الطابور ≠ الإغلاق** — لا تُعرض وردية مغلقة إلا بتأكيد الخادم. إغلاق وردية المحطة (المدير) متصل كذلك خلف بوابة جاهزية الخادم — دون تغيير.

**لم يتغيّر:** أي شاشة · أي مكوّن · ملكية `NPConnectivityBanner` / `NPSyncStatus` / `NPSyncBadge` · عقد `loading · loaded · failed` وحالة الاسترداد الحاجبة.

## 16 · بوابة أدلة إغلاق وردية العامل — NP-WORKER-SHIFT-CLOSE-01 (مغلق 2026-09-20)
**حبيبة الأدلة: المسدس (NOZZLE)** — بدليل المصدر: التعيين `عامل → مضخة → مسدس` · عقد القراءة `assignedNozzles` («لمسدسات العامل فقط») · `assignmentSnapshot` لكل مسدس. فالمطلوب لكل **مسدس معيَّن** لا لكل مضخة.

| المطلوب لكل مسدس | الحالة |
|---|---|
| رقم العداد عند النهاية | **إلزامي** |
| اللترات المتبقية للمسدس | **إلزامي** |
| صورة العداد | **إلزامية** (التقاط · ملتقطة · اسم ملف ووقت · إعادة التقاط) |

```
تفعيل «تأكيد إنهاء ورديتي» ⟺ كل مسدس معيَّن مكتمل الثلاثة
                            و pendingSyncCount == 0
                            و متصل
                            و شروط الإغلاق على الخادم متحققة
الاكتمال المحلي ≠ إغلاق · الطابور ≠ إغلاق · التأكيد من الخادم وحده
```

**الإطارات:** 15 (قائمة المتطلبات + عدّاد التقدّم) · 16 (ثلاثة حقول بعلامة `*`) · **16b قائمة التحقق** (صفّ لكل مسدس معيَّن: مكتملة/ناقصة مع تسمية الناقص · لوحة شروط البوابة الأربعة · الزر معطّل `disabled` + `aria-disabled`). **العدد 53 → 54.**

**حالات التحقق A–J (كلها ممثَّلة في التصميم):**
| # | الحالة | النتيجة |
|---|---|---|
| A | مسدس ينقصه كل شيء | محجوب |
| B | ينقصه رقم العداد | محجوب |
| C | تنقصه اللترات المتبقية | محجوب |
| D | تنقصه الصورة | محجوب |
| E | بعض المسدسات مكتملة وواحد ناقص | محجوب (الحالة المعروضة في 16b) |
| F | الكل مكتمل و `pendingSyncCount > 0` | محجوب — صفّ «طابور المزامنة فارغ» أحمر |
| G | الكل مكتمل · الطابور صفر · غير متصل | محجوب — الإغلاق متصل فقط |
| H | الكل مكتمل · الطابور صفر · متصل | الإغلاق متاح |
| I | الخادم يرفض | الوردية تبقى مفتوحة |
| J | الخادم يؤكد | الوردية مغلقة |

**عدم الاعتماد على اللون وحده:** كل صفّ ناقص يحمل نصّاً صريحاً («رقم العداد مطلوب» · «اللترات مطلوبة») وشارة «ناقصة» وأيقونة قفل — لا لون منفرد.

**إصلاحان من المراجعة:** عدّاد `3 / 4` كان يُعرض معكوساً في RTL → عُزل النطاق الرقمي `dir="ltr"` وقاعدة `unicode-bidi:isolate` على `.mono` كلها · أيقونة الكاميرا في الشارة: مقيسة 14×14 بلون `#0B6B3A` والرمز موجود — غيابها كان في أداة اللقطة لا في الصفحة (لا ترسم `<use>`)، فلا عيب.

**فجوة عقد مسجَّلة (بلا اختراع):** العقد التقني لصورة العداد — التخزين والرفع والضغط والاحتفاظ — لا مصدر معتمد له؛ سُجّل كـ implementation contract gap لأمر عمل الخادم.

**P3 يبقى CLOSED** — تقريره النهائي يمثّل الحالة **قبل** هذا الأمر، ولم تُعدَّل أدلته التاريخية.

### سجل Regression — أيقونات الصفوف (2026-09-20)
| البند | التفصيل |
|---|---|
| **البلاغ** | أيقونات صفوف شاشة التفضيلات (الوردية · القراءات · المصروفات · التوريدات · المزامنة · الأمان · النظام …) لا تظهر |
| **السبب الجذري ١** | **ليس عيب صفحة:** الأيقونات تُرسم فعلاً في المتصفح (15×15 · `visible` · `opacity 1` · الرمز موجود). أداة اللقطة لا تُسطّح `<use href="#id">`، فتظهر فارغة في الصورة وحدها |
| **السبب الجذري ٢ (حقيقي)** | غلاف `svg.i` المشترك كان يحمل `fill` الافتراضي `rgb(0,0,0)`؛ أي مستهلك **يُسطّح** `<use>` (تصدير · طباعة · التقاط صورة) يفقد الرمز. **أُصلح في القاعدة المشتركة وحدها:** `.i{fill:currentColor;stroke:none}` في تطبيق العامل (ثلاثة نطاقات) وتطبيق المدير |
| **السبب الجذري ٣** | إطار «04 Success» كان يحمل **هندسة أيقونة محلية** متبقية (مسار ✓ يدوي على شبكة 64×64) — يخالف عقد الأيقونات. اُستبدل بالمعرّف القانوني `check` عبر مرادف صريح `s-check-plain → check` |
| **ليس السبب** | `currentColor` · `opacity` · `display/visibility` · حجم الحاوية · أولوية CSS · وراثة الداكن/الفاتح · القصّ — كلها فُحصت وسليمة. **قواعد P4 لم تكن السبب** (باستثناء قاعدة المفاتيح التي صُحّحت سابقاً) |
| **قبل** | أيقونات لا تُرسم عند التسطيح 364 · هندسة محلية 1 · شبكة 64×64 داخل الإطارات 1 |
| **بعد** | **0 · 0 · 0** |
| **الصفوف المتأثرة** | 11 أيقونة في شاشة التفضيلات · **364 أيقونة** على مستوى الصفحة كلها (كل المستهلكين فُحصوا لا العيّنة) |

**QA النهائي:** أيقونات صفوف ناقصة **0** · مراجع غير معروفة **0** · هندسة وظيفية محلية **0** · قصّ أيقونات **0** · انزياح تخطيط الصفوف **0** · أهداف لمس <48 **0** · حبّة المفتاح **44×26** ومنطقة اللمس 48×48 عبر `::before` · أخطاء Console **0**.

## 17 · P4 — الاستجابة والإتاحة وتكافؤ العميل الثالث (مغلق 2026-09-20)

### RESPONSIVE MATRIX — `overflow / clipped / touch<48`
| السطح | 360×800 | 390×844 | 393×852 | 430×932 |
|---|---|---|---|---|
| Worker — 54 إطاراً | 0/0/0 | 0/0/0 | 0/0/0 | 0/0/0 |
| Manager — 98 إطاراً | 0/0/0 | 0/0/0 | 0/0/0 | 0/0/0 |
| Web Console | تخطيط سطح مكتب — تجاوز أفقي للصفحة **0** |
| Authentication | معاينات مقيسة `scale(0.5)` — تجاوز داخلي **0** |

**إصلاحان استجابيان (على القاعدة المشتركة لا على الإطار):** شريط مرشّحات التنبيهات `.fbar` يلتف الآن عند 360px بدل الخروج من الإطار (العامل والمدير) · أسماء المستأجر الطويلة تتقلّص عبر `min-width:0` + `overflow-wrap:anywhere` على أدوار النص المشتركة.

### TEXT SCALE MATRIX
| السطح | 1.0 | 1.3 | 2.0 |
|---|---|---|---|
| Worker | 0/0/0 | 0/0/0 | 0/0/0 |
| Manager | 0/0/0 | 0/0/0 | 0/0/0 |

### ACCESSIBILITY MATRIX
| الفحص | المجتمع | التغطية | العيوب | ضابط سلبي |
|---|---|---|---|---|
| أهداف اللمس ≥48 | كل عناصر التفاعل في 152 إطاراً | 100% | **0** | حُقن زر 20px → التُقط 1 ✓ |
| شكل المفتاح 44×26 | 8 مفاتيح | 100% | **0** تشوّه | — |
| أسماء الضوابط الأيقونية | العامل · المدير · الويب · المصادقة | 100% | **0** (سُمّي 7 روابط ويب + أزرار المدير) | حُقن زر بلا اسم → التُقط 1 ✓ |
| تسمية الحقول | كل `input/textarea/select` | 100% | **0** | — |
| التركيز مرئي (ويب) | الضوابط | فحص حيّ | **0** (`outline` + `box-shadow`) | — |
| حالات باللون وحده | مكتملة/ناقصة · المزامنة · الأجهزة · الاعتماد | 100% | **0** — كل حالة تحمل نصاً وأيقونة |
| الأرقام العربية-الهندية | 152 إطاراً | 100% | **0** |
| عزل الأرقام LTR | `.mono` كلها + عدّاد `3 / 4` | 100% | **0** |
| أيقونات مفقودة (متصفح + تصدير) | 369 + 717 = **1086 أيقونة** | 100% | **0** |
| هندسة أيقونات محلية | العامل · المدير | 100% | **0** |

**ملاحظة قياس موثَّقة:** مربّعات الاختيار في معاينات المصادقة تقيس 17px، لكنها داخل `<label>` بمساحة **144×54 منطقية** — الهدف الفعّال هو صفّ الوسم، فهي مطابقة. ومعاينات المصادقة تُعرض بـ `scale(0.5)`، فكل قياس فيها عُوِّض بالمقياس قبل الحكم.

### TENANT C PARITY MATRIX
| المجال | A | B | C (إجهاد) | النتيجة |
|---|---|---|---|---|
| اسم التطبيق | قصير | متوسط | **49 حرفاً عربياً** | PASS |
| اسم الشركة القانوني | — | — | **68 حرفاً** | PASS |
| بريد الدعم | — | — | **63 حرفاً** | PASS |
| الشعار | 1:1 | 1:1 | **4:1 (176×44)** | PASS |
| اللون الأساسي | `#2962FF` | `#00897B` | **`#FF1FA5` ساطع** | PASS |
| العملة · الدقة | ج.س · 2 | — | **3 أحرف · دقة 3** | PASS |
| الداكن المشتق | 270.3° | 180.5° | **344.1°** | PASS |

**القياس تحت تهيئة C:** 50 فتحة هوية مُجهَدة · تجاوز **0** · قصّ **0** · تسرّب هوية مثبَّتة في مكوّن **0**. لا مبدّل مستأجر ولا واجهة إدارة مستأجرين — تهيئة اختبار فقط.

### REGRESSION
P1 المدير 98 إطاراً · P2 الداكن (أسطح شبه سوداء 0 · فقد صبغة 0 · إخفاقات تباين 0 · ألوان عميل مثبّتة 0) · P3 عقد الاتصال دون تغيير · بوابة إغلاق وردية العامل (حبيبة المسدس · 54 إطاراً) · الأيقونات (سجل 101 · مرادفات 108 · مجهولة 0) · أمان العامل — **كلها سليمة، لا انحدار**.

### NEGATIVE CONTROLS
تجاوز استجابي · هدف <48 · اسم إتاحة ناقص · قصّ نصّ — حُقنت في نسخة DOM خام والتُقط كلٌّ منها **مرة واحدة بالضبط**، ثم أُزيلت والعدّادات عادت إلى الصفر.

### أخطاء Console
**0** على الأسطح الأربعة.

# CURRENT SOURCE STATE (مقيس)

| المقياس | القيمة | المصدر |
|---|---|---|
| إطارات تطبيق العامل | **54** | `article.f` في `05 · Worker App` |
| إطارات تطبيق المدير | **98** | مقيس في المصدر القانوني الموحَّد بعد P1 |
| معرّفات الأيقونات القانونية | **101** | `np-icons.js` |
| مرادفات صريحة | **108** | `np-sprite.js` (بعد `s-history → clock`) |
| مراجع أيقونات غير معروفة | **0** | `NPIconAudit.unknownRefs` على العامل والمدير |
| رموز/هندسة وظيفية محلية | **0** | العامل + المدير الأربعة |
| مراجع أيقونات مكسورة | **0** | فحص `use → getElementById` |
| أزرار أيقونة بلا اسم | **0** | بعد إضافة `aria-label` |
| نصوص عربية مقصوصة (داخل حاوية تقطع) | **0** | كل عقدة نصّية ورقية بـ `overflow` غير `visible` |
| تصادم نصوص متجاورة | **0** | تقاطع صناديق الأشقّاء النصّية داخل كل إطار |
| تراكب العنوان مع السطر الثانوي في الترويسة | **0** | `.hdr b` ↔ `.hdr .sub` في 53 إطاراً |
| إجراءات مخفية تحت الشريط السفلي | **0** | تقاطع `.bd .btn*` مع `.nav` |
| تخمين بالكلمات / مراقب DOM | **0 / 0** | `np-sprite.js` |
| ألوان مثبَّتة داخل الأيقونات | **0** | فحص `[fill^="#"]` داخل المحوّل |
| أخطاء Console | **0** | العامل + المدير الأربعة (بعد التثبيت التزامني للمحوّل) |
| أصول بصمة مستقلة | **1** | `assets/np-fingerprint.png` — مدخل واحد + 3 مرادفات |
| تداخل الشعار مع القطرة | **0** | 5 شاشات دخول · فجوة 14px موحّدة |

---

# OWNER DECISION REGISTER — NP-DESIGN-CLOSURE-01 · P0-A
`2026-09-20` · أحكام مالك معتمدة · المصدر: أمر المالك «OWNER RULINGS — APPROVED»

## H · نطاق الإصدار الأول
| # | الوحدة | الحكم | السطح القانوني |
|---|---|---|---|
| H1 | الأسعار | **KEEP V1** | Web |
| H2 | أطراف الآجل والأرصدة | **KEEP V1** | Web |
| H3 | سندات القبض والصرف | **DEFER** | — |
| H4 | المدفوعات وكشف الحساب | **KEEP V1** | Web |
| H5 | إدارة العاملين والتعيين | **KEEP V1** | Manager |
| H6 | الدعم والتذاكر والأسئلة الشائعة | **KEEP V1** | Worker · Manager |
| H7 | عارض سجل التدقيق | **DEFER** | — |
| H8 | الإعدادات التشغيلية | **KEEP V1** | Manager · Web |
| H9 | بوابة أمان إعادة التهيئة | **DEFER** | — |
| H10 | مستحقات العامل | **DEFER** | — (مؤكَّد: لا مستحقات في تطبيق العامل) |

## D1 · عقد ثقة الجهاز — **مغلق**
```
Device record:
  deviceMode ∈ { SHARED_STATION, DEDICATED_WORKER }

workerBiometricAllowed  ← server-derived (لا تستنتجه الواجهة)

أهلية البصمة =
  deviceStatus = ACTIVE
  AND deviceMode = DEDICATED_WORKER
  AND security policy allows biometric
```
أثر التصميم: شاشة 04c تظهر فقط عند الأهلية · جهاز المحطة المشترك بلا زر/تفعيل/تفضيل بصمة · بديل رمز الدخول الشخصي متاح دائماً. لا تغيير في الشاشات الحالية — العقد الآن مسمّى فقط.

## G1 · الزمن التشغيلي — **مغلق**
`station.timeZone` · `station.operationalDayStartLocal` — من التهيئة، ولا قيمة زمنية مثبَّتة في الواجهة.

## G2 · نسبة التفاوت المسموح للقراءات — **APPROVED / CLOSED** (حكم نهائي 2026-09-20)
الحكم السابق `station.readingVarianceTolerance` (بلا وحدة ولا قيمة) = **SUPERSEDED**.

| البند | القيمة |
|---|---|
| الإعداد القانوني | `readingVarianceTolerancePercent` |
| النوع | نسبة / عشري |
| الأساس الافتراضي | **1.0%** — قيمة تهيئة افتراضية فقط |
| ملكية الضبط | العميل / مالك النظام |
| موقعه في الواجهة | إعدادات النظام → التشغيل → القراءات والفروقات → **نسبة التفاوت المسموح للقراءات** |

**السلوك التجاري**
```
variancePercent = |المتوقَّع/المحسوب − المسجَّل| كنسبة مئوية
                  وفق عقد حساب القراءة ذي السلطة

variancePercent <= readingVarianceTolerancePercent  →  normal
variancePercent >  readingVarianceTolerancePercent  →  needs_review
```

**ممنوع تثبيت 1% داخل** أي مكوّن قابل لإعادة الاستخدام أو شاشة أو عنصر حساب أو واجهة أعمال — القيمة قابلة للتغيير لكل عميل حسب سياسته التشغيلية.

**أثر التصميم:** لا إعادة تصميم؛ فقط توثيق الإعداد داخل بنية «الإعدادات التشغيلية» القائمة (H8 · KEEP V1). الواجهة تعرض `needs_review` والتحذير كما يصلها من الخادم (M36 · قراءات العامل · بوابة الإغلاق) ولا تحسب الحدّ.

## F1 · استثناء الأيقونات الراسترية — **معتمد**
> Raster functional icons = 0 **إلا** الاستثناءات المسجّلة صراحة كـ canonical asset-backed.

الاستثناء المسجّل حالياً: **`fingerprint`** → `assets/np-fingerprint.png` (مرادفات: `s-finger` · `np-fp` · `icon-fingerprint` · رسم محلي 0).

## I1 · إغلاق Web Console — **محدَّد**
يُنفَّذ داخل **NP-MR-001 Master Review** ببوابة Web مقيسة خاصة به. لا مرحلة إغلاق/إعادة تصميم منفصلة.

## P1 · دمج مصادر المدير — **معتمد**
الأسلوب المعتمد: `M` top-level كما هو · `B → b.*` · `C → c.*` · `D → d.*` + عزل CSS بنطاق المصدر (`.src-b` · `.src-c` · `.src-d`) + diff مُطبَّع لـ98 إطاراً قبل/بعد + كشف صريح للارتباطات غير المحلولة + ضوابط سلبية قبل الوثوق بأي صفر. حذف الملفات = 0؛ الأرشفة بعد PASS فقط.

## بنود ما زالت مفتوحة (لا يحلّها هذا الحكم)
Brand Dark derivation · Offline/Idempotency + إغلاق وردية العامل · قياس 393×852 و430×932 · تباين الأسطح الداكنة · تكافؤ العميل الثالث — كلها UNVERIFIED إلى حين P2…P4.

# OPEN OWNER DECISIONS
1. لا قرار حاجب لـ**P1.1** — معتمد ومصحَّح الخطة.
2. البنود الخمسة UNVERIFIED أعلاه (P2…P4).

---

## NP-RC02-FINAL-BASELINE-01 — baseline RC02.1 · 2026-09-20

**Scope:** close I-01 (package hash), I-02 (stale contract hashes) and the F-01 residual (semantic colour
literals in the data/logic layer). No design change, no business rule change, no route or permission change.

- `05 · Worker App.dc.html` — 616 colour literals in product frames and product logic rewritten to canonical
  aliases; `--text-body` and `--surface-elevated` added to the bridge. Frames unchanged: 54.
- `06 · Manager App.dc.html` — 392 literals rewritten; full bridge alias set + `.dk` scope added; the invalid
  second `--dk-elevated` declaration (F-05 residue) removed. Frames unchanged: 98.
- `04-Contracts/flutter-implementation.md` — semantic vocabulary table added (one source of truth, no hex table).
- `05-QA/current-measurements.md`, `05-QA/remediation-report.md` — RC02.1 measurements appended; history intact.
- `DELIVERY-MANIFEST.md` — rebuilt from the frozen tree: per-file SHA-256 for every current/canonical file,
  all binaries, and an explicit `UNHASHED-ARCHIVE · NON-BASELINE` marking where it applies.

**Not done on purpose:** NP-MR-001 P2 was not started; nothing is declared FINAL or FROZEN; no implementation began.

---

## NP-MR-001 · P3 — baseline RC02.2 · 2026-09-20

Ten P2 findings closed with the smallest canonical cause in each case; no screen was redesigned, no business
rule, route, permission or capability changed, and the Brand Dark algorithm is untouched.

- `np-tokens.css` — `--np-text-secondary` corrected to the Slate primitive (4.40 → 7.24:1); `--np-dark-action`
  and the `--np-dark-text` / `-text-2` / `-text-3` rungs promoted to primitives (dark scheme references them,
  values unchanged).
- `05 · Worker App` / `06 · Manager App` — muted informative consumers repointed, `--text-disabled` added for
  placeholder/disabled, 48px switch hit region, chip/KPI/mono wrapping, dark status inks raised, 14 ink roles
  repaired, meter instrument repointed to the canonical dark ladder, biometric CTA icon removed (owner change).
- `04 · Web Console` — `ROUTE_ALIASES` for the two registered kebab hashes; drawer close affordance gains an
  accessible name, a 48px hit region, Escape dismissal and focus return.
- `NPAuthLogin` — night theme repointed off the removed `--np-color-dark-*` family; link and footer targets 48px.
- `05-QA/*` — P3 measurements and the recordVersion **IMPLEMENTATION CONTRACT GAP** recorded.

RC02.1 remains the sealed historical artifact (`f9dfeeeb…76c6`); RC02.2 is the current baseline.

---

## NP-MR-001 · P3 R2 — baseline RC02.3 · 2026-09-20

Verifier-reported F-05 residual closed: the dark hero in `05 · Worker App` and 4 Manager scopes derived from the
deleted `--dk-brand` input and the rules used a descendant selector that never matched `class="f dk"`. Both are
repointed to the canonical OKLCH dark ladder. `--np-border-soft` is now registered canonically. A corrected
composited-contrast probe (straight-alpha, per-stop hero compositing) found and closed five hero-region
contrast defects. Worker and Manager now measure 0 contrast failures across 3522 live consumers.

---

## NP-MR-001 · P4 FINAL CONSOLIDATION — candidate RC02.4-FC · 2026-09-20

Master Review consolidated on the RC02.3 baseline (hash re-verified before any work). One change of substance:
the **recordVersion 409 owner ruling** is now a written contract (no overwrite · no auto-retry · unsaved input
preserved as a local recovery draft · «تم تحديث هذا السجل من مستخدم آخر» + «تحميل أحدث نسخة» · re-submission is a
new intent with a new idempotencyKey · no automatic merge in V1), reflected in the delivered shared-states
inventory through the existing NPInlineNotice pattern. No screen was added, no business rule changed, no route,
permission, capability, icon or asset changed, and the OKLCH Brand Dark algorithm is untouched.

Documents updated: `04-Contracts/offline-sync.md` · `business-rules.md` · `flutter-implementation.md` ·
`01-Design/09-States-Responsive` · `05-QA/current-measurements.md` · `05-QA/remediation-report.md` ·
`00-NILE-PETRO-MASTER-PROJECT.md` · `DELIVERY-MANIFEST.md`.

---

## NP-MR-001 · RECORDVERSION FINAL DELTA — candidate RC02.5-FC · 2026-09-20

Owner decision **C-1 … C-5 = APPROVED** (independent review NP-MR-001-R04). Contract completion only: no
screen added, no screen redesigned, no page added, no implementation started, P0/P1/P2/P3 not re-run.

| Item | Result |
|---|---|
| **C-1** two server-declared conflict classes | `DATA_CONFLICT` (re-apply path) · `DECISION_CONFLICT` (no re-apply CTA; outcome + permission-gated actor/time; exit or read-only). Client may not infer the class |
| **C-2** sync-time conflict | queued intent → `sync_failed`, recovery draft linked to the intent, reached through the existing sync-failure entry point, resolved by the same two classes |
| **C-3** terminal key | conflict is TERMINAL · NON-RETRYABLE for that `idempotencyKey`; retry stops immediately, key retired, later submission = new intent + new key, no automatic retry |
| **C-4** field-level re-apply | no block restore; per changed field show latest-server vs preserved-user value in the existing comparison/recovery pattern; explicit user decision; automatic merge = 0, silent overwrite = 0 |
| **C-5** deleted / voided record | clear notice, no re-apply against an invalid record, recovery draft preserved per policy, no silent recreation |
| Opaque rule | `recordVersion` is OPAQUE: stored, echoed verbatim, never incremented/decremented/compared/interpreted |
| Recovery-draft lifecycle | persists until resolution · explicit discard · retention expiry · device wipe/revocation; wiped with protected local data; retention = implementation configuration value, **no number invented** |
| Flow coverage | canonical rule replaces the five-flow list; derived V1 inventory published — 25 rows, APPLIES/NOT APPLICABLE with reason, unmapped mutable records **0** |

Documents changed: `04-Contracts/offline-sync.md` · `04-Contracts/business-rules.md` ·
`04-Contracts/flutter-implementation.md` · `01-Design/09-States-Responsive` (recovery-state clarification:
the single Record Changed row is split into DATA_CONFLICT · DECISION_CONFLICT · Sync Conflict ·
Record Deleted/Voided, plus the recovery-draft lifetime note — existing NPInlineNotice / NPSyncStatus /
NPErrorState patterns, no new screen) · `00-NILE-PETRO-MASTER-PROJECT.md` §18 · `05-QA/*` · `DELIVERY-MANIFEST.md`.

Unchanged: every other design source, routes, permissions, capabilities, business rules, icons, assets, tokens
and the OKLCH Brand Dark algorithm. RC02.4-FC is preserved as a historical candidate.
