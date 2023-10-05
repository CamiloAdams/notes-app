import { Router } from "express";

import * as cookiesCtrl from "../controllers/cookies.controller";

const router = Router();


router.get("/getcookie",  cookiesCtrl.getCookie);
router.get("/setcookie",  cookiesCtrl.setCookie);
router.get("/deletecookie",  cookiesCtrl.deleteCookie);


export default router;
