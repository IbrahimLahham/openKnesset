import React from "react";
import "./OneMinuteForm.css";
import Subject from "./Subject";
import at from "./Images/at.PNG";
import { Multiselect } from "multiselect-react-dropdown";
import { useState, useEffect } from "react";
import Attachmentfile from "./attachmentfile";

import AttachIcon from "./Images/attach-icon.png";
import AttachmentsIcon from "./Images/attacments-icon.png";
import PeopleIcon from "./Images/people.png";

function OneMinuteForm() {
  const [selectedKnessetMembersList, setSelectedKnessetMembersList] = useState(
    []
  );
  const [allKnessetMembersList, setAllKnessetMembersList] = useState([]);

  const [files, setFiles] = useState([]);

  function handlefile(e) {
    e.preventDefault();
    var files = e.target.files;
    console.log(files);
    var filesArr = Array.prototype.slice.call(files);
    console.log(filesArr);
    setFiles(filesArr);
    console.log("state", files);
  }

  useEffect(() => {
    fetch("/user/getAllKnessetMembers")
      .then((r) => r.json())
      .then((data) => {
        const membersTempList = [];
        data.map((member, index) => {
          membersTempList.push({
            name: member.firstName + " " + member.lastName,
            email: member.email,
          });
        });
        setAllKnessetMembersList([
          ...allKnessetMembersList,
          ...membersTempList,
        ]);
        console.log("allKnessetMembersList: ", allKnessetMembersList);
      });
  }, []);

  const options = [
    { name: "גפני משה", id: 1 },
    { name: "גרמל יעל", id: 2 },
    { name: "דיין עוזי", id: 1 },
    { name: "דיכנטר אבי", id: 2 },
    { name: "Srigar", id: 1 },
    { name: "Sam", id: 2 },
    { name: "Srigar", id: 1 },
    { name: "Sam", id: 2 },
    { name: "Srigar", id: 1 },
    { name: "Sam", id: 2 },
    { name: "Srigar", id: 1 },
    { name: "Sam", id: 2 },
    { name: "Srigar", id: 1 },
    { name: "Sam", id: 2 },
    { name: "Srigar", id: 1 },
    { name: "Sam", id: 2 },
    { name: "Srigar", id: 1 },
    { name: "Sam", id: 2 },
  ];
  function dummy() {
    console.log("hehe");
  }

  async function onSelect(selectedList, selectedItem) {
    await setSelectedKnessetMembersList([
      ...selectedKnessetMembersList,
      selectedItem,
    ]);
    console.log("select invoked, state updated: ", selectedKnessetMembersList);
  }

  function handleForm(e) {
    e.preventDefault();
    const subjectText = e.target.subject.value;
    const description = e.target.description.value;
    const preferredMembers = selectedKnessetMembersList;
    const input = {
      subject: subjectText,
      description: description,
      preferredKnessetMembers: preferredMembers, // [{name: "full name", email: "email@email.com"}]
      toolType: "נאום בן דקה",
      files: files,
    };
    console.log("Input being sent: ", input);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    };
    fetch("suggestion/createSuggestion", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Form sent to server, result: ", data);
        if (data.ok === true) {
          alert("הבקשה נשלחה בהצלחה. תודה על פנייתך");
        }
      });
    setSelectedKnessetMembersList([]);
  }
  return (
    <div className="recomnde">
      <Subject Icon={at} text="הגש הצעה" />
      <form id="myform" onSubmit={handleForm}>
        <div className="recomend__info">
          <div className="reomnde__SecindHalf">
            <h4>נושא הצעה לסדר:</h4>
            <input type="text" name="subject" />
            <h4>דברי הסבר:</h4>
            <textarea name="description" id="" cols="47" rows="12"></textarea>
          </div>
          <div className="reomnde__FirstHalf">
            <h4>חכ"ים רלוונטיים: </h4>
            <Multiselect
              style={{
                multiselectContainer: {
                  width: "70%",
                  border: "5px solid black",
                  "border-radius": "15px",
                },
                inputField: {
                  margin: "5px",
                },
                optionContainer: {
                  // To change css for option container
                  width: "100%",
                  "text-align": "right",
                },
                searchBox: {
                  // To change search box element look
                  "text-align": "right",
                  color: "#000",
                  border: "0px",
                },
                option: {
                  // To change css for dropdown options

                  "font-size": "12px",
                },
                "option:hover": {
                  // To change css for dropdown options
                  "background-color": "grey",
                  "font-size": "12px",
                },
              }}
              options={allKnessetMembersList} // Options to display in the dropdown
              selectedValues={dummy} // Preselected value to persist in dropdown
              onSelect={onSelect} // Function will trigger on select event
              onRemove={dummy} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              placeholder="בחר חבר כנסת"
            />
            <br />
            <div class="attach-title-div">
              <img src={AttachIcon}></img>
              <h4>קבצים ומסמכים תומכים </h4>
            </div>
            <div className="attachments-div">
              <div className="attachments-list">
                {files.map((file, index) => {
                  return <Attachmentfile key={index} fileTitle={file.name} />;
                })}
              </div>
              <div className="attach-button-div">
                <label className="btn">
                  <input type="file" multiple onChange={handlefile} />
                  הוסףקובץ
                </label>
              </div>
            </div>

            <button className="btn" type="submit">
              שלח
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default OneMinuteForm;
