import { countries, NewCountry } from "@/db/schema";
import { db } from "@/db/dbClient";
import { insertCountry } from "@/db/dbUtils";
import { NeonDbError } from "@neondatabase/serverless";

export async function POST(req: Request, ) {
  //https://domain/api/countries
  //POST
  
  //Insert country into the country tables into the database
   
  const d = await req.json();
  console.log('Success', d);
    
  const NewCountry: NewCountry = { name: d.name, isocode: d.isocode };
  
  try {
    const insertedRecord= await insertCountry(NewCountry);
    return Response.json(insertedRecord, { status: 201 })
  } catch(err ) {
    console.error(err);
    return Response.json({ 
      errorCode: (err as NeonDbError).code,
      errorName: (err as NeonDbError).name,
      errorMessage: (err as NeonDbError).message, 
      errorSeverity: (err as NeonDbError).severity,
    }, { status: 200 });
  }
}


// Fetch all countries
export async function GET() {
  try {
    const allCountries = await db.select().from(countries);
    return Response.json(allCountries, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Failed to fetch countries' }, { status: 500 });
  }
}

function selectCountries() {
  throw new Error("Function not implemented.");
}
