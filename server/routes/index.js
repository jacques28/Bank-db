import Router from "express";
import 'dotenv/config';


/* GET home page. */
const router = Router();

router.get('/',  (req, res) => {
res.send('hello');
});





export default router;
