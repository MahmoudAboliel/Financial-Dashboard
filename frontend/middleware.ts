// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/'];
const authRoutes = ['/login', '/sign-up', '/reset-password'];
const protectedRoutes = ['/profile', '/settings']; 

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 2. التحقق من حالة المستخدم (محاكاة - سنقوم بتطويرها لاحقاً)
  // هنا سنفترض أننا نستطيع جلب معلومات الجلسة
  const isLoggedIn = false; // <-- سيتم استبدالها بمنطق حقيقي لقراءة الكوكيز أو التوكن

  // --- منطق إعادة التوجيه للصفحة الرئيسية ---
  // إذا كان المسار هو '/'، قم بإعادة التوجيه إلى /dashboard
  if (publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // --- منطق حماية المسارات ---
  // إذا كان المسار محمياً والمستخدم غير مسجل الدخول، قم بإعادة التوجيه إلى /login
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // --- منطق منع الوصول لمسارات المصادقة بعد تسجيل الدخول ---
  // إذا كان المستخدم مسجلاً الدخول ويحاول الوصول لصفحة تسجيل الدخول، أعده إلى /dashboard
  if (authRoutes.some((route) => pathname.startsWith(route)) && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // إذا لم يستوفِ الطلب أي شرط، استمر في المعالجة كالمعتاد.
  return NextResponse.next();
}

// 3. تكوين "matcher" لتحديد المسارات التي سيعمل عليها الـ Middleware
// هذا يضمن أنه لا يعمل على الملفات الثابتة أو مسارات API (لمراعاة الأداء)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};