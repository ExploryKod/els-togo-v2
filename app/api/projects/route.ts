import { NextRequest, NextResponse } from "next/server";
import {generateUniqueFilename} from "@/utils/validations/stringManipulation";
import path from "path";
import fs from "fs";
import {createClient} from "@/utils/supabase/client";
import {useState} from "react";
import {revalidatePath} from "next/cache";
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest) {
    //const supabase = createClient()

    try {
        //const { data } = await supabase.from('projects').select()
        //console.log(data);
        const SERVER_PATH = process.env.NEXT_PUBLIC_MOD !== 'production' ? process.env.ROOT_DEV : process.env.ROOT_PATH
        let data = await fetch(SERVER_PATH + '/front-projects.json')
        let projects = await data.json()
        revalidatePath('/api/projects');
        return NextResponse.json(projects);
    } catch(error) {
        console.error(error)
        return NextResponse.json(error);
    }
}
