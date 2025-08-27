import { getServerSession } from "next-auth";
import { NavBar } from "../components/Navbar";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
// import { useSession } from "next-auth/react";


export default async  function(){
    // const session = useSession();
    const session = await getServerSession(authOptions);
    if (!session){
        redirect("/signin")
    }
    return(
        <div className="">

        <NavBar />
        <div>
            Session is:
            <br />

            {JSON.stringify(session)}
        </div>
        </div>
    )
}