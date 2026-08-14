import { useCallback } from 'react';
import { useAppStore } from './store';
import { en } from './en';

// ==================== COMPREHENSIVE ARABIC TRANSLATIONS ====================

const translations: Record<string, string> = {
  // ===== Navigation (Sidebar) =====
  'nav.dashboard': 'لوحة التحكم',
  'nav.cargoItems': 'البضائع',
  'nav.projects': 'المشاريع',
  'nav.locations': 'المواقع',
  'nav.equipment': 'المعدات',
  'nav.movements': 'الحركات',
  'nav.sapIntegration': 'تكامل SAP',

  // ===== Page Headers =====
  'header.dashboard': 'لوحة التحكم',
  'header.cargoManagement': 'إدارة البضائع',
  'header.projectCargo': 'بضائع المشاريع',
  'header.locations': 'المواقع',
  'header.equipmentLifting': 'المعدات وأدوات الرفع',
  'header.movementLog': 'سجل الحركات',
  'header.sapIntegration': 'تكامل SAP / ERP',

  // ===== Common UI =====
  'common.add': 'إضافة',
  'common.edit': 'تعديل',
  'common.delete': 'حذف',
  'common.save': 'حفظ',
  'common.cancel': 'إلغاء',
  'common.search': 'بحث',
  'common.filter': 'تصفية',
  'common.clear': 'مسح',
  'common.loading': 'جاري التحميل',
  'common.noDataFound': 'لا توجد بيانات',
  'common.systemOnline': 'النظام متصل',
  'common.saving': 'جاري الحفظ...',
  'common.creating': 'جاري الإنشاء...',
  'common.recording': 'جاري التسجيل...',
  'common.update': 'تحديث',
  'common.create': 'إنشاء',
  'common.select': 'اختيار...',
  'common.none': 'بدون',
  'common.all': 'الكل',
  'common.allTypes': 'جميع الأنواع',
  'common.allStatuses': 'جميع الحالات',
  'common.allCategories': 'جميع الفئات',
  'common.allCommodities': 'جميع السلع',
  'common.confirmDelete': 'تأكيد الحذف',
  'common.actions': 'إجراءات',
  'common.code': 'الرمز',
  'common.name': 'الاسم',
  'common.type': 'النوع',
  'common.status': 'الحالة',
  'common.location': 'الموقع',
  'common.previous': 'السابق',
  'common.next': 'التالي',
  'common.page': 'صفحة',
  'common.of': 'من',
  'common.tonnes': 'طن',
  'common.tons': 'طن',
  'common.items': 'عناصر',
  'common.active': 'نشط',
  'common.inactive': 'غير نشط',
  'common.collapse': 'طي',
  'common.refresh': 'تحديث',
  'common.enabled': 'مفعّل',
  'common.disabled': 'معطّل',
  'common.description': 'الوصف',
  'common.weight': 'الوزن',
  'common.dimensions': 'الأبعاد',
  'common.load': 'التحميل',
  'common.progress': 'التقدم',
  'common.date': 'التاريخ',
  'common.dateSlashTime': 'التاريخ/الوقت',
  'common.remarks': 'ملاحظات',
  'common.operator': 'المشغّل',

  // ===== Footer =====
  'footer.left': 'نظام إدارة المستودعات v1.0 — عمليات الرفع الثقيل وبضائع المشاريع',
  'footer.right': 'كومبي ليفت ©',
  'sidebar.footer': 'عمليات الرفع الثقيل - كومبي ليفت',
  'sidebar.subtitle': 'إدارة المستودعات',

  // ===== Initialization =====
  'init.wmsSystem': 'جاري تهيئة نظام إدارة المستودعات...',

  // ===== Cargo Statuses =====
  'status.IN_YARD': 'في الساحة',
  'status.IN_WAREHOUSE': 'في المستودع',
  'status.IN_TRANSIT': 'قيد النقل',
  'status.RECEIVED': 'مستلم',
  'status.DISPATCHED': 'مرسل',
  'status.DELIVERED': 'تم التوصيل',

  // ===== Project Statuses =====
  'status.PLANNED': 'مخطط',
  'status.RECEIVING': 'قيد الاستلام',
  'status.IN_STORAGE': 'في التخزين',
  'status.STAGING': 'في منطقة التجهيز',
  'status.LOADED': 'محمل',
  'status.SHIPPED': 'مشحون',
  'status.COMPLETED': 'مكتمل',

  // ===== Equipment Statuses =====
  'status.AVAILABLE': 'متاح',
  'status.IN_USE': 'قيد الاستخدام',
  'status.MAINTENANCE': 'صيانة',
  'status.OUT_OF_SERVICE': 'خارج الخدمة',

  // ===== Lift Categories =====
  'category.HEAVY_LIFT': 'رفع ثقيل',
  'category.OVERSIZE': 'أكبر من الحجم القياسي',
  'category.STANDARD': 'قياسي',
  'category.PROJECT_CARGO': 'بضائع مشروعية',

  // ===== Commodity Types =====
  'commodity.GENERAL': 'عام',
  'commodity.MACHINERY': 'آلات',
  'commodity.STEEL': 'حديد',
  'commodity.EQUIPMENT': 'معدات',
  'commodity.MODULE': 'وحدة',

  // ===== Equipment Types =====
  'equipmentType.CRANE': 'رافعة',
  'equipmentType.FORKLIFT': 'رافعة شوكية',
  'equipmentType.SPREADER_BAR': 'عمود توزيع',
  'equipmentType.SLING': 'حبل رفع',
  'equipmentType.SHACKLE': 'شاكلة',
  'equipmentType.BEAM': 'عارضة رفع',
  'equipmentType.JACK': 'رافعة هيدروليكية',
  'equipmentType.ROLLER': 'بكرات',

  // ===== Movement Types =====
  'movementType.RECEIVE': 'استلام',
  'movementType.MOVE': 'نقل',
  'movementType.DISPATCH': 'إرسال',
  'movementType.INSPECT': 'فحص',

  // ===== Location Types =====
  'locationType.YARD': 'ساحة',
  'locationType.WAREHOUSE': 'مستودع',
  'locationType.OPEN_AREA': 'منطقة مفتوحة',
  'locationType.STAGING': 'منطقة تجهيز',
  'locationType.BERTH': 'رصيف',

  // ===== Sync Statuses =====
  'syncStatus.PENDING': 'معلق',
  'syncStatus.SENT': 'مرسل',
  'syncStatus.SUCCESS': 'نجاح',
  'syncStatus.FAILED': 'فشل',
  'syncStatus.RETRYING': 'إعادة المحاولة',

  // ===== Sync Directions =====
  'syncDirection.OUTBOUND': 'صادر',
  'syncDirection.INBOUND': 'وارد',

  // ===== Dashboard =====
  'dashboard.title': 'لوحة التحكم',
  'dashboard.subtitle': 'نظرة عامة على عمليات الرفع الثقيل',
  'dashboard.totalCargo': 'إجمالي البضائع',
  'dashboard.inYardStorage': 'في الساحة/التخزين',
  'dashboard.activeProjects': 'مشاريع نشطة',
  'dashboard.equipmentAvail': 'المعدات المتاحة',
  'dashboard.totalWeight': 'إجمالي الوزن',
  'dashboard.pendingDispatch': 'في انتظار الإرسال',
  'dashboard.cargoStatusBreakdown': 'توزيع حالة البضائع',
  'dashboard.liftCategoryDistribution': 'توزيع فئات الرفع',
  'dashboard.recentMovements': 'آخر الحركات',
  'dashboard.projectProgress': 'تقدم المشاريع',
  'dashboard.ref': 'المرجع',
  'dashboard.cargo': 'البضاعة',
  'dashboard.type': 'النوع',
  'dashboard.from': 'من',
  'dashboard.to': 'إلى',

  // ===== Dashboard Welcome Guide =====
  'welcome.title': 'مرحباً بك في نظام إدارة المستودعات',
  'welcome.subtitle': 'نظام شامل لإدارة العمليات الثقيلة وبضائع المشاريع',
  'welcome.guideStep1.title': 'البضائع',
  'welcome.guideStep1.description': 'إدارة وتتبع جميع البضائع في المستودع (إضافة، تعديل، حذف، بحث)',
  'welcome.guideStep2.title': 'المشاريع',
  'welcome.guideStep2.description': 'تتبع مشاريع الشحن ومراحل تقدمها',
  'welcome.guideStep3.title': 'المواقع',
  'welcome.guideStep3.description': 'إدارة مواقع التخزين (ساحات، مستودعات، أرصفة)',
  'welcome.guideStep4.title': 'المعدات',
  'welcome.guideStep4.description': 'تتبع الرافعات ومعدات الرفع والشهادات',
  'welcome.guideStep5.title': 'الحركات',
  'welcome.guideStep5.description': 'سجل كامل لجميع حركات البضائع (استلام، نقل، إرسال، فحص)',

  // ===== Cargo Page =====
  'cargo.title': 'البضائع',
  'cargo.subtitle': 'إدارة جميع البضائع في المستودع',
  'cargo.addCargo': 'إضافة بضاعة',
  'cargo.searchPlaceholder': 'بحث بالرمز، الوصف...',
  'cargo.table.code': 'الرمز',
  'cargo.table.description': 'الوصف',
  'cargo.table.weight': 'الوزن (كجم)',
  'cargo.table.dimensions': 'الأبعاد (ط×ع×ا)',
  'cargo.table.category': 'الفئة',
  'cargo.table.status': 'الحالة',
  'cargo.table.location': 'الموقع',
  'cargo.table.project': 'المشروع',
  'cargo.table.actions': 'إجراءات',
  'cargo.noCargoFound': 'لا توجد بضائع',
  'cargo.editCargo': 'تعديل بضاعة',
  'cargo.addNewCargo': 'إضافة بضاعة جديدة',
  'cargo.form.description': 'الوصف *',
  'cargo.form.weight': 'الوزن (كجم) *',
  'cargo.form.dimensions': 'الأبعاد (م)',
  'cargo.form.liftCategory': 'فئة الرفع *',
  'cargo.form.commodityType': 'نوع السلعة *',
  'cargo.form.project': 'المشروع',
  'cargo.form.clientName': 'اسم العميل',
  'cargo.form.poReference': 'مرجع أمر الشراء',
  'cargo.form.blReference': 'مرجع بوليصة الشحن',
  'cargo.form.centerOfGravity': 'مركز الثقل',
  'cargo.form.cogPlaceholder': 'مثال: 5.2م من القاعدة',
  'cargo.form.liftingPoints': 'نقاط الرفع',
  'cargo.form.liftingPointsPlaceholder': 'عدد النقاط',
  'cargo.form.specialHandling': 'معالجة خاصة',
  'cargo.form.specialHandlingPlaceholder': 'أي متطلبات معالجة خاصة...',
  'cargo.details.title': 'تفاصيل البضاعة —',
  'cargo.details.description': 'الوصف:',
  'cargo.details.weight': 'الوزن:',
  'cargo.details.dimensions': 'الأبعاد:',
  'cargo.details.category': 'الفئة:',
  'cargo.details.status': 'الحالة:',
  'cargo.details.location': 'الموقع:',
  'cargo.details.project': 'المشروع:',
  'cargo.details.commodity': 'السلعة:',
  'cargo.details.client': 'العميل:',
  'cargo.details.poRef': 'مرجع أ.ش:',
  'cargo.details.blRef': 'مرجع ب.ش:',
  'cargo.details.cog': 'مركز الثقل:',
  'cargo.details.liftingPoints': 'نقاط الرفع:',
  'cargo.details.specialHandling': 'معالجة خاصة:',
  'cargo.details.unassigned': 'غير معيّن',
  'cargo.delete.message': 'هل أنت متأكد من حذف',
  'cargo.delete.cannotUndo': '؟ لا يمكن التراجع عن هذا الإجراء.',
  'cargo.toast.fetchFailed': 'فشل في جلب البضائع',
  'cargo.toast.created': 'تم إنشاء البضاعة',
  'cargo.toast.updated': 'تم تحديث البضاعة',
  'cargo.toast.deleted': 'تم حذف البضاعة',
  'cargo.toast.deleteFailed': 'فشل في حذف البضاعة',
  'cargo.toast.saveFailed': 'فشل في الحفظ',

  // ===== Projects Page =====
  'projects.title': 'المشاريع',
  'projects.subtitle': 'تتبع بضائع المشاريع والشحنات',
  'projects.addProject': 'إضافة مشروع',
  'projects.backToProjects': 'العودة إلى المشاريع',
  'projects.cargoItems': 'بضائع المشروع',
  'projects.noCargoItems': 'لا توجد بضائع',
  'projects.noProjectsFound': 'لا توجد مشاريع',
  'projects.table.code': 'الرمز',
  'projects.table.description': 'الوصف',
  'projects.table.weight': 'الوزن (كجم)',
  'projects.table.category': 'الفئة',
  'projects.table.status': 'الحالة',
  'projects.table.location': 'الموقع',
  'projects.card.items': 'عناصر',
  'projects.card.weight': 'طن',
  'projects.card.vol': 'حجم',
  'projects.card.itemsLabel': 'العناصر:',
  'projects.card.weightLabel': 'الوزن:',
  'projects.card.volLabel': 'الحجم:',
  'projects.tbd': 'غير محدد',
  'projects.addNewProject': 'إضافة مشروع جديد',
  'projects.form.projectName': 'اسم المشروع *',
  'projects.form.description': 'الوصف',
  'projects.form.clientName': 'اسم العميل *',
  'projects.form.clientContact': 'تواصل العميل',
  'projects.form.destination': 'الوجهة',
  'projects.form.shippingLine': 'خط الملاحة',
  'projects.form.vesselName': 'اسم السفينة',
  'projects.form.etd': 'تاريخ المغادرة',
  'projects.form.eta': 'تاريخ الوصول',
  'projects.toast.fetchFailed': 'فشل في جلب المشاريع',
  'projects.toast.created': 'تم إنشاء المشروع',
  'projects.toast.createFailed': 'فشل في إنشاء المشروع',
  'projects.toast.cargoFetchFailed': 'فشل في جلب بضائع المشروع',

  // ===== Locations Page =====
  'locations.title': 'المواقع',
  'locations.subtitle': 'إدارة مواقع المستودعات والساحات',
  'locations.addLocation': 'إضافة موقع',
  'locations.allTypes': 'جميع الأنواع',
  'locations.noLocationsFound': 'لا توجد مواقع',
  'locations.card.zone': 'المنطقة',
  'locations.card.capacity': 'السعة',
  'locations.card.dimensions': 'الأبعاد',
  'locations.card.area': 'المساحة',
  'locations.card.items': 'عناصر',
  'locations.card.load': 'التحميل',
  'locations.editLocation': 'تعديل موقع',
  'locations.addNewLocation': 'إضافة موقع جديد',
  'locations.form.code': 'الرمز *',
  'locations.form.name': 'الاسم *',
  'locations.form.type': 'النوع *',
  'locations.form.zone': 'المنطقة',
  'locations.form.maxWeight': 'الوزن الأقصى (طن)',
  'locations.form.maxDimension': 'البعد الأقصى',
  'locations.form.maxDimensionPlaceholder': 'مثال: 50×30×25',
  'locations.form.area': 'المساحة (م²)',
  'locations.form.active': 'نشط',
  'locations.delete.message': 'حذف الموقع',
  'locations.delete.warning': '؟ لا يمكن حذف المواقع التي تحتوي على بضائع.',
  'locations.toast.fetchFailed': 'فشل في جلب المواقع',
  'locations.toast.created': 'تم إنشاء الموقع',
  'locations.toast.updated': 'تم تحديث الموقع',
  'locations.toast.deleted': 'تم حذف الموقع',
  'locations.toast.deleteFailed': 'فشل في حذف الموقع',

  // ===== Equipment Page =====
  'equipment.title': 'المعدات',
  'equipment.subtitle': 'إدارة الرافعات والرافعات الشوكية وأدوات الرفع',
  'equipment.addEquipment': 'إضافة معدات',
  'equipment.noEquipmentFound': 'لا توجد معدات',
  'equipment.table.code': 'الرمز',
  'equipment.table.name': 'الاسم',
  'equipment.table.type': 'النوع',
  'equipment.table.capacity': 'السعة',
  'equipment.table.manufacturer': 'الشركة المصنعة',
  'equipment.table.status': 'الحالة',
  'equipment.table.location': 'الموقع',
  'equipment.table.certExpiry': 'انتهاء الشهادة',
  'equipment.table.actions': 'إجراءات',
  'equipment.certExpired': 'الشهادة منتهية',
  'equipment.certExpiringSoon': 'تنتهي خلال 30 يوم',
  'equipment.editEquipment': 'تعديل المعدات',
  'equipment.addNewEquipment': 'إضافة معدات جديدة',
  'equipment.form.name': 'الاسم *',
  'equipment.form.type': 'النوع *',
  'equipment.form.capacity': 'السعة (طن)',
  'equipment.form.status': 'الحالة *',
  'equipment.form.manufacturer': 'الشركة المصنعة',
  'equipment.form.model': 'الموديل',
  'equipment.form.serialNumber': 'الرقم التسلسلي',
  'equipment.form.currentLocation': 'الموقع الحالي',
  'equipment.form.lastInspection': 'آخر فحص',
  'equipment.form.nextInspection': 'الفحص القادم',
  'equipment.form.certificationId': 'رقم الشهادة',
  'equipment.form.certExpiry': 'انتهاء الشهادة',
  'equipment.delete.message': 'حذف المعدات',
  'equipment.delete.cannotUndo': '؟ لا يمكن التراجع عن هذا الإجراء.',
  'equipment.toast.fetchFailed': 'فشل في جلب المعدات',
  'equipment.toast.created': 'تم إنشاء المعدات',
  'equipment.toast.updated': 'تم تحديث المعدات',
  'equipment.toast.deleted': 'تم حذف المعدات',
  'equipment.toast.deleteFailed': 'فشل في حذف المعدات',

  // ===== Movements Page =====
  'movements.title': 'الحركات',
  'movements.subtitle': 'سجل الحركات وآثار التدقيق',
  'movements.recordMovement': 'تسجيل حركة',
  'movements.searchPlaceholder': 'رمز البضاعة...',
  'movements.table.ref': 'المرجع',
  'movements.table.dateTime': 'التاريخ/الوقت',
  'movements.table.cargo': 'البضاعة',
  'movements.table.type': 'النوع',
  'movements.table.from': 'من',
  'movements.table.to': 'إلى',
  'movements.table.equipment': 'المعدات',
  'movements.table.operator': 'المشغّل',
  'movements.table.weight': 'الوزن',
  'movements.table.remarks': 'ملاحظات',
  'movements.noMovementsFound': 'لا توجد حركات',
  'movements.recordNewMovement': 'تسجيل حركة جديدة',
  'movements.form.cargoItem': 'البضاعة *',
  'movements.form.cargoPlaceholder': 'بحث واختيار بضاعة...',
  'movements.form.movementType': 'نوع الحركة *',
  'movements.form.liftMethod': 'طريقة الرفع',
  'movements.form.liftMethodPlaceholder': 'مثال: رافعة، رافعة شوكية',
  'movements.form.fromLocation': 'من موقع',
  'movements.form.toLocation': 'إلى موقع',
  'movements.form.equipmentUsed': 'المعدات المستخدمة',
  'movements.form.operatorName': 'المشغّل',
  'movements.form.actualWeight': 'الوزن الفعلي (كجم)',
  'movements.form.remarks': 'ملاحظات',
  'movements.form.remarksPlaceholder': 'ملاحظات اختيارية...',
  'movements.toast.fetchFailed': 'فشل في جلب الحركات',
  'movements.toast.recorded': 'تم تسجيل الحركة',
  'movements.toast.recordFailed': 'فشل في تسجيل الحركة',

  // ===== Integration Page =====
  'integration.title': 'تكامل SAP',
  'integration.subtitle': 'تكوين الاتصال القائم على الأحداث مع SAP',
  'integration.saveConfiguration': 'حفظ الإعدادات',
  'integration.eventDrivenTitle': 'بنية قائمة على الأحداث',
  'integration.eventDrivenDesc': 'يستخدم نظام إدارة المستودعات نمطاً قائماً على الأحداث للمزامنة مع SAP. كل عملية بضاعة (استلام، نقل، إرسال) تُفعّل حدثاً صادراً يتم تعيينه إلى نقطة النهاية المقابلة في SAP. هذا يضمن اتساق البيانات في الوقت الفعلي بين نظام إدارة المستودعات و SAP ERP بدون تأخير المعالجة الدفعية.',
  'integration.syncHealth': 'صحة المزامنة',
  'integration.successful': 'ناجح',
  'integration.failed': 'فاشل',
  'integration.connectionConfig': 'تكوين اتصال SAP',
  'integration.connectionConfigDesc': 'تكوين الاتصال بنظام SAP ERP الخاص بك',
  'integration.form.endpoint': 'نقطة نهاية SAP',
  'integration.form.authMethod': 'طريقة المصادقة',
  'integration.form.apiKey': 'مفتاح API',
  'integration.form.protocol': 'البروتوكول',
  'integration.form.sapSystemId': 'معرّف نظام SAP',
  'integration.form.client': 'العميل',
  'integration.form.enableSync': 'تفعيل مزامنة SAP',
  'integration.eventMapping': 'تعيين الأحداث',
  'integration.eventMappingDesc': 'تعيين أحداث النظام إلى نقاط نهاية SAP',
  'integration.table.eventType': 'نوع الحدث',
  'integration.table.sapEndpoint': 'نقطة نهاية SAP',
  'integration.table.method': 'الطريقة',
  'integration.table.enabled': 'مفعّل',
  'integration.syncLog': 'سجل المزامنة',
  'integration.syncLogDesc': 'نشاط المزامنة الأخير',
  'integration.table.event': 'الحدث',
  'integration.table.direction': 'الاتجاه',
  'integration.table.timestamp': 'الطابع الزمني',
  'integration.table.retries': 'إعادة المحاولات',
  'integration.toast.configSaved': 'تم حفظ إعدادات SAP (عرض تجريبي)',
  'integration.toast.mappingToggled': 'تم تعيين الحدث',
  'integration.toast.logRefreshed': 'تم تحديث سجل المزامنة (عرض تجريبي)',
  'integration.direction.outbound': 'النظام ← SAP',
  'integration.direction.inbound': 'SAP ← النظام',
};

