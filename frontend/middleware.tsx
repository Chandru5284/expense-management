import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
    const {pathname} = req.nextUrl;
    const isLoggedIn = req.cookies.get('is_logged_in') ? Boolean(req.cookies.get('is_logged_in')) : false

    if (pathname.startsWith("/app")) {
        if(!isLoggedIn){
            return NextResponse.redirect(new URL('/auth/login', req.url))
        }
    }

    if (pathname.startsWith("/auth")) {
        if(isLoggedIn){
            return NextResponse.redirect(new URL('/app', req.url))
        }
    }

    // console.log(isLoggedIn, "====")
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/app/:path*', '/((?!api|_next|.*\\..*).*)']
}

