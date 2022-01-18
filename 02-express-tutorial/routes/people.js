const express = require("express");
const router = express.Router();
const {
  getPeople,
  createPeople,
  createPeoplePostman,
  updatePeople,
  deletePeople,
} = require("../controller/people");

// router.get("/", getPeople);

// router.post("/", createPeople);

// router.post("/postman", createPeoplePostman);

// router.put("/:id", updatePeople);

// router.delete("/:id", deletePeople);

router.route("/").get(getPeople).post(createPeople);
router.route("/postman").post(createPeoplePostman);
router.route("/:id").put(updatePeople).delete(deletePeople);

module.exports = router;
