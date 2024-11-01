import { useState, useEffect } from "react";
import { FaHtml5, FaCss3, FaJs } from "react-icons/fa";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import Alert from "../components/Alert";
import { Logo } from "../assets";

const NewProject = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");
  const [title, setTitle] = useState("Untitled");
  const [alert, setAlert] = useState(false);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    updateOutput();
  }, [html, css, js]);

  const updateOutput = () => {
    const combinedOutput = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}<\/script>
      </body>
    </html>
    `;
    setOutput(combinedOutput);
  };

  const saveCodePen = async () => {
    const id = `${Date.now()}`;
    const projectData = {
      id,
      title,
      html,
      css,
      js,
      output,
      user,
    };

    try {
      await setDoc(doc(db, "Projects", id), projectData);
      setAlert(true);
      setTimeout(() => setAlert(false), 2000);
    } catch (err) {
      console.error("Error saving project:", err);
    }
  };

  const renderEditor = (language) => {
    switch (language) {
      case "HTML":
        return (
          <CodeMirror
            value={html}
            height="420px"
            theme={"dark"}
            extensions={[javascript({ jsx: true })]}
            onChange={(value) => setHtml(value)}
          />
        );
      case "CSS":
        return (
          <CodeMirror
            value={css}
            height="420px"
            theme={"dark"}
            extensions={[javascript({ jsx: true })]}
            onChange={(value) => setCss(value)}
          />
        );
      case "JS":
        return (
          <CodeMirror
            value={js}
            height="420px"
            theme={"dark"}
            extensions={[javascript({ jsx: true })]}
            onChange={(value) => setJs(value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">
      <AnimatePresence>
        {alert && <Alert status={"Success"} alertMsg={"Project Saved..."} />}
      </AnimatePresence>

      <header className="w-full flex items-center justify-between px-12 py-4">
        <div className="flex items-center gap-6">
          <Link to="/home">
            <img src={Logo} alt="logo" className="w-64" />
          </Link>
          <input
            type="text"
            placeholder="Project Title"
            className="bg-transparent text-white px-3 py-2 rounded-md outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {user && (
          <div className="flex items-center gap-4">
            <motion.button
              onClick={saveCodePen}
              whileTap={{ scale: 0.9 }}
              className="bg-primary px-6 py-2 text-white font-semibold rounded-md"
            >
              Save
            </motion.button>
          </div>
        )}
      </header>

      <div className="flex w-full flex-grow overflow-hidden">
        <div className="flex flex-col w-full py-1">
          <div className="flex  flex-grow">
            <div className="w-1/3 border-r">
              <div className="flex border-b p-2 bg-gray-800 text-white">
                <FaHtml5 className="mr-2" /> HTML
              </div>
              {renderEditor("HTML")}
            </div>
            <div className="w-1/3 border-r">
              <div className="flex border-b p-2 bg-gray-800 text-white">
                <FaCss3 className="mr-2" /> CSS
              </div>
              {renderEditor("CSS")}
            </div>
            <div className="w-1/3">
              <div className="flex border-b p-2 bg-gray-800 text-white">
                <FaJs className="mr-2" /> JS
              </div>
              {renderEditor("JS")}
            </div>
          </div>
          <div className="flex-grow  bg-white"  style={{ overflowY: "auto", height: "100%" }}>
            <iframe
              title="Output"
              srcDoc={output}
              style={{ border: "none", width: "100%", height: "100%" , overflow: "auto" }}

            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
