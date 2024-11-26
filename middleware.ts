import { NextRequest, NextResponse } from 'next/server';

const legacyPrefixes = ['/kb']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (legacyPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    if (pathname === '/kb') {
      return NextResponse.redirect(req.nextUrl.toString() + '/', 308)
    }
    return NextResponse.next()
  }

  // remove trailing slash if present
  if (pathname.endsWith('/') && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(req.nextUrl.toString().slice(0, -1))
  }
}
