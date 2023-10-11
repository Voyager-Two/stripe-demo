import { supabase } from "@app/utils/supabaseClient";

// export const config = {
//   runtime: "experimental-edge",
// };

export default async function handler(req: { body: any }, res: any) {
  // TODO: data validation
  // const allowedParams = ["item_name", "artist_name", "price", "image_url"];
  // const params: any = [];
  //
  // req.body.forEach((value, key) => {
  //   if (allowedParams.includes(key)) {
  //     params[key] = value;
  //   }
  // });

  const { data: dbResults, error: dbError } = await supabase
    .from("marketplace_seller_listings")
    .insert(req.body).select();

  if (dbError) {
    console.log(dbError);
    return res.status(500).send({ error: "Database error." });
  }

  return res.status(200).send({ data: { success: true, listing: dbResults[0] } });
}
