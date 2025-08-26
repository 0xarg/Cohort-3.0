import { getServerSession } from "next-auth";
import { NavBar } from "../components/Navbar";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";

export default async function(){
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