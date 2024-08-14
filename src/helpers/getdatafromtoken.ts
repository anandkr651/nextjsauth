import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getdatafromtoken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedtoken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    return decodedtoken.id; //yaha pe mongodb se id nahi le rehe hai. login wala route mi jab ham tokandata bane the waha id likhe the.  
  } catch (error: any) {
    throw new Error(error.message);
  }
};
