import { auth } from '../src/api/auth.ts';
import { toNodeHandler } from "better-auth/node";

export default toNodeHandler(auth);
