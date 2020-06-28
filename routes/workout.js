const router = require("express").Router();
const Workout = require("../model/Workout");
const Exercise = require("../model/Exercise");
const User = require("../model/User");

//CREATE NEW WORKOUT
router.post("/add", async (req, res) => {
  const UserID = "5ef1f230bcf7331228bf50dd";
  const workout = await new Workout({
    name: req.body.name,
    picture: req.body.picture,
    description: req.body.description,
    ratings: req.body.ratings,
    exercises: req.body.exercises,
    creator: UserID,
  });

  workout.save((err, workout) => {
    if (err) {
      return res.send({ errorcode: "Workout creation failed" });
    } else {
      //   console.log("Saved Workout ID : ", workout.id);
      Exercise.find({ _id: { $in: req.body.exercises } }).exec(
        (err, getExerciseIds) => {
          if (getExerciseIds && !err) {
            getExerciseIds.map((item) => {
              Exercise.findOneAndUpdate(
                { _id: item._id },
                { $push: { workout: workout.id } }
              ).exec((err, res) => {
                if (err) console.log(err);
              });
            });
          }
        }
      );

      User.findOneAndUpdate({ _id: UserID }, { wo_routine: workout.id }).exec(
        (err, res) => {
          if (err) console.log(err);
          else console.log(res);
        }
      );
    }
  });
});
module.exports = router;
