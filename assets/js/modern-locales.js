(function(){
const rows=[
['Work','Praxis','الأعمال'],['Explore selected work ↓','Ausgewählte Projekte ansehen ↓','استكشف أعمالاً مختارة ↓'],
['HOSPITALITY OPERATIONS / SHARJAH, UAE','HOSPITALITY-BETRIEB / SCHARDSCHA, VAE','عمليات الضيافة / الشارقة، الإمارات'],
['Selected operations stories','Einblicke in den Betrieb','نماذج من العمل التشغيلي'],
['The work behind','Die Arbeit hinter','العمل وراء'],['a well-run operation.','einem gut geführten Betrieb.','عملية تشغيل ناجحة.'],
['A closer look at team coordination, event delivery and opening readiness, drawn from my hands-on experience.','Ein genauerer Blick auf Teamkoordination, Veranstaltungen und Eröffnungsvorbereitung aus meiner praktischen Erfahrung.','نظرة على تنسيق الفرق وتنفيذ الفعاليات وجاهزية الافتتاح من واقع خبرتي العملية.'],
['Multi-kiosk delivery','Mehrkiosk-Betrieb','تشغيل عدة أكشاك'],['Extended event operations','Längerfristiger Veranstaltungsbetrieb','تشغيل فعاليات ممتدة'],['Opening readiness','Eröffnungsvorbereitung','جاهزية الافتتاح'],
['From setup to service.','Vom Aufbau bis zum Service.','من التجهيز إلى الخدمة.'],
['4 outlet openings supported','4 Standorteröffnungen unterstützt','دعم افتتاح ٤ منافذ'],['Outlet opening experience','Erfahrung mit Standorteröffnungen','خبرة افتتاح المنافذ'],
['Management in practice','Management in der Praxis','الإدارة في الميدان'],
['Coordinate staffing, purchasing, stock continuity and service execution across the event area.','Personal, Einkauf, Warenverfügbarkeit und Service im gesamten Veranstaltungsbereich koordinieren.','تنسيق الموظفين والمشتريات واستمرارية المخزون وتنفيذ الخدمة في منطقة الفعالية.'],
['Maintain team coordination, ordering and operational continuity over an extended activation.','Teamkoordination, Bestellungen und Betriebsabläufe über eine längere Veranstaltung hinweg aufrechterhalten.','الحفاظ على تنسيق الفريق والطلبات والاستمرارية التشغيلية خلال فعالية ممتدة.'],
['Connect opening stock, suppliers, systems and team setup before the first service.','Erstbestand, Lieferanten, Systeme und Teamaufbau vor dem ersten Service zusammenbringen.','ربط مخزون الافتتاح والموردين والأنظمة وتجهيز الفريق قبل بدء الخدمة.'],
['Explore responsibilities ↗','Verantwortungsbereiche ansehen ↗','استكشف المسؤوليات ↗'],
['What I bring to your team','Was ich in Ihr Team einbringe','ما أقدمه لفريقك'],
['Practical team leadership, organised purchasing and stock control, and a service-first approach. Based in Sharjah, with UAE operational experience and a working style built around clear communication, ownership and consistent standards.','Praktische Teamführung, organisierter Einkauf und Bestandskontrolle mit klarem Servicefokus. In Schardscha ansässig, mit Betriebserfahrung in den VAE und einer Arbeitsweise, die auf klarer Kommunikation, Verantwortung und verlässlichen Standards beruht.','قيادة عملية للفريق ومشتريات منظمة وضبط للمخزون ونهج يضع الخدمة أولاً. مقيم في الشارقة مع خبرة تشغيلية في الإمارات وأسلوب عمل يقوم على التواصل الواضح وتحمل المسؤولية وثبات المعايير.'],
['Discuss a role ↗','Über eine Position sprechen ↗','مناقشة فرصة عمل ↗'],['View professional portfolio ↗','Berufliches Portfolio ansehen ↗','عرض الملف المهني ↗'],
['Working with me','Zusammenarbeit mit mir','العمل معي'],['Close to the team.','Nah am Team.','قريب من الفريق.'],['Clear on the details.','Klar in den Details.','واضح في التفاصيل.'],
['My background combines customer-facing hospitality, daily operational responsibility and a practical approach to improving how work gets done.','Mein Hintergrund verbindet direkten Gästekontakt, tägliche Betriebsverantwortung und einen praktischen Ansatz zur Verbesserung von Arbeitsabläufen.','تجمع خبرتي بين الضيافة المباشرة مع العملاء والمسؤولية التشغيلية اليومية ونهج عملي لتحسين سير العمل.'],
['01 / SERVICE STANDARDS','01 / SERVICESTANDARDS','٠١ / معايير الخدمة'],['02 / OPERATIONAL CONTROL','02 / BETRIEBSSTEUERUNG','٠٢ / الرقابة التشغيلية'],['03 / PRACTICAL IMPROVEMENT','03 / PRAKTISCHE VERBESSERUNG','٠٣ / التحسين العملي'],
['Coach where the work happens.','Dort coachen, wo gearbeitet wird.','التدريب حيث يجري العمل.'],
['Shift planning, clear task allocation and hands-on beverage coaching help the team deliver a consistent guest experience.','Dienstplanung, klare Aufgabenverteilung und praktisches Getränkecoaching unterstützen ein verlässliches Gästeerlebnis.','يساعد تخطيط المناوبات وتوزيع المهام بوضوح والتدريب العملي على المشروبات الفريق على تقديم تجربة ضيوف متسقة.'],
['Keep the essentials connected.','Das Wesentliche verbinden.','ربط أساسيات التشغيل.'],
['Bring together supplier follow-up, stock counts, ordering and POS reporting so daily decisions reflect what is happening on the floor.','Lieferantenbetreuung, Bestandszählungen, Bestellungen und Kassenberichte verbinden, damit tägliche Entscheidungen die Betriebspraxis widerspiegeln.','ربط متابعة الموردين والجرد والطلبات وتقارير نقاط البيع لتعكس القرارات اليومية ما يحدث في الميدان.'],
['Make good routines easier to repeat.','Gute Routinen leichter wiederholen.','تسهيل تكرار الممارسات الجيدة.'],
['Use structured workflows and digital tools to support ordering, inventory, production records and day-to-day follow-through.','Strukturierte Abläufe und digitale Werkzeuge für Bestellungen, Bestand, Produktionsaufzeichnungen und tägliche Nachverfolgung einsetzen.','استخدام سير عمل منظم وأدوات رقمية لدعم الطلبات والمخزون وسجلات الإنتاج والمتابعة اليومية.']
];
['Multi-kiosk delivery','Extended event operations','Opening readiness'].forEach((label,i)=>{const row=rows.find(r=>r[0]===label),number=String(i+1).padStart(2,'0')+' / ';rows.push(row.map(s=>number+s));});
window.PORTFOLIO_TRANSLATIONS.push(...rows);
})();
