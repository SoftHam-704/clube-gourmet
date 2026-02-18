import { auth } from '../src/api/auth.js';
import { toNodeHandler } from "better-auth/node";

export default toNodeHandler(auth);