// ==================== HELPER: Translate enum values ====================

const statusMap: Record<string, string> = {
  IN_YARD: 'status.IN_YARD',
  IN_WAREHOUSE: 'status.IN_WAREHOUSE',
  IN_TRANSIT: 'status.IN_TRANSIT',
  RECEIVED: 'status.RECEIVED',
  DISPATCHED: 'status.DISPATCHED',
  DELIVERED: 'status.DELIVERED',
  PLANNED: 'status.PLANNED',
  RECEIVING: 'status.RECEIVING',
  IN_STORAGE: 'status.IN_STORAGE',
  STAGING: 'status.STAGING',
  LOADED: 'status.LOADED',
  SHIPPED: 'status.SHIPPED',
  COMPLETED: 'status.COMPLETED',
  AVAILABLE: 'status.AVAILABLE',
  IN_USE: 'status.IN_USE',
  MAINTENANCE: 'status.MAINTENANCE',
  OUT_OF_SERVICE: 'status.OUT_OF_SERVICE',
};

const categoryMap: Record<string, string> = {
  HEAVY_LIFT: 'category.HEAVY_LIFT',
  OVERSIZE: 'category.OVERSIZE',
  STANDARD: 'category.STANDARD',
  PROJECT_CARGO: 'category.PROJECT_CARGO',
};

