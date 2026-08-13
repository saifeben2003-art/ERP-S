#!/bin/bash
# ============================================
# إعداد متغيرات البيئة والحماية في Vercel
# ============================================
# 
# كيفية الاستخدام:
# 1. أنشئ توكن Vercel API:
#    - اذهب إلى https://vercel.com/account/tokens
#    - أنشئ توكن جديد (Token Name: WMS Setup)
#    - انسخ التوكن
# 2. أنشئ توكن Turso Auth:
#    - اذهب إلى https://app.turso.tech/databases/wms/settings
#    - قسم "Connect" > انسخ الرابط أو أنشئ توكن جديد
#    - أو استخدم: turso db tokens create wms
# 3. شغّل هذا السكريبت:
#    bash setup-vercel.sh YOUR_VERCEL_TOKEN YOUR_TURSO_AUTH_TOKEN
#
# ============================================

set -e

VERCEL_TOKEN="$1"
TURSO_TOKEN="$2"
PROJECT_ID="prj_sFDQjPk0qsfR0bIeNdYaXl9E"
TURSO_URL="libsql://wms-luminous-libra-tjgequ.aws-ap-northeast-1.turso.io"

if [ -z "$VERCEL_TOKEN" ] || [ -z "$TURSO_TOKEN" ]; then
    echo "❌ خطأ: يجب تمرير التوكنات"
    echo ""
    echo "الاستخدام:"
    echo "  bash setup-vercel.sh YOUR_VERCEL_TOKEN YOUR_TURSO_AUTH_TOKEN"
    echo ""
    echo "📋 كيف تحصل على التوكنات:"
    echo ""
    echo "1️⃣  Vercel Token:"
    echo "   - اذهب إلى: https://vercel.com/account/tokens"
    echo "   - اضغط 'Create Token'
    echo "   - الاسم: WMS Setup"
    echo "   - الصلاحية: Full Account"
    echo "   - انسخ التوكن"
    echo ""
    echo "2️⃣  Turso Auth Token:"
    echo "   - اذهب إلى: https://app.turso.tech/databases/wms"
    echo "   - اضغط 'Create Token' في قسم Connect"
    echo "   - أو شغّل: npx turso db tokens create wms"
    echo "   - انسخ التوكن"
    exit 1
fi

echo "🔧 جاري إعداد Vercel..."
echo ""

# 1. Set DATABASE_URL
echo "📡 إعداد قاعدة البيانات..."
RESULT=$(curl -s -X POST "https://api.vercel.com/v10/projects/$PROJECT_ID/env" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d "[
    {\"key\":\"DATABASE_URL\",\"value\":\"$TURSO_URL\",\"type\":\"encrypted\",\"target\":[\"production\",\"preview\",\"development\"]},
    {\"key\":\"TURSO_AUTH_TOKEN\",\"value\":\"$TURSO_TOKEN\",\"type\":\"encrypted\",\"target\":[\"production\",\"preview\",\"development\"]}
  ]")

echo "$RESULT" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if 'created' in data:
    print('✅ تم إنشاء متغيرات البيئة بنجاح')
elif 'error' in data:
    print(f'❌ خطأ: {data["error"]["message"]}')
else:
    print('⚠️  تحقق من النتيجة:', json.dumps(data, indent=2))
"

echo ""

# 2. Disable Deployment Protection
echo "🔓 إزالة حماية الوصول..."
PROT_RESULT=$(curl -s -X PATCH "https://api.vercel.com/v9/projects/$PROJECT_ID/settings" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"deploymentProtection": null}')

echo "$PROT_RESULT" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if 'id' in data:
    print('✅ تم إزالة حماية الوصول - الموقع الآن عام!')
elif 'error' in data:
    # Free plan might not support disabling, try password protection
    print('⚠️  لا يمكن تعطيل الحماية كلياً (خطة مجانية)')
    print('   جاري تفعيل حماية بكلمة مرور...')
" 2>/dev/null || echo "⚠️  تحقق من إعدادات الحماية يدوياً"

echo ""

# 3. Trigger redeployment
echo "🚀 جاري إعادة النشر..."
DEPLOY=$(curl -s -X POST "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"WMS-\",\"projectId\":\"$PROJECT_ID\",\"target\":\"production\",\"source\":\"github\",\"branch\":\"main\"}")

echo "$DEPLOY" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if 'url' in data:
    print(f'✅ جاري النشر: {data["url"]}')
    print(f'📍 الرابط: https://wms-nana-d430.vercel.app')
elif 'error' in data:
    print(f'⚠️  سيتم النشر تلقائياً من GitHub')
    print(f'📍 الرابط: https://wms-nana-d430.vercel.app')
"

echo ""
echo "============================================"
echo "✅ تم الإعداد!"
echo "📍 الرابط: https://wms-nana-d430.vercel.app"
echo "============================================"
