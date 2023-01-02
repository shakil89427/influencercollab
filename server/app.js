const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const nodemailer = require("nodemailer");
const { validate } = require("email-validator");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.post("/subscribe", async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: "shivanshi@influencercollab.in",
        pass: "Flytant96@!",
      },
    });
    let mailOption = {
      from: "shivanshi@influencercollab.in",
      to: "contact@influencercollab.in",
      subject: "Subscribed email",
      text: req.body.email,
    };
    await transporter.sendMail(mailOption);
    res.send("success");
  } catch (err) {
    res.status(404).send("Failed");
  }
});

app.post("/sendemails", async (req, res) => {
  const from = req?.body?.from || false;
  const subject = req?.body?.subject || false;
  const template = req?.body?.template || false;
  const receivers = req?.body?.receivers || false;

  if (!from || !subject || !template || !receivers) {
    res.status(400).send("Something went wrong");
    return;
  }

  const send = async (receiver) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: from,
        pass: "Flytant96@!",
      },
    });
    let mailOption = {
      from,
      to: receiver,
      subject,
      html: template,
    };
    try {
      await transporter.sendMail(mailOption);
      return { status: true, receiver };
    } catch (err) {
      return { status: false, receiver };
    }
  };

  let promises = [];
  receivers?.forEach((receiver) => {
    if (validate(receiver)) {
      promises.push(send(receiver));
    }
  });
  if (promises.length < 1) {
    res.status(400).send("Something went wrong");
    return;
  }
  try {
    const response = await Promise.allSettled(promises);
    const final = response.map((item) => item?.value);
    res.send(final);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
});