const commodityMap: Record<string, string> = {
  GENERAL: 'commodity.GENERAL',
  MACHINERY: 'commodity.MACHINERY',
  STEEL: 'commodity.STEEL',
  EQUIPMENT: 'commodity.EQUIPMENT',
  MODULE: 'commodity.MODULE',
};

const equipmentTypeMap: Record<string, string> = {
  CRANE: 'equipmentType.CRANE',
  FORKLIFT: 'equipmentType.FORKLIFT',
  SPREADER_BAR: 'equipmentType.SPREADER_BAR',
  SLING: 'equipmentType.SLING',
  SHACKLE: 'equipmentType.SHACKLE',
  BEAM: 'equipmentType.BEAM',
  JACK: 'equipmentType.JACK',
  ROLLER: 'equipmentType.ROLLER',
};

const movementTypeMap: Record<string, string> = {
  RECEIVE: 'movementType.RECEIVE',
  MOVE: 'movementType.MOVE',
  DISPATCH: 'movementType.DISPATCH',
  INSPECT: 'movementType.INSPECT',
};

const locationTypeMap: Record<string, string> = {
  YARD: 'locationType.YARD',
  WAREHOUSE: 'locationType.WAREHOUSE',
  OPEN_AREA: 'locationType.OPEN_AREA',
  STAGING: 'locationType.STAGING',
  BERTH: 'locationType.BERTH',
};

