import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware"



export function middleware(req: NextRequest){
 
    const path = req.nextUrl.pathname;
    const isPublicPath = path === '/signin' || path === '/signup';

    const token = req.cookies.get("next-auth.session-token")?.value || "";
    if (isPublicPath && token ){
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    };

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/signin', req.nextUrl));
    };

};


export const config = {
  matcher: [
    '/signin',
    "/signup",
    "/dashboard",
  ],
};