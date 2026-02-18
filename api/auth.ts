import { auth } from '../src/api/auth';
import { toNodeHandler } from "better-auth/node";

export default toNodeHandler(auth);