const syncStatusMap: Record<string, string> = {
  PENDING: 'syncStatus.PENDING',
  SENT: 'syncStatus.SENT',
  SUCCESS: 'syncStatus.SUCCESS',
  FAILED: 'syncStatus.FAILED',
  RETRYING: 'syncStatus.RETRYING',
};

const syncDirectionMap: Record<string, string> = {
  OUTBOUND: 'syncDirection.OUTBOUND',
  INBOUND: 'syncDirection.INBOUND',
};

// ==================== TRANSLATION FUNCTION ====================

export function translate(key: string, locale: 'ar' | 'en' = 'ar'): string {
  const map = locale === 'en' ? en : translations;
  return map[key] || key;
}

// Convenience helpers for translating enum values
export function translateStatus(value: string, locale?: 'ar' | 'en'): string {
  const key = statusMap[value];
  const map = locale === 'en' ? en : translations;
  return key ? map[key] || value : value;
}

export function translateCategory(value: string, locale?: 'ar' | 'en'): string {
  const key = categoryMap[value];
  const map = locale === 'en' ? en : translations;
  return key ? map[key] || value : value;
}

export function translateCommodity(value: string): string {
  const key = commodityMap[value];
  return key ? translations[key] || value : value;
}

export function translateEquipmentType(value: string): string {
  const key = equipmentTypeMap[value];
  return key ? translations[key] || value : value;
}

