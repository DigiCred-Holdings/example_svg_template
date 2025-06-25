import React, { useEffect, useState } from 'react';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SvgCss } from 'react-native-svg/css';
import { DOMParser, XMLSerializer } from 'xmldom';


const student = 
  {
    "studentNumber": "202300123",
    "studentFullName": "Ada Lovelace",
    "gpa": "3.78",
    "studentBirthDate": "2003-09-22",
    "terms": 
	  [
        {
          "termGradeLevel": "Freshman",
          "termYear": "2023",
          "termSeason": "Fall",
          "termSchoolName": "DigiCred State",
          "termSchoolCode": "DCS456",
          "termCredit": "15",
          "termGpa": "3.52",
          "academicStanding": "Good",
          "termHoursPossible": "15",
          "termHoursEarned": "15",
          "termGradePoints": "54",
          "cumulativeHoursPossible": "15",
          "cumulativeHoursEarned": "15",
          "cumulativeGradePoints": "54",
          "cumulativeGpa": "3.60",
          "courses": [
            {
              "courseCode": "CSCI-140",
              "courseTitle": "Intro Data Structs",
              "grade": "A",
              "creditEarned": "3",
              "gradePoints": "11.25",
              "hoursPossible": "3",
              "hoursEarned": "3",
              "transfer": false,
              "inProgress": false,
              "repeat": false,
              "flags": [],
              "schoolName": "DigiCred University"
            },
            {
              "courseCode": "MATH-120",
              "courseTitle": "Intro Discrete Math",
              "grade": "B+",
              "creditEarned": "3",
              "gradePoints": "9.9",
              "hoursPossible": "3",
              "hoursEarned": "3",
              "transfer": false,
              "inProgress": false,
              "repeat": false,
              "flags": [],
              "schoolName": "DigiCred University"
            }
          ]
        },
        {
          "termGradeLevel": "Sophomore",
          "termYear": "2024",
          "termSeason": "Spring",
          "termSchoolName": "DigiCred University",
          "termSchoolCode": "CVU123",
          "termCredit": "15",
          "termGpa": "3.85",
          "academicStanding": "Good",
          "termHoursPossible": "15",
          "termHoursEarned": "15",
          "termGradePoints": "57.75",
          "cumulativeHoursPossible": "30",
          "cumulativeHoursEarned": "30",
          "cumulativeGradePoints": "111.75",
          "cumulativeGpa": "3.73",
          "courses": [
            {
              "courseCode": "CSCI-240",
              "courseTitle": "Data Structures",
              "grade": "A",
              "creditEarned": "3",
              "gradePoints": "11.25",
              "hoursPossible": "3",
              "hoursEarned": "3",
              "transfer": false,
              "inProgress": false,
              "repeat": false,
              "flags": [],
              "schoolName": "DigiCred University"
            },
            {
              "courseCode": "MATH-220",
              "courseTitle": "Discrete Math",
              "grade": "B+",
              "creditEarned": "3",
              "gradePoints": "9.9",
              "hoursPossible": "3",
              "hoursEarned": "3",
              "transfer": false,
              "inProgress": false,
              "repeat": false,
              "flags": [],
              "schoolName": "DigiCred University"
            },
            {
              "courseCode": "ENG-210",
              "courseTitle": "Technical Writing",
              "grade": "A-",
              "creditEarned": "3",
              "gradePoints": "11.1",
              "hoursPossible": "3",
              "hoursEarned": "3",
              "transfer": false,
              "inProgress": false,
              "repeat": false,
              "flags": [],
              "schoolName": "DigiCred University"
            }
          ]
        }
    ],
    "studentInfo":{
      "studentPhone": "(555) 123-4567",
      "studentEmail": "ada@university.edu",
      "studentAddress": "123 College Ave, Apt 204, Cityville, ST 12345",
      "studentSsn": "XXX-XX-6789",
      "studentSex": "Female",
      "studentContacts": "Mother: Sarah Lovelace (555) 234-5678",
      "studentStateId": " ",
      "schoolName": "DigiCred University",
      "schoolAddress": "100 University Blvd\nCityville, ST 12345",
      "schoolPhone": "(555) 987-6543",
      "schoolFax": "(555) 987-6544",
      "schoolCode": "CVU123",
      "schoolDistrict": " ",
      "schoolDistrictPhone": " ",
      "schoolAccreditation": " ",
      "schoolCeebCode": " ",
      "schoolPrincipal": " ",
      "schoolPrincipalPhone": " ",
      "schoolGradeLevels": "Freshman, Sophomore, Junior, Senior",
      "guardianName": " ",
      "guardianPhone": " ",
      "guardianEmail": " ",
      "gradeLevel": "Junior",
      "graduationDate": "2026-05-20",
      "workExperience": " ",
      "achievements": " "
    },
    "transcript": {
      "program": "B.S. in Computer Science",
      "gpa": "3.78",
      "gpaUnweighted": " ",
      "totalPoints": " ",
      "totalPointsUnweighted": " ",
      "classRank": " ",
      "attemptedCredits": " ",
      "earnedCredits": "75",
      "requiredCredits": " ",
      "remainingCredits": " ",
      "endorsements": " ",
      "mathRigor": " ",
      "cirriculumProgram": " ",
      "reqirementsRemaining": " ",
      "tests": " ",
      "creditSummary": " ",
      "ctePrograms": " ",
      "transcriptDate": "2025-05-15",
      "transcriptComments": "Official transcript issued by the Office of the Registrar."
    }
  }

