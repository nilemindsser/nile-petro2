# ابدأ من هنا — مستودع نايل بترو الجاهز لـ Claude Code

هذا المجلد هو **كل ما يلزم**. لا ترفع شيئاً آخر.

## الخطوات
1. فك الضغط، وافتح المجلد في VS Code.
2. أنشئ مستودعاً **خاصاً (Private)** على GitHub، ثم في الطرفية:
   `git init && git add . && git commit -m "Initial: Nile Petro repo" && git branch -M main`
   `git remote add origin <رابط المستودع> && git push -u origin main`
3. استورد التصميم المجمّد (يتحقق من SHA-256):
   `node tools/import-design.mjs Nile-Petro-Developer-Handoff-RC02.5-FC.zip`
   `cp -R design/RC02.5-FC/04-Contracts/. contracts/`
   لا تستخدم unzip العادي.
4. تحقق من M0:
   `pnpm install`
   `node tools/verify-freeze.mjs && node tools/verify-design.mjs`
   `pnpm gen:all && pnpm test && pnpm scan:literals`
5. شغّل Claude Code من جذر المجلد. اللصق مرة واحدة: ملف `CLAUDE.md` موجود فعلاً ويُقرأ تلقائياً.
6. افتح `prompts/Claude-Code-Prompt-Pack.md`، وابدأ ببرومبت **S1** في Plan Mode. برومبت واحد لكل جلسة، و`git commit` بعد كل شريحة.

## ما في المجلد
- `CLAUDE.md`، `M0-STATUS.md`، `PENDING-QUESTIONS.md`: قواعد الحوكمة وحالة M0.
- `Nile-Petro-Developer-Handoff-RC02.5-FC.zip`: الحزمة المجمّدة (لا تُعدَّل).
- `contracts/`، `design/`، `tools/`، `packages/`، `fonts/`: هيكل M0.
- `docs/delivery/`: وثائق التسليم والتدقيق.
- `governance/change-requests/NP-CR-002_...md`: طلب التغيير المقترح.
- `design-proposals/NP-CR-002/`: الشاشات المقترحة (after-screens) ونسختا التصميم v2 للقراءة.
- `prompts/`: حزمة البرومبتات.

## ملاحظات
- NP-CR-002 **مقترح**؛ لا تُنفَّذ شاشاته قبل قبولك له رسمياً.
- ضع لقطات الشاشات التي تريد من Claude قراءتها في `design/screens/` (انسخ من `design-proposals/NP-CR-002/after-screens/` بعد القبول).
