const Router = require("express").Router;
const { welcome, menu,faq,faqquestions } = require("./handler");

const router = new Router();

// POST: /ivr/welcome
router.post("/welcome", (req, res) => {
  res.send(welcome());
});

// POST: /ivr/menu
router.post("/menu", (req, res) => {
  const digit = req.body.Digits;
  console.log(digit)
  console.log("here")
  return res.send(menu(digit));
});

// // POST: /ivr/planets
// router.post("/planets", (req, res) => {
//   const digit = req.body.Digits;
//   res.send(planets(digit));
// });
// POST: /ivr/faq
// router.post("/faq", (req, res) => {
//   const digit = req.body.Digits;
//   res.send(faq(digit));
// });
// POST: /ivr/faqquestions
router.post("/faqquestions", (req, res) => {

  res.send(faqquestions(req,res, digit));
});

module.exports = router;