export default function HomeScreen() {

  const [xmlTemplate, setxmlTemplate] = useState(`<?xml version="1.0" encoding="utf-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 9.53 500 500"></svg>`);

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);  
  const END_POSITION = 1000;
  
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (onLeft.value) {
        position.value = e.translationX;
      } else {
        position.value = END_POSITION + e.translationX;
      }
    })
    .onEnd((e) => {
      if (position.value > END_POSITION / 2) {
        position.value = withTiming(END_POSITION, { duration: 100 });
        onLeft.value = false;
      } else {
        position.value = withTiming(0, { duration: 100 });
        onLeft.value = true;
      }
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateX: position.value }],
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }));

  const composed = Gesture.Simultaneous(
    pinchGesture,
    panGesture
  );

  useEffect(() => {
    const getTemplate = async() => {
      // Fetch the .SVG file from the cloud
      const template = await fetch('https://crms-images.s3.us-east-1.amazonaws.com/CFCCTranscript.svg');
      // Turn the SVG into text
      const readXMLTemplate = await template.text();
      // Create the XML DOM parser
      const parser = new DOMParser();
      // Load the SVG file into the parser
      const xmlTemplate = parser.parseFromString(readXMLTemplate);
      console.log("**************");
      // Get height of header
      let currentHeight = getHeaderHeight(xmlTemplate, "header");
      console.log("Starting height=", currentHeight);
      currentHeight = findAttributes(xmlTemplate, student, currentHeight);

      // Get height of footer
      const footer = xmlTemplate.getElementById("footer");
      footer!.setAttribute("transform", "matrix(1,0,0,1,0,"+currentHeight.toString()+")");
      let footerHeight = getHeaderHeight(xmlTemplate, "header");

      // Write total height to the document viewBox
      const svgDoc = xmlTemplate.getElementById("SVG");
      svgDoc!.setAttribute("viewBox", "0 9.53 500 "+(currentHeight+footerHeight).toString());

      // Convert from XmlDOM back to XML string
      const serializer = new XMLSerializer();
      const outXML = serializer.serializeToString(xmlTemplate)
      console.log(outXML);
      // Set the state to be used by the SvgCss component
      setxmlTemplate(outXML);
    }
    if(xmlTemplate.length<110) {
      // was getting a problem with repeated reloads of the app
      getTemplate();
    }
  })

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={composed}>
        <Animated.View style={animatedStyle}>
          <SvgCss width="100%" height="100%" xml={ xmlTemplate }/>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

