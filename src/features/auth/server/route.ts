import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { LoginSchema, RegisterSchema } from "../schemas";
const app = new Hono().post(
  "/login",
  zValidator(
    "json",
  LoginSchema
  ),
  async (c) => {
    const{
        email,password
    } = c.req.valid("json")
    console.log({email,password})
    return c.json({ success: "Ok" });
  }
)
.post(
    "/register",
    zValidator(
        "json",
      RegisterSchema
      ),
      async (c) => {
        const{
            email,password,name
        } = c.req.valid("json")
        console.log({email,password,name})
        return c.json({ success: "Registered" });
      }
)
;

export default app;
