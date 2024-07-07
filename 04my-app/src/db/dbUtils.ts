import { countries , Country, NewCountry } from "@/db/schema";
import { cities, NewCity } from "@/db/schema";
import { db } from "@/db/dbClient";
import { eq, like } from "drizzle-orm";

export const insertCountry = async (country : NewCountry) => {
  const r =  await db.insert(countries).values(country).returning();
  console.log(JSON.stringify(r));
  
  return r;
}

// export const selectCountries = async(startsWith: string, 
//                                       endsWith: string, 
//                                       searchTerm: string, 
//                                       pageNum: string, 
//                                       pageSize: string) => {

//   let r;
//   if (searchTerm) {
//     r =  await db.select().from(countries).where(like(countries.name, searchTerm));
//   } 
//   if (startsWith)  {
//     r =  await db.select().from(countries).where(like(countries.name, `${startsWith}%`));
//   }
//   if (endsWith)  {
//     r =  await db.select().from(countries).where(like(countries.name, `%${endsWith}`));
//   }
  // if (pageNum) {
  //   // r = 
  // }
  // console.log(JSON.stringify(r));
// sql('SELECT * FROM countries ')
//   return r;
// }c

export const selectCountry = async(countryId: number) => {
  const r =  await db.select().from(countries).where(eq(countries.id, countryId)).execute();
  console.log(JSON.stringify(r));

  return r;
}

export const updateCountry = async (countryId: number, country: Country) => {
  const r = await db.update(countries)
  .set({ name: country.name, isocode: country.isocode })
  .where(eq(countries.id, countryId))
  .returning();

  console.log(JSON.stringify(r));

  return r;
}

export const deleteCountry = async(countryId: number) => {
  const r = await db.delete(countries).where(eq(countries.id, countryId)).returning();

  console.log(JSON.stringify(r));

  return r;
}

export async function insertCity(newCity: NewCity) {
    const r = await db.insert(cities).values(newCity).returning();
    console.log(JSON.stringify(r));

    return r;
}