export function translateMovementType(value: string, locale?: 'ar' | 'en'): string {
  const key = movementTypeMap[value];
  const map = locale === 'en' ? en : translations;
  return key ? map[key] || value : value;
}

export function translateLocationType(value: string): string {
  const key = locationTypeMap[value];
  return key ? translations[key] || value : value;
}

export function translateSyncStatus(value: string): string {
  const key = syncStatusMap[value];
  return key ? translations[key] || value : value;
}

export function translateSyncDirection(value: string): string {
  const key = syncDirectionMap[value];
  return key ? translations[key] || value : value;
}

// Welcome guide data
export const welcomeGuideSteps = [
  {
    title: translations['welcome.guideStep1.title'],
    description: translations['welcome.guideStep1.description'],
    icon: 'Package' as const,
  },
  {
    title: translations['welcome.guideStep2.title'],
    description: translations['welcome.guideStep2.description'],
    icon: 'FolderKanban' as const,
  },
  {
    title: translations['welcome.guideStep3.title'],
    description: translations['welcome.guideStep3.description'],
    icon: 'MapPin' as const,
  },
  {
    title: translations['welcome.guideStep4.title'],
    description: translations['welcome.guideStep4.description'],
    icon: 'Wrench' as const,
  },
  {
    title: translations['welcome.guideStep5.title'],
    description: translations['welcome.guideStep5.description'],
    icon: 'ArrowLeftRight' as const,
  },
];

// ==================== HOOK ====================

export function useTranslation() {
  const locale = useAppStore((s) => s.locale);
  const translate = useCallback((key: string): string => {
    const map = locale === 'en' ? en : translations;
    return map[key] || key;
  }, [locale]);

  return { t: translate, locale };
}

export default translations;
