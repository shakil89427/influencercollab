import axios from "axios";
import React, { useState } from "react";
import back from "../Assets/back.png";
import Preview from "../Components/Preview/Preview";
import Spinner from "../Components/Spinner/Spinner";
import templateData from "../Static/emailTemplate";
import Result from "../Components/Result/Result";

const styles = {
  title: "text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold",
  emailDiv:
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 mt-14",
  email:
    "bg-black text-white w-full h-14 rounded-lg text-lg font-medium flex items-center justify-center cursor-pointer",
  back: "w-6 lg:w-8 xl:w-10 cursor-pointer",
  form: "mt-14 flex flex-col gap-12",
  label: "md:text-lg lg:text-2xl font-medium",
  input:
    "border-2 border-black outline-none rounded-lg p-3 w-full mt-3 resize-none scrollbar",
  previewDiv: "flex items-center justify-between pr-2",
  previewBtn: "text-[#0038FF] font-medium cursor-pointer",
  send: "bg-black text-white w-48 h-14 rounded-md text-lg font-medium block mx-auto",
};

const Email = () => {
  const [from, setFrom] = useState(false);
  const [subject, setSubject] = useState(
    "Paid Collab | Get Sponsorship From Brands"
  );
  const [template, setTemplate] = useState(templateData);
  const [receivers, setReceivers] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const emails = [
    "shivanshi@influencercollab.in",
    "srishty@influencercollab.in",
    "taarika@influencercollab.in",
    "ashima@influencercollab.in",
    "arman@influencercollab.in",
    "riddhima@influencercollab.in",
    "vansh@influencercollab.in",
    "anaya@influencercollab.in",
    "aditya@influencercollab.in",
    "ankita@influencercollab.in",
  ];

  const send = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const allReceivers = receivers.replace(/\n|\r/g, ",").split(",");
      const { data } = await axios.post(
        "https://flytantemail.herokuapp.com/sendemails",
        {
          from,
          subject,
          template,
          receivers: allReceivers,
        }
      );
      setLoading(false);
      setFrom("");
      setSubject("Paid Collab | Get Sponsorship From Brands");
      setTemplate(templateData);
      setReceivers("");
      setShowResult(data);
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-[1000px] mx-auto px-5 py-10">
      {loading && <Spinner />}
      {showPreview && (
        <Preview template={template} setShowPreview={setShowPreview} />
      )}
      {showResult && (
        <Result showResult={showResult} setShowResult={setShowResult} />
      )}
      {!from && (
        <div>
          <p className={styles.title}>Select Email</p>
          <div className={styles.emailDiv}>
            {emails.map((email) => (
              <p
                onClick={() => setFrom(email)}
                key={email}
                className={styles.email}
              >
                {email}
              </p>
            ))}
          </div>
        </div>
      )}
      {from && (
        <div>
          <div className="flex items-center gap-5">
            <img
              onClick={() => setFrom(false)}
              src={back}
              alt=""
              className={styles.back}
            />
            <p className={styles.title}>Details</p>
          </div>
          <form className={styles.form} onSubmit={send}>
            <div>
              <p className={styles.label}>Subject line</p>
              <input
                required
                type="text"
                className={styles.input}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div>
              <div className={styles.previewDiv}>
                <p className={styles.label}>Add template</p>
                <p
                  className={styles.previewBtn}
                  onClick={() => setShowPreview(true)}
                >
                  Preview
                </p>
              </div>
              <textarea
                required
                rows="15"
                className={styles.input}
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
              />
            </div>
            <div className="">
              <p className={styles.label}>Add Sending emails</p>
              <textarea
                required
                rows="10"
                className={styles.input}
                value={receivers}
                onChange={(e) => setReceivers(e.target.value)}
              />
            </div>
            <button type="submit" className={styles.send}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Email;
