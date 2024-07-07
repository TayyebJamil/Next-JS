// app/api/countries/[country-id]/route.ts
import { db } from "@/db/dbClient";
import { deleteCountry, selectCountry, updateCountry } from "@/db/dbUtils";
import { countries, Country } from "@/db/schema";
import { NeonDbError } from "@neondatabase/serverless";
import { eq } from 'drizzle-orm';

export async function GET(request: Request, 
  { params }: { params: { country_id: string } }) {
  
  try {
    const countryId = parseInt(params.country_id);
    const selectedRecord = await selectCountry(countryId);

    if (selectedRecord.length === 0) {
      return Response.json({ error: "Country not found" }, { status: 404 });
    }

    return Response.json(selectedRecord[0], { status: 200 });
    
  } catch (err) {
    console.error('Error fetching country:', err);
    return new Response(JSON.stringify({ error: "Failed to fetch country" }), { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { country_id: string } }){
  const countryId = parseInt(params.country_id);

  const d = await req.json();
  console.log('Input data:', d);

  const country: Country = { id: countryId, name: d.name, isocode: d.isocode };
  
  try {
    const selectedRecord = await selectCountry(countryId);

    if (selectedRecord.length === 0) {
      return Response.json({ error: "Country not found" }, { status: 404 });
    }  
  } catch(err ) {
    console.error(err);
    return Response.json({ 
      errorCode: (err as NeonDbError).code,
      errorName: (err as NeonDbError).name,
      errorMessage: (err as NeonDbError).message, 
      errorSeverity: (err as NeonDbError).severity,
    }, { status: 200 });
  } 

  try {
    const updatedRecord = await updateCountry(countryId, country);

    return Response.json(updatedRecord[0], { status: 200 });

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

export async function DELETE(req: Request, { params }: { params: { country_id: string } }){
  const countryId = parseInt(params.country_id);

  try {
    const selectedRecord = await selectCountry(countryId);
    
    if (selectedRecord.length === 0) {
      return Response.json({ error: "Country not found" }, { status: 404 });
    }  
  } catch(err ) {
    console.error(err);
    return Response.json({ 
      errorCode: (err as NeonDbError).code,
      errorName: (err as NeonDbError).name,
      errorMessage: (err as NeonDbError).message, 
      errorSeverity: (err as NeonDbError).severity,
    }, { status: 200 });
  } 

  try {
    const { id } = (await deleteCountry(countryId))[0];
    return Response.json({ message: `Country with id ${id} deleted` }, { status: 200 });
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