function getHeaderHeight(xmlDoc: Document, section: string) {
    // Get the height of one of the template boxes
    const header_box = xmlDoc.getElementById(section+"_box");
    const height = Number(header_box!.getAttribute("height"));
    return height;
}

function writeAttribute(xmlDoc: Document, attribute: string, value: string) {
    // Library only allows changes to the elements not to nodes
    // rename the template element
    let element = xmlDoc.getElementById(attribute);
    element?.setAttribute("id", attribute + "temp");
    // Now we should get the element from the template
    let valueElement = xmlDoc.getElementById(attribute);
    if(valueElement) {
      console.log("Found key=", attribute);
      // Give a random ID to this new element so it wont be confused with the template version
      let random = Math.random().toString(36).substring(2,6);
      valueElement!.setAttribute("id", attribute+"_"+random);
      // Write the value to substitute from the json data
      valueElement.textContent=value;
      // Rename the template element back to its original name
      element?.setAttribute("id", attribute);
    }
    else {
      // Special case where we were not in a copy, just the header
      element!.textContent=value;
      element?.setAttribute("id", attribute);
    }
}      

function newArrayGroup(xmlDoc: Document, attribute: string, values: any, height: number) {
    console.log("Create new group for", attribute);
    // Track the height that the next group starts at
    let newHeight = height;
    // Look for a template for the attribute
    let element = xmlDoc.getElementById(attribute);
    if(element) {
      // Walk through all of the elements of the array
      for(let j=0; j<values.length; j++) {
        // Create a new group element
        let newElement = xmlDoc.createElement("g");
        // Set the id of the group to be the name of the attribute and a random string - makes unique id
        let random = Math.random().toString(36).substring(2,6);
        newElement.setAttribute("id", attribute+"_"+random);
        // Make this visible
        newElement.setAttribute("visibility", "visible");
        // Set the height to start the group at
        newElement.setAttribute("transform", "matrix(1,0,0,1,0,"+newHeight+")");
        // Copy the children of the template for the attribute
        for(let i=0; i<element!.childNodes.length-1; i++) {
          // Clone each child node and their children - this copies the any text entries
          newElement.appendChild(element!.childNodes[i].cloneNode(true));
        }
        // Get the footer element
        const footer = xmlDoc.getElementById("footer");
        // Insert the new group above the footer
        xmlDoc.insertBefore(newElement, footer);
        let boxElement = xmlDoc.getElementById(attribute+"_box");
        // Update the height for the next group
        console.log("New group - ", attribute, " start height = ", newHeight)
        newHeight += Number(boxElement!.getAttribute("height"));
        console.log("New group - ", attribute, "after height = ", newHeight)
        // Process the keys for substitutions
        console.log("Values[j]=", values[j]);
        newHeight = findAttributes(xmlDoc, values[j], newHeight);
        console.log("New group - ", attribute, "after attributes = ", newHeight)
      }
    }
    return newHeight;
}

function findAttributes(xmlDoc: Document, jsonData: any, height: number) {
    console.log("Find attributes");
    console.log("jsonData=", jsonData);
    // Track the height that the next group starts at
    let newHeight = height;
    // Walk through all of the JSON data entry keys
    for(const key in jsonData) {
      console.log("Key=", key);
      let value = jsonData[key as keyof typeof jsonData];
      // Look for string values
      if(typeof(value)==='string') {
        console.log("Value=", value);
        // See if there is an SVG element that matches the key
        if(xmlDoc.getElementById(key)) {
          // Update the element's text field to the string value for the key
          writeAttribute(xmlDoc, key, value);
        }
      } 
      else {
        // Check if this is an array value
        if(Array.isArray(value)) {
          // We need to create new SVG groups for each array entry
          newHeight = newArrayGroup(xmlDoc, key, value, height);
        }
      }
    }
    return newHeight; 
}

