import { db } from "@/db/dbClient";
import { insertCity } from "@/db/dbUtils";
import { NewCity } from "@/db/schema";
import { NeonDbError } from "@neondatabase/serverless";

export async function POST(req: Request, ) {
   
  const d = await req.json();
  console.log('Success', d);
  
  const newCity: NewCity = { 
    name: d.name, 
    countryId: d.countryId, 
    popularity: d.popularity 
  };

  try {
    // Insert the new city into the database
    const insertedRecord = await insertCity(newCity);
    return Response.json(insertedRecord, { status: 201 })
  } catch (err) {
    console.error('Error inserting city:', err);
    return Response.json({ 
      errorCode: (err as NeonDbError).code,
      errorName: (err as NeonDbError).name,
      errorMessage: (err as NeonDbError).message, 
      errorSeverity: (err as NeonDbError).severity,
    }, { status: 200 });
  }
}

export async function GET() {
  return Response.json({ 'message':'ok' })
}