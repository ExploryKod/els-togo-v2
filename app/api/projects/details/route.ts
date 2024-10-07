import { NextRequest, NextResponse } from "next/server";
import {revalidatePath} from "next/cache";
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest) {
    //const supabase = createClient()

    try {
        //const { data } = await supabase.from('projects').select()
        //console.log(data);

        let data = await fetch('http://localhost:3000/project.json')
        let projects = await data.json()
        revalidatePath('/api/projects/details');
        return NextResponse.json(projects);
    } catch(error) {
        console.error(error)
        return NextResponse.json(error);
    }
}
