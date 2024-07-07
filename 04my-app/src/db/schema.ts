import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

// declaring enum in database
export const popularityEnum = pgEnum('popularity', ['unknown', 'known', 'popular']);

export const countries = pgTable('countries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  isocode: varchar('isocode', { length: 2}),
}, 
(countries) => {
  return {
    nameIndex: uniqueIndex('name_idx').on(countries.name),
  }
});

export type Country = typeof countries.$inferSelect;
export type NewCountry = typeof countries.$inferInsert;



export const cities = pgTable('cities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  countryId: integer('country_id').references(() => countries.id),
  popularity: popularityEnum('popularity'),
},
(cities) => {
  return {
    nameIndex: uniqueIndex('name_idx').on(cities.name),
  }
}
);

export type City = typeof cities.$inferSelect;
export type NewCity = typeof cities.$inferInsert;

